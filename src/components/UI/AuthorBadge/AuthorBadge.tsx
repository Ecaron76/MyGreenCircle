import React from 'react'

import Image from 'next/image';
import './AuthorBadge.css'
type AuthorBadgeProps = {
    groupName?: string;
    author?: string;
};

const AuthorBadge: React.FC<AuthorBadgeProps> = ({ groupName, author }) => {
    if (groupName) {
        return (
            <div className="groupeAuthor">
                <div className="authorIcon">
                    <Image alt="" src='/assets/images/pp.png' width={70} height={70} className="authorIcon" />
                </div>
                <div className="authorInfos">
                    <h3>{groupName}</h3>
                    <h4>{author}</h4>
                </div>
            </div>
        )
    } else {
        return (
            <div className="groupeAuthor">
                <div className="authorIcon">
                    <Image alt="" src='/assets/images/logo.png' width={70} height={70} className="authorIcon" />
                </div>
                <div className="authorInfos">
                    <h3>{author}</h3>
                </div>
            </div>
        )
    }


};
export default AuthorBadge




