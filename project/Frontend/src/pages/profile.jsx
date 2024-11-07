

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user information
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', photo: null }); // State to manage updated user data
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to root if token is not present
      return;
    }
    
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/profile/${token}`);
        setUser(response.data.data[0]); // Set user data from the response
        setUpdatedUser(response.data.data[0]); // Set data for editing
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]); // Add navigate to dependency array

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle changes in the file input
  const handleFileChange = (e) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      photo: e.target.files[0], // Store the file object
    }));
  };

  // Save updated user information
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', updatedUser.name);
      formData.append('email', updatedUser.email);
      if (updatedUser.photo) {
        formData.append('photo', updatedUser.photo); // Append new photo if it's updated
      }

      await axios.put(`http://localhost:9999/profile/${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the user state with the new data
      setUser((prevUser) => ({
        ...prevUser,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo ? updatedUser.photo.name : prevUser.photo, // Set the new photo name or retain the old one
      }));

      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); // Navigate to the root ("/")
  };

  if (!user) {
    return <div>Loading...</div>; // Loading state while fetching user data
  }

  // Define pictureUrl here to include a timestamp to prevent caching
  const pictureUrl = `http://localhost:9999/Uploads/${user.photo}?t=${new Date().getTime()}`;

  return (
    <div style={styles.profileContainer}>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      <h1 style={styles.title}>User Profile</h1>
      <p style={styles.description}>
        Welcome back, {user.name}! Here you can update your profile information and keep your details fresh and up to date. 
        Remember, your profile reflects who you are, so make it count!
      </p>

      <div style={styles.profileDetails}>
        {editMode ? (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div>
              <label htmlFor="photo">Profile Picture:</label>
              <input type="file" id="photo" name="photo" onChange={handleFileChange} style={styles.fileInput} />
              {updatedUser.photo instanceof File && (
                <img
                  src={URL.createObjectURL(updatedUser.photo)}
                  alt="Profile"
                  style={styles.profileImage} // Adjust the size and shape
                />
              )}
            </div>
            <button onClick={handleSave} style={styles.saveButton}>Save</button>
          </>
        ) : (
          <>
            <img
              src={pictureUrl}
              alt="Profile"
              style={styles.profileImage} // Adjust the size and shape
            />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.userId}</p>
            <button onClick={() => setEditMode(true)} style={styles.editButton}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  profileContainer: {
    position: 'relative', // Enable positioning for child elements
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#d9d9d9',
  },
  title: {
    textAlign: 'center',
    color: '#001524',
    marginBottom: '10px',
  },
  description: {
    textAlign: 'center',
    color: '#04151f',
    marginBottom: '20px',
    fontStyle: 'italic',
    fontSize: '1.1em',
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize:"20px"
  },
  input: {
    margin: '10px 0',
    padding: '8px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  fileInput: {
    margin: '10px 0',
  },
  profileImage: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    margin: '10px 0',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  logoutButton: {
    position: 'absolute', // Position the button in the top right corner
    top: '10px',
    right: '10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Profile;












