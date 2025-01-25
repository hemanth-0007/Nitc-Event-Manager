import React from 'react';
import NavBar from './StudentNavbar';
import { useState, useEffect } from 'react';

import { Places , LocationArray} from '../constants/location.js';

import { RequestType } from '../constants/requestType.js';

import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from '../constants/global.js';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// import yup package
import { object, string } from 'yup';

import Cookies from 'js-cookie';

const RequestForm = ()  => {
 

    const requestArray = Object.keys(RequestType);
   

    // state to store the form data of the request form
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        startTime: "",
        endTime: "",
        description: "",
        document: ""
    });

    // state to store the errors of the form
    const [errors, setErrors] = useState({});

    const requestformValidation = object({
        title: string()
        .required('Title is required')
        .max(50, 'Title must be at most 50 characters')
        .min(5, 'Title must be at least 5 characters'),
        category: string().required('Category is required'),
        location: string().required('Location is required'),
        startTime: string().required('Start time is required'),
        endTime: string().required('End time is required'),
        description: string().required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(200, 'Description must be at most 200 characters'),
        document: string().required('Document is required')
    });


    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        // set loading to true
        setLoading(true);
        console.log(formData);

        // validate the form using yup package
        try {
            setErrors({});
            await requestformValidation.validate(formData, {abortEarly: false});
            console.log('form is valid'); 
        } catch (error) {
            error.inner.forEach(err => {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [err.path]: err.message
                }));
            });            
            setLoading(false);
            return;
        }

        // validate the start time and end time
        const {startTime, endTime} = formData;
        const start = new Date(startTime);
        const end = new Date(endTime);
        if(start >= end){
            setErrors(prevErrors => ({
                ...prevErrors,
                startTime: 'Start time must be less than end time',
                endTime: 'End time must be greater than start time'
            }));
            setLoading(false);
            return;
        }

        // validate the location and category
        const {location, category} = formData;
        if(category === RequestType.BUS && location !== Places.NONE){
            setErrors(prevErrors => ({
                ...prevErrors,
                location: 'If you select Bus as category then please select None as your location'
            }));
            setLoading(false);
            return;
        }
 
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('location', formData.location);
        data.append('startTime', formData.startTime);
        data.append('endTime', formData.endTime);
        data.append('description', formData.description);
        data.append('pdf-file', formData.document);
        
      
        try {
          const url = `${process.env.REACT_APP_API_URL}/api/student/req/`;

          const options = {
            method: 'POST',
            body: data,
            headers: {
              
              Authorization: `Bearer ${Cookies.get('token')}`
            }
          }
          console.log(url);
          console.log(options);
          
          const response = await fetch(url, options);
          console.log(response)
          if(response.ok){
            console.log("form submitted successfully");
            onClickReset();
            setLoading(false);   
            toast.success('Form submitted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
            });
          }
          else{
              console.log("failed");
              setLoading(false);   
              const data = await response.json();
              toast.error(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
            });
          }
          
        } catch (error) {
            console.error(`Error submitting the form ${error.message}`); 
            setLoading(false);   
            const msg = `${error.message}`
            toast.error(msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
            });
        }
    }

    const onClickReset = () =>{
        setFormData({
            title: "",
            category: "",
            location: "",
            startTime: "",
            endTime: "",
            description: "",
            document: ""
        })
    }

    const onChangeDescription = (e) => {
        const {description} = formData;
        if(description.length > MAX_DESCRIPTION_LENGTH){
            const newDescription = description.substring(0, MAX_DESCRIPTION_LENGTH);
            setFormData({...formData, description: newDescription});
        }
        else{
            setFormData({...formData, description: e.target.value});
        }
    }

    const onChangeTitle = (e) => {
        const {title} = formData;
        if(title.length > 50){
            const newTitle = title.substring(0, MAX_TITLE_LENGTH);
            setFormData({...formData, title: newTitle});
        }
        else{
            setFormData({...formData, title: e.target.value});
        }
    }
    
    
    
    const {title, category, location, startTime, endTime, description, document} = formData;

    return (
        <div>
        <NavBar />
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">Request Form</h2>
            <form className="space-y-6">
                <div>
                <div className='flex justify-between'>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <p className='font-semibold text-slate-600 text-sm'>{title.length}/{MAX_TITLE_LENGTH}</p>
                </div>
                <input 
                id="title" 
                name="title" 
                type="text" 
                placeholder='Enter the title of the event'
                required 
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={onChangeTitle}
                value = {title}
                />
                <p className='text-red-500'>{errors.title}</p>
                </div>
                <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                id="category" 
                name="category" 
                required className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={e => setFormData({...formData, category: e.target.value})}
                value = {category !== "" ? category : "Select a category"}
                >
                    <option value="">Select a category</option>
                    {requestArray.map(request => <option value={request}>{request}</option>)}
                </select>
                <p className='text-red-500'>{errors.category}</p>
                </div>
                <div>
                <p className='text-slate-500 text-sm' >**If you select Bus as category then please select <span className='font-bold' >None</span> as your location </p>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Location</label>
                <select 
                id="category" 
                name="category" 
                required 
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={e => setFormData({...formData, location: e.target.value})}
                    value = {location !== "" ? location : "Select the required location"}
                >
                    <option value="">Select the required location</option>
                    {LocationArray.map(location => <option value={location}>{location}</option>)}
                </select>
                <p className='text-red-500'>{errors.location}</p>

                </div>
                <div>
                <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input 
                id="start-time" 
                name="start-time" 
                type="datetime-local" 
                required 
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                onChange={e => setFormData({...formData, startTime: e.target.value})}
                value = {startTime}
                />
                <p className='text-red-500'>{errors.startTime}</p>
                </div>
                <div>
                <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time</label>
                <input 
                id="end-time" 
                name="end-time" 
                type="datetime-local" 
                required 
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                onChange={e => setFormData({...formData, endTime: e.target.value})}
                value = {endTime}
                />
                <p className='text-red-500'>{errors.endTime}</p>
                </div>
                <div>
                <div className='flex justify-between'>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                                <span className='text-sm mx-1'>
                                    (Please ensure you enter proper description)
                                </span>
                            </label>
                        </div>
                        <p className='font-semibold text-slate-600 text-sm'>{description.length}/200</p>
                </div>
                <textarea 
                    id="description" 
                    name="description" 
                    rows="4" 
                    placeholder='Enter the description of the event'
                    required 
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={onChangeDescription}
                    // onKeyDown={onKeyDownDescription}
                    value = {description}
                >
                </textarea>
                <p className='text-red-500'>{errors.description}</p>
                </div>
                <div>
                <label htmlFor="document" className="block text-sm font-medium text-gray-700">Upload Document <span className='text-sm mx-1'>(Please upload the relevant document)</span> </label>
                
                <input 
                id="document" 
                name="document" 
                type="file" 
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    onChange = {e => setFormData({...formData, document: e.target.files[0]})}
                />
                <p className='text-red-500'>{errors.document}</p>
                </div>
                <div className="flex justify-between">
                <button 
                    type="submit" 
                    className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'cursor-not-allowed' : ''}`}
                    onClick = {e => onSubmit(e)}
                    disabled = {loading}

                >
                {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button 
                type="reset" 
                className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={onClickReset}
                >
                    Reset
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default RequestForm;