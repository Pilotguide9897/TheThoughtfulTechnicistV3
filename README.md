# TheThoughtfulTechnicist
![](https://img.shields.io/badge/License-MIT-yellow.svg)

A Content Management System (CMS) style blog site for developers to publish articles, blog posts, and share their thoughts and opinions.

## Table of Contents
- [Screenshots](#screenshots)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing) 
- [Questions](#questions)
- [License](#license)

## Screenshots 
![dashboard](/assets/screenshots/dashboard.png)
![comment](/assets/screenshots/comment.png)
![login](/assets/screenshots/login.png)

## Description

Tech Blog is a CMS-style blog site designed for developers who write about technology. It provides a platform for users to create, edit, and delete blog posts, as well as leave comments on existing posts. The application follows the Model-View-Controller paradigm and uses Handlebars.js for views, MySQL and Sequelize for models, and Express.js for controllers.

When visiting the site, users are presented with the homepage, which includes existing blog posts, navigation links for the homepage and the dashboard, and the option to log in. Users can sign up with a username and password, which are securely stored using the bcrypt package for password hashing. Once logged in, users can access the dashboard to manage their blog posts and create new ones. The application also features an authentication system using express-session and connect-session-sequelize.

This application makes use of the following technologies:

```
Node.js
Express.js
Handlebars.js
MySQL2
Sequelize
dotenv
bcrypt
express-session
connect-session-sequelize
```
By providing a user-friendly interface for creating and managing blog posts, this CMS-style blog site offers developers a platform for sharing their knowledge and insights on technology-related topics.

The deployed application may be visited [here](https://mighty-hollows-75122.herokuapp.com/).

## Installation
As this application is deployed on Heroku, no installation is required to access, outside of having installed a modern web browser.

However, for those interested in deploying this application locally or testing modifications, users may follow these steps to get it up and running on their local system:

1. Clone the repository to your local machine by typing the following command into your command line:
`git clone git@github.com:Pilotguide9897/RetailWizard.git`

2. Install the necessary dependencies
Navigate to the root folder of the project and run `npm install` in the command line to install the required packages specified in the repository's package.json file.

3. Configure environment variables
Create a .env file in the root folder of the project with the following content:

```
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
SESSION_SECRET=your_session_secret
```
*Be sure to replace your_database_name, your_mysql_username, your_mysql_password, and your_session_secret with your actual MySQL database name, username, password and express-sessions session secret, respectively.

4. Create the database schema
Make sure you have MySQL installed and running on your system. In the MySQL shell or a SQL client, run the contents of the db/schema.sql file to create the necessary database.

5. Seed the database
In your terminal, navigate to the root folder of the project and run `npm run seed` in the terminal to seed the database with test data.

6. Start the application
To start the server and sync Sequelize models with the MySQL database, run `npm start` or `npm run watch` in the terminal.

## Usage
As mentioned above, the Thoughtful Technicist allows users to create, edit, and delete blog posts. It even allows users to leave comments on their own and others' existing posts. Upon visiting the site for the first time, users are presented with the homepage, which displays a list of all the posts previously saved to the database. From here, if they are logged in, they may choose to view whichever one they desire to see and read the comments for. If users are not logged in, and attempt to access their dashboard or click into posts, they will be redirected to the login page, where they may login or follow a link to create a new account. Each site features a navigation bar containing links for the homepage, dashboard, and authentication-related functions (i.e., login/logout), to allow easy access to the site's features. When clicking into their dashboard, users are presented with their own blog posts, along with the option to create a new post. Users can update or delete their existing posts from the dashboard by clicking into them. Users can log out of the site by clicking on the "Logout" option in the navigation. Additionally, if a user remains idle on the site for an extended period, they will be prompted to log in again before being able to create, update, or delete posts.

## Contributing
Users interested in contributing to this project may fork the GitHub repository, make their intended alterations, and submit these changes to the original repository as a pull request. Pull requests will be reviewed by the project author. If accepted, the changes will be merged and added to the project's main branch to create the new starting point for future development! The updated changes will then be hosted on Heroku to make it accessible by the public at large.Alternatively, you may deploy your own instance of the application by following Heroku's [documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs) on deploying Node.js apps.

## Questions
* If you have any questions concerning this application, do not hesitate to reach me at jaredryan1997@hotmail.com.
* You may also view my GitHub profile at http://github.com/Pilotguide9897.

## License
This project is licensed under the ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg). See the [license](https://opensource.org/licenses/MIT) documentation for more information.