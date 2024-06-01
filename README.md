## App Flow:

Step 1: API Integration

Use CoinGecko API to fetch real-time cryptocurrency prices.
Create a module (coinGeckoApi.ts) to fetch the prices for specified cryptocurrencies.
Step 2: User Model and Database Interactions

Define a user model using MongoDB (user.ts) to store user email and alert criteria.
Set up Mongoose for MongoDB interactions.
Step 3: Express Server and Routes

Create an Express server (server.ts) to handle API requests.
Define routes (alertRoutes.ts) for users to set their alert criteria.
Step 4: Alerting System

Implement an alerting system (alertingSystem.ts) that continuously monitors cryptocurrency prices.
Fetch the prices from the CoinGecko API or Redis cache and compare them with user-defined criteria.
Send notifications to users when their criteria are met.
Step 5: Caching System

Implement caching using Redis (cachingSystem.ts) to store recent price updates.
Cache the prices for a short duration (e.g., 60 seconds) to reduce the number of API calls and improve efficiency.
Step 6: Notification System

Implement a notification system (sendAlert.ts) to send email alerts to users using Nodemailer.
3. Challenges and Solutions:

Challenge 1: Real-time Price Fetching

Issue: Fetching real-time prices frequently could result in high latency and excessive API usage.
Solution: Implement caching with Redis to store recent price updates and reduce the number of API calls.
Challenge 2: Efficient Data Management

Issue: Managing and updating user alert criteria efficiently in the database.
Solution: Use Mongoose to handle MongoDB interactions, allowing for efficient querying and updating of user data.
Challenge 3: Notification Delivery

Issue: Ensuring timely and reliable delivery of notifications to users.
Solution: Use Nodemailer to send email alerts and configure it with a reliable email service.
Challenge 4: Error Handling and Reliability

Issue: Handling API failures, database errors, and other runtime issues gracefully.
Solution: Implement error handling in each module to catch and log errors, ensuring the system continues to operate smoothly.

<h3>Setting Up the Environment:</h3>

Dependencies:

Express
Mongoose
Redis
Node-fetch
Typescript
Nodemailer
dotenv
Configuration:

Create a .env file with your environment variables.
Configure TypeScript (tsconfig.json).
Define start script in package.json.
6. Running the Project:

Install dependencies: npm install
Start the server: npm run start
