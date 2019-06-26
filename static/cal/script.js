window.CalLib = {};

CalLib.dateList=new Array;
CalLib.subject = new Array;
CalLib.startTime = new Array;
CalLib.endTime = new Array;
CalLib.currColor;
CalLib.timeStart = "";
CalLib.timeEnd = "";
CalLib.titleInput = "";

CalLib.currMonth = new Date().getMonth()+1;
CalLib.currYear = new Date().getFullYear();
CalLib.authorizeButton = document.getElementById('authorize-button');

createPage("calContainer",CalLib.currMonth,CalLib.currYear);


/**
 *  Helper function for # of days in a month.
 * @param {integer} m month.
 * @param {integer} y year.
 * @return {Date} new date object
 */
function daysInMonth(m, y){
    return new Date(y, m, 0).getDate();
}

/**
 *  Creates a new dynamic calendar in container: "calContainer"
 * @param {string} containerIn container to be used
 * @param {string} m month
 * @param {string} y year
 */
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

    // First day in month, Sunday = 0
    var fDay = new Date(m + "/01/" + y + " 00:00:00").getDay();

    // number of days in month
    var lDay = daysInMonth(m,y);
    setLabels(arr[m-1],lDay,y);

    // set id of new table
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

        //create new rows if number of columns > 6
        if (numCol > 6) {
            var newRow = newTable.insertRow(-1);
            numCol = 0;
            currRow++;
        }
        numCol++;

        var row = newTable.rows[currRow].insertCell(-1);
        var day = document.createElement('td');
        day.className = "calendar-td";

        //creates the blank days
        if ((fDay > i)) { // if fDay is greater than or = i, append empty day
            row.appendChild(day);
        } else if (lDay+fDay-1 < i){ // if lDay offset is < i, append empty day
            row.appendChild(day);
        } else { // otherwise populates the days with a non blank
            var btn = document.createElement('button');
            btn.type = "button";
            btn.className = "calendar-btn";
            // set background color to toggle highlight change
            btn.style.backgroundColor = "black";
            btn.id = "btn"+tmpId;//MAKE SURE to format for end of year
            btn.setAttribute('onClick', "colorChange(" + "'" + "btn"+tmpId + "')");
            btn.innerHTML = (i - fDay+1);
            day.appendChild(btn);
            row.appendChild(day);
        }
    }



}


/**
 *  Sets the labels for mm, dd, yyyy
 * @param {integer} m month.
 * @param {integer} d day.
 * @param {integer} y year.
 */
function setLabels(m,d,y){
    document.getElementById("month-year").innerHTML = m+" "+y;
}

/**
 *  Hides the calendar based on table id.
 * @param {string} idIn table id.
 */
function hideCal(idIn) {
    document.getElementById(idIn).style.display = "none";
}

/**
 *  Shows the calendar based on table id.
 * @param {string} idIn table id.
 */
function showCal(idIn) {
    document.getElementById(idIn).style.display = "block";
}

/**
 *  Decrement month and hide future calendar.
 */
function prev() {
    var arr = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    //hide current calendar
    hideCal('table'+CalLib.currMonth+'-'+CalLib.currYear);

    //decrement month, if month is jan, change to dec
    if(CalLib.currMonth ==1){
        CalLib.currMonth = 12;
        //decrement year
        CalLib.currYear--;
    } else {
        CalLib.currMonth--;
    }

    var tmpTable = document.getElementById('table'+CalLib.currMonth+'-'+CalLib.currYear);
    if(tmpTable){
        showCal(tmpTable.id);
    } else {
        createPage('calContainer',CalLib.currMonth,CalLib.currYear);
    }
    setLabels(arr[CalLib.currMonth-1],daysInMonth(CalLib.currMonth,CalLib.currYear),CalLib.currYear);

}

/**
 *  Increment month and hide past calendar.
 */
