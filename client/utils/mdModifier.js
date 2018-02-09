import {Converter} from 'react-showdown';

const translateTable = (content) => {
    const converter = new Converter({tables: true});
    return converter.convert(content);
};

export {translateTable};