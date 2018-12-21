const NUM_PICTURES = 45; // The number of pictures in the images folder.
const USER_NAME = "Joe"; // The name you want to display. Most likely yours!
const CITY_ZIPCODE = "19104"; // The zipcode for which you want to have the weather displayed.

$( document ).ready(function() {
	document.getElementById('backgroundImage').src = '../images/newtabpage/image_' + Math.floor((NUM_PICTURES + 1) * Math.random()) + '.jpg';
	document.getElementById('welcome1').innerHTML = String(phrases[Math.floor(phrases.length * Math.random())])
	$('#welcome1').animate({marginTop:"70px",opacity:'1'},{queue:false,duration:800});
	$('#clock').animate({bottom:"20px",opacity:'1'},{queue:false,duration:1000});
	$('#weather').animate({bottom:"20px",opacity:'1'},{queue:false,duration:1000});
	$('#welcome2').animate({opacity:'1'},{queue:false,duration:1200});
	$('#bookmarkContainer').animate({opacity:'1'},{queue:false,duration:1200});
	$('#backgroundImage').animate({opacity:'1'},{queue:false,duration:1000});
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

function formatHours(hours) {
	if (hours > 12) {
		return hours - 12;
	} else if (hours == 0) {
		return "12";
	} else {
		return hours.toString();
	}
}

function formatMinutes(hours, minutes) {
	minutes = minutes.padStart(2, '0')
	if (hours > 12) {
		return (minutes + " PM");
	} else {
		return (minutes + " AM");
	}
}

// Contains phrases in first, last pairs. Both must be specified.
// Index 0 corresponds to the top line of text, and index 1 is the bottom.
// If index 1 is an empty string, the bottom line won't be displayed. (good for short phrases)
var phrases = [
	['Sup, dude.'],
	['Good to see you again!'],
	['Welcome back ' + USER_NAME + '!'],
	['How\'s it going, ' + USER_NAME + '?'],
	['Hello again, ' + USER_NAME + '!'],
	['Yo, my guy.'],
	['Hi, ' + USER_NAME + '!'],
	['How\'s it hanging?'],
	['How goes it, ' + USER_NAME + '?'],
	['Suhhh dude.'],
	['What\'s cracking my man?'],
	['Ello, gov\'nor!'],
	['How you doin\'?'],
	['What\'s cookin\', good lookin\'?'],
	['Hello there.'],
	['Hey boo.'],
	['*Hat tip*'],
	['Good day sir.']
];

// Function for fetching the weather information and updating every minute.
function fetchWeather(){
	// OpenWeatherMap is the service being used for the weather data fetching. Currently, the api call is hardcoded with my (Joe Martin) API key.
	// Documentation on the API call being used: https://openweathermap.org/current
	// The first couple lines are just all the ajax call mumbo jumbo.
	var URL = "https://api.openweathermap.org/data/2.5/weather?zip=" + CITY_ZIPCODE + "&appid=12d853a64bb392966651a92c1935a587&units=imperial";
		$.ajax({
			type: "GET",
			url : URL,
			dataType : "jsonp",
			success : function(msg){
				// Create a new date object.
				var dateOne = new Date();
				// Create a new variable to store the current time with the 3 last digits cut off cause idk what they do...but it works.
				var currentTime = parseInt(((dateOne.getTime()).toString()).slice(0, -3))
				// Checks if it is day. Compares the current time to the sunrise and sunset times.
				if (currentTime > msg.sys.sunrise && currentTime < msg.sys.sunset) {var isDay = true;}
				else {var isDay = false;}
				// Checks the current weather condition description from the weather object and selects which weather icon should be displayed.
				// There are x different possible conditions: Rain, Clear, Atmosphere, Thunderstorm, Drizzle, Clouds, and Snow.
				// Each one has its own icon except Atmosphere which uses clear because what does Atmosphere even mean???
				// Also, if it is night/day the icons will be changed accordingly.
				// If none of the conditions are matched, a blank image will be displayed and you should fix it.
				if (msg.weather[0].main == "Rain") { document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Rain.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Clear" && isDay == true) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clear.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Clear" && isDay == false) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clear_Night.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Atmosphere" && isDay == true) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clear.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Atmosphere" && isDay == false) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clear_Night.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Thunderstorm") {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Thunderstorm.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Drizzle" && isDay == true) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Drizzle.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Drizzle" && isDay == false) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Drizzle_Night.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Clouds" && isDay == true) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clouds.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Clouds" && isDay == false) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clouds_Night.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Haze" && isDay == true) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clouds.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Haze" && isDay == false) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Clouds_Night.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Mist" && isDay == true) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Drizzle.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Mist" && isDay == false) {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Drizzle_Night.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else if (msg.weather[0].main == "Snow") {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Snow.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
				else {document.getElementById('weather').innerHTML = "<img id='weatherIcon' src='../images/newtabpage/Blank.png'><br>" + Math.round(msg.main.temp) + "&#xb0;F</tr></td>";;}
			}
		});
	// Sets a timeout so that the function will be called and the weather updated every minute.
	setTimeout(fetchWeather, 60000);
}