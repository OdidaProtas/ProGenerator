# ProGenerator
A tool for generating boilerplate React(Experimental) and Express TypeORM code online based on a Database Schema. 

## Visit https://pro-type-express-gen.web.app

### Before you get started
Check out [TypeORMttps://typeorm.io) and understand how to work with entities and the entity manager

Ensure you validate your models. All fields and relationships must be unique

Client React App generated with the Context Api and may need additional configuration.

### Working with the updated project

Unzip the folder in your desired directory and `cd\projectName\projectName`

Install dependencies with `yarn` or `npm install`

Create a database and add the db url to the .env, also update the port. Default port is 7072

Database migations

In the root of the project, run `npm run mm` to generate migration files then run `npm run mg` to migrate your database

### Run the application

in the root of the app, run `yarn dev` or `npm run dev`

### Coming up

Guide to using the generated client app
Swagger docs for generated project
Dedicated extensible user models and Authentication

### Happy deployment😊