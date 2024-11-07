// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signin() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     userId: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false); // Loading state

//   // Load email from localStorage if available
//   // useEffect(() => {
//   //   const storedEmail = localStorage.getItem("email");
//   //   if (storedEmail) {
//   //     setFormData((prev) => ({ ...prev, email: storedEmail }));
//   //   }
//   // }, []);

//   //Load id from local storage

//   useEffect(() => {
//     const storedId = localStorage.getItem("userId");
//     if (storedId) {
//       setFormData((prev) => ({ ...prev, userId: storedId }));
//     }
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Simple validation: check if both email and password are provided
//     if (!formData.userId || !formData.password) {
//       alert("Please enter both id and password.");
//       return;
//     }

//     setLoading(true); // Start loading
//     try {
//       const response = await fetch("http://localhost:9999/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("received token", data.token);
//         localStorage.setItem("token", data.token); // Save token in localStorage
//         localStorage.setItem("userId", formData.userId); // Remember user's email
//         alert("Login successful!");
//         navigate("/dashboard"); // Navigate to the dashboard
//       } else {
//         alert(`Login failed: ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred during login. Please try again.");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   // Handle navigation to the registration page
//   const handleRegister = (e) => {
//     e.preventDefault();
//     navigate("/signup");
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
//         <h1 style={{ color: "#333", marginBottom: "20px" }}>Login</h1>
//         <form
//           onSubmit={handleLogin}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             justifyContent: "center",
//           }}
//         >
//           <input
//             type="text"
//             name="userId"
//             placeholder="User ID"
//             value={formData.id}
//             onChange={handleChange}
//             style={{
//               height: "40px",
//               padding: "0 15px",
//               borderRadius: "5px",
//               border: "1px solid #ddd",
//               fontSize: "16px",
//               boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
//             }}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
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
//             disabled={loading} // Disable button while loading
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
//             {loading ? "Logging in..." : "Login"}
//           </button>
//           <button
//             onClick={handleRegister}
//             style={{
//               height: "40px",
//               backgroundColor: "#6c757d",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               fontSize: "16px",
//               cursor: "pointer",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               transition: "background-color 0.3s",
//             }}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  // Load id from local storage
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setFormData((prev) => ({ ...prev, userId: storedId }));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      alert("Please enter both id and password.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:9999/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token in localStorage
        localStorage.setItem("userId", formData.userId); // Remember user's ID
        alert("Login successful!");
        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Navigate to registration page
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  // Navigate to forgot password page
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f5f5f5, #c0c0c0)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Login</h1>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            style={{
              height: "40px",
              padding: "0 15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              height: "40px",
              padding: "0 15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            style={{
              height: "40px",
              backgroundColor: loading ? "#6c757d" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "background-color 0.3s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            onClick={handleRegister}
            style={{
              height: "40px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "background-color 0.3s",
            }}
          >
            Register
          </button>
          <button
            onClick={handleForgotPassword}
            style={{
              backgroundColor: "transparent",
              color: "#007bff",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
}
