import React, {useState, ChangeEvent, SetStateAction} from 'react';
import axios from 'axios';
import prefs from '../data/prefectures.json'

type Props = {
    labelName: string | undefined,
    setPrefecture: (prefId: string) => void,
    prefill: string | undefined
}

function DropdownMenu( {labelName, setPrefecture, prefill}: Props ) {
    const [selected, setSelected] = useState<string>(prefill ?? "1");
    
    function handleChange (event: React.ChangeEvent<HTMLSelectElement>) {
        setSelected(event.target.value)
        setPrefecture(event.target.value)
    }

    return (
        <>
            <div className="dropdownMenu">
                <label htmlFor={labelName}>{labelName}</label>
                    <select className="selectName" onChange={handleChange} value={selected}>
                        {prefs.map((pref, index) => (
                            <option key={index} value={pref.pk}>
                        { pref.name }
                     </option> 
                    ))}    
                    </select>
            </div>
        </>
    )
}

export default DropdownMenu;