import express from 'express';
// import bodyParser from 'body-parser';
// import { menus } from './db/models';
import posts from './routes/posts';

const app = express();
const port = 5913;

app.use('/', express.static(__dirname + "/../public"));
app.use('/works', posts);
app.use('/blog', posts);
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('/dbdata', (req, res) => {
//     res.send(menus);
// });

app.listen(port, () => {
    console.log('Express listening on port', port);
});