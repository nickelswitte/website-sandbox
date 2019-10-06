/**
 * This will generate the right link for the online DHBW schedule of TIM17.
 * It will always show the current week and on weekends show the next week.
 */

// The basic link used without modifiers
var linkBasic = "http://193.196.6.13/rapla?page=calendar&user=Schmidt";

// Get the GET values. substring 1 removes the questionmark
var getString = window.location.search.substr(1);
// Split it into key value pairs
var parts = getString.split("&");
// Get the first pair as two elements
var first = parts[0].split("=");

var course = "nothin";

// Set the value to the variable course
if (first[0] === "course") {
    course = first[1];
}


// Basic snippets for the link
var linkPieceDay= "day";
var linkPieceMonth = "month";
var linkPieceYear = "year";
var linkPieceFile = "file";

var linkPieceFilePlan = "Plan";
var linkPieceFileYear = "17"

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
var link = linkBasic + 
    "&" + linkPieceFile + "=" + linkPieceFilePlan + course + linkPieceFileYear +  
    "&" + linkPieceDay + "=" + dayString + 
    "&" + linkPieceMonth + "=" + monthString + 
    "&" + linkPieceYear + "=" + yearString;

// Catch mistake cases
if (course != "TIT" && course != "TIM" && course != "nothin") {
    document.write("\nSorry, keine Weiterleitung möglich, da du nicht den richtigen Plan eingegeben hast.\nEs gibt keinen Kurs namens " + course + ".");
} else if (course === "nothin") {
    document.write("Du musst einen Kurs spezifizieren. Versuche \"?course=TIT\" oder \"?course=TIM\" an die URL anzuhängen.");
} else {
    // Redirect to the page
    window.location.replace(link);
}


// console.log(link);
