import MarkdownIt from 'markdown-it';
import MarkdownItKatex from 'markdown-it-katex';
import Parser from 'html-react-parser';
import * as Highlight from '../node_modules/highlight.js';
import {replaceAll} from "./stringModifier";
import '../node_modules/katex/dist/katex.min.css';

const mdConverter = (content) => {
    const markdownIt = new MarkdownIt({html: true,});
    const markdownItKatex = markdownIt.use(MarkdownItKatex);
    const renderedString = markdownItKatex.render(content);
    return Parser(replaceAll(renderedString, '<pre', '<pre class="hljs"'));
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
    if (!converted) {
        return false;
    }
    if (!converted.children || converted.children.length < 2) return false;
    const elements = converted.children;
    const numElements = elements.length;
    for (let i = 0; i < numElements; i++) {
        if (elements[i].tagName === "UL") {
            const numLis = elements[i].children.length;
            for (let j = 0; j < numLis; j++) {
                highlightNestedCode(elements[i].children[j]);
            }
        }
        if (elements[i].tagName === "PRE") {
            Highlight.highlightBlock(converted.children[i]);
            console.log(converted.children[i]);
            // Highlight.highlightBlock(converted.children[1].children[i].children[0]);
        }
    }
    Highlight.initHighlightingOnLoad();
};

export {mdConverter, highlightCode};
