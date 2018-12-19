const NUM_PICTURES = 50; // The number of pictures in the images folder.
const USER_NAME = "Joe"; // The name you want to display. Most likely yours!
const CITY_ZIPCODE = "19104"; // The zipcode for which you want to have the weather displayed.

$( document ).ready(function() {
	document.getElementById('backgroundImage').src = 'images/image_' + Math.floor(NUM_PICTURES * Math.random()) + '.jpg';
	updateTimeAndDate();
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