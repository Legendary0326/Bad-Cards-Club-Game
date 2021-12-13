# Humanity Opposed to Cards

A vulgar card game based on Apples to Apples, except it doesn't suck like the current alternatives.

We can't use the actual card name because the name itself, unlike the cards, is not licensed out for use by anyone other than the creators. 

The website we got the cards from (under a Creative Commons license) is: http://cardsagainsthumanity.com. It also happens to bear the namesake of the card game itself which we are prohibited from using.

# Brief Technology Overview

The app is written in node.js for the server side, AngularJS for the client side, and uses Bootstrap for the UI. It uses socket.io for client-server communication, so it's very very fast.

# Using Humanity Opposed to Cards

Download the zip or clone the repo on your server (can be a local machine). 

Make sure node is installed. 

Run `npm install' from the root to download any dependencies.

Run `gulp' to build the HTML/CSS and begin serving it, by default on port 8086. (This can be tailored in index.js, toward the bottom)

Visit the page in a web browser from each player's device to get started. It's pretty self-explanatory from there.
