import express from 'express';
import posts from './routes/posts';

const app = express();
const port = 5913;

app.use(express.static(__dirname + "/../public"));
app.use('/', posts);

// app.get('/dbdata', (req, res) => {
//     res.send(menus);
// });

app.listen(port, () => {
    console.log('Express listening on port', port);
});