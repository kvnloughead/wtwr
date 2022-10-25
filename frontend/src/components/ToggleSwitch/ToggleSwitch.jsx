import React, { useEffect, useContext, useState } from 'react';

import AppContext from '../../contexts/AppContext';
import './ToggleSwitch.css';

function ToggleSwitch() {
  const { tempUnit, toggleTempUnit } = useContext(AppContext);
  const [checked, setChecked] = useState(tempUnit === 'C');

  useEffect(() => {
    setChecked(tempUnit === 'C');
  }, [tempUnit]);

  return (
    <label className="switch" htmlFor="checkbox">
      <input type="checkbox" id="checkbox" onChange={toggleTempUnit} />
      <div className="slider round">
        <p className={`unit ${!checked && 'unit_active'}`}>F</p>
        <p className={`unit ${checked && 'unit_active'}`}>C</p>
      </div>
    </label>
  );
}

export default ToggleSwitch;
