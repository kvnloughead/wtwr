import React from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import FormContents from '../FormContents/FormContents';
import ItemModal from '../ItemModal/ItemModal';
import './App.css';

import { coords, apiKey } from '../../utils/constants';
import { getWeather } from '../../utils/weatherApi';

function App() {
  const [activeModal, setActiveModal] = React.useState('');
  const [weather, setWeather] = React.useState({ tempF: NaN });
  const [selectedCard, setSelectedCard] = React.useState({
    _id: -1,
    name: '',
    weather: '',
    link: '',
  });
  const [location, setLocation] = React.useState({ ...coords, city: '' });

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

  React.useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => {
        setWeather({ tempF: data.current.temp_f });
        setLocation({ ...location, city: data.location.name });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
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
      </div>
    </div>
  );
}

export default App;
