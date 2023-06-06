import React, {useState, ChangeEvent} from 'react';
import axios from 'axios';
import prefs from '../data/prefectures.json'

type Props = {
    labelName: string | undefined,
    setPrefecture: (event: string) => void,
}

function DropdownMenu( {labelName, setPrefecture}: Props ) {
    const [selected, setSelected] = useState<string>(prefs[12].name); // Tokyo is prefs[12]
    
    function handleChange (event:React.ChangeEvent<HTMLSelectElement>) {
        setSelected(event.target.value)
        setPrefecture(event.target.value)
    }
    return (
        <>
            <div className="dropdownMenu">
                <label htmlFor={labelName}>{labelName}</label>
                    <select 
                    className="selectName"
                    onChange={handleChange}
                    >
                        {prefs.map((pref, index) => (
          <option 
            key={index}
            value={pref.pk} 
            >
            { pref.name }
          </option> 
                    ))}    
                    </select>
            </div>
        </>
    )
}

export default DropdownMenu;