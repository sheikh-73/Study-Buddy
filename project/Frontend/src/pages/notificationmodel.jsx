// import { useState, useEffect } from 'react';

// export default function NotificationModel() {
//     const [notifications, setNotifications] = useState([]); // Initialize as an empty array
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state
//     const [newNotification, setNewNotification] = useState(''); // State for new notification message

//     // Fetch notifications from the API
//     useEffect(() => {
//         fetchNotifications();
//     }, []);

//     const fetchNotifications = async () => {
//         setLoading(true); // Reset loading state before fetching
//         setError(null); // Reset error state before fetching
// const token=localStorage.getItem("token");
//         try {
//             const response = await fetch(`http://localhost:9999/api/notifications/${token}`); // Replace with your API endpoint
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.statusText}`);
//             }

//             const data = await response.json();
//             if (Array.isArray(data)) {
//                 setNotifications(data);
//             } else {
//                 console.error('Expected an array, but got:', data);
//                 setError('Unexpected data format from server.');
//             }
//         } catch (error) {
//             console.error('Error fetching notifications:', error);
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Create a new notification
//     const createNotification = async () => {
//         if (!newNotification) {
//             alert('Please enter a notification message');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:9999/api/notifications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ message: newNotification }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create notification');
//             }

//             await fetchNotifications(); // Refresh notifications
//             setNewNotification(''); // Clear the input
//         } catch (error) {
//             console.error('Error creating notification:', error);
//             alert(error.message);
//         }
//     };

//     // Mark notification as read
//     const markAsRead = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:9999/api/notifications/${id}`, {
//                 method: 'PUT',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to mark notification as read');
//             }

//             await fetchNotifications(); // Refresh notifications
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//             alert(error.message);
//         }
//     };

//     // Delete a notification
//     const deleteNotification = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this notification?')) {
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:9999/api/notifications/${id}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete notification');
//             }

//             await fetchNotifications(); // Refresh notifications
//         } catch (error) {
//             console.error('Error deleting notification:', error);
//             alert(error.message);
//         }
//     };

//     // Render loading, error, or notifications
//     if (loading) {
//         return <div>Loading notifications...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div style={styles.notificationContainer}>
//             <h2 style={styles.title}>Notifications</h2>

//             <div style={styles.createNotificationContainer}>
//                 <input
//                     type="text"
//                     value={newNotification}
//                     onChange={(e) => setNewNotification(e.target.value)}
//                     placeholder="Enter a new notification"
//                     style={styles.input}
//                 />
//                 <button onClick={createNotification} style={styles.button}>Add Notification</button>
//             </div>

//             {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                     <div key={notification.id} style={styles.notificationItem}>
//                         <div>{notification.message}</div>
//                         <button onClick={() => markAsRead(notification.id)} style={styles.readButton}>Mark as Read</button>
//                         <button onClick={() => deleteNotification(notification.id)} style={styles.deleteButton}>Delete</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No notifications available.</p>
//             )}
//         </div>
//     );
// }

// // Basic styles for the NotificationModel component
// const styles = {
//     notificationContainer: {
//         padding: '20px',
//         backgroundColor: '#f8f9fa',
//         borderRadius: '8px',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     },
//     title: {
//         fontSize: '24px',
//         marginBottom: '10px',
//         color: '#333',
//     },
//     createNotificationContainer: {
//         marginBottom: '20px',
//     },
//     input: {
//         padding: '10px',
//         marginRight: '10px',
//         border: '1px solid #ced4da',
//         borderRadius: '5px',
//         width: '300px',
//     },
//     button: {
//         padding: '10px 15px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
//     notificationItem: {
//         padding: '10px',
//         margin: '5px 0',
//         backgroundColor: '#e9ecef',
//         borderRadius: '5px',
//         borderLeft: '4px solid #007bff', // Blue left border
//     },
//     readButton: {
//         marginLeft: '10px',
//         backgroundColor: '#28a745',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
//     deleteButton: {
//         marginLeft: '10px',
//         backgroundColor: '#dc3545',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };
