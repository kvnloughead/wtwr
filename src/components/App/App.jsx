import React from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import FormContents from '../FormContents/FormContents';
import './App.css';

function App() {
  const [activeModal, setActiveModal] = React.useState('');

  const openAddModal = () => setActiveModal('add');

  const closeModal = () => {
    setActiveModal('');
  };

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header openAddModal={openAddModal} />
        <Main />
        <Footer />
        <ModalWithForm
          activeModal={activeModal}
          title="New garment"
          openAddModal={openAddModal}
          closeModal={closeModal}
        >
          <FormContents />
        </ModalWithForm>
      </div>
    </div>
  );
}

export default App;
