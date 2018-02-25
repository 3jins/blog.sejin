import connectToDB, {mongoose} from './dbConnection'

connectToDB('172.18.0.3', '172.18.0.2', 27017, 'blog');

const post = new mongoose.Schema({
    postNo: {type: Number, required: true, unique: true},
    title: {type: String, required: true, unique: false},
    dateCreated: {type: Date, required: true, unique: false},
    dateUpdated: {type: Date, required: true, unique: false},
    content: {type: String, required: false, unique: false},
    tags: {type: Array, required: false, unique: false},
    belongToMajor: {type: String, required: true, unique: false},
    belongToMinor: {type: String, required: true, unique: false},
});

const tag = new mongoose.Schema({
    tagName: {type: String, required: true, unique: true},
    belongToMinor: {type: String, required: true, unique: false},
    postList: {type: Array, required: true, unique: false},
});

const Post = mongoose.model("Post", post, "posts");
const Tag = mongoose.model("Tag", tag, "tags");

export { Post, Tag };