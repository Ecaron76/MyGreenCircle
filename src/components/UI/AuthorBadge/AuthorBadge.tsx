import React from 'react'

import Image from 'next/image';
import './AuthorBadge.css'
type AuthorBadgeProps = {
    groupeName?: string;
    author?: string;
};

const AuthorBadge: React.FC<AuthorBadgeProps> = ({ groupeName, author }) => {
    if (groupeName) {
        return (
            <div className="groupeAuthor">
                <div className="authorIcon">
                    <Image alt="" src='/assets/images/pp.png' width={70} height={70} className="authorIcon" />
                </div>
                <div className="authorInfos">
                    <h3>{groupeName}</h3>
                    <h4>{author}</h4>
                </div>
            </div>
        )
    } else {
        return (
            <div className="groupeAuthor">
                <div className="authorIcon">
                    <Image alt="" src='/assets/images/pp.png' width={70} height={70} className="authorIcon" />
                </div>
                <div className="authorInfos">
                    <h3>{author}</h3>
                </div>
            </div>
        )
    }


};
export default AuthorBadge




