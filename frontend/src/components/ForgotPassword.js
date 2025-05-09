import OtpInput from "./OtpInput";

import { studentVerifyOtp } from "../lib/authApi.js";

import LightToastContainer from "./Toast/LightToastContainer.js";
import {renderSuccessToast, renderErrorToast} from "./Toast/toast.js";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();
 
    const handleSubmit =  async (otp) => {
       try {
          const email = localStorage.getItem("email");
          localStorage.removeItem("email");
          console.log(otp);
          console.log(email);
          const [status, data] = await studentVerifyOtp(email, otp);
          if(status){
            // console.log(data);
            const resetToken = data.resetToken;
            localStorage.setItem("resetToken", resetToken);
            if(!resetToken) {
                renderErrorToast("Invalid OTP Please Try Again", "error");
                navigate("/");
                return;
            }
            renderSuccessToast("OTP verified successfully", "success");
            setTimeout(() => {
                navigate(`/student/reset-password`);
            }, 3000);
            return;
          }
          renderErrorToast(data.message);
       } catch (error) {
         console.error("Error verifying OTP:", error);
         renderErrorToast(error.message);
       }

    } 
 
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <LightToastContainer />
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">Please Enter Your OTP</h2>
            <h3 className="text-2xl font-bold text-center">we sent to your registered mail.</h3>
            <div className="flex flex-row">
                <OtpInput length={6} onOtpSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      );
}

export default ForgotPassword;