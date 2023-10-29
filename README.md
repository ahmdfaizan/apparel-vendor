# Apparel Vendor

The Apparel Management Server is a Node.js TypeScript REST API.

## Prerequisites

- Node.js and npm are installed on your machine.

## Getting Started

1. Install dependencies:

   `npm i`

2. Create .env file from .sample.env and change config values accordingly

3. Run in dev mode
   `npm run dev`

4. For creating and running the generated build

   - Compile TypeScript code:
     `npm run build`

   - Start the server:
     `npm start`

5. For running Unit Tests
   `npm run test`

6. For generating test coverage report
   `npm run test:cov`

## API Definitions

Below are the APIs provided:

Note: Postman collection `Apparel Vendor TS.postman_collection.json` is attached in the repo.

1. Update apparal - Updates the single apparel stock and price.

   Method: POST

   Path: `"{{BaseUrl}}/api/apparel/update"`

   Example request body

   ```json
   {
     "code": "T-Shirt-101",
     "size": "XXL",
     "stock": 10000,
     "price": 100.1
   }
   ```

2. Update apparals - Updates the array of apparel stock and price.

   Method: POST

   Path: `"{{BaseUrl}}/api/apparel/update-multiple"`

   Example request body

   ```json
   [
     {
       "code": "T-Shirt-101",
       "size": "XXL",
       "stock": 10000,
       "price": 100.1
     }
   ]
   ```

3. Check fulfillment - To check if system can fulfill the requirement of a customer order.

   Method: POST

   Path: `"{{BaseUrl}}/api/apparel/check-fulfillment"`

   Example request body

   ```json
   [
     {
       "code": "t-shirt-101",
       "size": "small",
       "quantity": 100
     }
   ]
   ```

4. Calculate lowest cost - To know the lowest cost at which  the order can be fulfilled.

   Method: GET

   Path: `"{{BaseUrl}}/api/apparel/lowest-cost"`

   Example request body

   ```json
   [
     {
       "code": "t-shirt-101",
       "size": "small",
       "quantity": 100
     }
   ]
   ```
