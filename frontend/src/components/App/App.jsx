import { Routes, Route } from 'react-router';
import React, { useState, useMemo } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import defaultClothingItems from '../../utils/clothing';
import api from '../../utils/api';
import './App.css';

import { coords, apiKey } from '../../utils/constants';
import getWeather from '../../utils/weatherApi';
import AppContext from '../../contexts/AppContext';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import MessageModal from '../MessageModal/MessageModal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [message, setMessage] = useState({ status: '', text: '' });
  const [weather, setWeather] = useState({ temp: { F: NaN, C: NaN } });
  const [clothing, setClothing] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState({
    _id: -1,
    name: '',
    weather: '',
    link: '',
  });
  const [location, setLocation] = useState({ ...coords, city: '' });
  const [tempUnit, setTempUnit] = useState('F');

  const openModal = (evt, card) => {
    const { modal } = evt.target.dataset;
    setActiveModal(modal);
    if (modal === 'preview') setSelectedCard(card);
  };

  const closeModal = (callback = () => {}) => {
    setActiveModal('');
    callback();
  };

  const closeMessageModal = () => {
    setMessage({ status: '', text: '' });
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'F' ? 'C' : 'F');
  };

  const AppContextValue = useMemo(
    () => ({ loggedIn, clothing, tempUnit, toggleTempUnit }),
    [clothing, tempUnit, loggedIn]
  );

  const handleAddItemSubmit = (values) => {
    setClothing([{ ...values, _id: clothing.length }, ...clothing]);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegistration = async (values) => {
    const res = await api.signup(values);
    if (res.message)
      setMessage({
        status: 'error',
        text: res.message,
      });
    else {
      setMessage({
        status: 'success',
        text: 'Your account has been created',
      });
      setLoggedIn(true);
    }
    return res;
  };

  React.useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => {
        setWeather({
          temp: {
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          id: data.weather[0].id,
        });
        setLocation({ ...location, city: data.name });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <AppContext.Provider value={AppContextValue}>
          <Header openModal={openModal} location={location} />

          <Routes>
            <Route
              path="/"
              element={<Main openModal={openModal} weather={weather} />}
            />
            <Route
              path="/profile"
              element={<Profile openModal={openModal} clothing={clothing} />}
              weather={weather}
            />
          </Routes>

          <Footer />

          <AddItemModal
            activeModal={activeModal}
            title="New garment"
            closeModal={closeModal}
            handleAddItemSubmit={handleAddItemSubmit}
          />

          <RegistrationModal
            onRegistration={handleRegistration}
            activeModal={activeModal}
            openModal={openModal}
            title="Registration"
            closeModal={closeModal}
          />

          <LoginModal
            activeModal={activeModal}
            openModal={openModal}
            title="Login"
            closeModal={closeModal}
            onLogin={handleLogin}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeModal}
            onRegistration={handleRegistration}
          />

          <MessageModal
            onClose={closeMessageModal}
            data={message}
            openModal={openModal}
          />
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
