"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.computeBidWinner = exports.isObjectInvalid = void 0;
var inputChecker_1 = require("../utils/inputChecker");
function isObjectInvalid(item) {
    return item.price.amount < 0 || !item.name;
}
exports.isObjectInvalid = isObjectInvalid;
function computeBidWinner(bidData) {
    if (isObjectInvalid(bidData.objectForSale)) {
        return undefined;
    }
    if ((0, inputChecker_1.isEmptyArray)(bidData.bidders)) {
        return undefined;
    }
    var soldItemPrice = bidData.objectForSale.price;
    var bidders = bidData.bidders;
    var winner = undefined;
    var maxBidPrice = -1;
    var maxNonWinningBidPrice = -1;
    bidders.forEach(function (bidder) {
        if (bidder.bids.some(function (madeBid) { return madeBid >= soldItemPrice.amount; })) {
            var maxBidByCurrentBidder = Math.max.apply(Math, bidder.bids);
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
    return __assign(__assign({}, winner), { winningPrice: { amount: maxNonWinningBidPrice, priceCurrency: soldItemPrice.priceCurrency } });
}
exports.computeBidWinner = computeBidWinner;
