/**
 * This will generate the right link for the online DHBW schedule of TIM17.
 * It will always show the current week and on weekends show the next week.
 */
function getRaplaLink(course) {
    // The basic link used without modifiers
    var linkBasic = "http://193.196.6.13/rapla?page=calendar&user=Schmidt";

    // Basic snippets for the link
    var linkPieceDay = "day";
    var linkPieceMonth = "month";
    var linkPieceYear = "year";
    var linkPieceFile = "file";

    var linkPieceFilePlan = "Plan";

    // Getting the current date
    var currentDate = new Date();

    
    // In the case of the day being on a weekend, change it to the next monday
    var oldTime = currentDate.getTime();
    var newTime;

    // Case of Saturday
    if (currentDate.getDay() === 6) {
        // Adding two days on the current date for the weekend
        newTime = oldTime + 2 * 24 * 3600 * 1000;
        
        // Case of Sunday
    } else if (currentDate.getDay() === 0) {
        // Adding two days on the current date for the weekend
        newTime = oldTime + 1 * 24 * 3600 * 1000;
        
        // Any normal day, dont change anything
    } else {
        newTime = oldTime;
    }

    // Finally create the new date
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
        "&" + linkPieceFile + "=" + course +
        "&" + linkPieceDay + "=" + dayString +
        "&" + linkPieceMonth + "=" + monthString +
        "&" + linkPieceYear + "=" + yearString;

    return link;    
}

/**
 * This function will take a course and redirect to the according courses plan.
 */
function raplaRedirect(course) {

    if (course != "TIM17%2BTIT17" && course != "TIM18%2BTIT18%2BTIS18") {
        course = "Plan" + course;
    }

    window.location.href = getRaplaLink(course);
}

/**
 * For later uses
 */
function prepareLinks() {
    var input = document.getElementById("input_tim17"); 
    input.value = "LoL"; 
}

// prepareLinks();
