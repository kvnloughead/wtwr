import React from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import FormContents from '../FormContents/FormContents';
import './App.css';
import ItemModal from '../ItemModal/ItemModal';

function App() {
  const [activeModal, setActiveModal] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({
    _id: -1,
    name: '',
    weather: '',
    link: '',
  });

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

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header openAddModal={openAddModal} />
        <Main openItemModal={openItemModal} />
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
