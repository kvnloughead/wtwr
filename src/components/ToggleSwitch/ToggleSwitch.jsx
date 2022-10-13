import React, { useEffect, useContext, useState } from 'react';

import TempUnitContext from '../../contexts/TempUnitContext';
import './ToggleSwitch.css';

function ToggleSwitch() {
  const { tempUnit, toggleTempUnit } = useContext(TempUnitContext);
  const [isChecked, setIsChecked] = useState(tempUnit === 'C');

  useEffect(() => {
    setIsChecked(tempUnit === 'C');
  }, [tempUnit]);

  return (
    <div className="toggle-switch">
      <label
        className={`toggle-switch__label ${
          isChecked ? 'toggle-switch__label_checked' : ''
        }`}
        htmlFor="temp-unit-toggle-switch"
      >
        <input
          className="toggle-switch__checkbox"
          id="temp-unit-toggle-switch"
          type="checkbox"
          checked={isChecked}
          onChange={toggleTempUnit}
        />
        <span
          className={`toggle-switch__button ${
            isChecked ? 'toggle-switch__button_checked' : ''
          }`}
        />
      </label>
    </div>
  );
}

export default ToggleSwitch;
