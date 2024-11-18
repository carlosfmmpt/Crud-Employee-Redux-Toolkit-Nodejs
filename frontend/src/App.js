import './App.css';
import EmployeeRegistration from './components/EmployeeRegistration';
import HomePage from './components/HomePage';
import Banner from './components/BannerUp';
import { Provider } from 'react-redux';
import { store } from './store';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Banner/>
        <Routes>
          
          <Route path="/" element={<HomePage />} />      
          <Route path="/employee-registration" element={<EmployeeRegistration />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
