var userName = document.getElementById("inputName");
var userMood = document.getElementById("vibeInput");
var userZodiac = document.getElementById("zodiacInput");
var letsGoButton = document.getElementById("letsGo");
var now = moment();
// var personalMessageArray = [{},{},{},{}];

//Create the zodiac variables:
var Scorpio = "Scorpio";

//Add eventlistener for the click on the beginning page form submission:
letsGoButton.addEventListener("click", function (e) {
  e.preventDefault();
  var name = userName.value;
  var mood = userMood.value;
  var zodiac = userZodiac.value;

  //Comment - var sign is going to equal the userZodiac.value split at just the zodiac name, which is the first word.
  //Try parse, or google how to split out first word. Week 6 activity 8 and 10.

  console.log(name);
  console.log(mood);
  console.log(zodiac);
  //Hide main header and user input form on button click and display dashboard:
  document.getElementById("inputForm").style.display = "none";
  document.getElementById("mainHeader").style.display = "none";
  document.getElementById("dashboard").style.display = "block";

  //Print the date to the page:
  var currentDay = now.format("MMM DD, YYYY");
  document.getElementById("currentDay").textContent = currentDay;

  //Print personalized message to user based on mood:
  if (mood == "Irritated") {
    console.log("Don't be upset!");
    document.getElementById("personalizedMessage").textContent =
      name + ", it's okay to take a step back!";
  }
  if (mood == "Chill") {
    document.getElementById("personalizedMessage").textContent =
      name + ", keep on vibing!";
  }
  if (mood == "Joyful") {
    document.getElementById("personalizedMessage").textContent =
      name + ", your happiness is contagious!";
  }
  if (mood == "Downcast") {
    document.getElementById("personalizedMessage").textContent =
      name + ", don't give up! Each day is a new beginning.";
  }

  // //Weather API Call:
  // var searchInput = document.querySelector('#searchBar').value;
  // //Use geocoding API to convert city name into coordinates:
  // var geocodeapiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + '&appid=4e9dab74dadddaa9b893280c60fbd5eb';

  // fetch(geocodeapiURL).then(function(response){
  //     if(response.ok){
  //         response.json().then(function(geocode){
  //             //Set the longitude and latitude variables and then call the weather function:
  //             var lat = geocode[0].lat;
  //             var long = geocode[0].lon;
  //             getCurrentWeather(searchInput, lat, long);
  //         });
  //     }
  // });

  //Set search bar back to default:
  document.querySelector("#inputName").value = "";

  //run quote
  getQuoteApi();
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
function getQuoteApi() {
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0665350332msh1985abd708cb901p1e779fjsn146d8777e84f",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      document.getElementById("quote").innerHTML = "'" + response.content + "'";
      console.log(quote);
      document.getElementById("quoteAuthor").innerHTML =
        "- " + response.originator.name;
    })
    .catch((err) => {
      console.log(err);
    });
}

var fetchButton = document.getElementById("quoteBtn");
fetchButton.addEventListener("click", getQuoteApi);

var getAries = function () {
  fetch("https://devbrewer-horoscope.p.rapidapi.com/today/short/Aries", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9c3068ce65msha6850c71271b7fcp1522ebjsn97a0e9da5d54",
      "x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    // console.log(response)
    .then((data) => {
      console.log(data);
      var signHoroscope = data.Aries.Today;
      console.log(signHoroscope);
      document.getElementById("horoscopeText").textContent = signHoroscope;
    })
    .catch((err) => {
      console.error(err);
    });
  // "https://devbrewer-horoscope.p.rapidapi.com/today/short/" + zodiac;
  //https://devbrewer-horoscope.p.rapidapi.com/today/short/Cancer"
};

var getZodiac = function (sign) {
  fetch("https://devbrewer-horoscope.p.rapidapi.com/today/short/" + sign, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9c3068ce65msha6850c71271b7fcp1522ebjsn97a0e9da5d54",
      "x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    // console.log(response)
    .then((data) => {
      console.log(sign);
      console.log(data);
      //When you assign a part of an onject a variable, need to use bracket notation instead of dot notation.
      console.log(data[sign]);

      var signHoroscope = data[sign].Today;
      console.log(signHoroscope);
      document.getElementById("horoscopeText").textContent = signHoroscope;
    })
    .catch((err) => {
      console.error(err);
    });
  // "https://devbrewer-horoscope.p.rapidapi.com/today/short/" + zodiac;
  //https://devbrewer-horoscope.p.rapidapi.com/today/short/Cancer"
};

getZodiac(Scorpio);
//TEST

//Weather API:
//Create the current weather funtion for the API call:
var getCurrentWeather = function (searchInput, lat, long) {
  //passing in city, which will be the user input when this function is called in the search submit function.
  //Parameters are the long and lat from geocode API, excluded data, units = imperial, and the individual API key code.
  var apiURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&exclude=minutely,hourly,alerts&units=imperial&appid=4e9dab74dadddaa9b893280c60fbd5eb";

  fetch(apiURL).then(function (response) {
    //fetching the API with a promise.
    if (response.ok) {
      response.json().then(function (data) {});
    }
  });
};

//API calls for Cat and Dog Pictures:
var dogImage = document.getElementById("dogImg");
var catImage = document.getElementById("catImg");

//Create the function that will run on dog image click:
function randomDog(event) {
  event.preventDefault();

  //Use geocoding API to convert city name into coordinates:
  var dogapiURL = "https://dog.ceo/api/breeds/image/random";

  fetch(dogapiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (dog) {
        //change the src of the HTML image with the content from the API object:
        dogImage.src = dog.message;
      });
    }
  });
}

//Create the function that will run on cat image click:
function randomCat(event) {
  event.preventDefault();

  //Use geocoding API to convert city name into coordinates:
  var catapiURL = "https://api.thecatapi.com/v1/images/search/";

  fetch(catapiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (cat) {
        console.log(cat);
        //change the src of the HTML image with the content from the API object:
        catImage.src = cat[0].url;
      });
    }
  });
}

dogImage.addEventListener("click", randomDog);
catImage.addEventListener("click", randomCat);

//some random text
