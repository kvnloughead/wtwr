import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className='page'>
      <div className='page__wrapper'>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
