'use strict';

var _models = require('./models');

var posts = [new _models.Post({
    belongToMajor: 'About',
    belongToMinor: 'now',
    title: 'whoami_now',
    dateCreated: new Date().getTime(),
    dateUpdated: new _models.UpdatedData({ dateUpdated: new Date().getTime() }),
    content: "## Sejin Jeon\n" + "\n" + "안녕하세요, 현재 프론트엔드 웹 개발자를 목표로 소프트웨어 개발에 대해 공부하고 있는 전세진입니다.\n" + "\n" + "고등학교 때에는 수학과에 진학할 것을 희망했었지만 수능을 깔끔하게 말아먹고 점수에 맞춰 컴퓨터공학과에 진학했습니다. 이후 생각보다 프로그램 개발이 재밌어서 지금까지 원하는 것을 만드는 데에 도움이 되는 내용이라면 분야를 가리지 않고 닥치는대로 공부해왔습니다. \n" + "\n" + "군입대 전에는 기초적인 언어 사용법과 함께 정보보호 분야를, 군대에서는 풀스택 웹개발을, 군 제대 후에는 자료구조, 알고리즘, 운영체제, 컴퓨터구조 등 기초역량을, 그리고 소프트웨어 마에스트로 8기 과정 참여하면서 인공지능 및 안드로이드 개발을 공부했습니다. \n" + "\n" + "지금은 여러 분야 중 웹 개발이 가장 적성에 맞는 것 같다는 결론을 내리고 ReactJS와 주변 자바스크립트 생태계에 대해 깊이 공부하고 있습니다.\n" + "\n" + "\n" + "\n" + "## Blog\n" + "\n" + "공부하고 많은 사람들을 만나며 각자가 아는 지식을 서로 공유할 때 가장 성장이 빠르다는 것을 체득하고 이를 실천에 옮기기 위해 이 블로그를 개설하게 되었습니다. \n" + "\n" + "지금껏 공부하며 감사하게도 많은 블로그를 참고해왔지만 가끔 다른 분들의 포스팅 방식에 아쉬움이 남는 경우도 있었습니다. 따라서 타 블로그들과의 차별성을 위해 이 블로그의 모든 기술 관련 포스트는 다음의 원칙들을 최대한 지키며 작성하려 합니다.\n" + "\n" + "* 한 포스트는 최대한 좁은 주제를 다뤄 읽는 사람이 방대한 양에 지치지 않게 한다. 필요하다면 링크를 활용하자.\n" + "* 단순히 내가 아는 내용을 나열하기보다는 나중에 찾아보기 편한 레퍼런스와 같은 형태로 작성한다.\n" + "* 항상 동작원리를 깊이 파헤쳐서 일부 모듈이 업데이트 되거나 변형된 프로젝트를 만들더라도 무리가 없게끔 한다.\n" + "\n" + "아직 많이 부족하기 때문에 작성한 글에 오류가 있을 수 있습니다. 지적해 주시면 언제나 기쁜 마음으로 수정하도록 하겠습니다."
}), new _models.Post({
    belongToMajor: 'About',
    belongToMinor: 'vision',
    title: 'whoami_vision',
    dateCreated: new Date().getTime(),
    dateUpdated: new _models.UpdatedData({ dateUpdated: new Date().getTime() }),
    content: "## Web Frontend Developer\n" + "\n" + "저는 어릴 때 레고를 갖고 노는 것을 좋아했습니다. 특히, 설명서대로 만드는 것이 아닌 부품들을 제 맘대로 재조합해서 기존의 것을 변형하거나 새로운 것을 창조하는 것을 즐겼습니다. 그리고 자라서는 레고가 아닌 프로그램을 만드는 방법에 대해 공부하게 되었고 지금은 제작에 많은 자유도가 보장되고 그 결과를 바로 확인할 수 있는 프론트엔드 웹 개발에 큰 매력을 느끼게 되었습니다.\n" + "\n" + "현재는 그저 배울 게 많은 학생에 불과하지만, 미래에는 페이스북이나 유튜브와 같이 사람들의 일상에 많은 영향을 주는 웹서비스 제작에 참여하고, 더 나아가 많은 개발자들이 사용하는 라이브러리, 프레임워크, 플랫폼, 언어 등을 만드는 사람이 되고자 합니다.\n" + "\n" + "\n" + "\n" + "## Technologies for Graceful Life\n" + "\n" + "역사적으로 기술발전은 인류의 삶에 많은 영향을 끼쳐왔습니다. 그 결과로 점점 많은 사람들이 이전보다 더 우아한 삶을 영위할 수 있게 되어가고  있습니다. 현대에도 기술은 사람들의 삶의 질을 높이는데 기여해야 한다고 생각하며 프로그램 하나를 만들더라도 이는 예외가 될 수 없습니다. 따라서 저는 구현과 재사용성 뿐만 아니라 항상 사용자 경험에 대해 고민하는 개발자가 되고자 합니다."
}), new _models.Post({
    belongToMajor: 'About',
    belongToMinor: 'history',
    title: 'whoami_history',
    dateCreated: new Date().getTime(),
    dateUpdated: new _models.UpdatedData({ dateUpdated: new Date().getTime() }),
    content: "## Pre-Entrance\n" + "\n" + "* 1993\n" + "    * 출생\n" + "* 2009\n" + "    * 고양외국어고등학교 입학 (영어과)\n" + "* 2010\n" + "    * KAIST 사이버과학영재교육 겨울캠프 수학교육과정 이수\n" + "* 2011\n" + "    * KMC(한국수학경시대회) 장려\n" + "\n" + "\n" + "\n" + "\n" + "## Undergraduate\n" + "\n" + "* 2013\n" + "    * 건국대학교 컴퓨터공학과 입학\n" + "* 2014\n" + "    * 교내 정보보호동아리 securityFACT 가입\n" + "* 2015\n" + "    * 군입대 (네트워크관리병)\n" + "* 2016\n" + "    * APM 기반 군 간부 독서기록관리 웹서비스 제작\n" + "    * 전역\n" + "* 2017\n" + "    * 소프트웨어 마에스트로 8기 참여\n" + "* 2018\n" + "    * 블로그 오픈"
})];

var savePostsInOrder = function savePostsInOrder(idx, limit) {
    if (idx >= limit) {
        console.log("Save completed.");
        return;
    }
    posts[idx].save(function (err) {
        if (err) {
            console.log("Failed to save");
            return console.error(err);
        } else {
            console.log("Succeeded to save");
        }
    }).then(function () {
        savePostsInOrder(++idx, limit);
    });
};

savePostsInOrder(0, posts.length);

// for(let [key, item] of Object.entries(posts)) {
//     item.save(function(err) {
//         // if(err) {
//         //     console.log("Failed to save");
//         //     return console.error(err);
//         // }
//         // else {
//             console.log("Succeeded to save");
//         // }
//     }).catch((err) => {
//         console.log("Failed to save");
//         return console.error(err);
//     });
// }