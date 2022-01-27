# Restaurant Reservation System

> This app is a Reservation System for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.

## Links
* [Restaurant Reservation App](https://restaurantreservations-client.herokuapp.com/ "Restaurant Reservation App")

## Screenshots

### Dashboard Page:

![Home Page](/./README-imgs/Dashboard.png?raw=true "Dashboard")
> The Reservations Table displays all reservations for a given day (expect for finished reservation) and defaults to the present day. Actions only apply to booked reservations.
> The Tables Table displays all Tables in the restaurant.

### New Reservation Page:

![New Reservation Page](/./README-imgs/New_Reservation.png?raw=true "New Reservation Page")
> Creates a new reservation that defaults to the status booked.

### Edit Reservation Page:

![Edit Reservation Page](/./README-imgs/Edit_Reservation.png?raw=true "Edit Reservation")

### New Table Page:

![New Table Page](/./README-imgs/New_Table.png?raw=true "New Table")
> Creates a new seating area.

### Table Selection Page:

![Table Selection" Page](/./README-imgs/Table_Selection".png?raw=true "Table Selection")
> Selections can only be processed if the table has adequate seating.

### Search Page:

![Search Page](/./README-imgs/Search.png?raw=true "Search")
> Searches are based on the customers phone number and will also match substring.

### Error Alerts:

![Error Alert](/./README-imgs/Error_Alert.png?raw=true "Error Alert")
> If the user inputs invalid fields an error alert will pop up and inform them of the error. This happens on all relevant pages.

## Technology

### Built with:
* Postgres, as the backend data base

* Express, as the backend api
  * Organize backend process with routes
  * Organize/reuse controller functions for http requests
* Knex, to build Postgres queries in JavaScript
  * create migration files to populate the data base with relations
  * create seed files to populate the relations with dummy data for development
  * create service files to preform Postgres tasks for a given http request
* Cors, to allow the frontend origin access to the backend
* React, including Router and Hooks
  * Created with create-react-app
  * Organize/reuse code with React Components and Routes
  * Reduce api calls with useEffects and useStates triggering API calls only when relevant database changes are made
* Bootstrap 
* Heroku
  * Migrated the backend and frontend to Heroku cloud server
