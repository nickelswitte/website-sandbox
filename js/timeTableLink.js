/**
 * This will generate the right link for the online DHBW schedule of TIM17.
 * It will always show the current week and on weekends show the next week.
 */

// The basic link used without modifiers
var linkBasic = "http://193.196.6.13/rapla?page=calendar&user=Schmidt&file=PlanTIM17";

// Basic snippets for the link
var linkPieceDay= "day";
var linkPieceMonth = "month";
var linkPieceYear = "year";

// Getting the current date
var currentDate = new Date();

// Adding two days on the current date for the weekend
var oldTime = currentDate.getTime();
var newTime = oldTime + 2 * 24 * 3600 * 1000;
var newDate = new Date(newTime);

// Getting the individual numbers
var day = newDate.getDate();
var month = newDate.getMonth() + 1; //January is 0!
var year = newDate.getFullYear();

// Preparing strings for the link
var dayString = String(day).padStart(2, '0');
var monthString = String(month).padStart(2, '0'); //January is 0!
var yearString = String(year);

// Putting the links together
var link = linkBasic + "&" + linkPieceDay + "=" + dayString + "&" + linkPieceMonth + "=" + monthString + "&" + linkPieceYear + "=" + yearString;

// Redirect to the page
window.location.replace(link);