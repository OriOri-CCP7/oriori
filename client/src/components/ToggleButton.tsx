import React, {useState} from 'react';

import '../styles/ToggleButton.css';
type Props = {
    label: string,
    toggled: boolean,
    onClick: React.ChangeEventHandler<HTMLInputElement>
}

const Toggle = ({label, toggled, onClick}: Props) => {

    const [isToggled, toggle] = useState<boolean>(toggled)

    const callback = (): void => {
        const newToggled = !isToggled;
        toggle(newToggled);
        onClick({ 
            target: {
                type:'checkbox',
                checked: newToggled
            },
            currentTarget: {
                type: 'checkbox',
                checked: newToggled,
            },
            } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <>
        <label className="toggle-button-label">
            <input className="toggle-button-input" type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className="toggle-button-span"/>
            <strong className="toggle-button-strong">{label}</strong>
        </label>
        </>
    )



}
export default Toggle;