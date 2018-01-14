import express from 'express';
import posts from './routes/posts';

const app = express();
const port = 5913;

app.use(express.static(__dirname + "/../public"));
app.use('/posts', posts);

app.listen(port, () => {
    console.log('Express listening on port', port);
});


