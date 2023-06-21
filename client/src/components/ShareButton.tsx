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
            <div className='product__button' onClick={clickHandler}>
                <ShareIcon className="product__icon share__icon solid"/>
                </div>
                {hasShared ? "Link Copied" : null }
        </div>
    )
}

export default ShareButton;