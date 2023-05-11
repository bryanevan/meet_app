# Overview:
A serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

# Tech Stack
* React
* Recharts
* AWS Lambda
* Serverless Function
* Jest / Jest-Cucmber
* Puppeteer
* Atatus
* Enzyme

# Features
-Serverless functions deployed using AWS Lambda. 
-Performs Oauth and accesses Google Calender API via serverless functions 
-React Recharts visualization library 
-Jest test scripting for unit and integration testing 
-Enzyme for shallow rendering unit tests 
-Enzyme for full rendering integration tests 
-Puppeteer for user acceptance and end-to-end testing 
-Progressive Web Application

# User Stories:
Feature2: Show/Hide event’s details
User story: As a user, I should be able to show or hide details, so I can see more or less information about an event.
Scenario1: an event element is collapsed by default
Given: the app is running
When: a list of events has been served to the user
Then: event details are not visible immediately
Scenario2: user can expand event to show details
Given: the list of events is visible
When: user clicks on “show details” button of event
Then: event is expanded to display details
Scenario3: user can collapse an event to hide its details
Given: an event has been expanded to show details
When: user clicks the “hide details” button of the event
Then: details of the event are hidden

Feature3: Specify number of events
User story: As a user, I should be able to specify the number of events so that I can see more or fewer events.
Scenario1: when a user hasn’t specified a number of events, 32 is the default
Given: the app is running
When: user hasn’t specified number of events
Then: 32 events are displayed to user
Scenario2: user can change the number of events they want to see
Given: a list of events has been displayed to the user
When: user specified the number of events to be loaded
Then: a list with the requested number of events is displayed to user

Feature4: Use the app when offline
User story: As a user, I should be able to use the data cached in local memory so that I can use the data without access to the internet.
Scenario1: show cached data when there’s no internet connection
Given: there is no internet connection
When: user browses through the data
Then: user is displayed cached data of previously loaded events
Scenario2: show error when user changes the settings(city, time range)
Given: there is no internet connection
When: user changes settings
Then: app return error to user

Feature5: Data visualization
User story: As a user, I should be able to see the number of events in a city, so I know which city is more active.
Scenario1: show a chart with the number of upcoming events in each city.
Given: the app is loaded
When: user clicks on a city
Then: a chart with the

# Serverless Functions
This app will use a token for authorization, which will be generated in an authorization server. This server will host Lambda functions created to deliver authorization tokens to users. With this token, users will have access to event data from Google Calendar API.

## Links:
[Live site URL](https://bryanevan.github.io/meet_app)