import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import api from '../../utils/api';
import './App.css';

import { coords, apiKey } from '../../utils/constants';
import getWeather from '../../utils/weatherApi';
import AppContext from '../../contexts/AppContext';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import MessageModal from '../MessageModal/MessageModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState('');
  const [message, setMessage] = useState({ status: '', text: '', open: false });
  const [weather, setWeather] = useState({ temp: { F: NaN, C: NaN } });
  const [clothing, setClothing] = useState([]);
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
    setMessage({ ...message, open: false });
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'F' ? 'C' : 'F');
  };

  const AppContextValue = useMemo(
    () => ({
      loggedIn,
      clothing,
      tempUnit,
      currentUser,
      setCurrentUser,
      toggleTempUnit,
    }),
    [clothing, tempUnit, loggedIn, currentUser]
  );

  const handleAddItemSubmit = (values) => {
    setClothing([{ ...values, _id: clothing.length }, ...clothing]);
  };

  const loginUser = (user, validToken) => {
    setToken(validToken);
    localStorage.setItem('token', validToken);
    setCurrentUser(user);
    setLoggedIn(true);
    navigate('/profile');
  };

  const openMessageModal = (errorMessage, status = 'error') => {
    setMessage({ status, text: errorMessage, open: true });
  };

  const handleLogin = async (values) => {
    const res = await api.signin(values);
    if (res.message) {
      openMessageModal(res.message);
    } else {
      const user = await api.getCurrentUser(res.token);
      if (user.message) {
        openMessageModal(user.message);
      } else {
        loginUser(user, res.token);
      }
    }
    return res;
  };

  const handleRegistration = async (values) => {
    const res = await api.signup(values);
    if (res.message) openMessageModal(res.message);
    else {
      openMessageModal('Your account has been created', 'success');
      handleLogin(values);
    }
    return res;
  };

  const getItems = async () => {
    const res = await api.getItems();
    if (res.message) {
      openMessageModal(res.message);
    } else {
      setClothing(res);
    }
  };

  useEffect(() => {
    getItems();
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

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const user = await api.getCurrentUser(token);
        loginUser(user, token);
      }
    };
    checkToken();
  }, []);

  return (
    <div className="page">
      <AppContext.Provider value={AppContextValue}>
        <Header openModal={openModal} location={location} />

        <Routes>
          <Route
            path="/"
            element={<Main openModal={openModal} weather={weather} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile openModal={openModal} clothing={clothing} />
              </ProtectedRoute>
            }
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
  );
}

export default App;
