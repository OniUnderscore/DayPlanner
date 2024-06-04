# Welcome to Dayplanner

This repository is for the Dayplanner backend, for the front-end, please consult the frontend repository found here: https://github.com/Billy-Dentith/DayPlanner-FE

Dayplanner is an app for finding local sights and activities, and planning a route between them to quickly and intuitively put together a day out.

## Explore the Backend

The service is currently hosted here:
https://dayplanner-backend.onrender.com

The /api endpoint will serve a list of useable endpoints.

You can explore all of the GET requests locally in your browser, or please use an API client to try the PATCH and POST requests! The README author recommends Bruno: https://www.usebruno.com/

## Build the Backend

Render is nice for a quick look, but if you want to run your own version - either to play around with our testing suite, or to avoid some pesky API limits, or MongoAtlas' throttling. Thankfully, it's an easy thing to setup!

1. In your terminal, please clone yourself a local version of the repo using _git clone https://github.com/OniUnderscore/DayPlanner.git_

2. Open the repo in VS code!

3. We do request that you setup your own Database instance with MongoAtlas. If you have one of these already great!

   If not, head on over to https://www.mongodb.com/products/platform/atlas-database to create an account and a free M0 cluster.

   Once you have one, copy the connection string, and post it into Index.js, line 8. Replacing the current entry! This should be formatted as "_pasted connection string_".

4. You may also want to create an OpenRouteService account to get your own API key! If you do, please sign up here: https://openrouteservice.org/dev/#/signup

   Once you've signed up, they'll send an email to you. Follow it, and sign in and you'll be taken to your dashboard. Under "Request a Token" select standard and choose a token name. Click Create Token and it should appear!

   Taking your token key, please navigate to Database/apiCalls.js, and replace the API key on line 6 with your own.

5. You should now be good to go! Run _npm install_ in the terminal to get all dependencies.

6. You can now either run the test suite with _npm test_ or seed the database with _node seed.js_

7. To run a local version of the DB, run _node listen.js_, and you should be able to connect using _localhost:9090_

## Troubleshooting:

Due to the limitations of some Api's used, and of the Atlas hosting service you might run into some small issues:

1. "The service is constantly loading"

   It's likely that the render service hasn't been accessed in a while. Please bear with it as it spins up and it should work shortly!

2. "Some endpoints are loading, but others are still spinning"

   Unfortunately, Mongo Atlas does limit rates during peak hours, and the database may be attempting to work through a backlog. Please either try your request later, or follow the instructions to build your own version of the backend!

3. "Using the getSights endpoint gives me an empty return!"

   All of our built-in users should return something appropriate for this endpoint. But there is a chance something has gone awry! Please try another user, and if you still have no luck, it might be the MongoAtlas instance, OR the OpenRouteService instance is throttling. Please either try again at a later time OR follow the instructions to set up a local version of the backend!

4. "The test suite is taking a long time to run!"

   Some of our tests to take a while to run! This is mostly due to either MongoAtlas' throttling, or just some heavier calculations going on with the OpenRoutingService and OpenStreetMap segments of the code. Please be patient, as we have appropriately set higher timeout thresholds for those tests. If you DO timeout, it may be due to throttling. In this case, please revisit the instruction on running a local version of the backend to get your own access keys to avoid those limits!
