# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Project: nifty-meals app
## Background:
The goal is to build a full-stack application that supports healthy eating through high-quality meal kit services with delicious weekly menus. The application would be designed using React framework for TypeScript on the frontend to display information and take input, and Spring framework for Java on the backend, to manage persisted information.

In this app, there would be three possible categories named “Breakfast”, “Lunch” and “Dinner.” All users would be able to search for specific meals, see featured meal in a carousel, review meals and lots more. Each user gets to select one to ten meal kits per box per week. Weekly menus can be chosen from any of the three categories. To get more information about a meal kit, users must be authenticated. These delicious meal kits would then be delivered for the upcoming week. Think of companies such as Hello Fresh, Purple Carrot or Factor Meals.

Other features to be enacted will be the use of Okta in authentication and authorization as well as the setup of https certifications, keys and cross origin resource sharing.

# User Stories:
## 1: There should be a home page on the app - frontend
As a user, I should be able to access the home page of the application which has routes for a navigation bar, a section to explore top meals, a carousel, success stories and a footer, on the frontend
### Features:
- Set up a frontend app
- Add bootstrap and css
- Display the home page
- Display routes for navbar, top meals, carousel, success stories and footer

## 2 - 5:
As a user, I should be able to see most services of the app from the home page and navigate to those pages from the home page. Services to be displayed are ## 2 - navigation bar and footer, ##3 - explore top meals, ## 4 - success stories and ## 5 - carousel on the front end, in order to view their contents
### Features:
- Display all pages as requested
- Display a loading spinner
- Display error messages where applicable

## 6:
As a user, I should be able to search for a meal on the frontend, based on words contained in a title, and get results separated into pages. This would enable me to see what meals are available in order to make a selection
### Features:
- Display the search box on the home page
- Display pagination of meals obtained from the search request

## 7:
As a user, I should be able to click on a dropdown next to the search button and get all available categories. I should then be able to make a category selection. After selecting a category, I should be able to search for a meal in the search box, based on a selected category and get meals associated with that category
### Features:
- Display a dropdown with all possible categories, including an option for all categories
- Display all meals associated with the category selected

## 8:
As a user, I should be able to add a meal to cart on the front end. This would allow me to checkout one to ten meals
### Features:
- Click on an Add to Cart button
- Display a checkout page
- Validate that no more than nine meals have been selected
- Display text to indicate that the meal is available
- Display a select meal button or display text that a meal has already been selected

## 9:
As a user, I should be able to leave a star rating for a selected meal on the frontend. I should also be able to leave a review comment to explain my chosen rating score. This will allow future customers to get an impression of the meal from other buyers
### Features:
- Display rating scores using stars
- Display a review box for optional comments to go along a score
- Display latest reviews shared by reviewers

## 10:
As a user, I should be able to leave a review on the frontend. Once I leave a review, a message should be displayed thanking me for my review. This would allow customers to give feedback about meals purchased
### Features:
- Display a dropdown with all possible review star selections
- Display a message thanking members for their reviews
- Display a box to allow for an optional message to be left along with star reviews
- Display review in the latest reviews section along with the star rating

## 11:
As a user, I should be able to view all reviews for any specific meal on the frontend. This would help me make a decision regarding selecting a meal or not, based on what others have to say about it
### Features:
- Display a button to view all reviews for a meal
- Display a page containing all reviews for the selected meal
- Implement pagination for the reviews viewed

## 12:
As a user, I should be able to view my current meals selected for an order on the frontend. This would give me an overview of what meals I would be getting in my order
### Features:
- Display a “My meals” tab in the nav bar
- Display a “My meals” page to view all selected meals in an order
- Display the ability to route to the search page from any of the meals
- Display the ability to leave a review for any of the meals selected

## 13:
As a user, I should be able to remove a meal from the “My meals” page on the frontend. This would help me make changes to the order
### Features:
- Display a remove meal button in each meal
- Display selected meals, with the removed meal missing from the page
