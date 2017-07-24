var app = require("../../express");

app.get("/api/calendar/event", searchEvents);
app.get("/api/calendar/event/:eventId", findEventById);

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
/*var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';*/
var TOKEN_DIR = "credentials/";
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';


function searchEvents(req, res) {
    var queryString = req.query["search"];
    // Load client secrets from a local file.
    var clientinfo = null;
    if (!process.env.GCAPI_CLIENT_SECRET) {
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
            if (err) {
                console.log('Error loading client secret file: ' + err);
                return;
            }
            clientinfo = JSON.parse(content);
        });
    }
    authorize(clientinfo, function (auth) {
        var calendar = google.calendar('v3');
        calendar.events.list({
            auth: auth,
            q: queryString,
            calendarId: '5t8dq96sndpeu54813468o805g@group.calendar.google.com',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: false,
            orderBy: 'updated'
        }, function(err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            res.json(response.items);
        });
    });

}

function findEventById(req, res) {
    var eventId = req.params["eventId"];
    var clientinfo = null;
    if (!process.env.GCAPI_CLIENT_SECRET) {
        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
            if (err) {
                console.log('Error loading client secret file: ' + err);
                return;
            }
            clientinfo = JSON.parse(content);
        });
    }
    authorize(clientinfo, function (auth) {
        var calendar = google.calendar('v3');
        calendar.events.get({
            auth: auth,
            calendarId: '5t8dq96sndpeu54813468o805g@group.calendar.google.com',
            eventId: eventId
        }, function(err, response) {
            if (err) {
                console.log("The API returned an error: " + err);
                return;
            } else {
                res.json(response);
            }
        });
    })

}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    var clientSecret;
    var clientId;
    var redirectUrl;
    if (credentials == null) {
        clientSecret = process.env.GCAPI_CLIENT_SECRET;
        clientId = process.env.GCAPI_CLIENT_ID;
        redirectUrl = process.env.GCAPI_REDIRECT_URL;
    } else {
        clientSecret = credentials.installed.client_secret;
        clientId = credentials.installed.client_id;
        redirectUrl = credentials.installed.redirect_uris[0];
    }

    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.

    var credentials = {};
    if (process.env.GCAPI_ACCESS_TOKEN) {
        credentials.access_token = process.env.GCAPI_ACCESS_TOKEN;
        credentials.refresh_token = process.env.GCAPI_REFRESH_TOKEN;
        oauth2Client.credentials = credentials;
        return callback(oauth2Client);
    } else {
        fs.readFile(TOKEN_PATH, function (err, token) {
            if (err) {
                getNewToken(oauth2Client, callback);
            } else {
                credentials = JSON.parse(token);
                oauth2Client.credentials = credentials;
                return callback(oauth2Client);
            }
        });
    }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            return callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    if (process.env.GCAPI_ACCESS_TOKEN) {
        var newToken = JSON.stringify(token);
        process.env.GCAPI_ACCESS_TOKEN = newToken.access_token;
        process.env.GCAPI_REFRESH_TOKEN = newToken.refresh_token;
        console.log("Token stored to enviroment variables");
    } else {
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
    }
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, queryString) {
    var calendar = google.calendar('v3');
    /*calendar.calendarList.list({
        auth: auth
    }, function(err, response) {
        console.log(err);
        console.log(response);
    })*/ // Use this to find all calendars
    calendar.events.list({
        auth: auth,
        q: queryString,
        calendarId: '5t8dq96sndpeu54813468o805g@group.calendar.google.com',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        return response;
        /*if (events.length == 0) {
            //console.log('No upcoming events found.');
        } else {
            //console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }*/
    });
}