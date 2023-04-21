<h1 align="center"> WE4A Blog Project </h1>

# Technologies used

This website was done using : 

- `HTML` and `CSS`, `Javascript` for the frontend
- `PHP 7.0.3` for the backend

This site follows the [client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) which allows for a greater flexibility and scalability during development.

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

The backend contains differents routes 

# Security 
# Functionalities implemented

Using this website you can : 

- Create an account or login.
- Post messages that can contain an image (with the format .png, .jpeg, .jpg, .gif). You are also able to format your messages using special characters (see more [here](#text-formatting))  
- You can like messages.
- You can repost messages. (They will appear on your profile page). 
- You can follow other users. (They will appear on your profile page).
- You can upload an avatar picture for your account. (Go on your profile page and click on your avatar) 

# Text formatting 

-  **bold text** : `**bold text**`
- ~~striked text~~ : `~~striked text~~`
- [text with link](https://www.example.com/) : `[text with link](https://www.example.com/)`
- *italic text* : `##italic text##`
