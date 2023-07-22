<div align="center">
  <img src="./client/public/oriori-logo.svg" width="360pt" alt="Oriori Logo"/>
  <br/><br/>

  ![Updated](https://img.shields.io/static/v1?label=updated&message=July%2022nd%202023&color=388E3C&style=flat-square)  

  ![GitHub](https://img.shields.io/github/license/oriori-ccp7/oriori?style=flat-square)
  ![GitHub stars](https://img.shields.io/github/stars/oriori-ccp7/oriori?style=flat-square)
  ![GitHub issues](https://img.shields.io/github/issues/oriori-ccp7/oriori?style=flat-square)
  ![GitHub pull requests](https://img.shields.io/github/issues-pr/oriori-ccp7/oriori?style=flat-square)
  ![GitHub forks](https://img.shields.io/github/forks/oriori-ccp7/oriori?style=flat-square)
  ![GitHub watchers](https://img.shields.io/github/watchers/oriori-ccp7/oriori?style=flat-square)
<hr/>

# Visit oriori: [https://oriori.app](https://oriori.app)  
</div>
<br/>

# Table of Contents 
<details>
<summary>Click here to expand</summary>

1. [Project Description](#project-description)
    - [What is oriori?](#what-is-oriori)
    - [Why use oriori?](#why-use-oriori)
    - [Tech Stack](#tech-stack)
    - [Roadmap](#roadmap)
    - [Contribution](#contribution)
2. [For Developers: How to Use This Project](#For-Developers-How-to-Use-This-Project)
    - [Installation](#installation)
      - [Prerequisites](#prerequisites)
      - [1. Setup a Firebase Project for Development](#1-setup-a-firebase-project-for-development)
      - [2. Clone the Repository](#2-clone-the-repository)
      - [3. Setup a Python Virtual Environment](#3-setup-a-python-virtual-environment)
      - [4. Install Dependencies](#4-install-dependencies)
      - [5. Initialize a Development Database](#5-initialize-a-development-database)
      - [6. Create your `.env` Files](#6-create-your-env-files)
      - [7. Local PostgreSQL Only Run Migrations Seed Data](#7-local-postgresql-only-run-migrationsseed-data)
    - [Running the Server](#running-the-server)
      - [Using Docker](#using-docker)
      - [Using Local PostgreSQL](#using-local-postgresql)
    - [Using the App](#using-the-app)
      - [Sign Up](#sign-up)
      - [Log In](#log-in)
      - [Navbar](#navbar)
      - [Product Cards](#product-cards)
      - [Settings](#settings)
      - [Admin Features](#admin-features)
        - [Add Products](#add-products)
3. [Credits](#credits)
4. [License](#license)

</details>
<br/>

# Project Description

## What is Oriori?
<h3><b><ruby>
  <rp>(</rp>四<rt>し</rt>季<rt>き</rt>折<rt>おり</rt>々<rt>おり</rt><rp>)</rp>
</ruby></b> - <i>shikioriori</i></h3>
<br/>
Oriori is a tracking tool for seasonal and regional goods in Japan.
The name comes from the Japanese phrase <i>shikioriori</i>, which means ‘<i>from season to season</i>.’

## Why use Oriori?  
Have you ever wondered when the Sakura-themed drinks are gonna drop this year? Or have you gone somewhere and wondered what yummy things you can try that you can't find in another prefecture? Look no further, Oriori's got you covered!

## Tech Stack  

| Tech | Usage |  
| --------- | ------- |  
| ![django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)  | Used to manage PostgreSQL database for product data  |
| ![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)   | A secure, scalable database  |
| ![python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)  | Used to implement Django :) |  
| ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Responsive framework to manage the client DOM |
| ![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  | Type-safe coding with the familiarity of JavaScript |
| ![docker](https://img.shields.io/badge/Docker-384D54?style=for-the-badge&logo=docker&logoColor=0DB7ED) | Used for a consistent dev. environment and for containerized deployment |
| ![firebase](https://img.shields.io/badge/Firebase-1A73E8?style=for-the-badge&logo=firebase&logoColor=FFA000) | User authentication and user metadata |

## Roadmap
See the [GitHub Issues](https://github.com/OriOri-CCP7/oriori/issues) for this repository.

## Contribution
You can contribute by:
- providing feedback   
- making suggestions/sharing ideas
- reporting bugs 
- submitting Pull Requests (must be associated w/ an Issue)

Be sure to read our [Contribution Guidelines](CONTRIBUTING.md)

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

# For Developers: How to Use This Project

## Installation

### Prerequisites

Please make sure the following technologies are installed on your system before starting development on Oriori:
1. [Python](https://www.python.org/)
2. [NodeJS](https://nodejs.org/)
3. Either [Docker](https://www.docker.com/) or [PostgreSQL](https://www.postgresql.org/)
    - We recommend using Docker to keep your local environment clean, however, for reduced build times, it is also possible to use a local PostgreSQL installation.
4. A [Firebase](https://firebase.google.com/) account

### 1. Setup a Firebase Project for Development

Firebase is required to handle user authentication and certain user metadata.

1. Create a Firebase project for your use. (Google Analytics is not required.)
2. Register a Web App to the project.
    - Don't include Firebase hosting
    - Skip 'Add Firebase SDK'
3. Add Authentication with Email/Password sign-in.
    - Email link is not currently enabled
3. Add a Realtime Database.
    - Select a location convenient for you
    - Start in test mode
    - Update the Rules to match the following:
      ```json
      {
        "rules": {
          "users": {
            "$userId": {
              ".read": "$userId === auth.uid",
              ".write": "$userId === auth.uid"
            }
          }
        }
      }
      ```

### 2. Clone the Repository

Clone the repository (use a personal fork if contributing) into a working directory on your computer.

- [How to Clone a GitHub Repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

### 3. Setup a Python Virtual Environment

- In the project's root directory, run this command in the terminal:
    ```bash
    python -m venv venv
    ```
    (You may need to use `python3` instead of `python` depending on your installation.)
- **IMPORTANT:** Please ensure you are **always** inside the virtual enviromnent whenever working on Oriori. To activate the virtual environment run this command in the terminal:
    ```bash
    source venv/bin/activate
    ```
    To close the virtual environment, run this command in the terminal:
    ```bash
    deactivate
    ```

### 4. Install Dependencies

- Run the following command in the terminal:
    ```bash
    pip install -r requirements.txt
    ```
- After the Python requirements have been properly installed, run this command next:
    ```bash
    cd client && npm install && cd ..
    ```

### 5. Initialize a Development Database

#### Option A: Docker
  - Make sure Docker is running

#### Option B: PostgreSQL
  - Create a database to use with Oriori
      - Make sure to take note of the database's name and a username and password combination with read/write access to the database
      - [PostgreSQL: CREATE DATABASE](https://www.postgresql.org/docs/current/sql-createdatabase.html)

### 6. Create your `.env` Files

Two `.env` files are used the following locations:
  - in the `oriori` project directory
  - in the `oriori/client` subdirectory

Duplicate the `.env.example` files in each directory, rename them to `.env` and fill out the missing information:

#### `.env`

- `SECRET_KEY`

  Generate a new Django Secret Key and copy + paste it here.
  - [How to Generate a Django Secret Key](https://codinggear.blog/django-generate-secret-key/#generate-secret-key-in-django-using-getrandomsecretkeynbspfunction)
  - Follow steps 1-3 at the above link. At step 4, paste the secret key into `.env` instead of `config/settings.py`.

- `DEBUG`

  This can be either `True` or `False` - we recommend setting this as `False` in almost every circumstance

- `DATABASE_URL` - Required when using PostgreSQL for development

  The PostgreSQL URL consists of your username, password, and the database name. Replace the respective square-bracketed sections in the line below and set it as the value for `DATABASE_URL`:

  ```
  postgres://[USERNAME]:[PASSWORD]@localhost:5432/[DB_NAME]
  ```

- `HOSTNAMES`

  For development use, it's okay to set this as a wildcard (i.e., `"*"`), but for production, you should set this to the URL(s) where the app will be hosted. The values should be wrapped in double-quotes, and multiple URLs should be separated by a space.

#### `client/.env`

- Firebase Config

  In your Firebase Project Settings, on the General tab, scroll down to the section titled 'Your apps'. You should see a code snippet with an object named `firebaseConfig`. Set the values to the following environment variables with the corresponding information:

  ```
  REACT_APP_API_KEY=
  REACT_APP_FB_AUTH_DOMAIN=
  REACT_APP_FB_PROJECT_ID=
  REACT_APP_FB_STORAGE_BUCKET=
  REACT_APP_FB_MESSAGING_SENDER_ID=
  REACT_APP_FB_APP_ID=
  ```

- `REACT_APP_FB_DB_URL`

  To find your Firebase Realtime Database URL, go to the Realtime Database dashboard in your Firebase project and on the Data tab, click the link icon to copy the URL to set for this variable.

### 7. (Local PostgreSQL Only) Run Migrations/Seed Data

- These steps are not required when using Docker.
1. Run the following command in the terminal:
    ```bash
    python manage.py migrate
    ```
2. You can load seed product data to immediately display when running the app. Run the following command to load the data:
    ```bash
    python manage.py loaddata 004_Products.json
    ```

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

## Running the Server

### Using Docker

- To start the Docker containers:

  ```bash
  docker compose up
  ```

- To stop the Docker containers (use a separate terminal window in the project directory):

  ```bash
  docker compose down
  ```

- To update the server Docker container after making changes to the code:

  ```bash
  docker compose build server
  ```

### Using Local PostgreSQL

- To start the server:

  ```bash
  sh rundev.sh
  ```

- To stop the server press `Ctrl+C` in the terminal window while it is running.

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

## Using the App

### Sign Up
A user account is required to access the app.

Creating an account will create a Firebase user record and a user record in the app database. You will be directed to the Onboarding page to select your Home Prefecture.

### Log In
Log in with a user account to access the app.

An error will occur if you attempt to log in with an account that does not exist in the app database.

### Navbar
The Navbar is how you navigate the app.

| Nav Icon | Description |
| -------- | ----------- |
| Home | Shows all the products found in the user's Home Prefecture |
| Bookmarks | Shows all the products bookmarked by the user |
| Tried Products | Shows all the products logged as 'tried' by the user |
| Popular | Shows the products with the most 'likes' in the app database |
| Search | Shows all the products available in the selected prefecture | 

### Product Cards
Buttons are displayed next to a product's image with the following functions:

| Button | Description |
| ------------ | ----------- |
| Bookmark ribbon | Marks a product as 'bookmarked' |
| Checkmark | Marks a product as 'tried'; displays Like button if active |
| Thumbs up | Marks a product as 'liked' |
| Share icon | Invokes the device's share function if available; copies permalink to clipboard otherwise |

### Settings 
| Setting | Description |
| --------- | ----------- |
| Username | Allows user to change Username | 
| Select Prefecture | Allows user to change Home Prefecture |

Clicking 'Save' will save changes and redirect the user back to Home.  

### Admin Features

Users with the role 'ADMIN' set in the Firebase Realtime Database will have access to the following features:

#### Add Products
Products can be added to the app database on this page.

| Field | Description |
| --------- | ------------ |
| Product Name | Product name displayed on Product Card |
| Link URL | Link accessible by tapping on Product Card |
| Image | Upload an image to display in app |
| Start Date (optional) | The date the product will become available |
| End Date (optional) | The date the product will no longer be available |
| Location Options | Prefectures to choose from when setting product's available locations |
| Add & Remove Buttons | These buttons move Prefecture options between the Location Options and Selected Locations lists |
| Selected Locations | Prefectures selected as the product's availability |

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

# Credits

| Name | Title / Position | GitHub or Social Media  |
| ---- | ---------------- | ----------------------  |
| Joe V. | - Tech Lead <br> - DevOps & CI/CD <br> - Support | https://github.com/kappanjoe |
| Nicole Boci  | - Product Owner <br> - Fullstack Engineer  <br> - Server  <br> - Data Sourcing | https://github.com/nikobatzi1990 |
| Ikuno Kanasugi  | - Fullstack Engineer  <br> - Data Sourcing  <br> - Database | https://github.com/ikuno815 |
| Chadwick Au | - Fullstack Engineer  <br> - Client Pages <br> - UI Components | https://github.com/SirrorsMoore1975 |

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

# License

MIT License

Copyright (c) 2023 OriOri-CCP7

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)