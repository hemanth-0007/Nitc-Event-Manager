import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const LightToastContainer = ({ toasts }) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2998}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default LightToastContainer;
