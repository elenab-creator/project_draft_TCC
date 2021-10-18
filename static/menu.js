// Constants for the elements of the index.html file are defined
const helloDiv = document.getElementById("helloDiv");
const dateDiv = document.getElementById("dateDiv");
const linksDiv = document.getElementById("linksDiv");
const otherUserDiv = document.getElementById("otherUserDiv");

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

// Function that clears the local storage
function clearUsernameLocalStorage(){
    localStorage.removeItem("username");
}

// Function that deletes cookie
function clearUsernameCookie(){
    document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function that allows a different user than the one who last accessed the app in one user to sign in
function newUser(){
    const username = localStorage.getItem("username");
    otherUserDiv.innerText = "Not " + username + "? ";
    const signInAnchor = document.createElement('a');
    const signInLink = document.createTextNode("Sign in");
    signInAnchor.appendChild(signInLink);
    signInAnchor.href = "/";
    otherUserDiv.appendChild(signInAnchor);
    signInAnchor.addEventListener("click", clearUsernameLocalStorage);
    signInAnchor.addEventListener("click", clearUsernameCookie);
}

// Function that adds the date at the time that the user accesses the app
function addTodaysDate(){
    const date = document.createElement("p");
    const today = new Date();
    const todaysDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()
    date.innerText = "Today's date is: " + todaysDate;
    dateDiv.appendChild(date);
}

nextHello()
addTodaysDate()
addLinks()
newUser()


