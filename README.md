# get-harley-users-posts
Get Harley Demo Project

Install Users And posts
npm install

Run Users And posts
In RestProxy.js set "apiSecret" to DummyAPI secret.
npm run start

Features which I did not develop because I run out of time:
User Profile: It was not in the Page requirements.
Offline capabilities: I could have used Redux Offline - https://github.com/redux-offline/redux-offline.
Get total number of posts. Total number of posts did not exist on Users list. For each User a call to Posts 
would need to run (10-12 calls in parallel when moving to another page)