function nxt() {
    var arr = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
    //hide current calendar
    hideCal('table'+CalLib.currMonth+'-'+CalLib.currYear);

    //increment month, if month is dec, change to jan
    if(CalLib.currMonth ==12){
        CalLib.currMonth = 1;
        //decrement year
        CalLib.currYear++;
    } else {
        CalLib.currMonth++;
    }

    var tmpTable = document.getElementById('table'+CalLib.currMonth+'-'+CalLib.currYear);
    //if table exists, show table.  Otherwise create table
    if(tmpTable){
        showCal(tmpTable.id);
    } else {
        createPage('calContainer',CalLib.currMonth,CalLib.currYear);
    }
    setLabels(arr[CalLib.currMonth-1],daysInMonth(CalLib.currMonth,CalLib.currYear),CalLib.currYear);

}

/**
 * Changes google calendar button visibility
 */
function submitCalVisibility(){
    if(CalLib.subject.length != 0){
        document.getElementById('authorize-button').disabled = false;
    } else {
        document.getElementById('authorize-button').disabled = true;
    }
}

/**
 *  Changes the color of item clicked and appends/removes item to/from list.
 * @param {string} idIn id of element.
 */
function colorChange(idIn){

    var colors = new Array;
    colors = ["#0099CC","#007E33","#FF8800","#CC0000","#9933CC"];

    if(CalLib.currColor != undefined) {
        //sets the background color var
        var index = CalLib.dateList.indexOf(idIn.substring(3));

        var background = document.getElementById(idIn).style;

        //if the item is blank, create and push new array items
        if (background.backgroundColor == "black") {
            //2018-03-22 date format
            CalLib.dateList.push(idIn.substring(3));
            CalLib.subject.push(CalLib.titleInput);
            CalLib.startTime.push(CalLib.timeStart);
            CalLib.endTime.push(CalLib.timeEnd);
            //change color of button
            background.backgroundColor = colors[CalLib.currColor];
        } else {//otherwise if it is not black and filled.

            if (index !== -1) {
                //remove from list
                CalLib.dateList.splice(index, 1);
                CalLib.subject.splice(index, 1);
                CalLib.startTime.splice(index, 1);
                CalLib.endTime.splice(index, 1);
            }
            background.backgroundColor = "black";

        }
    }
    // make google calendar submit button available/disabled
    submitCalVisibility();
}


/**
 *  Highlights current shift/time and un-highlights others.
 * @param {string} idIn id of element.
 */
function highlightShift(idIn) {

    var btnId = new Array;
    btnId = ["shift1","shift2","shift3","shift4","shift5"];

    // index for the btn id
    var index = btnId.indexOf(idIn);

    // used for index within html page
    var adjustedIndex = index+1;

    // number of highlight buttons
    var numHighlightBtn = document.getElementsByClassName('btn-time').length;

    // set current variables
    CalLib.currColor = index;
    CalLib.timeStart = document.getElementById('start-time'+adjustedIndex).innerHTML;
    CalLib.timeEnd = document.getElementById('end-time'+adjustedIndex).innerHTML;
    CalLib.titleInput = document.getElementById('shift'+adjustedIndex).innerHTML;

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


/**
 *  Displays the submission confirmation modal.
 */
function confirmModal(){
    var modal = document.getElementById("calModal");
    var modalTitle = document.getElementById("modal-title");
    var modalMessage = document.getElementById("modal-message");
    var text = "";
    modalTitle.innerHTML = "Submitted Success!";

    // loop over list and post 
    var listLen = CalLib.dateList.length;
    for (var i = 0; i < listLen; i++){
        text += ("<br>" + "Title: " + CalLib.subject[i]
                + " Start Time: " + CalLib.startTime[i]
                + " End Time: " + CalLib.endTime[i]
                + " Date: "+ CalLib.dateList[i]
                + "&#13;&#10;");
    }
    modalMessage.innerHTML = text;

    modal.style.display = "block";
}

/**
 *  Hides the submission confirmation modal.
 */
function closeModal(){
    var modal = document.getElementById("calModal");
    modal.style.display = "none";
    document.location.reload(true);
}

