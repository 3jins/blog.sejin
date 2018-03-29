import React, {Component} from 'react';

class PageView extends Component {
    render() {
        const page = parseInt(this.props.page);
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

        if (!isLoading) {
            if(!isPageNeeded) return null;
            for (let i = 0; i < numPageBundle; i++) {
                if (pageStart + i > finalPage) {
                    isLast = true;
                    break;
                }
                if (pageStart + i === page) {
                    pages[i] = <span>{pageStart + i}</span>;
                }
                else {
                    pages[i] = <a href={"?page=" + (pageStart + i)}>{pageStart + i}</a>;
                }
            }
            if (page > 1) {
                otherButtons.prev = <a href={"?page=" + (page - 1)}>{"<"}</a>;
            }
            if (page > 10) {
                otherButtons.prevBundle = <a href={"?page=" + (page - numPageBundle)}>{"<<"}</a>;
            }
            if (page < finalPage) {
                otherButtons.next = <a href={"?page=" + (page + 1)}>{">"}</a>;
            }
            if (!isLast) {
                otherButtons.nextBundle = <a href={"?page=" + (page + numPageBundle)}>{">>"}</a>;
            }
        }

        return (
            <div className="pages">
                {otherButtons.prevBundle}
                {otherButtons.prev}
                {pages}
                {otherButtons.next}
                {otherButtons.nextBundle}
                {!isLoading &&
                <p>
                    Current page: {page} of <a href={"?" + "page=" + finalPage}>{finalPage}</a>
                </p>
                }
                {isLoading && loadingView}
            </div>
        );
    };
}

export default PageView;