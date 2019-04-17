import MarkdownIt from 'markdown-it';
import MarkdownItKatex from 'markdown-it-katex';
import Parser from 'html-react-parser';
import hljs from 'highlight.js';
import { replaceAll } from './stringModifier';
import '../node_modules/katex/dist/katex.min.css';

const mdConverter = (content) => {
  const markdownIt = new MarkdownIt({ html: true });
  const markdownItKatex = markdownIt.use(MarkdownItKatex);
  const renderedString = markdownItKatex.render(content);
  return Parser(replaceAll(renderedString, '<pre', '<pre class="hljs"'));
};

const highlightNestedCode = (elementList) => {
  const numElements = elementList.length;
  for (let i = 0; i < numElements; i++) { // Cannot use forEach for 'E'.
    const element = elementList[i];
    if (element.tagName === 'UL') {
      const numLis = element.children.length;
      for (let j = 0; j < numLis; j++) {
        highlightNestedCode(element.children[j]);
      }
    } else if (element.tagName === 'PRE') {
      hljs.highlightBlock(element);
    }
  }
};

const highlightCode = (converted) => {
  const doesContentElementExist = (children, numTitleElem) => (
    children && children.length >= numTitleElem + 1
  );
  if (!converted) return false;
  const elementList = converted.children;
  if (!doesContentElementExist(elementList, 1)) return false;
  highlightNestedCode(elementList);
  hljs.initHighlightingOnLoad();
};

export { mdConverter, highlightCode };
