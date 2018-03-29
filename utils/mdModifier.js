import {Converter} from 'react-showdown';
import * as Highlight from "highlight.js/lib/highlight";

const mdConverter = (content) => {
    const converter = new Converter({tables: true, strikethrough: true});
    return converter.convert(content);
};

const highlightCode = (converted) => {
    if (!converted) return false;
    if (!converted.children || converted.children.length < 2) return false;
    const elements = converted.children[1].children;
    const numElements = elements.length;
    for (let i = 0; i < numElements; i++) {
        if (elements[i].tagName === "PRE") {
            Highlight.highlightBlock(converted.children[1].children[i]);
        }
    }
    Highlight.initHighlightingOnLoad();
};


export {mdConverter, highlightCode};