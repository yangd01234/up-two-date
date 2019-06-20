
//NEW SCRIPT
var list=new Array;
var subject = new Array;
var startTime = new Array;
var endTime = new Array;
var currColor;

var btnId = new Array;
btnId = ["shift1","shift2","shift3","shift4","shift5"];



var timeStart = "";
var timeEnd = "";
var titleInput = "";


var currMonth = new Date().getMonth()+1;
var currYear = new Date().getFullYear();

createPage("calContainer",currMonth,currYear);
//note that 3 = march, 1= jan

// helper function for # of days in month
function daysInMonth(m, y){
    return new Date(y, m, 0).getDate();
}

//creates a new calendar in container.  "calContainer"
function createPage(containerIn,m,y){
    var arr = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    var listDays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var numCol = 0;
    var currRow = 1;

    //create a table
    var container = document.getElementById(containerIn);
    var newTable = document.createElement('table');
    var tr = document.createElement('tr');
    var tr2 = document.createElement('tr');

    //if date is sunday (7) set to (0)
    var fDay = new Date(y + "-" + m + "-01").getDay();
    if (fDay == 7){
        fDay = 0;
    }
    var lDay = new Date(y,m,0).getDate();
    setLabels(arr[m-1],daysInMonth(m,y),y);

    newTable.id = "table"+m+"-"+y;
    //create the headers
    for (i = 0; i < listDays.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = listDays[i];
        tr.appendChild(th);
    }

    container.appendChild(newTable);
    newTable.appendChild(tr);
    newTable.appendChild(tr2);


    // create calendar table
    for (i = 0; i < 42; i++) {

        var tmpId = y + "-" + m + "-" + (i-fDay+1);
        if (numCol > 6) {//create new rows if number of columns > 6
            var newRow = newTable.insertRow(-1);
            numCol = 0;
            currRow++;
        }
        numCol++;

        var row = newTable.rows[currRow].insertCell(-1);
        var day = document.createElement('td');
        day.className = "calendar-td";

        //creates the blank days
        if ((fDay > i)) {
            row.appendChild(day);
        } else if (lDay+fDay-1 < i){
            row.appendChild(day);
        } else {//otherwise populates the days with a non blank
            var btn = document.createElement('button');
            btn.type = "button";
            btn.className = "calendar-btn";
            // set background color to toggle highlight change
            btn.style.backgroundColor = "black";
            btn.id = "btn"+tmpId;//MAKE SURE to format for end of year
            btn.setAttribute('onClick', "colorChange(" + "'" + "btn"+tmpId + "')");
            btn.innerHTML = (i + 1 - fDay);
            day.appendChild(btn);
            row.appendChild(day);
        }
    }



}

//sets the labels for mm, dd, yyyy
function setLabels(m,d,y){
    document.getElementById("month-year").innerHTML = m+" "+y;
}


//hides the calendar based on table id
function hideCal(idIn) {
    document.getElementById(idIn).style.display = "none";
}

//shows the calendar based on table id
function showCal(idIn) {
    document.getElementById(idIn).style.display = "block";
}


/*=====Previous button=====
- decrement year
- decrement month (if month is january, set month to dec)
-hide current calendar
-if(previous calendar exists)
        show previous calendar
        else
        create calendar
-change display
 */
function prev() {
    var arr = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    //hide current calendar
    hideCal('table'+currMonth+'-'+currYear);

    //decrement month, if month is jan, change to dec
    if(currMonth ==1){
        currMonth = 12;
        //decrement year
        currYear--;
    } else {
        currMonth--;
    }

    var tmpTable = document.getElementById('table'+currMonth+'-'+currYear);
    if(tmpTable){
        showCal(tmpTable.id);
    } else {
        createPage('calContainer',currMonth,currYear);
    }
    setLabels(arr[currMonth-1],daysInMonth(currMonth,currYear),currYear);

}

//Next button clicked
function nxt() {
    var arr = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    //hide current calendar
    hideCal('table'+currMonth+'-'+currYear);

    //increment month, if month is dec, change to jan
    if(currMonth ==12){
        currMonth = 1;
        //decrement year
        currYear++;
    } else {
        currMonth++;
    }

    var tmpTable = document.getElementById('table'+currMonth+'-'+currYear);
    //if table exists, show table.  Otherwise create table
    if(tmpTable){
        showCal(tmpTable.id);
    } else {
        createPage('calContainer',currMonth,currYear);
    }
    setLabels(arr[currMonth-1],daysInMonth(currMonth,currYear),currYear);

}

// makes add to google calendar visible
function submitCalVisibility(){
    if(subject.length != 0){
        document.getElementById('authorize-button').disabled = false;
    } else {
        document.getElementById('authorize-button').disabled = true;
    }
}

//changes the color of item clicked and appends/removes item to list
function colorChange(id){

    var colors = new Array;
    colors = ["#0099CC","#007E33","#FF8800","#CC0000","#9933CC"];

    if(currColor != undefined) {
        //sets the background color var
        var index = list.indexOf(id.substring(3));

        var background = document.getElementById(id).style;

        //if the item is blank, create and push new array items
        if (background.backgroundColor == "black") {
            //2018-03-22 date format
            list.push(id.substring(3));
            subject.push(titleInput);
            startTime.push(timeStart);
            endTime.push(timeEnd);
            //change color of button
            background.backgroundColor = colors[currColor];
        } else {//otherwise if it is not black and filled.

            if (index !== -1) {
                //remove from list
                list.splice(index, 1);
                subject.splice(index, 1);
                startTime.splice(index, 1);
                endTime.splice(index, 1);
            }
            background.backgroundColor = "black";

        }
    }
    // make google calendar submit button available/disabled
    submitCalVisibility();
}

function highlightShift(idIn) {

    // index for the btn id
    var index = btnId.indexOf(idIn);

    // used for index within html page
    var adjustedIndex = index+1;

    // number of highlight buttons
    var numHighlightBtn = document.getElementsByClassName('btn-time').length;

    // set current variables
    currColor = index;
    timeStart = document.getElementById('start-time'+adjustedIndex).innerHTML;
    timeEnd = document.getElementById('end-time'+adjustedIndex).innerHTML;
    titleInput = document.getElementById('shift'+adjustedIndex).innerHTML;

    //set tmpbtn to the id and set opacity to 1
    var tmpbtn = document.getElementById(idIn);
    tmpbtn.style.opacity = 1;

    //set all other tmpbtn opacity to 0
    for (var i = 0; i < numHighlightBtn; i++) {
        if (i != index) {
            var tmp2btn = document.getElementById(btnId[i]);
            tmp2btn.style.opacity = 0.4;
        }
    }
}


