"use strict";
exports.__esModule = true;
exports.writeDataInOutputFile = exports.readDataFromInputFile = void 0;
var fs = require("fs");
var bidding_types_1 = require("../types/bidding.types");
var inputChecker_1 = require("../utils/inputChecker");
function getPriceCurrency(fileCurrency) {
    switch (fileCurrency.toLowerCase()) {
        case 'euro' || 'euros':
            return bidding_types_1.IBidCurrency.Euros;
        case 'dollar' || 'dollars':
            return bidding_types_1.IBidCurrency.Dollars;
        case 'ron' || 'lei' || 'rons':
            return bidding_types_1.IBidCurrency.Ron;
        default:
            return bidding_types_1.IBidCurrency.Other;
    }
}
function getBidItem(firstLine) {
    if (!(0, inputChecker_1.containsDelimiter)(firstLine, ',')) {
        throw new Error('Invalid bid item');
    }
    var itemData = firstLine.split(',');
    if ((0, inputChecker_1.isInvalidArray)(itemData)) {
        throw new Error('Invalid bid item structure');
    }
    var biddingItem = {
        name: itemData[0],
        price: { amount: +itemData[1], priceCurrency: getPriceCurrency(itemData[2]) }
    };
    return biddingItem;
}
function getBiddersData(fileContentByLines) {
    var result = [];
    fileContentByLines.forEach(function (line) {
        if (!(0, inputChecker_1.containsDelimiter)(line, ':')) {
            throw new Error('Invalid bidder item');
        }
        var bidderData = line.split(':');
        if ((0, inputChecker_1.isInvalidArray)(bidderData) && bidderData[1] !== '0') {
            throw new Error('Invalid bidder item structure');
        }
        result.push({
            name: bidderData[0],
            bids: bidderData.slice(2).map(function (bidAmount) { return +bidAmount; })
        });
    });
    return result;
}
function readDataFromInputFile(inputFileName) {
    if (!inputFileName) {
        throw new Error('Invalid filename');
    }
    var fileContent = '';
    try {
        fileContent = fs.readFileSync(inputFileName, 'utf8');
    }
    catch (error) {
        throw new Error('File read was unsuccessful');
    }
    var fileContentByLines = fileContent.toString().replace(/\r\n/g, '\n').split('\n');
    if ((0, inputChecker_1.isInvalidArray)(fileContentByLines, 1)) {
        throw new Error('Incorrect input file content');
    }
    var result = {
        objectForSale: getBidItem(fileContentByLines[0]),
        bidders: getBiddersData(fileContentByLines.slice(1))
    };
    return result;
}
exports.readDataFromInputFile = readDataFromInputFile;
function writeDataInOutputFile(winner, testCaseIndex) {
    if (!winner || !winner.winningPrice) {
        throw new Error('Incorrect winner content');
    }
    var outputFileName = 'testFiles/outputFiles/out' + testCaseIndex;
    fs.writeFileSync(outputFileName, winner.name + " " + winner.winningPrice.amount + " " + bidding_types_1.IBidCurrency[winner.winningPrice.priceCurrency]);
    return outputFileName;
}
exports.writeDataInOutputFile = writeDataInOutputFile;
