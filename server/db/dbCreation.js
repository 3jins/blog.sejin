import { Post, UpdatedData } from './models';

const postsAbout = [
    new Post({
        belongToMajor: 'About',
        belongToMinor: 'now',
        title: 'whoami_now',
        dateCreated: new Date().getTime(),
        dateUpdated: new UpdatedData({dateUpdated: new Date().getTime()}),
        content: "웹프로그래머를 꿈꾸는 대학생입니다."
    }),
    new Post({
        belongToMajor: 'About',
        belongToMinor: 'vision',
        title: 'whoami_vision',
        dateCreated: new Date().getTime(),
        dateUpdated: new UpdatedData({dateUpdated: new Date().getTime()}),
        content: "웹프로그래머 될거라고 ㅡㅡ"
    }),
    new Post({
        belongToMajor: 'About',
        belongToMinor: 'history',
        title: 'whoami_history',
        dateCreated: new Date().getTime(),
        dateUpdated: new UpdatedData({dateUpdated: new Date().getTime()}),
        content: "몰라도 됨 ㅡㅡ"
    }),
];

for(let [key, item] of Object.entries(postsAbout)) {
    item.save(function(err) {
        if(err) {
            console.log("Failed to save");
            return console.error(err);
        }
        else {
            console.log("Succeeded to save");
        }
    });
}


// for(let [key, item] of Object.entries(menus)) {
//     item.save(function(err) {
//         if(err) {
//             console.log("Failed to save " + key);
//             return console.error(err);
//         }
//         else {
//             console.log("Succeeded to save " + key);
//         }
//     });
// }
