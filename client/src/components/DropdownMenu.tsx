import React, {useState, FunctionComponent} from 'react';
import axios from 'axios';



import prefs from '../data/prefectures.json'



type Props = {
    
    labelName: string | undefined,
    onChange: (event: React.MouseEvent<HTMLElement>) => void,
    
}



// :(React.FC<Props>)
function DropdownMenu( {labelName, onChange}: Props ) {
    const [selected, setSelected] = useState<string>(prefs[12].name);
    
    function handleChange (event:React.MouseEvent<HTMLElement>) {
        
    }
    return (
        <>
            <div className="dropdownMenu">
                <label>{labelName}</label>
            </div>
        </>
    )
}

export default DropdownMenu;