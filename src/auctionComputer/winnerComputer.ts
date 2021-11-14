import { IBidData, IBidder, IBidItem } from '../types/bidding.types';
import { Maybe } from '../types/common.types';
import { isEmptyArray } from '../utils/inputChecker';


export function isObjectInvalid(item: IBidItem): boolean {
  return item.price.amount < 0 || !item.name;
}

export function computeBidWinner(bidData: IBidData): Maybe<IBidder> {
  if (isObjectInvalid(bidData.objectForSale)) {
    return undefined;
  }
  if (isEmptyArray(bidData.bidders)) {
    return undefined;
  }

  const soldItemPrice = bidData.objectForSale.price;
  let bidders = bidData.bidders;
  let winner: Maybe<IBidder> = undefined;
  let maxBidPrice = -1;
  let maxNonWinningBidPrice = -1;

  bidders.forEach((bidder: IBidder) => {
    if (bidder.bids.some((madeBid: number) => madeBid >= soldItemPrice.amount)) {
      var maxBidByCurrentBidder = Math.max(...bidder.bids);
      if (maxBidByCurrentBidder > maxBidPrice) {
        winner = bidder;
        maxNonWinningBidPrice = maxBidPrice;
        maxBidPrice = maxBidByCurrentBidder;
      }
    }
  });

  if (!winner) {
    throw new Error('No winner has been found, no one bid the item\'s asked price');
  }

  if (maxNonWinningBidPrice === -1) {
    maxNonWinningBidPrice = soldItemPrice.amount;
  }

  return {
    ...(winner as IBidder),
    winningPrice: { amount: maxNonWinningBidPrice, priceCurrency: soldItemPrice.priceCurrency },
  };
}
