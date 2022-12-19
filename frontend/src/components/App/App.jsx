import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import api from '../../utils/api';

import { coords, apiKey } from '../../utils/constants';
import getWeather from '../../utils/weatherApi';
import AppContext from '../../contexts/AppContext';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import MessageModal from '../MessageModal/MessageModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState('');
  const [message, setMessage] = useState({ status: '', text: '', open: false });
  const [weather, setWeather] = useState({ temp: { F: NaN, C: NaN } });
  const [clothing, setClothing] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
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

  const openMessageModal = (errorMessage, status = 'error') => {
    setMessage({ status, text: errorMessage, open: true });
  };

  const closeMessageModal = () => {
    setMessage({ ...message, open: false });
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'F' ? 'C' : 'F');
  };

  const handleAddItemSubmit = async (values) => {
    const res = await api.createItem(token, values);
    if (res.message) {
      openMessageModal(message);
    } else {
      setClothing([{ ...res, _id: clothing.length }, ...clothing]);
    }
  };

  const handleEditProfileSubmit = async (values) => {
    const res = await api.updateProfile(token, values);
    if (res.message) {
      openMessageModal(message);
    } else {
      setCurrentUser(res);
    }
  };

  const loginUser = (user, validToken) => {
    setToken(validToken);
    localStorage.setItem('token', validToken);
    setCurrentUser(user);
    setLoggedIn(true);
    navigate('/profile');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(undefined);
    setLoggedIn(false);
  };

  const getItems = async () => {
    const res = await api.getItems();
    if (res.message) {
      openMessageModal(res.message);
    } else {
      setClothing(res);
    }
  };

  const handleLikeClick = async (cardId, isLiked) => {
    const res = await api.updateLike(token, cardId, isLiked);
    if (res.message) {
      openMessageModal(res.message);
    }
  };

  const AppContextValue = useMemo(
    () => ({
      loggedIn,
      clothing,
      tempUnit,
      currentUser,
      setCurrentUser,
      toggleTempUnit,
      handleLikeClick,
      handleLogout,
    }),
    [clothing, tempUnit, loggedIn, currentUser]
  );

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
    <div className="app">
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

        <EditProfileModal
          activeModal={activeModal}
          title="Change profile data"
          closeModal={closeModal}
          onSubmit={handleEditProfileSubmit}
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
