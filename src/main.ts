import * as fs from 'fs';
import { computeBidWinner } from './auctionComputer/winnerComputer';
import { readDataFromInputFile, writeDataInOutputFile } from './fileParser/fileParser';
import { log } from './simpleLogger/logger';

const TEST_FOLDER = './testFiles/';

const inputFiles = fs
  .readdirSync(TEST_FOLDER, { withFileTypes: true })
  .filter(fileName => fileName.isFile())
  .map(file => file.name);

inputFiles.forEach(inputFile => {
  try {
    if (inputFile.startsWith('test7')) {
      const fileData = readDataFromInputFile('testFiles/' + inputFile);
      const bidWinner = computeBidWinner(fileData);
      const outputFileName = writeDataInOutputFile(bidWinner, 1);
      log(`Successfully updated ${outputFileName} output file!`);
    }
  } catch (error) {
    log('An error has occurred: ' + error);
  }
});
