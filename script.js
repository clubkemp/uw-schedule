//time variables from moment.js
//used for adding the day to jumbtron (ie thursday)
var day = moment().format("dddd");
//used in jumbotron (ie september 23rd)
var date = moment().format("MMMM Do");
//used to save time to 12hr
var hour12 = moment().format("h");
//used to have the hour to 24 hour, easier to dissern am vs pm
var hour24 = moment().format("H");

// //Array for populating hourBlocks on the page
// var scheduleArray12 = [9, 10, 11, 12, 1, 2, 3, 4, 5];
// //this array is used to check against the current time in 24h format, getting around am pm junk
// var scheduleArray24 = [9, 10, 11, 12, 13, 14, 15, 16, 17];
//local obj to store data in
//TODO: Need to have this be populated out of local memeory
var schedule = [
  { time: 9, time24: 9, text: "" },
  { time: 10, time24: 10, text: "" },
  { time: 11, time24: 11, text: "" },
  { time: 12, time24: 12, text: "" },
  { time: 1,  time24: 13, text: "" },
  { time: 2, time24: 14, text: "" },
  { time: 3, time24: 15, text: "" },
  { time: 4, time24: 16, text: "" },
  { time: 5, time24: 17, text: "" },
];
//jquery dom selectors
//This is the current day in the Jumbotron
var dayP = $("#currentDay");
//The main container for content on the page
var containerDiv = $(".container");
//each text area DIV might not be needed...
var textAreaDiv = $("textarea");

var localSchedule = JSON.parse(localStorage.getItem("schedule"));

if (localSchedule == null) {
  console.log(localStorage.setItem("schedule",JSON.stringify(schedule)));
  console.log ("No local storage" ,schedule)
} else {
    schedule = localSchedule
    console.log("Loaded local storage", schedule)
}

//makes sure all DOM elements are loaded before doing jquery work
$(document).ready(function () {
  //set the text of our jumbotron day to be the name of day, and the current date
  dayP.text(`${day}, ${date}`);

  //Use an each method to load in an array of times and create DOM elements
  $.each(schedule, function (index, value) {
    console.log(index, value);
    //create the row that holds all the calender elments.
    // set the class needed to style
    var rowDiv = $("<div class='row timeblock'>");
    // create the p element that will hold the hour of the day
    //set the class to hour  for styling
    var p = $("<p class='col-1 hour'>");
    //need to do a little voodoo to add in if its AM or PM
    //TODO: Could potentially hard code in the AM and PM
    if (value.time === 9 || value.time === 10 || value.time === 11) {
      //if it's am value.times update the text content
      p.text(`${value.time}AM`);
    } else {
      //else its a pm value.time update the text content
      p.text(`${value.time}PM`);
    }
    //append our new p element to the row
    rowDiv.append(p);

    //create a textarea element
    //set the class to desctription
    var textArea = $("<textarea class='col description'>");
    //update the textarea attribute data-value.time, set it to the value.time at our current index in our schedule array
    textArea.attr("data-time", value.time);
    //update the text area field if there was something stored in LocalStorage
    if (value.text != "") {
      textArea.text(value.text);
    }
    //We need to assign a class that colors the textarea based on the current time
    //check if the value.time out of our array is equal to the current time(hour12)
    if (value.time24 === parseInt(hour24)) {
      //add the class present to textarea to style with css
      textArea.addClass("present");
      //perform another check to see if the shchedule time in 24 format is less than current time
    } else if (value.time24 < parseInt(hour24)) {
      //add the class past to text area to style with css
      textArea.addClass("past");
      //if its not the current time, and it's not in the past, it must be the fture
    } else {
      //add class to text area to style with css
      textArea.addClass("future");
    }
    //append our text area to the row
    rowDiv.append(textArea);

    //create a button element with class of saveBtn
    var button = $("<button class='col-1 saveBtn'>");
    //add the syntax for a font awesome save button to button interior
    button.html("<i class='fas fa-save'></i>");
    //add the attribute data-time with the value of the current array item
    button.attr("data-time", value.time);
    //add our button to the row
    rowDiv.append(button);

    //Our row is now loaded with all our elements,so we can append it to the container
    containerDiv.append(rowDiv);
  });

  //attach a listener event on our buttons, if it matche .saveBtn. needs to be on.(click) istead of .click()
  $(document).on("click", ".saveBtn", function () {
    // grab the value of the button you clicked using the data-time attribute
    var btnValue = $(this).attr("data-time");
    //use jquery query selector to grab the textarea with a matching data-time value
    var textareaValue = $(`textarea[data-time=${btnValue}]`).val();
    //Update our schedule obj with textareaValue using btnValue as the key
    updateStorage(btnValue, textareaValue);
  });

  //Fired at the end of the save button click, take in the data-time from button and the text value from textarea
  function updateStorage(time, value) {
    //need to loop through the schedule to find the right one to update
    schedule.forEach((element) => {
      //if the loop gets to an object where its time value matches the time attribute from our click event
      if (element.time === parseInt(time)) {
        //then update that elements text value in the schedule array using the value from textarea
        element.text = value;
      }
    });
    //now that we've loope through and updated the right object in our schedule array, push the whole schedule back up to local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }

  //adding a listener onto our added reset button
  $("#reset").on("click", function () {
    //loop through the shecule array 
    schedule.forEach((element) => {
      //change all the text fields to blank
        element.text = "";
        //use a jqery selctor query to set all textareas to be blank
      $(`textarea[data-time=${element.time}]`).text("");
    });
    //update local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));
  });
});
