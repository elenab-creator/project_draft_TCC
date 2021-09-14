const dateDiv = document.getElementById("dateDiv")

// Function that adds today's date
function todaysDate(){
    const date = document.createElement("p");
    const today = new Date();
    const todaysDate = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()
    date.innerText = "Today's date is: " + todaysDate; 
    dateDiv.appendChild(date);
}

todaysDate()