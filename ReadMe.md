<h1 align="center"> WE4A Blog Project </h1>

# Technologies used

This website was done using : 

- `HTML` and `CSS`, `Javascript` for the frontend
- `PHP 7.0.3` for the backend

This site follows the [client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) which allows for a greater flexibility and scalability during development.

# Installation 

# Code architecture overview

## Frontend

The frontend is separated in 3 folders : 

The `pageScripts/` folder contains the main scripts of the pages.

The `templates/` folder contains the elements that will compose the pages. 

A template element follows this code structure : 

```javascript

//Import some services 

function generateXXXXX (){
  // Do some pre-processing of data 
  
  // Return the string defining html element 
  return (`<div></div>`);
}

function activeXXXXX () {
  // Give actions to buttons and other UI elements
}

export { generateXXXXX, activeXXXXX }; 
```

The string generated will then be injected inside the main html page using .innerHtml property. Using innertHtml can lead to security issues if not used properly (see more [here](#security))

The `service/` folder contains the differents files with the functions that will communicate with the server (mostly returning promises of the json server response)  

## Backend

The backend contains differents routes. 

The `manageXXXX.php` routes contains the functions to INSERT/CREATE/DELETE the sql database.

The `getXXXX.php` routes contains the functions to SELECT from the database.

# Security 

As this site is not aiming to be deployed online the security is pretty basic. The main threat considered here is the user input. To prevent the user from injecting malicious code into the client's page a few securities have been implemented : 

<ins> SQL Injections </ins> : To prevent the user from injecting malicious sql query and corrupting our database we make sure to neutralise the ' character.

<ins> Cross Site Scripting </ins> : To prevent the user from injecting malicious javascript code inside their post/names we remove every html tag present in a user query. This is mainly because setting .innerHTML may executes an user code that could be harmful to the client loading the post.

<ins> Password saved inside database </ins> : To make sure the passwords of the user are not saved in plain text inside the database, we encrypt the password using php built-in functions. 

# Installation 

If you want to try this site out you have to : 

- Clone this repository and extract it on your pc
- Start a local server using a software like Uwamp/Xampp to make the backend works
- Use the .sql file to install the database
- Open the `index.html` file in your favorite web browser

# Functionalities implemented

Using this website you can : 

- Create an account and login.
- Post messages that can contain an image (with the format .png, .jpeg, .jpg, .gif). You are also able to format your messages using special characters (see more [here](#text-formatting))  
- You can like messages.
- You can repost messages. (They will appear on your profile page). 
- You can follow other users. (They will appear on your profile page).
- You can upload an avatar picture for your account. (Go on your profile page and click on your avatar) 
- When you get to the bottom of your feed you can click on `next page`/`previous page` to show the next/previous 10 posts

# Text formatting 

-  **bold text** : `**bold text**`
- ~~striked text~~ : `~~striked text~~`
- <ins> underlined text </ins> : `__underlined text__`
- [text with link](https://www.example.com/) : `[text with link](https://www.example.com/)`
- *italic text* : `##italic text##`

Bonus effect: you can make your text be rainbow with : `--r[text]--`
