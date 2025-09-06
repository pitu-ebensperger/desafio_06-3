import { toast, Slide } from "react-toastify";
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";


export const successToast = (message = "") => {
  return toast(
    <div className="flex items-center gap-2">
      <span> {message}</span>
    </div>, 
      {
      icon: <BadgeCheck style={{ color: "#16a34a" }} />,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      className: "toast-success",    
      progressClassName: "toast-progress-success",
      transition: Slide,
    });
};


export const errorToast = (message = "") => {
  return toast.error(
    <div className="flex items-center gap-2">
      <span> {message}</span>
    </div>, 
      {
      icon: <CircleAlert style={{ color: "#dc2626" }} />,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      className: "toast-error",    
      progressClassName: "toast-progress-error",
      transition: Slide,
    });
};

export const warnToast = (message = "") => {
  return toast.warn( 
    <div className="flex items-center gap-2">
      <span> {message}</span>
    </div>, 
      {
      icon: <TriangleAlert style={{ color: "#d9a406ff" }} />,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      className: "toast-warn",    
      progressClassName: "toast-progress-warn",
      transition: Slide,
    });
};

export const infoToast = (message = "") => {
  return toast.info( 
    <div className="flex items-center gap-2">
      <span> {message}</span>
    </div>, 
      {
      icon: <Info style={{ color: "#4f46e5" }} />,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      className: "toast-info",    
      progressClassName: "toast-progress-info",
      transition: Slide,
    });
};

