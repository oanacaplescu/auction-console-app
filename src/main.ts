import * as fs from 'fs';
import { computeBidWinner } from './auctionComputer/winnerComputer';
import { readDataFromInputFile, writeDataInOutputFile } from './fileParser/fileParser';
import { log } from './simpleLogger/logger';

const TEST_FOLDER = './testFiles/';

const inputFiles = fs
  .readdirSync(TEST_FOLDER, { withFileTypes: true })
  .filter((file: fs.Dirent) => file.isFile())
  .map((file: fs.Dirent) => file.name);

inputFiles.forEach((inputFile: string, index: number) => {
  try {
    if (inputFile.includes('test')) {
      const fileData = readDataFromInputFile('testFiles/' + inputFile);
      const bidWinner = computeBidWinner(fileData);
      const outputFileName = writeDataInOutputFile(bidWinner, index);
      log(`Successfully updated ${outputFileName} output file for data in input file ${inputFile}!`);
    }
  } catch (error) {
    log('An error has occurred: ' + error);
  }
});
