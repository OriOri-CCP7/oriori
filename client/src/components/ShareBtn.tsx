import React from 'react';
import { ShareIcon as ShareBtnSolid } from '@heroicons/react/24/solid'
import '../styles/ShareBtn.css';

type Props = {
    hasShared: boolean,
    clickHandler:React.MouseEventHandler<HTMLDivElement>
};


const Share = ( { hasShared, clickHandler }: Props ) => {

    return (
        <div>
            <div className='share__btn' onClick={clickHandler}>
                <ShareBtnSolid className="share__btn solid"/>
                <br />
                {hasShared ? null : "Link Copied"}
            </div>
        </div>
    )
}

export default Share;