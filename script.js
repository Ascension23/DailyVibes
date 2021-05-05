var userName = document.getElementById("inputName");
var userMood = document.getElementById("vibeInput");
var userZodiac = document.getElementById("zodiacInput");
var letsGoButton = document.getElementById("letsGo");
var cityName = document.querySelector("#cityName");
var landingPageBg = document.querySelector("#landingPageBg"); //landing page background
var now = moment();
var chillPlaylist = document.getElementById("chill");
var irritatedPlaylist = document.getElementById("irritated");
var energeticPlaylist = document.getElementById("energetic");
var downcastPlaylist = document.getElementById("downcast");
var personalMessageArray = [
  {
    irritated: {
      0: ", take five, you've got this!",
      1: ", it's okay to take a step back.",
      2: ", jot down your thoughts, it's okay to be upset!",
    },
    chill: {
      0: ", keep on vibing!",
      1: ", enjoy today!",
      2: ", relax, you've earned it!",
    },
    energetic: {
      0: ", your energy is contagious!",
      1: ", there's no time like the present!",
      2: ", let's get going!",
    },
    downcast: {
      0: ", don't give up, you're awesome!",
      1: ", each day is a new beginning!",
      2: ", you are loved, and you are enough!",
    },
  },
];

document.getElementById("dashboard").style.display = "none";

//Add eventlistener for the click on the beginning page form submission:
letsGoButton.addEventListener("click", function (e) {
  e.preventDefault();
  var name = userName.value;
  var mood = userMood.value;
  var zodiac = userZodiac.value;
  var cityInput = cityName.value;

  // console.log(name);
  // console.log(mood);
  // console.log(zodiac);
  //Hide main header and user input form on button click and display dashboard:
  document.getElementById("inputForm").style.display = "none";
  document.getElementById("mainHeader").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  landingPageBg.classList.add("hide");

  //Print the date to the page:
  var currentDay = now.format("MMM DD, YYYY");
  document.getElementById("currentDay").textContent = currentDay;

  //Get a random integer to use for the personalized message:
  var arrayIndex = Math.floor(Math.random() * 3);

  if (mood == "Irritated") {
    //Random personalized message based on mood from the array:
    document.getElementById("personalizedMessage").textContent =
      name + personalMessageArray[0].irritated[arrayIndex];
    //Music playlist based on mood:
    irritatedPlaylist.style.display = "block";
    document.getElementById("userVibe").textContent =
      "Rock music to fit your irritated vibe!";
    // Change background based on mood:
    document.body.style.backgroundImage =
      "URL('./Assets/pexels-quang-nguyen-vinh-2131801.jpg')";
    // getWallpaper();
    document.body.style.color = "white";
  }
  if (mood == "Chill") {
    //Random personalized message based on mood from the array:
    document.getElementById("personalizedMessage").textContent =
      name + personalMessageArray[0].chill[arrayIndex];
    //Music playlist based on mood:
    chillPlaylist.style.display = "block";
    document.getElementById("userVibe").textContent =
      "Lofi for your chill vibe!";
    // Change background based on mood:
    document.body.style.backgroundImage =
      "URL('./Assets/pexels-martin-damboldt-814499.jpg')";
    // getWallpaper();
    document.body.style.color = "white";
  }
  if (mood == "Energetic") {
    //Random personalized message based on mood from the array:
    document.getElementById("personalizedMessage").textContent =
      name + personalMessageArray[0].energetic[arrayIndex];
    //Music playlist based on mood:
    energeticPlaylist.style.display = "block";
    document.getElementById("userVibe").textContent =
      "A party playlist to fit your energetic vibe!";
    // Change background based on mood:
    document.body.style.backgroundImage =
      "URL('./Assets/pexels-pixabay-206359.jpg')";
    // getWallpaper();
    document.body.style.color = "white";
  }
  if (mood == "Downcast") {
    //Random personalized message based on mood from the array:
    document.getElementById("personalizedMessage").textContent =
      name + personalMessageArray[0].downcast[arrayIndex];
    //Music playlist based on mood:
    downcastPlaylist.style.display = "block";
    document.getElementById("userVibe").textContent =
      "Emo music to fit your downcast vibe!";
    // Change background based on mood:
    document.body.style.backgroundImage =
      "URL('./Assets/pexels-kyle-roxas-2138922.jpg')";
    // getWallpaper();
    document.body.style.color = "white";
  }
  //Quote Call
  getQuoteApi();

  //Weather API Call:
  //Use geocoding API to convert city name into coordinates:
  var geocodeapiURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput +
    "&appid=4e9dab74dadddaa9b893280c60fbd5eb";

  fetch(geocodeapiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (geocode) {
        //Set the longitude and latitude variables and then call the weather function:
        var lat = geocode[0].lat;
        var long = geocode[0].lon;
        getCurrentWeather(cityInput, lat, long);
      });
    }
  });

  //Set search bar back to default:
  document.querySelector("#inputName").value = "";
  document.querySelector("#cityName").value = "";

  //Comment - var sign is going to equal the userZodiac.value split at just the zodiac name, which is the first word.
  //Try parse, or google how to split out first word. Week 6 activity 8 and 10.
  var zodiacArray = zodiac.split(" ");
  console.log(zodiacArray); //Working!
  var sign = zodiacArray[0];
  console.log(sign); //Working!
  getZodiac(sign);
  document.getElementById("horoscopeSign").textContent = "Dear " + sign + ",";
});
document.querySelector("#inputName").value = "";

//Function for the quote of the day
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

//Weather API:
//Create the current weather funtion for the API call:
var getCurrentWeather = function (cityInput, lat, long) {
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
      response.json().then(function (data) {
        displayCurrentWeather(cityInput, data);
      });
    }
  });
};

function displayCurrentWeather(cityInput, array) {
  //Create the City Name heading:
  var cityName = cityInput + " ";
  var curEmoji = array.current.weather[0].icon;
  document.querySelector("#city").textContent = cityName;
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + curEmoji + "@2x.png"
    );

  //Create the temp variable and dynamically add it to the page:
  var temp = array.current.temp + " °F";
  document.getElementById("temp").textContent = temp;
}

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

// Commented out - errors with too many requests
// Create dynamic wallpaper:
var getWallpaper = function () {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 8a4fad9f70ab2c2baf42415ee4ac88e1ebbbd653"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch("https://api.imgur.com/3/album/JnI5N/images/", requestOptions)
    .then((response) => response.json())
    // console.log(response)
    .then((result) => {
      // console.log(result.data)
      console.log(result.data[Math.floor(Math.random() * 32)].link);
      var wallpaper = result.data[Math.floor(Math.random() * 32)].link;
      document.body.style.backgroundImage = `url(${wallpaper})`;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
