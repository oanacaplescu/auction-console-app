import * as fs from 'fs';
import { IBidCurrency, IBidData, IBidItem, IBidder } from '../types/bidding.types';
import { Maybe } from '../types/common.types';
import { containsDelimiter, isInvalidArray } from '../utils/inputChecker';

function getPriceCurrency(fileCurrency: string): IBidCurrency {
  switch (fileCurrency.toLowerCase()) {
    case 'euro' || 'euros':
      return IBidCurrency.Euros;
    case 'dollar' || 'dollars':
      return IBidCurrency.Dollars;
    case 'ron' || 'lei' || 'rons':
      return IBidCurrency.Ron;
    default:
      return IBidCurrency.Other;
  }
}

function getBidItem(firstLine: string): IBidItem {
  if (!containsDelimiter(firstLine, ',')) {
    throw new Error('Invalid bid item');
  }
  const itemData = firstLine.split(',');
  if (isInvalidArray(itemData)) {
    throw new Error('Invalid bid item structure');
  }
  const biddingItem: IBidItem = {
    name: itemData[0],
    price: { amount: +itemData[1], priceCurrency: getPriceCurrency(itemData[2]) },
  };
  return biddingItem;
}

function getBiddersData(fileContentByLines: string[]): IBidder[] {
  var result: IBidder[] = [];
  fileContentByLines.forEach(line => {
    if (!containsDelimiter(line, ':')) {
      throw new Error('Invalid bidder item');
    }
    const bidderData = line.split(':');
    if (isInvalidArray(bidderData) && bidderData[1] !== '0') {
      throw new Error('Invalid bidder item structure');
    }
    result.push({
      name: bidderData[0],
      bids: bidderData.slice(2).map((bidAmount: string) => +bidAmount),
    });
  });

  return result;
}

export function readDataFromInputFile(inputFileName: string): IBidData {
  if (!inputFileName) {
    throw new Error('Invalid filename');
  }

  let fileContent = '';
  try {
    fileContent = fs.readFileSync(inputFileName, 'utf8');
  } catch (error) {
    throw new Error('File read was unsuccessful');
  }
  const fileContentByLines: string[] = fileContent.toString().replace(/\r\n/g, '\n').split('\n');

  if (isInvalidArray(fileContentByLines, 1)) {
    throw new Error('Incorrect input file content');
  }
  const result: IBidData = {
    objectForSale: getBidItem(fileContentByLines[0]),
    bidders: getBiddersData(fileContentByLines.slice(1)),
  };

  return result;
}

export function writeDataInOutputFile(winner: Maybe<IBidder>, testCaseIndex: number): string {
  if (!winner || !winner.winningPrice) {
    throw new Error('Incorrect winner content');
  }
  const outputFileName = 'testFiles/outputFiles/out' + testCaseIndex;
  fs.writeFileSync(
    outputFileName,
    `${winner.name} ${winner.winningPrice.amount} ${
      IBidCurrency[winner.winningPrice.priceCurrency]}`
  );

  return outputFileName;
}
