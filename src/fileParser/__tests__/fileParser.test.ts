import * as fs from 'fs';
import { IBidder } from '../../types/bidding.types';
import { readDataFromInputFile, writeDataInOutputFile } from '../fileParser';

describe('File parsers tests', () => {
  describe('readDataFromInputFile', () => {
    it('Should compute the data set based on the input from the input file sent as param', () => {
      const fileName: string = 'testFiles/test1';
      const expectedResult = {
        objectForSale: {
          name: '"Mona Lisa - Leonardo da Vinci"',
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
      expect(readDataFromInputFile(fileName)).toStrictEqual(expectedResult);
    });

    it('Should throw error when trying to read an invalid file', () => {
      const fileName = '';

      expect(() => readDataFromInputFile(fileName)).toThrow(new Error('Invalid filename'));
    });

    it('Should throw error when trying to read an invalid file', () => {
      const fileName = 'bad mock name';

      expect(() => readDataFromInputFile(fileName)).toThrow(
        new Error('File read was unsuccessful'),
      );
    });

    it('Should throw error if input file content does not match expected', () => {
      const fileName = 'testFiles/test2';

      expect(() => readDataFromInputFile(fileName)).toThrow(
        new Error('Incorrect input file content'),
      );
    });

    it('Should throw error if file contains invalid bid item', () => {
      const fileName = 'testFiles/test3';

      expect(() => readDataFromInputFile(fileName)).toThrow(new Error('Invalid bid item'));
    });

    it('Should throw error if file contains bid item does not have all required data', () => {
      let fileName = 'testFiles/test4';

      expect(() => readDataFromInputFile(fileName)).toThrow(
        new Error('Invalid bid item structure'),
      );
      fileName = 'testFiles/test5';
      expect(() => readDataFromInputFile(fileName)).toThrow(
        new Error('Invalid bid item structure'),
      );
    });

    it('Should throw error for invalid bidders item in file', () => {
      const fileName = 'testFiles/test6';

      expect(() => readDataFromInputFile(fileName)).toThrow(
        new Error('Invalid bidder item structure'),
      );
    });

    it('Should throw error for one invalid bidder item in file', () => {
        const fileName = 'testFiles/test8';
  
        expect(() => readDataFromInputFile(fileName)).toThrow(
          new Error('Invalid bidder item'),
        );
      });
  });

  describe('writeDataInOutputFile', () => {
    it('Should write resulted data in the output file based on the input sent as param and return the output file name', () => {
      const fileName: string = 'testFiles/outputFiles/out1';
      const winner: IBidder = {
        bids: [132, 135, 140],
        name: 'E',
        winningPrice: { amount: 100, priceCurrency: 0 },
      };
      const expectedFileContent: string = 'E 100 Euros';
      const outputFileName = writeDataInOutputFile(winner, 1);
      expect(fs.readFileSync(fileName, 'utf8')).toStrictEqual(expectedFileContent);
      expect(outputFileName).toStrictEqual(fileName);
    });

    it('Should throw error when undefined winner is passed', () => {
      expect(() => writeDataInOutputFile(undefined, 1)).toThrow(
        new Error('Incorrect winner content'),
      );
    });

    it('Should throw error when winner with undefined winningPrice is passed', () => {
      const winner: IBidder = {
        bids: [132, 135, 140],
        name: 'E',
        winningPrice: undefined,
      };
      expect(() => writeDataInOutputFile(winner, 1)).toThrow(new Error('Incorrect winner content'));
    });
});
});
