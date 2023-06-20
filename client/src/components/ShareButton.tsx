import React from 'react';
import { ShareIcon } from '@heroicons/react/24/solid'
import '../styles/ShareButton.css';

type Props = {
    hasShared: boolean,
    clickHandler:React.MouseEventHandler<HTMLDivElement>
};


const ShareButton = ( { hasShared, clickHandler }: Props ) => {

    return (
        <div>
            <div className='share__button' onClick={clickHandler}>
                <ShareIcon className="share__button solid"/>
                </div>
                <div className='share__button text'>
                {hasShared ? "Link Copied" : null }
            </div>
        </div>
    )
}

export default ShareButton;