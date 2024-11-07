import  { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Define CSS styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        maxWidth: '400px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        marginTop:"70px"
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    label: {
        marginBottom: '5px',
        fontSize: '16px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    message: {
        marginTop: '20px',
        color: '#007BFF',
    },
};

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { userId } = useParams(); // Get userId from URL parameters

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:9999/reset-password`, {
                userId,
                password,
            });
            console.log(response.data);
            alert("Password reset successfully!");
        } catch (error) {
            console.error("Error resetting password:", error.response?.data || error.message);
            alert("Failed to reset password: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Reset Password</h2>
            <form onSubmit={handleReset} style={{ width: '100%' }}>
                <div>
                    <label style={styles.label}>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label style={styles.label}>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;







