import React from 'react';
import { ToastContainer } from 'react-toastify';


const ToastNotify = () => {
  return <ToastContainer
  position="bottom-right" 
  autoClose={5000} 
  hideProgressBar={false} 
  newestOnTop={false} 
  closeOnClick={true} 
  draggable={true} 
  pauseOnHover={true} />;
};

export default ToastNotify;