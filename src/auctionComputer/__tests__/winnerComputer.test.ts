import { IBidData, IBidder, IBidItem } from '../../types/bidding.types';
import { computeBidWinner } from '../winnerComputer';

describe('Winner computer tests', () => {
  const bidders: IBidder[] = [
    {
      name: 'A',
      bids: [110, 130],
    },
    { name: 'B', bids: [] },
    { name: 'C', bids: [125] },
    { name: 'D', bids: [105, 115, 90] },
    { name: 'E', bids: [132, 135, 140] },
  ];
  it("Should return undefined (there is no winner) if the object for sale's name is undefined, null or empty (not valid)", () => {
    const objectForSale: IBidItem = {
      name: '',
      price: { amount: 100, priceCurrency: 0 },
    };
    expect(computeBidWinner({ objectForSale, bidders })).toBe(undefined);
    objectForSale.name = undefined as unknown as string;
    expect(computeBidWinner({ objectForSale, bidders })).toBe(undefined);
    objectForSale.name = null as unknown as string;
    expect(computeBidWinner({ objectForSale, bidders })).toBe(undefined);
  });

  it('Should return undefined (there is no winner) if there is no person bidding', () => {
    const objectForSale: IBidItem = {
      name: '',
      price: { amount: 100, priceCurrency: 0 },
    };
    expect(computeBidWinner({ objectForSale, bidders: [] })).toBe(undefined);
  });

  it('Should compute correct winner when non-winners have the winning price ', () => {
    const bidData: IBidData = {
      objectForSale: {
        name: 'Mona Lisa - Leonardo da Vinci',
        price: { amount: 100, priceCurrency: 0 },
      },
      bidders: [
        {
          name: 'A',
          bids: [110, 130],
        },
        { name: 'B', bids: [] },
        { name: 'C', bids: [125] },
        { name: 'D', bids: [105, 115, 90] },
        { name: 'E', bids: [132, 135, 140] },
      ],
    };
    const expectedResult = {
      bids: [132, 135, 140],
      name: 'E',
      winningPrice: { amount: 130, priceCurrency: 0 },
    };
    expect(computeBidWinner(bidData)).toStrictEqual(expectedResult);
  });

  it("Should compute correct winner when the winning price is the object's initial price", () => {
    const bidData: IBidData = {
      objectForSale: {
        name: 'Mona Lisa - Leonardo da Vinci',
        price: { amount: 131, priceCurrency: 0 },
      },
      bidders: [
        {
          name: 'A',
          bids: [110, 130],
        },
        { name: 'B', bids: [] },
        { name: 'C', bids: [125] },
        { name: 'D', bids: [105, 115, 90] },
        { name: 'E', bids: [132, 135, 140] },
      ],
    };
    const expectedResult: IBidder = {
      bids: [132, 135, 140],
      name: 'E',
      winningPrice: { amount: bidData.objectForSale.price.amount, priceCurrency: 0 },
    };
    expect(computeBidWinner(bidData)).toStrictEqual(expectedResult);
  });

  it("Should not compute a winner when the all players bet less than the object's initial price", () => {
    const bidData: IBidData = {
      objectForSale: {
        name: 'Mona Lisa - Leonardo da Vinci',
        price: { amount: 10000, priceCurrency: 0 },
      },
      bidders: [
        {
          name: 'A',
          bids: [110, 130],
        },
        { name: 'B', bids: [] },
        { name: 'C', bids: [125] },
        { name: 'D', bids: [105, 115, 90] },
        { name: 'E', bids: [132, 135, 140] },
      ],
    };
    expect(() => computeBidWinner(bidData)).toThrow(
      new Error("No winner has been found, no one bid the item's asked price"),
    );
  });
});
