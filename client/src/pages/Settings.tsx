import React from 'react';
import DropdownMenu from "../components/DropdownMenu"

interface Props {
 
};

function Settings({}: Props) {
  return (
    <div className="Setting">
      <h1>Settings</h1>
      <h2>Username</h2>
      <form>
        <label >
          Username
          <input type="username" defaultValue="Username"/>
        </label>
        <label>
          Email Address
          <input type="email" defaultValue="example@email.com"/>
        </label>
        <label>
          Home Prefecture
          <DropdownMenu labelName="" setPrefecture={(element) => console.log(element)} />
        </label>
      </form>
    </div>
  );
}

export default Settings;