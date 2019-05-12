## Tech Stack
* Node.js(This was most efficient language(time and implmentation complexity) over C# or Java for this solution)

## Installation
1. Install Latest Node runtime from here[Node LTS](https://nodejs.org/en/)
2. Run `npm install` in the root of the solution folder.
3. Run `npm run start` to start the service; after which you should see application running in your console.
4. Run `npm run test` to run test suite.

## Executing the API
1. Default the service is configured to run at port 3000
2. File post API can be accessed by https://localhost:3000/v1/weather via postman
3. Results of the same operation can be accessed by https://localhost:3000/v1/results via postman
4. Weather of all the cities can be found in Data folder `[cityis]-[requesttime Epoch time].json`

## Detailed design
### cityMap.js 
`[root]\src\cityMap.js`
This file holds all the records for each city and its id, this file is queried for converting city names to ids.

### inputFileparser.js
`[root]\src\inputFileparser.js`
Basic responsibility of this file is to take in input file and city to city id map and output city ids. if any of the cities do not match reject the promise using names of the cities not matching. basically its a parser or transformer for the city to id operation.

### worker.js
`[root]\src\worker.js`
This file is used to query, cache & push data to respective files.
