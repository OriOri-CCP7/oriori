import React, {useState} from 'react';
import prefs from '../data/prefectures.json';

import '../styles/DropdownMenu.css';

type Props = {
  labelName?: string,
  setPrefecture: (prefId: string) => void,
  prefill?: string
};

function DropdownMenu( {labelName, setPrefecture, prefill}: Props ) {
  const [selected, setSelected] = useState<string>(prefill ?? "");
  
  function handleChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(event.target.value);
    setPrefecture(event.target.value);
  };

  return (
    <>
      <div className="dropdownMenu">
        <label>
          { labelName ?? "" }
          <select className="selectName" onChange={ handleChange } value={ selected }>
            <option key={ -1 } value="" className="prefectureOption"></option>
            {
              prefs.map((pref, index) => (
                <option key={ index } value={ pref.pk } className="prefectureOption">
                  { pref.name }
                </option> 
              ))
            }
          </select>
        </label>
      </div>
    </>
  );
};

export default DropdownMenu;