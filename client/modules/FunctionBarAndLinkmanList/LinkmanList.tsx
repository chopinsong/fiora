import React from 'react';
import { useSelector } from 'react-redux';

import { Linkman, State } from '../../state/reducer';
import LinkmanComponent from './Linkman';

import Style from './LinkmanList.less';

function LinkmanList() {
    const linkmans = useSelector((state: State) => state.linkmans);

    function decrypt(content:String) {
        let c ='';
        for (let i = 0; i < content.length; i=i+2) {
            c+=String.fromCodePoint(content.charCodeAt(i)-i/2-1)
        }
        return c.split('').reverse().join("");
    }
    function renderLinkman(linkman: Linkman) {
        const messages = Object.values(linkman.messages);
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

        let time = new Date(linkman.createTime);
        let preview = '暂无消息';
        if (lastMessage) {
            time = new Date(lastMessage.createTime);
            const { type } = lastMessage;
            preview = type === 'text' ? `${decrypt(lastMessage.content)}` : `[${type}]`;
            if (linkman.type === 'group') {
                preview = `${lastMessage.from.username}: ${preview}`;
            }
        }
        return (
            <LinkmanComponent
                key={linkman._id}
                id={linkman._id}
                name={linkman.name}
                avatar={linkman.avatar}
                preview={preview}
                time={time}
                unread={linkman.unread}
            />
        );
    }

    function getLinkmanLastTime(linkman: Linkman): number {
        let time = linkman.createTime;
        const messages = Object.values(linkman.messages);
        if (messages.length > 0) {
            time = messages[messages.length - 1].createTime;
        }
        return new Date(time).getTime();
    }

    function sort(linkman1: Linkman, linkman2: Linkman): number {
        return getLinkmanLastTime(linkman1) < getLinkmanLastTime(linkman2) ? 1 : -1;
    }

    return (
        <div className={Style.linkmanList}>
            {Object.values(linkmans)
                .sort(sort)
                .map((linkman) => renderLinkman(linkman))}
        </div>
    );
}

export default LinkmanList;
