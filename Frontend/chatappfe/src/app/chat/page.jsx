'use client';
import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState(''); 
    const [socket,setSocket] = useState(null);


    
useEffect(() => {
    const newSocket = io("http://localhost:5300");
    setSocket(newSocket)
    
    //listening for messages from server
    newSocket.on('chat msg', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => newSocket.close();
},[]);
   
const sendMsg = (e) => {
    e.preventDefault();
    if(socket && inputText.trim()!==''){
        socket.emit('chat msg', inputText);
        
        setInputText('');
    
    }
}
    
    return (
        <>
        
            <form onSubmit={sendMsg}
            className="max-w-sm mx-auto my-10 relative">
            <div className="mb-5">
                
                <input type="text" id="large-input" 
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                
                />
            </div>
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
                dark:hover:bg-blue-700 dark:focus:ring-blue-80">
                    Submit
                </button>
            
            </form>
            <div className="max-w-md mx-auto bg-color-yellow-100 p-4 rounded-lg shadow-md">
                <h1>Debug</h1>
                message is of type {typeof messages}
                {Array.isArray(messages) ? <p>{messages.length} </p>: 'not a array'}
            </div>
            <div className="max-w-sm mx-auto">
                <h3 className="text-lg font-semibold mb-4">Messages:</h3>
                
                {/* Safety check before using .map() */}
                {Array.isArray(messages) ? (
                    messages.length === 0 ? (
                        <p className="text-gray-500">No messages yet</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className="my-2 p-4 border border-gray-300 rounded-lg bg-black">
                                {msg}
                            </div>
                        ))
                    )
                ) : (
                    <p className="text-red-500">Error: Messages is not an array!</p>
                )}
            </div>
        

        </>
    )
}
export default ChatPage;