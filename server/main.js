import express from 'express';
import posts from './routes/posts';
import post from './routes/post';
import tags from './routes/tags';
import path from 'path';

const app = express();
const port = process.env.SERVER_ENV === 'development' ? 5913 : 80;
const publicPath = path.resolve(__dirname, "../../public");   // Directory would be deeper one step when it is transpiled.

app.use(express.static(publicPath));
app.use('/posts', posts);
app.use('/post', post);
app.use('/tags', tags);
app.get('/*', (req,res) => {
    res.sendFile(path.resolve(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log('Express listening on port', port);
});


