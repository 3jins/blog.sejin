import React from 'react';
import {mdConverter} from "../../../../../utils/mdModifier";
import NoPostPreview from "../NoPostPreview";
import profileImg from "../../../../res/images/profile.png";
import frontEndImg from "../../../../res/images/frontEnd.png";
import uiuxImg from "../../../../res/images/uiux.png";
import openSourceImg from "../../../../res/images/openSource.png";
import birthImg from "../../../../res/images/birth.png";
import eduImg from "../../../../res/images/edu.png";
import prizeImg from "../../../../res/images/prize.png";
import workImg from "../../../../res/images/work.png";
import militaryImg from "../../../../res/images/military.png";
import etcImg from "../../../../res/images/etc.png";
import {camelCaseToHyphen} from "../../../../../utils/stringModifier";

const splitter = (content, belongToMinor) => {
        const convertedContent = mdConverter(content);
        const elements = convertedContent.props.children;
        const numElements = elements.length;

        switch (belongToMinor) {
            case 'now':
                const me = {};
                const blog = {};
                for (let i = 0; i < numElements; i++) {
                    const element = elements[i];
                    if (element === "\n") continue;
                    if (element.type === 'h2') {     // title
                        me.title = {
                            key: element.key,
                            element: element.props.children[0],
                        };
                    }
                    else {      // content
                        if (!me.contents) {
                            me.contents = [{
                                key: element.key,
                                element: element.props.children[0],
                            }];
                        }
                        else {
                            me.contents[me.contents.length] = {
                                key: element.key,
                                element: element.props.children[0],
                            };
                        }
                    }
                }
                return {me, blog};
            case 'vision':
                const frontEnd = {};
                const uiux = {};
                const openSource = {};
                for (let i = 0; i < numElements; i++) {
                    const element = elements[i];
                    if (element === "\n") continue;
                    if (element.type === 'h2') {     // title
                        if (!frontEnd.title) { // frontEnd
                            frontEnd.title = {
                                key: element.key,
                                element: element.props.children[0],
                            };
                        }
                        else if (!uiux.title) {  // uiux
                            uiux.title = {
                                key: element.key,
                                element: element.props.children[0],
                            };
                        }
                        else {  // openSource
                            openSource.title = {
                                key: element.key,
                                element: element.props.children[0],
                            };
                        }
                    }
                    else {      // content
                        if (!uiux.title) {   // frontEnd
                            if (!frontEnd.contents) {
                                frontEnd.contents = [{
                                    key: element.key,
                                    element: element.props.children[0],
                                }];
                            }
                            else {
                                frontEnd.contents[frontEnd.contents.length] = {
                                    key: element.key,
                                    element: element.props.children[0],
                                };
                            }
                        }
                        else if (!openSource.title) {  // uiux
                            if (!uiux.contents) {
                                uiux.contents = [{
                                    key: element.key,
                                    element: element.props.children[0]
                                }];
                            }
                            else {
                                uiux.contents[uiux.contents.length] = {
                                    key: element.key,
                                    element: element.props.children[0],
                                };
                            }
                        }
                        else {  // openSource
                            if (!openSource.contents) {
                                openSource.contents = [{
                                    key: element.key,
                                    element: element.props.children[0]
                                }];
                            }
                            else {
                                openSource.contents[openSource.contents.length] = {
                                    key: element.key,
                                    element: element.props.children[0],
                                };
                            }
                        }
                    }
                }
                return {frontEnd, uiux, openSource};
            case 'history':
                // md파일 수정시 ul 위아래로 정확하게 라인 한 줄씩 띄우지 않으면 제대로 안 들어감. ctrl+/ 눌러서 보고 갈 것.
                const historyList = [];
                let yearIdx = 0;
                for (let i = 0; i < numElements; i++) {
                    const outerLi = elements[i];
                    if (outerLi === "\n" || outerLi.type !== 'li') continue;
                    const events = outerLi.props.children;
                    const numEvents = events.length;
                    for (let i = 0; i < numEvents; i++) {
                        const event = events[i];
                        if (event.type === "p") {
                            historyList[yearIdx++] = {
                                title: event.props.children[0],
                            };
                        }
                        else if (event.type === "ul") {
                            const details = event.props.children;
                            const numDetails = details.length;
                            for (let i = 0; i < numDetails; i++) {
                                const detail = details[i];
                                if (typeof detail !== 'object' || detail.type !== "li") continue;
                                if (!('year' in historyList[yearIdx - 1])) {
                                    historyList[yearIdx - 1].year = detail.props.children[0];      // ex) 1993
                                }
                                else if (!('type' in historyList[yearIdx - 1])) {
                                    historyList[yearIdx - 1].type = detail.props.children[0];      // ex) birth
                                }
                                else if (!('link' in historyList[yearIdx - 1])) {
                                    historyList[yearIdx - 1].link = detail.props.children[0];      // ex) no link
                                }
                                else if (!('comment' in historyList[yearIdx - 1])) {
                                    historyList[yearIdx - 1].comment = detail.props.children[0];        // ex) 93년 여름에
                                }
                            }
                        }
                    }
                }
                return historyList;
            default:
                return false;
        }
    }
;

const sculptor = (splitContent, belongToMinor) => {
    switch (belongToMinor) {
        case 'now':
            const me = splitContent.me;
            return (
                <div className={belongToMinor}>
                    <h1>Now</h1>
                    <div className='me'>
                        <h2>{me.title.element}</h2>
                        <div className={['content-wrapper', 'flex-box'].join(' ')}>
                            <div className='img-wrapper'>
                                <img className='circle-img' src={profileImg}/>
                            </div>
                            <div className='profile-wrapper'>
                                {me.contents.map((content) => {
                                    return <p key={content.key}>{content.element}</p>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'vision':
            const extractedKeys = Object.keys(splitContent);
            const visionImgs = [frontEndImg, uiuxImg, openSourceImg];
            return (
                <div className={belongToMinor}>
                    <h1>Vision</h1>
                    {
                        extractedKeys.map((extractedKey, idx) => {
                            const outerContent = splitContent[extractedKey];
                            return (
                                <div className={['content-wrapper', camelCaseToHyphen(extractedKey)].join(' ')}
                                     key={extractedKey}>
                                    <div className='item'>
                                        <div className='img-wrapper'>
                                            <img className="circle-img" src={visionImgs[idx]}/>
                                        </div>
                                        <div className='detail'>
                                            <h2>{outerContent.title.element}</h2>
                                            {outerContent.contents.map((content) => {
                                                return (
                                                    <p key={content.key}>{content.element}</p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            );
        case 'history':
            const historyImgs = {
                birth: birthImg,
                edu: eduImg,
                prize: prizeImg,
                work: workImg,
                military: militaryImg,
                etc: etcImg
            };
            return (
                <div className={belongToMinor}>
                    <h1>History</h1>
                    <div className="timeline">
                        {
                            splitContent.map((event) => {
                                return (
                                    <div key={event.title} className="event">
                                        <div className={["event-icon", "circle-img"].join(' ')}>
                                            <img src={historyImgs[event.type]}/>
                                        </div>
                                        <div className="event-detail">
                                            <p className="year">
                                                {event.year}
                                            </p>
                                            <h4 className="title">
                                                {event.title}
                                            </h4>
                                            <p className="comment">
                                                {event.comment}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        default:
            return <NoPostPreview/>
    }
};

export {splitter, sculptor};