const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const accountSid = 'AC19110670360af432864a8e5d1348bb8d';
const authToken = '45af608fde8e0976be86127b3c20b05a';
const client = require('twilio')(accountSid, authToken);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

function getPathToFile(fileName) {
    return path.join(__dirname, "views/" + fileName);
}

function buildHtmlSend(pageName) {
    return [`${getPathToFile(pageName)}.html`, {
        headers: {
            "Content-Type": "text/html"
        }
    }];
}

function addToWaitlist(reservation) {
    waitlist.push(reservation);
    return sendTextMessage(reservation.phoneNumber, "You have been added to the wait list")
}

function addReservation(reservation) {
    tables.push(reservation);
    return sendTextMessage(reservation.phoneNumber, "Your reservation is confirmed!")
}

function sendTextMessage(phoneNumber, messageBody) {
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber)) {
        phoneNumber = `+1${phoneNumber.match(/\d+/g).join('')}`;
        console.log(`Sending text message to ${phoneNumber} (not really)`);
        // return client.messages
        //     .create({
        //         body: messageBody,
        //         from: '+12029526793',
        //         to: phoneNumber
        //     }).then(message => console.log(message.sid));
        return Promise.resolve(true);
    } else {
        return Promise.resolve(false);
    }
}

var tables = [{
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerID: "unique-id",
        phoneNumber: "404-867-5309"
    },
    {
        customerName: "Jane Doe",
        customerEmail: "jane@example.com",
        customerID: "uniquer-id",
        phoneNumber: "770-867-5309"
    },
    {
        customerName: "James Doe",
        customerEmail: "james@example.com",
        customerID: "uniquest-id",
        phoneNumber: "678-867-5309"
    },
    {
        customerName: "Jessie Doe",
        customerEmail: "jessie@example.com",
        customerID: "uniquester-id",
        phoneNumber: "800-867-5309"
    }
]

var waitlist = [{
        customerName: "Marshal Banana",
        customerEmail: "marshal@example.com",
        customerID: "unique-eye-dee",
        phoneNumber: "777-867-5309"
    }

]

app.get("/", (req, res) => {
    return res.sendFile(...buildHtmlSend("home"));
});

app.get("/tables", (req, res) => {
    return res.sendFile(...buildHtmlSend("tables"));
});

app.get("/reserve", (req, res) => {
    return res.sendFile(...buildHtmlSend("reserve"));
});

app.get("/api/tables", (req, res) => {
    return res.json(tables);
});

app.get("/api/waitlist", (req, res) => {
    return res.json(waitlist);
});

app.post("/api/tables", (req, res) => {
    let reservation = req.body;
    console.log("post: ", reservation);
    if (tables.length === 5) {
        addToWaitlist(reservation).then(() => {
            return res.json(false)
        })
        // waitlist.push(reservation);
        // return res.json(false);
    } else {
        addReservation(reservation).then(() => {
            return res.json(true)
        });
        // tables.push(reservation);
        // return res.json(true);
    }
});

app.delete("/api/tables/:customerID", (req, res) => {
    // console.log(req.params);
    try {
        tables = tables.filter(table => table.customerID !== req.params.customerID);
    } catch (err) {
        return res.status(400).send(err.toString());
    }
    return res.status(204).send();
});

app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
});