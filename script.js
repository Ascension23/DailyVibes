var userName = document.getElementById("inputName");
var userMood = document.getElementById("vibeInput");
var userZodiac = document.getElementById("zodiacInput");
var letsGoButton = document.getElementById("letsGo");

//Add eventlistener for the click on the beginning page form submission:
letsGoButton.addEventListener('click', function(e){
    e.preventDefault();
    var name = userName.value;
    var mood = userMood.value;
    var zodiac = userZodiac.value;
    console.log(name);
    console.log(mood);
    console.log(zodiac);
    //Hide main header and user input form on button click and display dashboard:
    document.getElementById("inputForm").style.display = "none";
    document.getElementById("mainHeader").style.display = "none";
    document.getElementById("dashboard").style.display = "block";


        //Make sure this is the right spot to call all these functions. 
    //zodiacFunction(zodiac) -- pass in the input from the user selection somehow
    //catFunction
    //dogFunction
    //musicFunction
    //quoteFunction
    

    //Set search bar back to default:
    document.querySelector('#inputName').value = '';
});

document.getElementById("dashboard").style.display = "none";




//Pseudo Code:
//1. Write the funtion for the API call to match the input for the chosen zodiac sign. Example:
//funtion zodiacFunction(zodiac){

    //API call here -- will need if statements within the API call to match the selected zodiac to the correct zodiac API. 
    //Is there a general API call to get all 12 zodiacs, then pull the selected choice from that array instead of having 12
    //API calls???

//};


//2. Write the function for the music call here: 
//Playlist will be determined by the user mood choice

//3. Function for the quote of the day

//4. Function for the API calls for the dog and cat pics

