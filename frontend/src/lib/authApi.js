import axios from 'axios';


export const studentForgotPassword = async (email) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/student/forgot-password/`;
    const options = {
        method: 'POST',
        body: { email },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(url, { email }, options);
        // console.log(response.data.message);
        if (response.status == 200) return [true, response.data];
        return [false, response.data];
    } catch (error) {
        console.error(error);
        return [false, error.response.data];
    }
}

export const studentVerifyOtp = async (email, otp) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/student/verify-otp/`;
    const options = {
        method: 'POST',
        body: { email, otp },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(url, { email, otp }, options);
        // console.log(response.data.message);
        if (response.status == 200) return [true, response.data];
        return [false, response.data];
    } catch (error) {
        console.error(error);
        return [false, error.response.data];
    }
}


export const studentResetPassword = async (resetToken, password) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/student/reset-password/`;
    const options = {
        method: 'POST',
        body: { resetToken, password },
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(url, { resetToken, password }, options);
        // console.log(response.data.message);
        if (response.status == 200) return [true, response.data];
        return [false, response.data];
    } catch (error) {
        console.error(error);
        return [false, error.response.data];
    }
}