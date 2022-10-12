import React, { useState, useMemo } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import FormContents from '../FormContents/FormContents';
import ItemModal from '../ItemModal/ItemModal';
import './App.css';

import { coords, apiKey } from '../../utils/constants';
import { getWeather } from '../../utils/weatherApi';
import TempUnitContext from '../../contexts/TempUnitContext';

function App() {
  const [activeModal, setActiveModal] = useState('');
  const [weather, setWeather] = useState({ temp: { F: NaN, C: NaN } });
  const [selectedCard, setSelectedCard] = useState({
    _id: -1,
    name: '',
    weather: '',
    link: '',
  });
  const [location, setLocation] = useState({ ...coords, city: '' });
  const [tempUnit, setTempUnit] = useState('F');

  const openAddModal = () => setActiveModal('add');
  const openItemModal = (card) => {
    setSelectedCard(card);
    setActiveModal('preview');
  };

  const closeModal = () => {
    setActiveModal('');
    setTimeout(() => {
      setSelectedCard({
        _id: -1,
        name: '',
        weather: '',
        link: '',
      });
    }, 500);
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'F' ? 'C' : 'F');
  };

  const tempUnitContextValue = useMemo(
    () => ({ tempUnit, toggleTempUnit }),
    [tempUnit]
  );

  React.useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => {
        setWeather({
          temp: {
            F: `${data.current.temp_f}°F`,
            C: `${data.current.temp_c}°C`,
          },
        });
        setLocation({ ...location, city: data.location.name });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <TempUnitContext.Provider value={tempUnitContextValue}>
          <Header openAddModal={openAddModal} location={location} />
          <Main openItemModal={openItemModal} weather={weather} />
          <Footer />
          <ModalWithForm
            activeModal={activeModal}
            title="New garment"
            openAddModal={openAddModal}
            closeModal={closeModal}
          >
            <FormContents />
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeModal={closeModal}
          />
        </TempUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
