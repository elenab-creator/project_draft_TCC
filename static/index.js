// Constants for the elements of the index.html file are defined
const helloDiv = document.getElementById("helloDiv");
const giveName = document.getElementById("giveName");
const nameButton = document.getElementById("nameButton");
const nameText = document.getElementById("nameText");
const dateDiv = document.getElementById("dateDiv");
const linksDiv = document.getElementById("linksDiv");
const otherUserDiv = document.getElementById("otherUserDiv");

// Function that takes the input of the nameText textbox (user's name) and adds it to a 
// personalized message, which is then saved in the local storage 
function firstHello(){
    const user = nameText.value;
    localStorage.setItem("username", user);
}

// Function that retrieves the personalized welcome message for a user, who has previously used the app in this browser
function nextHello(){
    const username = localStorage.getItem("username");
    helloDiv.innerText = "Welcome back, " + username + "!";
}

// Function that adds links to the subscriptions list and to the add subscription page
function addLinks(){
    const showSubscriptionsAnchor = document.createElement('a');
    const showSubscriptionsLink = document.createTextNode("Check your subscriptions");
    showSubscriptionsAnchor.appendChild(showSubscriptionsLink);
    showSubscriptionsAnchor.href = "/show_subscriptions"; 
    linksDiv.appendChild(showSubscriptionsAnchor);

    const break1 = document.createElement("br")
    linksDiv.appendChild(break1);
    const empty1 = document.createElement("p")
    linksDiv.appendChild(empty1)

    const addSubscriptionAnchor = document.createElement('a');
    const addSubscriptionLink = document.createTextNode("Add a new subscription");
    addSubscriptionAnchor.appendChild(addSubscriptionLink);
    addSubscriptionAnchor.href = "/add_subscription_page"; 
    linksDiv.appendChild(addSubscriptionAnchor);

    const empty2 = document.createElement("p")
    linksDiv.appendChild(empty2)
}

const signInAnchor = document.createElement('a');

// Function that allows a different user than the one who last accessed the app in one user to sign in
function newUser(){
    const username = localStorage.getItem("username");
    otherUserDiv.innerText = "Not " + username + "? ";
    const signInAnchor = document.createElement('a');
    const signInLink = document.createTextNode("New user sign in");
    signInAnchor.appendChild(signInLink);
    signInAnchor.href = "/";
    otherUserDiv.appendChild(signInAnchor);
    signInAnchor.addEventListener("click", clearUsernameLocalStorage);
}

// Function that clears the local storage
function clearUsernameLocalStorage(){
    localStorage.removeItem("username");
}

// Function that deletes cookie
// function clearUsernameCookie(){
        //document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//}

// Functions that remove the submit name text and button after the user has logged in for the first time
function removeButton(){
    nameButton.parentNode.removeChild(nameButton);
}
function removeTextBox(){
    nameText.parentNode.removeChild(nameText);
}

// Function that adds the date at the time that the user accesses the app
function addTodaysDate(){
    const date = document.createElement("p");
    const today = new Date();
    const todaysDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()
    date.innerText = "Today's date is: " + todaysDate;
    dateDiv.appendChild(date);
}

// The function that will be executed when the user access the user for the first time in one browser
function firstAccess(){
    nameButton.addEventListener("click", firstHello);
    //nameButton.addEventListener("click", nextHello);
    //nameButton.addEventListener("click", removeButton);
    //nameButton.addEventListener("click", removeTextBox);
    //nameButton.addEventListener("click", addTodaysDate);
    //nameButton.addEventListener("click", addLinks);
    //nameButton.addEventListener("click", newUser);
}

// The function that the defines the functions that will be executed in every access of the index page after the first one
function nextAccess(){
    //nextHello();
    //addTodaysDate();  
    //addLinks();
    //newUser();
    //removeButton();
    //removeTextBox();
}

// The following if statement defines which of the above two functions will be executed, 
// depending on whether the user has used the app in this browser before or not
if (localStorage.length === 0){
    firstAccess();
} else if (localStorage.length == 1){
    nextAccess();
} 

