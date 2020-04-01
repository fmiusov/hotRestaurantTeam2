const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

// table info
// {
//     name: "John Doe",
//     email: "john@example.com",
//     id: "unique-id",
//     phone: "404-867-5309"
// }


app.listen(PORT, function() {
    console.log(`App listening on https://localhost:${PORT}`);
  });
  