const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

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
// table info
// {
//     customerName: "John Doe",
//     customerEmail: "john@example.com",
//     customerID: "unique-id",
//     phoneNumber: "404-867-5309"
// }

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

var waitlist = [
    {
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
    if (tables.length === 5) {
        waitlist.push(reservation);
        return res.json(false);
    } else {
        tables.push(reservation);
        return res.json(true);
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