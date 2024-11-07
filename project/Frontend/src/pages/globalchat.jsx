// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Globalchat() {
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');
//     const [selectedMessage, setSelectedMessage] = useState(null); // State to track selected message

//     // Fetch userId from localStorage
//     const userId = localStorage.getItem('userId');

//     // Fetch messages from the backend
//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get("http://localhost:9999/messages");
//             setMessages(response.data.data);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     // Send a message
//     const sendMessage = async () => {
//         if (!messageInput || !userId) {
//             console.error('Message input or userId is missing');
//             return;
//         }

//         const token = localStorage.getItem("token");

//         if (!token) {
//             console.error('No token found');
//             return;
//         }

//         try {
//             await axios.post("http://localhost:9999/set-message", {
//                 message: messageInput,
//                 userId,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             });
            
//             setMessageInput(''); // Clear the input field
//             fetchMessages(); // Refresh the message list after sending
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     // Delete a message
//     const deleteMessage = async (indexNo) => {
//         try {
//             await axios.delete(`/delete-message?indexNo=${indexNo}`);
//             fetchMessages(); // Refresh the message list after deleting
//             setSelectedMessage(null); // Reset selected message after deletion
//         } catch (error) {
//             console.error('Error deleting message:', error);
//         }
//     };

//     // Fetch messages on component mount
//     useEffect(() => {
//         fetchMessages();
//     }, []);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#001F3F', color: '#ffffff', padding: '20px' }}>
//             <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Global Chat</h2>
//             <div style={{
//                 flex: 1,
//                 overflowY: 'auto',
//                 padding: '20px',
//                 background: '#ffffff',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//                 color: '#000000',
//                 marginBottom: '20px',
//             }}>
//                 {/* All messages in a single div */}
//                 {messages.map((msg) => (
//                     <div 
//                         key={msg.indexNo} 
//                         style={{
//                             display: 'flex',
//                             justifyContent: userId === msg.userId ? 'flex-start' : 'flex-end', // Align messages
//                             marginBottom: '15px',
//                         }}
//                     >
//                         <div style={{
//                             padding: '10px',
//                             borderRadius: '8px',
//                             background: userId === msg.userId ? '#007bff' : '#f0f0f0', // Blue for user's messages, grey for others
//                             color: userId === msg.userId ? '#ffffff' : '#000000', // White text for user's messages
//                             maxWidth: '70%', // Limit width for better readability
//                             textAlign: 'left', // Align text accordingly
//                         }} onClick={() => setSelectedMessage(msg)}> {/* Set selected message on click */}
//                             <strong>User {msg.userId}:</strong> {msg.message}
//                             <div style={{ fontSize: '12px', marginTop: '5px', color: '#666666' }}>
//                                 {msg.date} {msg.time}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div style={{
//                 display: 'flex',
//                 padding: '20px',
//                 background: '#3A6D8C',
//                 borderRadius: '10px',
//             }}>
//                 <input
//                     type="text"
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                     placeholder="Type your message..."
//                     style={{
//                         flex: 1,
//                         padding: '10px',
//                         border: '1px solid #ddd',
//                         borderRadius: '5px',
//                         fontSize: '16px',
//                         background: '#F5F5F7',
//                         color: '#ffffff',
//                     }}
//                 />
//                 <button 
//                     onClick={sendMessage} 
//                     style={{
//                         marginLeft: '10px',
//                         padding: '10px 15px',
//                         background: '#007bff',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                     }}
//                 >
//                     Send
//                 </button>
//             </div>
//             {/* Modal for selected message */}
//             {selectedMessage && (
//                 <div style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     background: '#1e1e1e',
//                     padding: '20px',
//                     borderRadius: '10px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
//                     zIndex: 1000,
//                 }}>
//                     <h4 style={{ margin: '0 0 10px', color: '#ffffff' }}>Message Details</h4>
//                     <p style={{ margin: '5px 0' }}><strong>Message:</strong> {selectedMessage.message}</p>
//                     <p style={{ margin: '5px 0' }}><strong>Time:</strong> {selectedMessage.date} {selectedMessage.time}</p>
//                     <button 
//                         onClick={() => deleteMessage(selectedMessage.indexNo)} 
//                         style={{
//                             marginTop: '10px',
//                             padding: '10px 15px',
//                             background: 'red',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         Delete Message
//                     </button>
//                     <button 
//                         onClick={() => setSelectedMessage(null)} 
//                         style={{
//                             marginTop: '10px',
//                             padding: '10px 15px',
//                             background: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                             marginLeft: '10px',
//                         }}
//                     >
//                         Close
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Globalchat() {
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');
//     const [selectedMessage, setSelectedMessage] = useState(null); // State to track selected message

//     // Fetch userId from localStorage
//     const userId = localStorage.getItem('userId');

//     // Fetch messages from the backend
//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get("http://localhost:9999/messages");
//             setMessages(response.data.data);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     // Send a message
//     const sendMessage = async () => {
//         if (!messageInput || !userId) {
//             console.error('Message input or userId is missing');
//             return;
//         }

//         const token = localStorage.getItem("token");

//         if (!token) {
//             console.error('No token found');
//             return;
//         }

//         try {
//             await axios.post("http://localhost:9999/set-message", {
//                 message: messageInput,
//                 userId,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             });
            
//             setMessageInput(''); // Clear the input field
//             fetchMessages(); // Refresh the message list after sending
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     // Delete a message
//     const deleteMessage = async (indexNo) => {
//         try {
//             await axios.delete(`/delete-message?indexNo=${indexNo}`);
//             fetchMessages(); // Refresh the message list after deleting
//             setSelectedMessage(null); // Reset selected message after deletion
//         } catch (error) {
//             console.error('Error deleting message:', error);
//         }
//     };

//     // Fetch messages on component mount
//     useEffect(() => {
//         fetchMessages();
//     }, []);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#001F3F', color: '#ffffff', padding: '20px' }}>
//             <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Global Chat</h2>
//             <div style={{
//                 flex: 1,
//                 overflowY: 'auto',
//                 padding: '20px',
//                 background: '#ffffff',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//                 color: '#000000',
//                 marginBottom: '20px',
//             }}>
//                 {messages.map((msg) => (
//                     <div 
//                         key={msg.indexNo} 
//                         style={{
//                             display: 'flex',
//                             justifyContent: userId === msg.userId ? 'flex-start' : 'flex-end', // Align messages
//                             marginBottom: '15px',
//                         }}
//                     >
//                         <div style={{
//                             padding: '10px',
//                             borderRadius: '8px',
//                             background: userId === msg.userId ? '#007bff' : '#f0f0f0',
//                             color: userId === msg.userId ? '#ffffff' : '#000000',
//                             maxWidth: '70%',
//                             textAlign: 'left',
//                         }} onClick={() => setSelectedMessage(msg)}>
//                             <strong>User {msg.userId}:</strong> {msg.message}
//                             <div style={{ fontSize: '12px', marginTop: '5px', color: '#666666' }}>
//                                 {msg.date} {msg.time}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div style={{
//                 display: 'flex',
//                 padding: '20px',
//                 background: '#3A6D8C',
//                 borderRadius: '10px',
//             }}>
//                 <input
//                     type="text"
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                     placeholder="Type your message..."
//                     style={{
//                         flex: 1,
//                         padding: '10px',
//                         border: '1px solid #ddd',
//                         borderRadius: '5px',
//                         fontSize: '16px',
//                         background: '#F5F5F7',
//                         color: '#000000', // Changed to black for visibility
//                     }}
//                 />
//                 <button 
//                     onClick={sendMessage} 
//                     style={{
//                         marginLeft: '10px',
//                         padding: '10px 15px',
//                         background: '#007bff',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                     }}
//                 >
//                     Send
//                 </button>
//             </div>
//             {selectedMessage && (
//                 <div style={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     background: '#1e1e1e',
//                     padding: '20px',
//                     borderRadius: '10px',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
//                     zIndex: 1000,
//                 }}>
//                     <h4 style={{ margin: '0 0 10px', color: '#ffffff' }}>Message Details</h4>
//                     <p style={{ margin: '5px 0' }}><strong>Message:</strong> {selectedMessage.message}</p>
//                     <p style={{ margin: '5px 0' }}><strong>Time:</strong> {selectedMessage.date} {selectedMessage.time}</p>
//                     <button 
//                         onClick={() => deleteMessage(selectedMessage.indexNo)} 
//                         style={{
//                             marginTop: '10px',
//                             padding: '10px 15px',
//                             background: 'red',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                         }}
//                     >
//                         Delete Message
//                     </button>
//                     <button 
//                         onClick={() => setSelectedMessage(null)} 
//                         style={{
//                             marginTop: '10px',
//                             padding: '10px 15px',
//                             background: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                             marginLeft: '10px',
//                         }}
//                     >
//                         Close
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Globalchat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null); // State to track selected message

    // Fetch userId from localStorage and convert to string for comparison
    const userId = localStorage.getItem('userId');

    // Fetch messages from the backend
    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:9999/messages");
            setMessages(response.data.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Send a message
    const sendMessage = async () => {
        if (!messageInput || !userId) {
            console.error('Message input or userId is missing');
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            await axios.post("http://localhost:9999/set-message", {
                message: messageInput,
                userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            
            setMessageInput(''); // Clear the input field
            fetchMessages(); // Refresh the message list after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Delete a message
 // Delete a message
// Delete a message
const deleteMessage = async (indexNo) => {
    try {
        await axios.delete(`http://localhost:9999/delete-message?indexNo=${indexNo}`);
        fetchMessages(); // Refresh the message list after deleting
        setSelectedMessage(null); // Reset selected message after deletion
    } catch (error) {
        console.error('Error deleting message:', error);
    }
};


    // Fetch messages on component mount
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#006D77', color: '#ffffff', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Global Chat</h2>
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                color: '#000000',
                marginBottom: '20px',
            }}>
                {messages.map((msg) => {
                    const messageUserId = String(msg.userId); // Ensure userId from messages is a string
                    const isUserMessage = userId === messageUserId; // Check if it's the logged-in user's message

                    return (
                        <div 
                            key={msg.indexNo} 
                            style={{
                                display: 'flex',
                                justifyContent: isUserMessage ? 'flex-start' : 'flex-end', // Align logged-in user's messages to the left, others to the right
                                marginBottom: '15px',
                            }}
                        >
                            <div style={{
                                padding: '10px',
                                borderRadius: '8px',
                                background: isUserMessage ? '#83C5BE' : '#FFDDD2', // Background color for user's messages and others
                                color: isUserMessage ? '#003D5B' : '#000000', // Different color for logged-in user
                                maxWidth: '70%',
                                textAlign: 'left',
                            }} onClick={() => setSelectedMessage(msg)}>
                                <strong>{isUserMessage ? 'You' : `User ${messageUserId}`}:</strong> {msg.message}
                                <div style={{ fontSize: '12px', marginTop: '5px', color: '#666666' }}>
                                    {msg.date} {msg.time}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{
                display: 'flex',
                padding: '20px',
                background: '#E29578',
                borderRadius: '10px',
            }}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px',
                        background: '#F5F5F7',
                        color: '#000000', // Changed to black for visibility
                    }}
                />
                <button 
                    onClick={sendMessage} 
                    style={{
                        marginLeft: '10px',
                        padding: '10px 15px',
                        background: '#83C5BE',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Send
                </button>
            </div>
            {selectedMessage && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#1e1e1e',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                }}>
                    <h4 style={{ margin: '0 0 10px', color: '#ffffff' }}>Message Details</h4>
                    <p style={{ margin: '5px 0' }}><strong>Message:</strong> {selectedMessage.message}</p>
                    <p style={{ margin: '5px 0' }}><strong>Time:</strong> {selectedMessage.date} {selectedMessage.time}</p>
                    <button 
                        onClick={() => deleteMessage(selectedMessage.indexNo)} 
                        style={{
                            marginTop: '10px',
                            padding: '10px 15px',
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Delete Message
                    </button>
                    <button 
                        onClick={() => setSelectedMessage(null)} 
                        style={{
                            marginTop: '10px',
                            padding: '10px 15px',
                            background: '#83C5BE',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginLeft: '10px',
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}




