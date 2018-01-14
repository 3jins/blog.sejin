import connectToDB, {mongoose} from './dbConnection'

connectToDB('172.18.0.3', '172.18.0.2', 27017, 'blog');

const updatedDataSchema = new mongoose.Schema({
    dateUpdated: {type: Date, required: true, unique: false}
});

const post = new mongoose.Schema({
    title: {type: String, required: true, unique: false},
    dateCreated: {type: Date, required: true, unique: false},
    dateUpdated: updatedDataSchema,
    content: {type: String, required: false, unique: false},
    tag: {type: String, required: false, unique: false},
    belongToMajor: {type: String, required: true, unique: false},
    belongToMinor: {type: String, required: true, unique: false},
});

const UpdatedData = mongoose.model("UpdatedData", updatedDataSchema, "updatedDataSchema");
const Post = mongoose.model("Post", post, "posts");

export { Post, UpdatedData };

// const board = new mongoose.Schema({
//     works: [post]
// });
//
// const menu = new mongoose.Schema({
//     title: {type: String, required: true, unique: true},
//     titleForDesign: {type: String, required: true, unique: false},
//     contentMenu: board
// });
//
// const menuModel = mongoose.model('menu', menu);
//
// const menus = {
//     'about': new menuModel({
//         title: 'About',
//         titleForDesign: 'whoami',
//     }),
//     'works': new menuModel({
//         title: 'Works',
//         titleForDesign: 'ls works',
//     }),
//     'blog': new menuModel({
//         title: 'Blog',
//         titleForDesign: 'ls works',
//     }),
//     'contacts.js': new menuModel({
//         title: 'Contacts',
//         titleForDesign: 'echo hello >> ~/contacts.js/mailbox',
//     }),
// };
//
// export { menus };