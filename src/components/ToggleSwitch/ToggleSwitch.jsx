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
    <label className="react-switch-label" htmlFor="react-switch-new">
      <input
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
        checked={isChecked}
        onChange={toggleTempUnit}
      />
      <span className="react-switch-button" />
    </label>
  );
}

export default ToggleSwitch;
