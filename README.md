<div align="center">
  <img src="./client/public/oriori-logo.svg" width="360pt" alt="Oriori Logo"/>
  <br/><br/>

  ![Updated](https://img.shields.io/static/v1?label=updated&message=June%2025th%202023&color=388E3C&style=flat-square)  

  ![GitHub](https://img.shields.io/github/license/oriori-ccp7/oriori?style=flat-square)
  ![GitHub stars](https://img.shields.io/github/stars/oriori-ccp7/oriori?style=flat-square)
  ![GitHub issues](https://img.shields.io/github/issues/oriori-ccp7/oriori?style=flat-square)
  ![GitHub pull requests](https://img.shields.io/github/issues-pr/oriori-ccp7/oriori?style=flat-square)
  ![GitHub forks](https://img.shields.io/github/forks/oriori-ccp7/oriori?style=flat-square)
  ![GitHub watchers](https://img.shields.io/github/watchers/oriori-ccp7/oriori?style=flat-square)
<hr/>

# Live Deployment: [https://oriori.fly.dev](https://oriori.fly.dev)  
</div>
<br/>

# Table of Contents 
<details>
<summary>Click here to expand</summary>

1. [Project Description](#project-description)
   - [What is oriori?](#what-is-oriori)
   - [Why use oriori?](#why-use-oriori)
   - [Tech Stack](#tech-used-and-why)
   - [Roadmap](#future-implementation)
   - [Contribution](#contribution-wip)
2. [How to Install and Run the Project](#How-to-Install-and-Run-the-Project)
3. [.env](#env)
   - [.env at folder oriori](#env-at-folder-oriori)
     - [SECRET_KEY](#secret_key)
     - [DEBUG](#debug)
     - [DATABASE_URL](#database_url)
   - [.env at folder oriori/client](#env-at-folder-orioriclient)
   - [Docker](#for-docker)
4. [How to Use the Project](#how-to-use-the-project)
   - [Development](#development)
     - [Installation](#installation)
     - [Running the App](#running-the-app)
       - [Normal User](#normal-user)
       - [Admin User](#admin-user)
   - [App](#app) (WIP -someone please take over)
     - [Server](#server)
     - [Client](#client)
5. [Credits](#credits)
6. [License](#license)

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
| ![docker](https://img.shields.io/badge/Docker-384D54?style=for-the-badge&logo=docker&logoColor=0DB7ED) | Used for a consistent dev. environment and for containerized deployment

## Roadmap
See [GitHub Issues](/issues) for this repository.

## Contribution
You can contribute by:
- providing feedback   
- making suggestions/sharing ideas
- reporting bugs 
- submitting pull requests (with our without resolving an existing issue)

Be sure to read our [Contributing Guidelines](./CONTRIBUTING.md)

# How to Install and Run the Project 

Run the following essential seeds for the apps to run:

```bash
python3 manage.py loaddata 001_Locations.json 
python3 manage.py loaddata 004_Products.json
```

Alternatively, you can open `runseed.sh` in the root directory and edit skipindices to omit some entry in the list, just **DO NOT RUN** it yet.  

For the above cases, at `skipindices`, remove `0` and `3` for the script to run `001_Locations.json` and `004_Products.json`:    

```bash
./runseed.sh
``` 

For linux user, be sure to run `chmod u+x runseed.sh` first.

Beside `sh runseed.sh` and the above, you can try to run the `runseed.sh` by:-

```bash
source runseed.sh
```

OR

```bash
bash runseed.sh
```

# .env

- You needed two `.env` file in the following locations:

- in the `oriori` root directory
- in the `oriori/client` directory  

**NB**: Make sure you exclude both `.env` file from your `.gitignore`, this data should be keep off from your git pull. 

## .env at folder oriori

The `.env.example` located at the root folder gives you the necessary variable for the project to run, use it for the `.env` in your root directory.

The content of your `.env` in the root directory should looks something like this:-  

```
SECRET_KEY=
DEBUG=
DATABASE_URL=
```

### SECRET_KEY
You needed to create a secret key for your team or yourself if you are working solo and copy it to SECRET_KEY:-  

https://codinggear.blog/django-generate-secret-key/#generate-secret-key-in-django-using-getrandomsecretkeynbspfunction

### DEBUG 
Set it to equal to `True` or `False`

### DATABASE_URL

The `DATABASE_URL` consist of `YOUR_USERNAME`, `YOUR_PASS` and `YOUR_DB_NAME` variables, each required to be replaced with your respective `username`, `password` and `database name` in `postgresql`.  

```
DATABASE_URL=postgres://[YOUR_USERNAME]:[YOUR_PASS]@localhost:5432/[YOUR_DB_NAME]
```

1. The oriori project required `postgresql` database to run. 
1. If you did not have `postgresql` installed in your system, please install it, refer to their homepage for your respective computing system. 
1. Once you have `postgresql` installed, enter by using:-  

```
psql -U
```

At `postgresql` create a database:-  

```psql
CREATE DATABASE oriori;
``` 

exit `postgresql` by `\q`.  

## .env at folder oriori/client
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

`.env` at `oriori/client`  

You will needed to register your project in firebase at [firebase.com](https://firebase.google.com/) and create necessary API KEY for this to run, you will be given the following details to fill out the below required fields. A `.env.example` file has already prepared inside `oriori/client` folder:-

```
REACT_APP_API_KEY=
REACT_APP_FB_AUTH_DOMAIN=
REACT_APP_FB_PROJECT_ID=
REACT_APP_FB_STORAGE_BUCKET=
REACT_APP_FB_MESSAGING_SENDER_ID=
REACT_APP_FB_APP_ID=
REACT_APP_FB_DB_URL=
```

**NB**: Make sure you exclude both `.env` file from your `.gitignore`, this data should be keep off from your git pull. 

## For Docker

Install Docker in your respective desktop environment (MacOs, Windows, Linux, etc).  

Download [Docker](https://www.docker.com/).   

Run the following command to make oriori start in a virtual environment provided by docker:-    

```bash
docker compose up
```

Once your codes are updated, you will wanted to purge the previous image, run this:-    

```bash
docker compose down --rmi all
```

Re-run the following:-    

```bash
docker compose up
```

# How to Use the Project  
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)
## For development
### Installation
- To run it locally, in the oriori root folder, you needed to create a virtual environment in python3:  

```bash
python3 -m venv venv
```

- Run the environment:   

```bash
source venv/bin/activate
```

- Install your necessary project requirements
```bash
pip install -r requirements.txt
```

To start the project, run the following command:   

```bash
sh rundev.sh
```

If the app has no error, it will run the app at [localhost:8080](http://localhost:8080). If there is errors, try to resolve it.

If it still does not work, try to repeat the above steps, or maybe try some other troubleshooting, for example:-  

```bash
python3 manage.py makemigrations
```

(More suggestion to come)

## Running the App
### Normal User
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)  
#### Sign up
When you are in the app, you needed to create a user account if you are a user. 

Click to Sign up.

Fill in your `username` `password` `confirm password` and `email`. Press submit or Enter.

You will be directed to the boarding page and you are all set.

#### Login
When you have a user account, enter your credential `email` and `password`, then press Log in.

You can reset your password by click `reset password`.

#### Navbar
The Navbar is how you navigate the app.

| Nav Icon | Description |
| -------- | ----------- |
| Home | Home page that show all the products the app found in the prefecture user is based. |
| Bookmark | Bookmark page that show all the product user has bookmarked |
| Ticked | The products you have tried are present here |
| Hot | The products that is **HOT** Available right now |
| Search | Search other prefecture for seasonal products | 

#### Menu
The Menu next to the product has the following features:

| product icon | Description |
| ------------ | ----------- |
| Bookmark | Click to save the seasonal products user wanted into the user bookmark page |
| Plus Circle | Click if the user has tried the Icon, and a thumb up icon will appear |
| Thumb up | Refer to Plus Circle Icon. Click if user like or enjoy the product. |
| Share | Call device's share function if available |

#### Setting 
| component | Description |
| --------- | ----------- |
| <- | Back arrow will bring you back to Home page |
| Log out | Log user out from the app |

| component | Description |
| --------- | ----------- |
| Select Prefecture | You can change your prefecture base from the drop down menu |
| Username | If user wish to change their username | 

Click Save will save the change and will direct you back to Home page.  

### Admin User
#### Setting
You can input custom products and remove them. If your account is an admin account, an Add Product Button will be accessable for you. Press it and you will navigate to an add Product Page.

#### Product Page
##### Interface
| Interface | Explaination |
| --------- | ------------ |
| Back | Navigate back to Home Page |
| Input: Product Name | Add Product's Name |
| Input: Link URL | Add Product's URL |
| Input: Image URL | Add Product's Image URL |
| Input: Start Date | Add Product Available Date |
| Input: End Date | Add Product Available End Date |
| MUITransferList | Choose the available prefecture |
| Submit Button | submit your input |

##### Remove Products
WIP

## App

### Server

### Client


# *Credits*  
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)


| Name | Title / Position | GitHub or Social Media  |
| ---- | ---------------- | ----------------------  |
| Joe V. | -TechLeader <br> -DevOps/CI <br> -Team Support | https://github.com/kappanjoe |
| Nicole Boci  | -Product Owner <br> -Fullstack Engineer  <br> -Server  <br> -Data Sourcing | https://github.com/nikobatzi1990 |
| Ikuno Kanasugi  | -Fullstack Engineer  <br> -Data Sourcing  <br> -Database | https://github.com/ikuno815 |
| Chadwick Au | -Fullstack Engineer  <br> -Client Page <br> -UI Components | https://github.com/SirrorsMoore1975 |



# License


MIT License

Copyright (c) 2023 OriOri-CCP7

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)