import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./javaScript/ScrollToTop";
import useOffcanvasCleanup from "./javaScript/useOffcanvasCleanup";
import { ToastContainer, Bounce } from 'react-toastify';

import Header from './header_footer/header.jsx';
import Home from './home/home.jsx';
import Register from './registration_form/Registration.jsx';
import Login from './Login/Login.jsx';
import About from './about/About.jsx';
import Help from './help/Help.jsx';
import Event from './event/Event.jsx';
import Dashboard from './dashboard/dashboard.jsx';

function AppRoutes() {
  useOffcanvasCleanup();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/Header' element={<Header />} />
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Dashboard' element={<Dashboard />} /> 
        <Route path='/Register' element={<Register />} />
        <Route path='/Event' element={<Event />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Help' element={<Help />} /> 
      </Routes>

      {/*Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default AppRoutes;
