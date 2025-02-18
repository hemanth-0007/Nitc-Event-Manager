import React from "react";
import NavBar from "./StudentNavbar";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { Role } from "../../constants/roles.js";

import { useSocket } from "../../contexts/socketProvider.js";

const StudentReqDetailedView = (props) => {
  // this is the request id
  const { id } = useParams();

  const [request, setRequest] = useState({});

  const [comment, setComment] = useState("");

  const getRequestData = async () => {
    const token = Cookies.get("token");
    const url = `${process.env.REACT_APP_API_URL}/api/student/req/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setRequest(data);
      } else {
        const data = await response.json();
        console.log(data);
        // console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getRequestData();
  }, [id]); // this is to trigger a re-render

 

  const { socket, setNotification } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleComment = (reqId, comment, notification) => {

      if(notification){
        setNotification(notification);
      }

      if (reqId === id ) {
        setRequest((prev) => ({
          ...prev,
          comments: [...prev.comments, comment],
        }));
      }
    };

    socket.on("student-notification-comment", handleComment);

    // Cleanup function to remove the listener
    return () => {
      socket.off("student-notification-comment", handleComment);
    };
  }, [socket, id]);

  const renderComments = () => {
    return request.comments.map((comment, index) => (
      <div
        key={index}
        className={`p-4 rounded-lg ${
          comment.sender === Role.STUDENT
            ? "bg-blue-50 flex flex-row justify-end"
            : "bg-green-50"
        }`}
      >
        <div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          <div className="text-xs text-gray-500">
            {comment.sender === Role.STUDENT ? "YOU" : "FACULTY"} |{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    ));
  };

  const onClickSubmitComment = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/student/req/comment/${id}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        content: comment,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        getRequestData();
      } else {
        const data = await response.json();
        console.log(data);
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
    setComment("");
  };

  const onClickDownloadDocument = async (e) => {
    e.target.disabled = true;
    e.target.classList.add("bg-gray-400", "cursor-not-allowed");
    const buffer = new Uint8Array(request?.document?.data);
    const blob = new Blob([buffer], { type: "application/pdf" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = request.document.filename || "document";
    a.click();
    e.target.disabled = false;
    e.target.classList.remove("bg-gray-400", "cursor-not-allowed");
  };

  const onKeyDownSubmitComment = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onClickSubmitComment();
    }
  };

  return (
    <div>
      <NavBar />

      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg my-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {request.title}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{request.description}</p>
        <div className="mb-4 flex flex-col md:flex-row gap-6">
          <div>
            <span className="font-semibold text-gray-800">Category:</span>{" "}
            <span className="text-gray-700">{request.category}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-800">Status:</span>{" "}
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                request.status === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : request.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {request.status}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Start Time:</span>{" "}
            {new Date(request.startTime).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">End Time:</span>{" "}
            {new Date(request.endTime).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {request.location}
          </div>
        </div>
        {request.document && (
          <div className="mt-4">
            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={onClickDownloadDocument}
            >
              Download Document
            </button>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Comments</h2>
          <div className="space-y-4">
            {request.comments && request.comments.length > 0 ? (
              renderComments()
            ) : (
              <p>No Comments posted yet</p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Add a Comment
            </h3>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={onKeyDownSubmitComment}
            ></textarea>
            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={onClickSubmitComment}
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReqDetailedView;
