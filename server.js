const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

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

app.get("/", (req, res) => {
    return res.sendFile(...buildHtmlSend("home"));
});

app.get("/tables", (req, res) => {
    return res.sendFile(...buildHtmlSend("tables"));
});

app.get("/reserve", (req, res) => {
    return res.sendFile(...buildHtmlSend("reserve"));
});

app.listen(PORT, function() {
    console.log(`App listening on https://localhost:${PORT}`);
  });
  