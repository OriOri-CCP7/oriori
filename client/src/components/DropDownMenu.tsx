import React, {useState} from 'react';
import prefs from '../data/prefectures.json';
import Button from './Button';

type Props = {
    setPrefecture: (prefId: string) => void,
    prefill: string | undefined
}
type Options = {
    items: []
}

function DropdownMenu( { setPrefecture, prefill}: Props ): JSX.Element {
    const [selected, setSelected] = useState<string>(prefill ?? "1");
    const [isClicked, setIsClicked] =useState<boolean>(false);
    
    function handleClick (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        // setSelected()
        // setPrefecture(event.target.value)
    }

    return (
        <>
            <div className="dropdown">
                    <button 
                    className="selectName" 
                    type="button" 
                    value={selected}>
                        {selected}
                        </button>
                    <ul className="dropdown-menu">
                        {prefs.map((pref, index) => (
                            <li 
                            key={index} 
                            value={pref.pk} 
                            onClick={()=> {handleClick}} 
                            className="prefecture">
                            <a href="#">{ pref.name }</a></li>
                    ))}   
                    </ul>
            </div>
        </>
    )
}

export default DropdownMenu;