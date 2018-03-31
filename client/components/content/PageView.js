import React, {Component} from 'react';
import {getParameterByName} from "../../../utils/stringModifier";
import {isEmpty} from "../../../utils/nullChecker";

class PageView extends Component {
    render() {
        const page = isNaN(parseInt(this.props.page)) ? 1 : parseInt(this.props.page);
        const numPosts = this.props.numPosts;
        const pageScale = this.props.pageScale;

        const isLoading = typeof numPosts === 'undefined';
        const loadingView = <p>loading...</p>;
        const isPageNeeded = numPosts > 10;

        const pages = [];
        const otherButtons = {
            prevBundle: "", prev: "", next: "", nextBundle: "",
        };
        const numPageBundle = 10;
        const pageStart = Math.floor(page / pageScale) * pageScale + 1;
        const finalPage = Math.floor(numPosts / pageScale) + 1;
        let isLast = false;

        if (isLoading) {
            return (
                <div className="pages">
                    {loadingView}
                </div>
            );
        }
        else {
            if(!isPageNeeded) return null;

            const currentTag = getParameterByName('tag');
            const urlQueryBase = isEmpty(currentTag) ? "?page=" : "?tag=" + currentTag + "&page=";
            for (let i = 0; i < numPageBundle; i++) {
                if (pageStart + i > finalPage) {
                    isLast = true;
                    break;
                }
                if (pageStart + i === page) {
                    pages[i] = <span>{pageStart + i}</span>;
                }
                else {
                    pages[i] = <a href={urlQueryBase + (pageStart + i)}>{pageStart + i}</a>;
                }
            }
            if (page > 1) {
                otherButtons.prev = <a href={urlQueryBase + (page - 1)}>{"<"}</a>;
            }
            if (page > 10) {
                otherButtons.prevBundle = <a href={urlQueryBase + (page - numPageBundle)}>{"<<"}</a>;
            }
            if (page < finalPage) {
                otherButtons.next = <a href={urlQueryBase + (page + 1)}>{">"}</a>;
            }
            if (!isLast) {
                otherButtons.nextBundle = <a href={urlQueryBase + (page + numPageBundle)}>{">>"}</a>;
            }

            return (
                <div className="pages">
                    {otherButtons.prevBundle}
                    {otherButtons.prev}
                    {pages}
                    {otherButtons.next}
                    {otherButtons.nextBundle}
                    <p>
                        Current page: {page} of <a href={urlQueryBase + finalPage}>{finalPage}</a>
                    </p>
                </div>
            );
        }
    };
}

export default PageView;