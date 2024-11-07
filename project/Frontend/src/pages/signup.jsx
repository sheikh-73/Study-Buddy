import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    userId: "",
    photo:"null",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange=(e)=>{
    const file=e.target.files[0];
    setFormData({...formData,picture:file});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object
  const formDataToSend = new FormData();
  
  // Append form fields
  formDataToSend.append("name", formData.name);
  formDataToSend.append("password", formData.password);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("userId", formData.userId);
  
  // Append the file (picture)
  formDataToSend.append("photo", formData.picture); // Assuming the `picture` field is a file
  try {
    const response = await fetch("http://localhost:9999/signup", {
      method: "POST",
      body: formDataToSend, // Send as FormData
      // No need for 'Content-Type' header; browser will automatically set it to 'multipart/form-data'
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const result = await response.json();
    console.log("Registration successful:", result);
    alert("Registration successful!");
    navigate("/"); // Redirect to home or login page after registration
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed!");
  }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #b9d9eb)",
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
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Register</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              height: "40px",
              padding: "0 15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            }}
            required
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
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              height: "40px",
              padding: "0 15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            }}
            required
          />
          <input
            type="number"
            name="userId"
            placeholder="ID"
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
            required
          />
          <input
            type="file"
            name="photo"
             accept="image/*"
            placeholder="picture"
           
            onChange={handleFileChange}
            style={{
              height: "40px",
              padding: "0 15px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            }}
            required
          />
          <button
            type="submit"
            style={{
              height: "40px",
              backgroundColor: "#007bff",
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
        </form>
      </div>
    </div>
  );
}
