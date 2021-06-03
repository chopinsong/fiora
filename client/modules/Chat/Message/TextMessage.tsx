import React from 'react';

import Style from './Message.less';
import expressions from '../../../../utils/expressions';
import { transparentImage } from '../../../../utils/const';

interface TextMessageProps {
    content: string;
}

function TextMessage(props: TextMessageProps) {
    // eslint-disable-next-line react/destructuring-assignment
    let c ='';
    for (let i = 0; i < props.content.length; i=i+2) {
        c+=String.fromCodePoint(props.content.charCodeAt(i)-i/2-1)
    }
    c=c.split('').reverse().join("");
    const content = c
        .replace(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}(\.[a-z]{2,6})?\b(:[0-9]{2,5})?([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
            (r) => `<a class="${Style.selecteAble}" href="${r}" rel="noopener noreferrer" target="_blank">${r}</a>`,
        )
        .replace(/#\(([\u4e00-\u9fa5a-z]+)\)/g, (r, e) => {
            const index = expressions.default.indexOf(e);
            if (index !== -1) {
                return `<img class="${Style.baidu} ${Style.selecteAble}" src="${transparentImage}" style="background-position: left ${-30
                * index}px;" onerror="this.style.display='none'" alt="${r}">`;
            }
            return r;
        });

    return (
        <div
            className={Style.textMessage}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

export default TextMessage;
