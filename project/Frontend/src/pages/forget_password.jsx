// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       alert("Please enter your user ID.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:9999/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Password reset link sent! Please check your email.");
//       } else {
//         setMessage(`Failed to send reset link: ${data.error}`);
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "linear-gradient(135deg, #f5f5f5, #c0c0c0)",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           padding: "40px",
//           borderRadius: "10px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           width: "400px",
//           textAlign: "center",
//         }}
//       >
//         <h1 style={{ color: "#333", marginBottom: "20px" }}>
//           Forgot Password
//         </h1>
//         <form
//           onSubmit={handleForgotPassword}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             justifyContent: "center",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Enter your User ID"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             style={{
//               height: "40px",
//               padding: "0 15px",
//               borderRadius: "5px",
//               border: "1px solid #ddd",
//               fontSize: "16px",
//               boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
//             }}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               height: "40px",
//               backgroundColor: loading ? "#6c757d" : "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               fontSize: "16px",
//               cursor: loading ? "not-allowed" : "pointer",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               transition: "background-color 0.3s",
//             }}
//           >
//             {loading ? "Sending link..." : "Send Reset Link"}
//           </button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// }
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define some CSS styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        maxWidth: '400px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        marginTop:"100px"
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
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

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:9999/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json();
            const { userId } = data; // Get the userId from the response

            setMessage("Reset link sent to your email.");
            // Navigate to the reset password page with userId
            setTimeout(() => {
                navigate(`/reset-password/${userId}`);
            }, 2000);
        } else {
            setMessage("Failed to send reset link.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Forgot Password</h2>
            <form onSubmit={handleForgotPassword} style={{ width: '100%' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Send Reset Link
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;


