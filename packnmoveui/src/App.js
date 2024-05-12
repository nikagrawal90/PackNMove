import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Quotation from './components/Quotation';
import Payment from './components/Payment';
import Checkout from './components/Checkout';
import PrivateRoute from './auth/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Success from './components/Success';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/quotation' element={<PrivateRoute component={Quotation} />}/>
        <Route path='/checkout' element={<PrivateRoute component={Checkout} />} />
        <Route path='/payment' element={<PrivateRoute component={Payment} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/error' element={<Error/>} />
        <Route path='/verify-email:token' element={<VerifyEmail />} />
        <Route path='/success' element={<Success/>} />
        <Route path='*' element={<Dashboard />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
