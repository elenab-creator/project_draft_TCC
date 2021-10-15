// Constants for the elements of the index.html file are defined
const helloDiv = document.getElementById("helloDiv")
const giveName = document.getElementById("giveName")
const nameButton = document.getElementById("nameButton");
const nameText = document.getElementById("nameText");
const dateDiv = document.getElementById("dateDiv");
const remindersDiv = document.getElementById("remindersDiv");
const remindersTitleDiv = document.getElementById("remindersTitleDiv");

// Function that takes the input of the nameText textbox (user's name) and adds it to a 
// personalized message, which is then saved in the local storage 
function firstHello(){
    helloDiv.innerText = "Welcome back, " + nameText.value;
    const welcomeMessage = "Welcome back, " + nameText.value;
    localStorage.setItem("welcomeMessage", welcomeMessage);
}

// Function that retrieves the personalized welcome message for a user, who has previously used the app in this browser
function nextHello(){
    const welcomeMessage = localStorage.getItem("welcomeMessage");
    helloDiv.innerText = welcomeMessage;
}

// Functions that remove the submit name text and button after the user has logged in for the first time
function removeButton(){
    giveName.removeChild(nameButton);
}
function removeTextBox(){
    giveName.removeChild(nameText);
}

// Function that adds the date at the time that the user accesses the app
function addTodaysDate(){
    const date = document.createElement("p");
    const today = new Date();
    const todaysDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()
    date.innerText = "Today's date is: " + todaysDate;
    dateDiv.appendChild(date);
}

// Function that adds links to the subscriptions list and to the add subscription page
function addLinks(){
    const showSubscriptionsAnchor = document.createElement('a');
    const showSubscriptionsLink = document.createTextNode("Check your subscriptions");
    showSubscriptionsAnchor.appendChild(showSubscriptionsLink);
    showSubscriptionsAnchor.href = "/show_subscriptions"; 
    document.body.appendChild(showSubscriptionsAnchor);

    const break1 = document.createElement("br")
    document.body.appendChild(break1);
    const empty = document.createElement("p")
    document.body.appendChild(empty);

    const addSubscriptionAnchor = document.createElement('a');
    const addSubscriptionLink = document.createTextNode("Add a new subscription");
    addSubscriptionAnchor.appendChild(addSubscriptionLink);
    addSubscriptionAnchor.href = "/add_subscription_page"; 
    document.body.appendChild(addSubscriptionAnchor);
}

// function addReminders(){
//      const remindersTitle = document.createElement("p");
//      remindersTitle.innerText = "Reminders!";
//      remindersTitleDiv.appendChild(remindersTitle);
//      const reminder = document.createElement("p");
//      reminder.href = "/show_reminders";
//      reminder.innerText = "$$REMINDERS$$";
//      remindersDiv.appendChild(reminder);
// }

// The function that will be executed when the user access the user for the first time in one browser
function firstAccess(){
    nameButton.addEventListener("click", firstHello);
    nameButton.addEventListener("click", nextHello);
    nameButton.addEventListener("click", removeButton);
    nameButton.addEventListener("click", removeTextBox);
    nameButton.addEventListener("click", addTodaysDate);
    nameButton.addEventListener("click", addLinks);
    nameButton.addEventListener("click", addReminders);
}

// The function that the defines the functions that will be executed in every access of the index page after the first one
function nextAccess(){
    nextHello()
    removeButton()
    removeTextBox();
    addTodaysDate();
    addLinks();
    addReminders();
}

// The following if statement defines which of the above two functions will be executed, 
// depending on whether the user has used the app in this browser before or not
if (localStorage.length == 0){
    firstAccess();
} else if (localStorage.length == 1){
    nextAccess();
} 

