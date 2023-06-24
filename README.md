# ORIORI

![Updated](https://img.shields.io/static/v1?label=updated&message=June%2024th%202023&color=388E3C&style=flat-square)  

![GitHub](https://img.shields.io/github/license/oriori-ccp7/oriori?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/oriori-ccp7/oriori?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/oriori-ccp7/oriori?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/oriori-ccp7/oriori?style=flat-square)



Deployment: [oriori.fly.dev](https://oriori.fly.dev)  

## Project's Description ##
<u>四季折々 'しきおりおり' - ORIORI</u> 

- What is Oriori?  
Oriori is a tracking tool for seasonal and regional goods in Japan.
Japanese phrase <i>shikioriori</i>, meaning <i>‘from season to season’</i>

- Why use Oriori?  
Did you ever wondered what different seasonal products are there, when are they available, are they available on your near-by neightbourhood area? Did you ever have some seasonal products that you wanted to share with your friends? Have you planed on going further away from your home town and look for some seasonal products that is only available on a particular area? Look no further, we got you covered!

- Tech used and why?  

- Challenges faced and how we over come them

- Future implementation

# Index 
* Go to section  
0. [ORIORI](#oriori)
1. [How to Install and Run the Project](#How-to-Install-and-Run-the-Project)  
2. [.env](#env)  
    1. [.env at folder oriori](#env-at-folder-oriori)  
        1. [SECRET_KEY](#secret_key)  
        2. [DEBUG](#debug)  
        3. [DATABASE_URL](#database_url)  
    2. [.env at folder oriori/client](#env-at-foler-orioriclient)  
    3. [Docker](#for-docker)  
3. [How to Use the Project](#how-to-use-the-project)
    1. [Development](#development)
        1. [Installation](#installation)  
        2. [Running the App](#running-the-app)
    2. [App](#app)    
4. [Credits](#credits)    
5. [License](#license)    

# How to Install and Run the Project 

Run the following essential seeds for the apps to run:

```bash
python3 manage.py loaddata 001_Locations.json 
python3 manage.py loaddata 004_Products.json
```

-Alternatively, you can open `runseed.sh` in the root directory and edit skipindices to omit some entry in the list, just **DO NOT RUN** it yet.  

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

## .env at folder oriori
- You also needed two `.env` file in the following location:

- in the `oriori` root directory
- in the `oriori/client` directory

The `.env.example` provided gives you an example on how to use the `.env` in your root directory, as well as in the `oriori/client` folder. You needed to set the following in order for the app to run properly.
```
SECRET_KEY=
DEBUG=
DATABASE_URL=
```

### SECRET_KEY
You needed to create a secret key for your team or yourself if you work for MVP:
https://codinggear.blog/django-generate-secret-key/#generate-secret-key-in-django-using-getrandomsecretkeynbspfunction

### DEBUG 
Set it to equal to `True` or `False`

### DATABASE_URL

```
DATABASE_URL=postgres://[YOUR_USERNAME]:[YOUR_PASS]@localhost:5432/[YOUR_DB_NAME]
```

1. The oriori root directory is for credential using `postgres` database locally. 
1. If you did not have postgres installed in your system, please install it. 
1. Check how your system install and run postgres.   

You will need the following three variables:
- postgres's username at `YOUR_USERNAME` (usually is postgres)
- postgres's password at `YOUR_PASS`
- the oriori database postrgres going to use at `YOUR_DB_NAME`

Once you have postgres installed, enter by using: 
```
psql -U
```
At postgres create a database:
```psql
CREATE DATABASE oriori
``` 
## .env at foler oriori/client
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)

- `.env` at `oriori/client`  

You will needed to register firebase and create necessary API KEY for this to run, you will be given the following details to fill out the below required fields. A `.env.example` file has already prepared inside `oriori/client` folder:-

```
REACT_APP_API_KEY=
REACT_APP_FB_AUTH_DOMAIN=
REACT_APP_FB_PROJECT_ID=
REACT_APP_FB_STORAGE_BUCKET=
REACT_APP_FB_MESSAGING_SENDER_ID=
REACT_APP_FB_APP_ID=
REACT_APP_FB_DB_URL=
```

NB: Make sure you exclude both `.env` file from your `.gitignore`, this data should be keep off from your git pull.  

## For Docker

Install Docker in your respective desktop environment (MacOs, Windows, Linux, etc)  
Download [Docker](https://www.docker.com/)  
Run the following command to make oriori start in a virtual environment provided by docker  

```bash
docker compose up
```

Once your codes are updated, you will wanted to purge the previous image, run:  

```bash
docker compose down --rmi all
```

Re-run:  

```bash
docker compose up
```

# How to Use the Project  
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

- Install your necessary project requirements (if a requirements file exist)
```bash
pip install -r requirements.txt
```

To make migration from mange.py
```bash
python3 manage.py makemigrations
```

To start the project, run the following command:   

```bash
sh rundev.sh
```

If the app has no error, it will run the app at [localhost:8080](http://localhost:8080). If there is errors, try to resolve it.

## Running the App
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)
### Sign up
When you are in the app, you needed to create a user account if you are a user. 

Click to Sign up.

Fill in your `**username**` `**password**` `**confirm password**` and `**email**`. Press submit or Enter.

You will be directed to the boarding page and you are all set.

### Login
When you have a user account, enter your credential `email` and `password`, then press Log in.

You can reset your password by click `reset password`.

### Navbar
The Navbar is how you navigate the app.

| Nav Icon | Description |
| -------- | ----------- |
| Home | Home page that show all the products the app found in the prefecture user is based. |
| Bookmark | Bookmark page that show all the product user has bookmarked |
| Ticked | The products you have tried are present here |
| Hot | The products that is **HOT** Available right now |
| Search | Search other prefecture for seasonal products | 

### Menu
The Menu next to the product has the following features:

| product icon | Description |
| ------------ | ----------- |
| Bookmark | Click to save the seasonal products user wanted into the user bookmark page |
| Plus Circle | Click if the user has tried the Icon, and a thumb up icon will appear |
| Thumb up | Refer to Plus Circle Icon. Click if user like or enjoy the product. |
| Share | Call device's share function if available |

### Setting 
| component | Description |
| --------- | ----------- |
| <- | Back arrow will bring you back to Home page |
| Log out | Log user out from the app |

#### Normal User
| component | Description |
| --------- | ----------- |
| Select Prefecture | You can change your prefecture base from the drop down menu |
| Username | If user wish to change their username | 

Click Save will save the change and will direct you back to Home page.  

#### Admin User
You can input custom post and remove them in this menu. 

## App

# *Credits*  
[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)


| Name | Title / Position | GitHub  |
| ---- | ---------------- | ------- |
| Joseph Van Alstyne | -TechLeader <br> -DevOps/CI <br> -Team Support | https://github.com/kappanjoe |
| Nicole Boci  | -Product Owner <br> -Fullstack Engineer  <br> -Server  <br> -Data Sourcing | https://github.com/nikobatzi1990 |
| Ikuno Kanasugi  | -Fullstack Engineer  <br> -Data Sourcing  <br> -Database | https://github.com/ikuno815 |
| Chadwick Au | -Fullstack Engineer  <br> -Client Page <br> -UI Components | https://github.com/SirrorsMoore1975 |



# License


MIT License

Copyright (c) 2023 OriOri-CCP7

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Back to top](https://img.shields.io/badge/Back%20to%20top-lightgrey?style=flat-square)](#index)