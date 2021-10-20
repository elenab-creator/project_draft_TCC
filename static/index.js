// Constants for the elements of the index.html file are defined
const nameText = document.getElementById("nameText");
const nameButton = document.getElementById("nameButton");

// Function that takes the input of the nameText textbox (user's name) and adds it to a 
// personalized message, which is then saved in the local storage 
function usernameLocalStorage(){
    const user = nameText.value;
    localStorage.setItem("username", user);
}

// The function that will be executed when the user access the user for the first time in one browser
function firstAccess(){
    nameButton.addEventListener("click", usernameLocalStorage);
}

// The following if statement defines which of the above two functions will be executed, 
// depending on whether the user has used the app in this browser before or not
if (localStorage.length === 0){
    firstAccess();
} 

