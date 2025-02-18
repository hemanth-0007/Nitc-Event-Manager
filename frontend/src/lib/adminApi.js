

import axios from 'axios';
import Cookies from 'js-cookie';

export const createStudent = async (user) => {
    const url = `${process.env.REACT_APP_API_URL}/api/admin/student/`;
    const options = {
        method: 'POST',
        body: user,
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }
    try {
        const response = await axios.post(url, user, options);
        console.log(response);
        if(response.status === 201)
             return [true, response.data];
        else 
             return [false, response.data];
    } catch (error) {
        console.log(error);
        return [false, error.response.data];
    }
}

export const createFaculty = async (user) => {
    const url = `${process.env.REACT_APP_API_URL}/api/admin/faculty/`;
    const options = {
        method: 'POST',
        body: user,
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }
    try {
        const response = await axios.post(url, user, options);
        if(response.status === 201)
             return [true, response.data];
        else 
             return [false, response.data];
    } catch (error) {
        console.error(error.response);
        return [false, error.response.data];
    }
}


export const getFaculties = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/admin/faculty-names/`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }
    try {
        const response = await axios.get(url, options);
        console.log("response is",response);
        if(response.statusText === "OK") return response.data;
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
