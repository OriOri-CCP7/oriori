import React from 'react';
import { ShareIcon as ShareButtonSolid } from '@heroicons/react/24/solid'
import '../styles/ShareButton.css';

type Props = {
    hasShared: boolean,
    clickHandler:React.MouseEventHandler<HTMLDivElement>
};


const ShareButton = ( { hasShared, clickHandler }: Props ) => {

    return (
        <div>
            <div className='share__btn' onClick={clickHandler}>
                <ShareButtonSolid className="share__btn solid"/>
                </div>
                <div className='share__btn text'>
                {hasShared ? "Link Copied" : null }
            </div>
        </div>
    )
}

export default ShareButton;