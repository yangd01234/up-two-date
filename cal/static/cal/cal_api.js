var counter = 0;
// Client ID and API key from the Developer Console
var CLIENT_ID = '324912967835-sgfrraopae6ivgokphojfbov78rkibi9.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBJ35-UUQCNcXevnE0cYAttHICDT07dfWM';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    console.log("this is a test start");
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    //signoutButton.onclick = handleSignoutClick;
  });

}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {

    var batchList = gapi.client.newBatch();

    authorizeButton.style.display = 'none';
    //signoutButton.style.display = 'block';

     for(var i = 0; i<list.length;i++){

        // formats events for google calendar api
        var postCode = eventFormat(list[i],startTime[i],endTime[i],subject[i]);

        batchList.add(gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': postCode
          }));
    }

    // confirms promise for batch request
    Promise.all([batchList])
    .then(x=>console.log(x));

    // logout user
    gapi.auth2.getAuthInstance().signOut();

  } else {
    authorizeButton.style.display = 'block';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}


// formats events
function eventFormat(dateIn,start,end,title){
    var returnCode = 0;

    //2018-03-22 date format
    var event = {
        'summary':  title,
        'description': 'Test description',
        'start': {
            'dateTime': dateIn+'T'+start+':00-07:00',
            //'dateTime': '2018-04-1T14:00:00-07:00',
            //'dateTime': dateIn+'T14:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': dateIn+'T'+end+':00-07:00',
            //'dateTime':  dateIn+'T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },

        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };

      return event;
}