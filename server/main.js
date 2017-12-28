import express from 'express';
import bodyParser from 'body-parser';
// import { menuModel } from './db/models';
const app = express();
const port = 5913;

// const about = new menuModel({
//     title: 'About',
//     titleForDesign: 'whoami'
// });
//
// about.save(function(err, about) {
//     if(err) {
//         console.log("Collection save is failed.");
//         return console.error(err);
//     }
//     else {
//         console.log("Save successed!");
//         console.log(about);
//     }
// });


app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(about);
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});