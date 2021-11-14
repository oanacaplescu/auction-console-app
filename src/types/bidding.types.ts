export interface IBidData {
  objectForSale: IBidItem;
  bidders: IBidder[];
}

export interface IBidItem {
  name: string;
  price: IBidPrice;
}

export interface IBidPrice {
  amount: number;
  priceCurrency: IBidCurrency;
}

export enum IBidCurrency {
  Euros,
  Dollars,
  Ron,
  Other,
}

export interface IBidder {
  name: string;
  bids: number[];
  winningPrice?: IBidPrice;
}
