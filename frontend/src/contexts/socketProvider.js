import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    
    const fetchNotifications = async () => {
       const token = Cookies.get("token");
       const url = `${process.env.REACT_APP_API_URL}/api/student/notifications/`;
       const options = {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
           },
       }
       try {
           const response = await fetch(url, options);
           if (response.ok) {
               const data = await response.json();
               console.log(data);
               setNotifications(data);
             } else {
               const data = await response.json();
               console.log(data);
               // console.log("error");
           }
       } catch (error) {
           console.log(error.message);
       }
    }
   
    useEffect(() => {
        fetchNotifications(); 
    }, []);
 
    useEffect(() => {
        const backendUrl = process.env.REACT_APP_API_URL;
        const newSocket = io(backendUrl, {
            auth: {
                token: Cookies.get('token')
            }
        }); 
        
        
        newSocket.on('connect', () => {
            console.log('Connected to the server', newSocket.id);
        });
        setSocket(newSocket);


        // newSocket.on('student-notification-comment', (reqId, comment, notification) => {

        //     setNotifications((prevNotifications) => [...prevNotifications, notification]);
            
        // });


        return () => newSocket.close();
    }, []);


    const markAsRead = async (notificationId) => {
        const token = Cookies.get("token");
        const url = `${process.env.REACT_APP_API_URL}/api/student/notifications/mark-as-read/${notificationId}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const response = await fetch(url, options);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                console.log("notification marked as read");
                setNotifications((prevNotifications) => prevNotifications.map((notification) => {
                    if(notification._id == notificationId){
                        return {
                            ...notification,
                            isRead: true
                        }
                    }
                    return notification;
                }));
            }
            else{
                const data = await response.json();
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    
    }


    const  markAllRead = async () =>{
        const token = Cookies.get("token");
        const url = `${process.env.REACT_APP_API_URL}/api/student/notifications/mark-as-read/`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const response = await fetch(url, options);
            if(response.ok){
                const data = await response.json();
                console.log(data);
                console.log("all notifications marked as read");
                setNotifications((prevNotifications) => prevNotifications.map((notification) => {
                    return {
                        ...notification,
                        isRead: true
                    }
                }));
            }
            else{
                const data = await response.json();
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    const setNotification = (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
    }
 
 
    return (
        <SocketContext.Provider value={{ socket, notifications, markAsRead, markAllRead, setNotification }}>
            {children}
        </SocketContext.Provider>
    );
};