"use strict";
exports.__esModule = true;
var winnerComputer_1 = require("./auctionComputer/winnerComputer");
var fileParser_1 = require("./fileParser/fileParser");
var logger_1 = require("./simpleLogger/logger");
var fileData = (0, fileParser_1.readDataFromInputFile)('../testFiles/test1');
(0, logger_1.log)("Data from file: ", fileData);
var bidWinner = (0, winnerComputer_1.computeBidWinner)(fileData);
(0, fileParser_1.writeDataInOutputFile)(bidWinner, 1);
