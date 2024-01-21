# Blog Application

## Description

This application allows verified users to create posts where other users can comment on them. It uses react, toast, material-ui for frontend and ruby on rails on the backend. Docker is used to host the web page on AWS but currently this service is not avaliable.

## Table of Contents

-   [Installation](#installation)

-   [Usage](#usage)

-   [Features](#features)

-   [Configuration](#configuration)

-   [Contact](#contact)

## Installation

This application is built with React and TypeScript. Ensure that both are installed on your computer. This app has to be run concurrently with the ruby on rails backend. The backend can be cloned from "https://github.com/keithxun/CVWO-Backend.git"

Run the following comment to install the required packages

`$ npm install`

If you encounter errors due to different dependencies, you can try:

`$ npm install --force`

## Usage

The React frontend runs on `localhost:3001`, while the Ruby on Rails backend runs on `localhost:3000`.

Example:

# To Run React frontend

$ npm start

## Features

-   Create & Delete Posts

-   Create Comments

-   Account management (Create Account, Sign In & Sign Out) with account authentication through headers

-   Error messages using toast

-   Dark/Light mode using MaterialUI

## Configuration

Configure the code to run on a different port by changing the `.env` file. Port for API can be configured in api.ts

## Contact

For any questions, issues, or feedback, feel free to reach out:

-   Email: keithonghx@gmail.com
