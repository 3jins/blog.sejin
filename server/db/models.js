import connectToDB, {mongoose} from './dbConnection'

connectToDB('172.18.0.3', 27017, 'blog');

const updatedDataSchema = new mongoose.Schema({
    dateUpdated: {type: Date, required: true, unique: false}
});

const post = new mongoose.Schema({
    title: {type: String, required: true, unique: false},
    dateCreated: {type: Date, required: true, unique: false},
    dateUpdated: updatedDataSchema,
    content: {type: String, required: false, unique: false},
    tag: {type: String, required: false, unique: false}
});

const board = new mongoose.Schema({
    posts: [post]
});

const menu = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    titleForDesign: {type: String, required: true, unique: false},
    contentMenu: board
});

const menuModel = mongoose.model('menu', menu);

export { menuModel };