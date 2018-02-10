import {Converter} from 'react-showdown';

const mdConverter = (content) => {
    const converter = new Converter({tables: true, strikethrough: true});
    return converter.convert(content);
};

export {mdConverter};