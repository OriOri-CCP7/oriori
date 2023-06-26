import React, {useState} from 'react';
import prefs from '../data/prefectures.json';

import '../styles/DropdownMenu.css';

type Props = {
  className?: string,
  labelName?: string,
  setPrefecture: (prefId: string) => void,
  prefill?: string
};

function DropdownMenu({ className, labelName, setPrefecture, prefill }: Props) {
  const [selected, setSelected] = useState<string>(prefill ?? "");
  
  function handleChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(event.target.value);
    setPrefecture(event.target.value);
  };

  return (
    <div className={ "dropdown__container " + (className ?? "") }>
      <label className="dropdown__label">
        { labelName ?? "" }
        <select className="dropdown__select" onChange={ handleChange } value={ selected }>
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
  );
};

export default DropdownMenu;