import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./javaScript/ScrollToTop";
import useOffcanvasCleanup from "./javaScript/useOffcanvasCleanup";
import { ToastContainer, Bounce } from 'react-toastify';

import Home from './home/home.jsx';
import Help from './help/Help.jsx';
import About from './about/About.jsx';
import Register from './registration_form/Registration.jsx';
import Login from './Login/Login.jsx';

import Header from './header_footer/header.jsx';
import Update from './update/update.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import Event from './event/Event.jsx';

function AppRoutes() {
  useOffcanvasCleanup();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Help' element={<Help />} /> 
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />

        <Route path='/Header' element={<Header />} />
        <Route path='/Update' element={<Update />} />
        <Route path='/Dashboard' element={<Dashboard />} /> 
        <Route path='/Event' element={<Event />} />
      </Routes>

      {/*Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" transition={Bounce} />
    </>
  );
}

export default AppRoutes;
