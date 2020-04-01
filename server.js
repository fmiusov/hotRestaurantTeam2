const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

function getPathToFile(fileName) {
    return path.join(__dirname, fileName);
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
//     name: "John Doe",
//     email: "john@example.com",
//     id: "unique-id",
//     phone: "404-867-5309"
// }

const tables = [{
        name: "John Doe",
        email: "john@example.com",
        id: "unique-id",
        phone: "404-867-5309"
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        id: "uniquer-id",
        phone: "770-867-5309"
    },
    {
        name: "James Doe",
        email: "james@example.com",
        id: "uniquest-id",
        phone: "678-867-5309"
    },
    {
        name: "Jessie Doe",
        email: "jessie@example.com",
        id: "uniquester-id",
        phone: "800-867-5309"
    }
]

const waitlist = [
    {
        name: "Marshal Banana",
        email: "marshal@example.com",
        id: "unique-eye-dee",
        phone: "777-867-5309"
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

app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
});