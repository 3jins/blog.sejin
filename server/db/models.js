import connectToDB, {mongoose} from './dbConnection'

connectToDB('172.18.0.3', '172.18.0.2', 27017, 'blog');

const post = new mongoose.Schema({
    title: {type: String, required: true, unique: false},
    dateCreated: {type: Date, required: true, unique: false},
    dateUpdated: {type: Date, required: true, unique: false},
    content: {type: String, required: false, unique: false},
    tag: {type: String, required: false, unique: false},
    belongToMajor: {type: String, required: true, unique: false},
    belongToMinor: {type: String, required: true, unique: false},
});

const Post = mongoose.model("Post", post, "posts");

export { Post };