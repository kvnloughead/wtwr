import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
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

  const openAddModal = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    setActiveModal('add');
  };

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
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
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
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Main openItemModal={openItemModal} weather={weather} />
                }
              />
              <Route
                path="/profile"
                element={<Profile openAddModal={openAddModal} />}
                weather={weather}
              />
            </Routes>
          </BrowserRouter>
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
