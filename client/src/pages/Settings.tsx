import React from 'react';

interface Props {};

function Settings({}: Props) {
  return (
    <div>
      <h1>
        Settings
      </h1>
      <h2>
        Username
      </h2>
      <form>
        <label>
          Username
          <input type="username" defaultValue="Username"/>
        </label>
        <label>
          Email Address
          <input type="email" defaultValue="example@email.com"/>
        </label>
        <label>
          Home Prefecture
          <select>
            <option value="1">Default</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Settings;