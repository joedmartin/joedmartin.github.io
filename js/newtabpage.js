const NUM_PICTURES = 45; // The number of background images
const USER_NAME = "Joe"; // The name you want displayed.
const CITY_ZIPCODE = "19148"; // The zipcode for which you want the have the weather displayed.

// On load function, sets background image and greeting text. Animates page load with opacity and movement. Calls clock and weather functions.
$(document).ready(function() {
	document.getElementById('mainContainer').style.backgroundImage  = 'url("./images/backgrounds/image_' + Math.floor((NUM_PICTURES + 1) * Math.random()) + '.jpg';
	document.getElementById('welcomeMessage').innerHTML = String(phrases[Math.floor(phrases.length * Math.random())]);
	$('#greetingContainer').animate({opacity:'1'},{queue:false,duration:800});
	$('#mainContainer').animate({opacity:'1'},{queue:false,duration:1000});
	$('#bookmarkContainer').animate({opacity:'1'},{queue:false,duration:1500});
	$('#footerContainer').animate({opacity:'1'},{queue:false,duration:1500});
	updateTimeAndDate();
	fetchWeather();
});

// Function for getting the time and date data and updating every second.
var toggle = true;
function updateTimeAndDate() {
	$('#colon').animate({opacity: toggle?"-=1":"+=1"}, 500);
	if(toggle == true) {
		// Create a new date object.
		var timeAndDate = new Date();
		// Reference arrays for the days of the week and months of the year.
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		// Sets the date by getting the literal day of the week, month, numeric date, and year from the date object.
		// Get the current time in hours and minutes from the date object. The "getTime()" function converts from 24 to 12 hour format as well as adds the AM/PM suffixes.
		document.getElementById("hour").innerHTML = formatHours(timeAndDate.getHours());
		document.getElementById("minute").innerHTML = formatMinutes(timeAndDate.getHours(), timeAndDate.getMinutes().toString());
		document.getElementById("date").innerHTML = days[timeAndDate.getDay()] + ", " + months[timeAndDate.getMonth()] + " " + timeAndDate.getDate();
	}
	toggle=!toggle;
	// Sets a timeout so that the function will be called and the time/date updated every second.
	setTimeout(updateTimeAndDate, 500);
}

// Helper function to format hours in 12-hour style.
function formatHours(hours) {
	if (hours > 12) {
		return hours - 12;
	} else if (hours == 0) {
		return "12";
	} else {
		return hours.toString();
	}
}

// Helper function to format minutes and add on am/pm identifier.
function formatMinutes(hours, minutes) {
	minutes = minutes.padStart(2, '0')
	if (hours < 12) {
		return (minutes + " AM");
	} else {
		return (minutes + " PM");
	}
}

// Greeting phrases
var phrases = [
	['Suppp'],
	['Good to see you again!'],
	['Welcome back! ' + USER_NAME + '!'],
	['How\'s it going, ' + USER_NAME + '?'],
	['Hello again, ' + USER_NAME + '!'],
	['Yo, my guy.'],
	['Hi, ' + USER_NAME + '!'],
	['How goes it, ' + USER_NAME + '?'],
	['Suhhh dude?'],
	['How you doin\'?'],
	['Hello there.'],
	['Hey boo.'],
	['What’s cookin’?'],
	['*Hat tip*'],
	['Good day sir.'],
	['What\'s new?'],
	['How\'s life?'],
	['How do you do?'],
	['Howdy partner.'],
	['What\'s the haps?'],
	['How have ya been?'],
	['Nice to see you!'],
	['G\'day mate!']
];

// Function for fetching the weather information and updating every minute.
function fetchWeather(){
	// OpenWeatherMap is the service being used for the weather data fetching. Currently, the api call is hardcoded with my (Joe Martin) free API key.
	// Documentation on the API call being used: https://openweathermap.org/current
	var URL = "https://api.openweathermap.org/data/2.5/weather?zip=" + CITY_ZIPCODE + "&appid=12d853a64bb392966651a92c1935a587&units=imperial";
		$.ajax({
			type: "GET",
			url : URL,
			dataType : "jsonp",
			success : function(msg){
				// Create a new date object.
				var dateOne = new Date();
				// Create a new variable to store the current time with the 3 last digits cut off cause idk what they do..but it works.
				var currentTime = parseInt(((dateOne.getTime()).toString()).slice(0, -3))
				// Checks if it is day. Compares the current time to the sunrise and sunset times.
				if (currentTime > msg.sys.sunrise && currentTime < msg.sys.sunset) {var isDay = true;}
				else {var isDay = false;}
				// Set temperature (in fahrenheit)
				document.getElementById('temperature').innerHTML = Math.round(msg.main.temp) + "&#xb0;F</p>";
				// Checks the current weather condition description from the weather object and selects which weather icon should be displayed.
				// Each condition has its own icon (except for 'Atmosphere' which uses clear because what does Atmosphere even mean?)
				// Also, if it is night/day the icons will be changed accordingly.
				// If none of the conditions are matched, a blank image will be displayed.
				if (msg.weather[0].main == "Rain") {document.getElementById('weatherIcon').src = "./images/weather/Rain.png";;}
				else if (msg.weather[0].main == "Thunderstorm") {document.getElementById('weatherIcon').src = "./images/weather/Thunderstorm.png";;}
				else if (isDay == true){
					if (msg.weather[0].main == "Clear") {document.getElementById('weatherIcon').src = "./images/weather/Clear.png";;}
					else if (msg.weather[0].main == "Atmosphere") {document.getElementById('weatherIcon').src = "./images/weather/Clear.png";;}
					else if (msg.weather[0].main == "Drizzle") {document.getElementById('weatherIcon').src = "./images/weather/Drizzle.png";;}
					else if (msg.weather[0].main == "Clouds") {document.getElementById('weatherIcon').src = "./images/weather/Clouds.png";;}
					else if (msg.weather[0].main == "Haze") {document.getElementById('weatherIcon').src = "./images/weather/Clouds.png";;}
					else if (msg.weather[0].main == "Mist") {document.getElementById('weatherIcon').src = "./images/weather/Drizzle.png";;}
					else if (msg.weather[0].main == "Snow") {document.getElementById('weatherIcon').src = "./images/weather/Snow.png";;}
				} else if (isDay == false){
					if (msg.weather[0].main == "Clear") {document.getElementById('weatherIcon').src = "./images/weather/Clear_Night.png";;}
					else if (msg.weather[0].main == "Atmosphere") {document.getElementById('weatherIcon').src = "./images/weather/Clear_Night.png";;}
					else if (msg.weather[0].main == "Drizzle") {document.getElementById('weatherIcon').src = "./images/weather/Drizzle_Night.png";;}
					else if (msg.weather[0].main == "Clouds") {document.getElementById('weatherIcon').src = "./images/weather/Clouds_Night.png";;}
					else if (msg.weather[0].main == "Haze") {document.getElementById('weatherIcon').src = "./images/weather/Clouds_Night.png";;}
					else if (msg.weather[0].main == "Mist") {document.getElementById('weatherIcon').src = "./images/weather/Drizzle_Night.png";;}
					else if (msg.weather[0].main == "Snow") {document.getElementById('weatherIcon').src = "./images/weather/Snow.png";;}
				} else {
					document.getElementById('weatherIcon').src = "./images/weather/Blank.png";;
				}
			}
		});
	// Sets a timeout so that the function will be called and the weather updated every minute.
	setTimeout(fetchWeather, 60000);
}