//time variables from moment.js
var day = moment().format('dddd'); 
var date = moment().format('MMMM Do')
var hour = moment().format('h');

var scheduleArray = [9,10,11,12,1,2,3,4,5]
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



console.log(hour);
dayP.text(`${day}, ${date}`)

$.each(scheduleArray, function(index, value){
    var rowDiv = $("<div class='row timeblock'>")
    // rowDiv.addClass("row timevlock")
    var p = $("<p class='col-1 hour'>")
    if(value < 12){
        p.text(`${value}AM`)
    }else{
        p.text(`${value}PM`)   
    }
    
    rowDiv.append(p)
    
    var textArea = $("<textarea class='col description past'>")
    rowDiv.append(textArea);

    var button = $("<button class='col-1 saveBtn'>")
    button.html("<i class='fas fa-save'></i>")
    rowDiv.append(button);

    containerDiv.append(rowDiv)
    // rowdiv.append($("<p"))
    // console.log(value);
})
{/* <div class="row timeblock">
          <p class="col-1 hour">9am</p>
          <textarea class="col description past"></textarea>
          <button class="col-1 saveBtn"><i class="fas fa-save"></i></button>
      </div> */}