import sinon from 'sinon';
import testDao from './testMongoDB';

sinon.stub(console, 'error'); // Suppress error message from catch phrases
testDao();
