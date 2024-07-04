const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.set('port', process.env.PORT || 8000);

const homeroute = express.Router();
const aboutroute = express.Router();
const contactroute = express.Router();

// fs.writeFile("log.txt",'', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("File created");
//     }
// });


const commonfilter = (req, resp, next) => {
    console.log("Middleware called");

    const fullurl = req.protocol + "://" + req.hostname + ":" + req.app.get('port') + req.url;
    //const ipaddress = req.ip; // IPv6
    const ipaddress = req.connection.remoteAddress; // IPv4
    const datetime = new Date().toISOString();

    fs.appendFile('log.txt', fullurl + ' : ' + datetime + ' : ' + ipaddress + '\n', (err) => {
        if (err) {
            console.log("Error.");
        }
        else {
            console.log("Success");
        }
    });

    next();
};

app.use(commonfilter);

homeroute.get("/home", (req, resp) => {
    resp.json({
        "/home": "this is home api."
    });
});

aboutroute.get("/about", (req, resp) => {
    resp.json({
        "/about": "this is about api."
    });
});

contactroute.get("/contact", (req, resp) => {
    resp.json({
        "/contact": "this is contact api."
    });
});


app.use("/", homeroute);
app.use("/", aboutroute);
app.use("/", contactroute);

app.listen(8000, () => console.log("Server Started"));
