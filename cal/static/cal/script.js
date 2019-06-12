
//NEW SCRIPT
var list=new Array;
var subject = new Array;
var startTime = new Array;
var endTime = new Array;
var currColor;

var colors = new Array;
colors = ["royalblue","orange","red","#00BF9D","#921DE0"];

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
    document.getElementById("stat2").innerHTML = 'Total number of days: '+lDay;
    setLabels(arr[m-1],daysInMonth(m,y),y);

    var numCol = 0;
    var currRow = 1;

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

        //creates the blank days
        if ((fDay > i)) {
            day.textContent = 'Blank Days';
            row.appendChild(day);
        } else if (lDay+fDay-1 < i){
            day.textContent = 'Blank Days';
            row.appendChild(day);
        } else {//otherwise populates the days with a non blank

            var btn = document.createElement('button');
            btn.type = "button";
            btn.className = "btn";
            btn.id = "btn"+tmpId;//MAKE SURE to format for end of year
            btn.style.backgroundColor = "black";//remove this if needed
            btn.setAttribute('onClick', "colorChange(" + "'" + "btn"+tmpId + "')");
            btn.innerHTML = 'Day:' + (i + 1 - fDay);
            day.appendChild(btn);
            row.appendChild(day);
        }
    }



}

//sets the labels for mm, dd, yyyy
function setLabels(m,d,y){
    document.getElementById("month-year").innerHTML = m+" "+y;
    document.getElementById("stat2").innerHTML = "Total days: "+d; //DELETE
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

//changes the color of item clicked
//also needs to add to arrays
function colorChange(id){
    if(currColor != undefined) {
        //sets the background color var
        var index = list.indexOf(id.substring(3));
        var background = document.getElementById(id).style;

        if (background.backgroundColor == "black") {//if the item is blank, create and push new array items
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
        //document.getElementById("stat").innerHTML = list;
        //document.getElementById("stat1").innerHTML = subject;
        //document.getElementById("stat3").innerHTML = startTime;
        //document.getElementById("stat4").innerHTML = endTime;

        //document.getElementById("stat").innerHTML = "boo"*/
    }
}

function highlightShift(idIn) {

    //get the index for the btn id
    var index = btnId.indexOf(idIn);
    //ts,te,t
    var t = document.getElementById('t'+(index+1));
    var ts = document.getElementById('ts'+(index+1));
    var te = document.getElementById('te'+(index+1));

    if (te.value && t.value && ts.value) {
        console.log(index);
        currColor = index;

        //set tmpbtn to the id and set opacity to 1
        var tmpbtn = document.getElementById(idIn);
        tmpbtn.style.opacity = 1;


        //set the current placeholders to the values so you can populate in list later
        timeEnd = document.getElementById("te" + (index + 1)).value;
        timeStart = document.getElementById("ts" + (index + 1)).value;
        titleInput = document.getElementById("t" + (index + 1)).value;


        //set all other tmpbtn opacity to 0
        for (var i = 0; i < btnId.length; i++) {
            if (i != index) {
                var tmp2btn = document.getElementById(btnId[i]);
                tmp2btn.style.opacity = 0.4;
            }
        }
    }
}


