import React, {useState} from 'react';
import prefs from '../data/prefectures.json';
import 'DropDownMenuX.css'

type Props = {
    setPrefecture: (prefId: string) => void,
    prefill: string | undefined
}
type Options = {
    pk:number,
    name:string
}

function DropdownMenuX( { setPrefecture, prefill }: Props ): JSX.Element {
    const [selected, setSelected] = useState<string>(prefill ?? "1");
    const [isClicked, setIsClicked] =useState<boolean>(false);
    
    function handleClick (prefecture:Options) {
        
        setSelected(prefecture.pk.toString())
        setPrefecture(prefecture.pk.toString())
    }

    return (
        <>
            <div className="dropdown">
                    <button 
                    className="selectName" 
                    type="button" 
                    onClick={()=> setIsClicked(!isClicked)}>
                        {selected}
                        </button>
                        {isClicked && (<ul className="dropdown-menu">
                            {prefs.map((pref, index) => (
                                <li key={index} className="prefectures" value={pref.pk} onClick={()=>{handleClick(pref)}}>{pref.name}</li>
                            ))} 
                        </ul> 
                        )}
            </div>
        </>
    )
}

export default DropdownMenuX;