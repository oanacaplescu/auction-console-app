# auction-console-app
Solution to solve the Teads test: second-price, sealed-bid auction

Let's consider a second-price, sealed-bid auction:
An object is for sale with a reserve price.
We have several potential buyers, each one being able to place one or more bids.
The buyer winning the auction is the one with the highest bid above or equal to the reserve price.
The winning price is the highest bid price from a non-winning buyer above the reserve price (or the reserve price if none applies)
Example
Consider 5 potential buyers (A, B, C, D, E) who compete to acquire an object with a reserve price set at 100 euros, bidding as follows:
 
A: 2 bids of 110 and 130 euros
B: 0 bid
C: 1 bid of 125 euros
D: 3 bids of 105, 115 and 90 euros
E: 3 bids of 132, 135 and 140 euros
 
The buyer E wins the auction at the price of 130 euros.


Instructions:
- open a PowerShell/git bash and navigate to it
- run npm install - this allows installing all needed dependencies
- run npm run build - to build the solution files
- from here, you can run node src/main to run the initial main, with test cases I've added and see the results in the console + output files (located in /testFiles/outputFiles directory in the solution).
- npm run test can also be ran to run the tests covering the code + edge cases - to be found on each of the project's components __tests__ folder; eg: src/auctionComputer/__tests__