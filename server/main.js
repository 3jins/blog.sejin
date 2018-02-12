import express from 'express';
import posts from './routes/posts';
import post from './routes/post';
import tags from './routes/tags';
import path from 'path';

const app = express();
const port = 5913;

app.use(express.static(__dirname + "/../public"));
app.use('/posts', posts);
app.use('/post', post);
app.use('/tags', tags);
app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname + "/../public/index.html"));
});
console.log(__dirname + "/../public/index.html");

app.listen(port, () => {
    console.log('Express listening on port', port);
});


