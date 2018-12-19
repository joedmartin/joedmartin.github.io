const NUM_PICTURES = 50; // The number of pictures in the images folder.
const USER_NAME = "Joe"; // The name you want to display. Most likely yours!
const CITY_ZIPCODE = "19104"; // The zipcode you want to have the weather displayed for.

// Selects a random number within the range (1-NUM_PICTURES) to be set as the left background image.
document.getElementById('image').src = 'images/image_' + Math.floor(NUM_PICTURES * Math.random()) + '.jpg';
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
				// Get the city name from the weather object and display it.
				document.getElementById("cityname").innerHTML = msg.name;
				// Get the weather description from the weather object and fix case by capitalizing each word with the "toTitleCase()" function.
				document.getElementById("conditions").innerHTML = toTitleCase(msg.weather[0].description);
				// Get the current temperature from the weather object, round to the nearest degree, and add on the "degree F" part.
				document.getElementById("temperature").innerHTML = Math.round(msg.main.temp) + "&#xb0;F</tr></td>";

				// Get the sunrise and sunset times from the weather object and convert from unix epoch time to normal human time using date objects.
				var sunrise = new Date(msg.sys.sunrise * 1000);
				var sunset = new Date(msg.sys.sunset * 1000);
				// Display the sunrise and sunset times. The "getTime()" function converts from 24 to 12 hour format as well as adds the AM/PM suffixes.
				document.getElementById("temperaturedetails").innerHTML = "Sunrise: " + getTime(sunrise.getHours(), sunrise.getMinutes().toString()) + "<br>" + "Sunset: " + getTime(sunset.getHours(), sunset.getMinutes().toString()) + "<br>Humidity: " + msg.main.humidity + "%";
				// Get the high and low temperatures from the weather object, add on the "degree F" part, and display them.
				document.getElementById("highlow").innerHTML = "Hi: " + Math.round(msg.main.temp_max) + "&#xb0;F</tr></td><br>" + "Lo: " + Math.round(msg.main.temp_min) + "&#xb0;F</tr></td>";

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
                if (msg.weather[0].main == "Rain") { document.getElementById('weatherIcon').src = 'images/Rain.png';}
				else if (msg.weather[0].main == "Clear" && isDay == true) {document.getElementById('weatherIcon').src = 'images/Clear.png';}
				else if (msg.weather[0].main == "Clear" && isDay == false) {document.getElementById('weatherIcon').src = 'images/Clear_Night.png';}
				else if (msg.weather[0].main == "Atmosphere" && isDay == true) {document.getElementById('weatherIcon').src = 'images/Clear.png';}
				else if (msg.weather[0].main == "Atmosphere" && isDay == false) {document.getElementById('weatherIcon').src = 'images/Clear_Night.png';}
				else if (msg.weather[0].main == "Thunderstorm") {document.getElementById('weatherIcon').src = 'images/Thunderstorm.png';}
				else if (msg.weather[0].main == "Drizzle" && isDay == true) {document.getElementById('weatherIcon').src = 'images/Drizzle.png';}
				else if (msg.weather[0].main == "Drizzle" && isDay == false) {document.getElementById('weatherIcon').src = 'images/Drizzle_Night.png';}
				else if (msg.weather[0].main == "Clouds" && isDay == true) {document.getElementById('weatherIcon').src = 'images/Clouds.png';}
				else if (msg.weather[0].main == "Clouds" && isDay == false) {document.getElementById('weatherIcon').src = 'images/Clouds_Night.png';}
				else if (msg.weather[0].main == "Haze" && isDay == true) {document.getElementById('weatherIcon').src = 'images/Clouds.png';}
				else if (msg.weather[0].main == "Haze" && isDay == false) {document.getElementById('weatherIcon').src = 'images/Clouds_Night.png';}
				else if (msg.weather[0].main == "Mist" && isDay == true) {document.getElementById('weatherIcon').src = 'images/Drizzle.png';}
				else if (msg.weather[0].main == "Mist" && isDay == false) {document.getElementById('weatherIcon').src = 'images/Drizzle_Night.png';}
				else if (msg.weather[0].main == "Snow") {document.getElementById('weatherIcon').src = 'images/Snow.png';}
				else {document.getElementById('weatherIcon').src = 'images/Blank.png';}
			}
		});
	// Sets a timeout so that the function will be called and the weather updated every minute.
	setTimeout(fetchWeather, 60000);
}

// Function for getting the time and date data and updating every second.
function updateTimeAndDate() {
	// Create a new date object.
	var dateTwo = new Date();
	// Reference arrays for the days of the week and months of the year.
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	// Sets the date by getting the literal day of the week, month, numeric date, and year from the date object.
	// *Note: The function "ordinalSuffix()" is used on the numeric date to add the correct suffix (nd, st, rd).
	document.getElementById("day").innerHTML = days[dateTwo.getDay()] + ", " + months[dateTwo.getMonth()] + " " + ordinalSuffix(dateTwo.getDate()) + ", " + dateTwo.getFullYear();
	// Get the current time in hours and minutes from the date object. The "getTime()" function converts from 24 to 12 hour format as well as adds the AM/PM suffixes.
	document.getElementById("time").innerHTML = getTime(dateTwo.getHours(), dateTwo.getMinutes().toString());
	// Sets a timeout so that the function will be called and the time/date updated every second.
	setTimeout(updateTimeAndDate, 1000);
}

// Initial calls to the "fetchWeather()" and "updateTimeAndDate()" functions.
fetchWeather();
updateTimeAndDate();

