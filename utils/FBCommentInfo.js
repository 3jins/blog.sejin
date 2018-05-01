import graph from 'fb-react-sdk';

const getCommentCount = (url) => {
    const domain = "http://enhanced.kr";
    graph.api(
        domain + url,
        (response) => {
            if (response && !response.error) {
                /* handle the result */
                console.log(response);
                return response;
            }
            else {
                console.log("Sth's goin' wrong");
                console.log(response);
            }
        }
    );
    //https://graph.facebook.com/v2.4/?fields=share{comment_count}&id=http://enhanced.kr/postviewer/121
};

export {getCommentCount}