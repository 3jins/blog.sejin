import MarkdownIt from 'markdown-it';
import * as Highlight from "../node_modules/highlight.js";
import Parser from 'html-react-parser';

const mdConverter = (content) => {
    const markdownIt = new MarkdownIt();
    const renderedString = markdownIt.render(content);
    return Parser(renderedString.replace('<pre', '<pre class="hljs"'));
    // const converter = new Converter({tables: true, strikethrough: true});
    // return converter.convert(content);
};

/* Function only for highlightCode(converted) */
const highlightNestedCode = (li) => {
    const numLiChildren = li.children.length;
    for (let i = 0; i < numLiChildren; i++) {
        if (li.children[i].tagName === "UL") {
            const numLis = li.children[i].children.length;
            for (let j = 0; j < numLis; j++) {
                highlightNestedCode(li.children[i].children[j]);
            }
        }
        if (li.children[i].tagName === "PRE") {
            Highlight.highlightBlock(li.children[i]);
        }
    }
};

const highlightCode = (converted) => {
    if (!converted) return false;
    if (!converted.children || converted.children.length < 2) return false;
    const elements = converted.children[1].children;
    const numElements = elements.length;
    for (let i = 0; i < numElements; i++) {
        if (elements[i].tagName === "UL") {
            const numLis = elements[i].children.length;
            for (let j = 0; j < numLis; j++) {
                highlightNestedCode(elements[i].children[j]);
            }
        }
        if (elements[i].tagName === "PRE") {
            Highlight.highlightBlock(converted.children[1].children[i]);
        }
    }
    Highlight.initHighlightingOnLoad();
};


export {mdConverter, highlightCode};