// Adds the correct suffix (nd, st, rd) to the provided number.
function ordinalSuffix(i) {
	var j = i % 10, k = i % 100;
	if (j == 1 && k != 11)
		return i + "st";
	else if (j == 2 && k != 12)
		return i + "nd";
	else if (j == 3 && k != 13)
		return i + "rd";
	else
		return i + "th";
}

// Capitalizes the first letter of every word of the provided string.
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
}

// Converts from 24 to 12 hour time and adds the AM/PM suffix accordingly.
function getTime(hours, minutes) {
	while (minutes.length < 2) {minutes = "0" + minutes;}
	if (hours > 12) {
		hours = hours - 12;
		return (hours.toString() + ":" +  minutes + " PM");
	} else if (hours == 0) {
		return ("12:" + minutes + " AM");
	} else {
		return (hours.toString() + ":" + minutes + " AM");
	}
}

// Contains phrases in first, last pairs. Both must be specified.
// Index 0 corresponds to the top line of text, and index 1 is the bottom.
// If index 1 is an empty string, the bottom line won't be displayed. (good for short phrases)
var phrases = [
	['Sup, dude.', ''],
	['Good to see', 'you again!'],
	['Good to see', 'you again!'],
	['Welcome back.', ''],
	['Welcome back.', ''],
	['How\'s it going,', USER_NAME + '?'],
	['Hello again,', USER_NAME + '!'],
	['Hello again,', USER_NAME + '!'],
	['Yo, my guy.', ''],
	['Hi, ' + USER_NAME + '!', ''],
	['Hi, ' + USER_NAME + '!', ''],
	['How\'s it', ' hanging?'],
	['How goes it, ', USER_NAME + '?'],
	['Suhhh dude.', ''],
	['What\'s cracking', 'my man?']
	['Whoever threw', 'that paper...']
];

// Function for grabbing the specific div.cell element (that needs to be animated, in this case)
// in a given table, at index x, y (from the top left).
function get(table, x, y) {
	/*
	This requires some explaining.
	The following line is an insane jQuery I threw together that somehow works, as follows.
	1. Grab every table element.
	2. Grab the one you want, at the specified index.
	3. Doing so makes it no longer a navigtor, so we wrap the result in one to pick up where we left off.
	4. Call .children() on it twice, to obtain first the tbody, then all the <tr>s.
	5. Select the row you want, at given index.
	6. Repeat step 3.
	7. Find all the div.cell elements in the row.
	8. Repeat step 2.
	9. Repeat step 3.
	Tadaa! You now have the div.cell element you wanted.
	But at what cost...?
	*/
	return $($($($('.bookmarktable')[table]).children().children()[y]).find("div.cell")[x]);
}

// Animates the element at the given selector, after a specified delay, and for specified duration.
// Optionally takes action object containing CSS to animate.
function slideIn(selector, delay, duration, action={'left':"0px"}, fadeDuration=1000) {
	// Start only after the delay has passed.
	setTimeout((function() {
	// Set the visibility to visible, and then hide it again for some reason.
	// It doesn't work unless you do this - don't ask me why.
	selector.css('visibility','visible').hide().fadeIn(fadeDuration).animate(
		action,
	{
		duration: duration,
		queue: false
	});
	}), delay)
}

// Recursive propogate function. Used to correctly animate divs in a grid,
// starting from the upper left and moving to the bottom right diagonally.
// Looks cool.
function propogate(table, x, y, delay) {
	// Grab the div to the right and below
	// (using that egregious get method that we all know and love)
	var right = get(table, x + 1, y);
	var down = get(table, x, y + 1);
	// Animate the div at the given x and y
	slideIn(get(table, x, y), delay, 1000);
	// As long as there is an element to the right and there is no element above it (to avoid animating twice),
	// animate it (rather, call propogate on it's coordinates)
	if (right.length !== 0 && get(table, x + 1, y-1).length === 0) propogate(table, x + 1, y, delay+200);
	// Do the same for the element below
	if (down.length !== 0) propogate(table, x, y + 1, delay+200);
}

// Main, I guess (is this how jQuery works?)
$(function() {
	var headers = $('.container').children('h1'); // The headers above the button tables (Popular, School, etc.)
	var welcome1 = $('#welcome1'); // The first welcome div
	var welcome2 = $('#welcome2'); // The second welcome div
	var weather = $('#weatherDiv'); // The weather div
	var vines = $('#vineDiv'); // The vine div
	// Pick a phrase from the list of available phrases
	var phrase = phrases[Math.floor(Math.random() * phrases.length)]
	$('#begin')[0].innerHTML = phrase[0]; // This is the top text of the first welcome div
	$('#end')[0].innerHTML = phrase[1]; // Same for the bottom text
	// Slide in the first welcome div, the first header, and the first table element at time 0
	slideIn(weather, 0, 1500, {'right': '50px'});
	slideIn(vines, 0, 1500, {'right': '50px'});
	slideIn(welcome1, 0, 750, {'right': '50px'});
	slideIn($(headers[0]), 0, 1000);
	propogate(0, 0, 0, 0);
	// Then, slide in the second welcome div at time 100
	slideIn(welcome2, 100, 750, {'right': '0px'});
	// And the second header at time 150
	slideIn($(headers[1]), 150, 1000);
	// Propogate table #2 at time 200
	propogate(1, 0, 0, 200);
	// etc.
	slideIn($(headers[2]), 350, 1000);
	propogate(2, 0, 0, 400);
	slideIn($(headers[3]), 550, 1000);
	propogate(3, 0, 0, 600);
});
