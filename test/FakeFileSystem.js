import path from 'path';

export default class FakeFileSystem {
  constructor() {
    this.fakeFileSystem = {
      stat: 'directory',
      name: 'fakeRoot',
      children: [
        {
          stat: 'directory',
          name: 'About',
          children: [
            {
              stat: 'directory',
              name: '1now',
              children: [
                {
                  stat: 'file',
                  name: 'now.md',
                  content: '아이유 - 이 지금',
                },
              ],
            }, // /About/1now end
            {
              stat: 'directory',
              name: '2vision',
              children: [],
            }, // /About/2vision end
            {
              stat: 'directory',
              name: '3history',
              children: [],
            }, // /About/3history end
          ],
        }, // /About end
        {
          stat: 'directory',
          name: 'Works',
          children: [],
        }, // /Works end
        {
          stat: 'directory',
          name: 'Blog',
          children: [
            {
              stat: 'directory',
              name: '1tech',
              children: [
                {
                  stat: 'file',
                  name: '첫번째 기술글이에요#기술1#기술2.md',
                  content: '기술1, 기술2를 배워야지',
                },
                {
                  stat: 'file',
                  name: '두번째 기술글이에요#기술2#기술3.md',
                  content: '기술2, 기술3을 배워야지',
                },
                {
                  stat: 'file',
                  name: '세번째 기술글이에요#기술3#기술1.md',
                  content: '기술3, 기술1을 배워야지',
                },
                {
                  stat: 'file',
                  name: '네번째 기술글이에요.md',
                  content: '배우긴 뭘 배우냐',
                },
              ],
            }, // /Blog/1tech end
            {
              stat: 'directory',
              name: '2life',
              children: [
                {
                  stat: 'file',
                  name: '첫번째 일상글이에요#일상1#일상2#일상3.md',
                  content: '일상1하고 일상2하고 일상3했더니 참 재미있었다.',
                },
                {
                  stat: 'file',
                  name: '두번째 일상글이에요#일상2.md',
                  content: '일상2했더니 참 재미있었다.',
                },
              ],
            }, // /Blog/2life end
            {
              stat: 'directory',
              name: '3etc',
              children: [],
            }, // /Blog/3etc end
          ],
        }, // /Blog end
      ],
    };
  }

  getFileObject(fullPath) {
    return fullPath
      .replace(`${path.resolve()}${path.sep}`, '') // Remove the environment-specific root path info.
      .split(path.sep)
      .reduce((fileObject, fileName) => {
        if (fileObject.name === fileName) return fileObject;
        if (fileObject.stat === 'file') throw Error('[!] Trying to access a file as a directory.');
        const childMatched = fileObject.children.filter(child => child.name === fileName);
        if (childMatched.length === 0) throw Error('[!] Trying to access a non-existing file/directory.');
        return childMatched[0];
      }, this.fakeFileSystem);
  }
}
