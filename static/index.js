// Constants for the elements of the index.html file are defined
const helloDiv = document.getElementById("helloDiv")
const giveName = document.getElementById("giveName")
const nameButton = document.getElementById("nameButton");
const nameText = document.getElementById("nameText");

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

// Functions that remove the submit name text and button after the user has logged in the first time
function removeButton(){
    giveName.removeChild(nameButton);
}
function removeTextBox(){
    giveName.removeChild(nameText);
}

// Function that adds today's date
function addTodaysDate(){
    const date = document.createElement("p");
    const today = new Date();
    const todaysDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()
    date.innerText = "Today's date is: " + todaysDate;
    document.body.appendChild(date);
}

// Function that adds links to the subscriptions list, to the add subscription and the index html page
function addLinks(){
    const showSubscriptionsAnchor = document.createElement('a');
    const showSubscriptionsLink = document.createTextNode("Check your subscriptions");
    showSubscriptionsAnchor.appendChild(showSubscriptionsLink);
    showSubscriptionsAnchor.href = "/show_subscriptions"; 
    document.body.appendChild(showSubscriptionsAnchor);

    const break1 = document.createElement("br")
    document.body.appendChild(break1);

    const addSubscriptionAnchor = document.createElement('a');
    const addSubscriptionLink = document.createTextNode("Add another subscription");
    addSubscriptionAnchor.appendChild(addSubscriptionLink);
    addSubscriptionAnchor.href = "/add_subscription"; 
    document.body.appendChild(addSubscriptionAnchor);

    const break2 = document.createElement("br")
    document.body.appendChild(break2);

    const homepageAnchor = document.createElement('a');
    const homepageLink = document.createTextNode("Homepage");
    homepageAnchor.appendChild(homepageLink);
    homepageAnchor.href = "/"; 
    document.body.appendChild(homepageAnchor);
}

// Function that sets the reminders for subscriptions that are about to be renewed
// !! TO DO 1. Message remindersTitle should appear only when a renewal of one or more subscriptions happens in <= 7 days
// !! TO DO 2. Message reminder should appear for each subscription that renews in <= 7 days
// !! TO DO 3. Name, last day of subscription, date of renewal of subscription gets obtained by the txt file
function addReminders(){
    const remindersTitle = document.createElement("p");
    remindersTitle.innerText = "Reminders!";
    document.body.appendChild(remindersTitle);
    const reminder = document.createElement("p");
    reminder.innerText = "Your x subscription renews in y days (xx.xx.xxxx). You can cancel it until xx.xx.xxxx -1.";
    document.body.appendChild(reminder);
}


function firstAccess(){
    firstHello();
    nameButton.addEventListener("click", nextHello);
    nameButton.addEventListener("click", removeButton);
    nameButton.addEventListener("click", removeTextBox);
    nameButton.addEventListener("click", addTodaysDate);
    nameButton.addEventListener("click", addLinks);
    nameButton.addEventListener("click", addReminders);
}


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

