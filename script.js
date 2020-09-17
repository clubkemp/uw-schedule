//time variables from moment.js
var day = moment().format('dddd'); 
var date = moment().format('MMMM Do')
var hour12 = moment().format('h');
var hour24 = moment().format('H');
var amPm = moment().format('a')

var scheduleArray12 = [9,10,11,12,1,2,3,4,5,6,7,8]
var scheduleArray24 = [9,10,11,12,13,14,15,16,17,18,19,20]
var schedule = {
    9:"",
    10:"",
    11:"",
    12:"",
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:""
}
//jquery dom selectors
var dayP = $("#currentDay")
var containerDiv = $(".container")
var textAreaDiv = $("textarea")



dayP.text(`${day}, ${date}`)

$.each(scheduleArray12, function(index, value){
    var rowDiv = $("<div class='row timeblock'>")
    // rowDiv.addClass("row timevlock")
    var p = $("<p class='col-1 hour'>")
    if(value === 9 || value === 10 || value === 11){
        p.text(`${value}AM`)
    }else{
        p.text(`${value}PM`)   
    }
    
    rowDiv.append(p)
    
    var textArea = $("<textarea class='col description'>")
    textArea.attr("data-time",value)

    if(value === parseInt(hour12)){
        console.log("Its the time")
        textArea.addClass("present")    
    }else if (scheduleArray24[index] < parseInt(hour24)) {
        textArea.addClass("past") 
    }else{
        textArea.addClass("future") 
    }
    rowDiv.append(textArea);

    var button = $("<button class='col-1 saveBtn'>")
    button.html("<i class='fas fa-save'></i>")
    button.attr("data-time",value)
    rowDiv.append(button);

    containerDiv.append(rowDiv)
    // rowdiv.append($("<p"))
    // console.log(value);
})
