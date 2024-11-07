// import axios from "axios";

// import { useEffect, useState } from "react";

// export default function Setyourgoals() {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [goals, setGoals] = useState([]);
//   const [formData, setFormData] = useState({
//     indexNo: "",
//     title: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch goals on component mount
//   useEffect(() => {
//     const fetchGoals = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(
//           `http://localhost:9999/get-goals/${token}`
//         );
//         console.log("Fetched goals:", response.data); // Inspect the fetched data

//         // Access the 'data' property to get the array of goals
//         if (Array.isArray(response.data.data)) {
//           setGoals(response.data.data); // Set the state to the goals array
//         } else {
//           console.error("Expected an array but received:", response.data.data);
//           setGoals([]); // Reset to an empty array if the response is not as expected
//         }
//       } catch (error) {
//         console.error("Error fetching goals:", error);
//         setGoals([]); // Reset on error
//       }
//     };

//     fetchGoals();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const toggleForm = () => {
//     setIsFormVisible(!isFormVisible);
//     setEditIndex(null); // Reset edit index when opening a new form
//     setFormData({
//       indexNo: "",
//       title: "",
//       description: "",
//       startTime: "",
//       endTime: "",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const formatTime = (timeString) => {
//     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (
//       formData.title &&
//       formData.description &&
//       formData.startTime &&
//       formData.endTime &&
//       formData.startDate &&
//       formData.endDate
//     ) {
//       try {
//         if (editIndex !== null) {
//           // Edit existing goal
//           const updatedGoals = [...goals];
//           updatedGoals[editIndex] = formData;
//           setGoals(updatedGoals);
//           setEditIndex(null); // Reset edit index after updating
//         } else {
//           // Add new goal
//           const res = await axios.post(
//             `http://localhost:9999/set-goal/${token}`,
//             formData
//           );
//           console.log(res.data.message);
//           setGoals((prevGoals) => [...prevGoals, formData]);
//         }

//         setFormData({
//           indexNo: "",
//           title: "",
//           description: "",
//           startTime: "",
//           endTime: "",
//           startDate: "",
//           endDate: "",
//         });

//         setIsFormVisible(false);
//       } catch (err) {
//         console.log("Error in setting your goal:", err);
//       }
//     } else {
//       alert("Please fill in all the required fields.");
//     }
//   };

//   const handleEdit = (indexNo) => {
//     const goal = goals[indexNo];
//     setFormData(goal);
//     setEditIndex(indexNo);
//     setIsFormVisible(true); // Show form for editing
//   };

//   const handleDelete = async (indexNo) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(
//         `http://localhost:9999/delete-goal/${token}?indexNo=${indexNo}`
//       ); // Assuming each goal has a unique indexNo
//       const updatedGoals = goals.filter((_, i) => i !== indexNo);
//       setGoals(updatedGoals);
//     } catch (err) {
//       console.error("Error deleting goal:", err);
//     }
//   };
//   ///${goals[indexNo].indexNo
//   return (
//     <div style={styles.pageContainer}>
//       <h1 style={styles.headerTitle}>Goal Management</h1>
//       <button style={styles.addButton} onClick={toggleForm}>
//         {isFormVisible ? "Cancel" : "Add Goal"}
//       </button>

//       {isFormVisible && (
//         <div style={styles.formContainer}>
//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Title:</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description:</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 style={styles.textarea}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Start Time:</label>
//               <input
//                 type="time"
//                 name="startTime"
//                 value={formData.startTime}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>End Time:</label>
//               <input
//                 type="time"
//                 name="endTime"
//                 value={formData.endTime}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Start Date:</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>End Date:</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>
//             <button type="submit" style={styles.submitButton}>
//               {editIndex !== null ? "Update Goal" : "Submit"}
//             </button>
//           </form>
//         </div>
//       )}

//       <div style={styles.goalsContainer}>
//         <h2>Your Goals:</h2>

//         {goals.length === 0 ? (
//           <p style={{ textAlign: "center", color: "gray" }}>
//             There are no goals.
//           </p>
//         ) : (
//           goals.map((goal, indexNo) => (
//             <div key={goal.indexNo} style={styles.goalItem}>
//               <div style={styles.goalContent}>
//                 <p>
//                   <strong>{goal.title}</strong>
//                 </p>
//                 <p>{goal.description}</p>
//                 <p>
//                   {formatTime(goal.startTime)} - {formatTime(goal.endTime)}
//                 </p>
//                 <p>
//                   {formatDate(goal.startDate)} to {formatDate(goal.endDate)}
//                 </p>
//               </div>
//               <div style={styles.goalActions}>
//                 <button
//                   style={styles.editButton}
//                   onClick={() => handleEdit(indexNo)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   style={styles.deleteButton}
//                   onClick={() => handleDelete(indexNo)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// // Styles remain unchanged
// const styles = {
//   pageContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: "#121212",
//     color: "#ffffff",
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//     height: "100vh",
//   },
//   headerTitle: {
//     fontSize: "36px",
//     marginBottom: "20px",
//   },
//   addButton: {
//     backgroundColor: "#1abc9c",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     fontSize: "20px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   formContainer: {
//     marginTop: "20px",
//     backgroundColor: "#1f1f1f",
//     borderRadius: "10px",
//     padding: "20px",
//     width: "300px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//   },
//   formGroup: {
//     marginBottom: "15px",
//   },
//   label: {
//     marginBottom: "5px",
//     display: "block",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     backgroundColor: "#2a2a2a",
//     color: "#ffffff",
//   },
//   textarea: {
//     width: "100%",
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     backgroundColor: "#2a2a2a",
//     color: "#ffffff",
//   },
//   submitButton: {
//     backgroundColor: "#007bff",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     fontSize: "18px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   goalsContainer: {
//     marginTop: "20px",
//     width: "80%",
//     maxWidth: "800px",
//   },
//   goalItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px",
//     backgroundColor: "#1f1f1f",
//     marginBottom: "10px",
//     borderRadius: "5px",
//   },
//   goalContent: {
//     flex: 1,
//   },
//   goalActions: {
//     display: "flex",
//     gap: "10px",
//   },
//   editButton: {
//     backgroundColor: "#f39c12",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "5px",
//     padding: "5px 10px",
//     cursor: "pointer",
//   },
//   deleteButton: {
//     backgroundColor: "#e74c3c",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "5px",
//     padding: "5px 10px",
//     cursor: "pointer",
//   },
// };
import axios from "axios";
import { useEffect, useState } from "react";

export default function Setyourgoals() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    indexNo: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch goals on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:9999/get-goals/${token}`);
        if (Array.isArray(response.data.data)) {
          setGoals(response.data.data);
        } else {
          console.error("Expected an array but received:", response.data.data);
          setGoals([]);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        setGoals([]);
      }
    };

    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setEditIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      indexNo: "",
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (isFormValid()) {
      try {
        if (editIndex !== null) {
          await updateGoal();
        } else {
          await addGoal(token);
        }
        resetForm();
        setIsFormVisible(false);
      } catch (err) {
        console.log("Error in setting your goal:", err);
      }
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.startTime &&
      formData.endTime &&
      formData.startDate &&
      formData.endDate
    );
  };

  const addGoal = async (token) => {
    const res = await axios.post(`http://localhost:9999/set-goal/${token}`, formData);
    console.log(res.data.message);
    setGoals((prevGoals) => [...prevGoals, formData]);
  };

  const updateGoal = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:9999/update-goal/${token}`, {
        ...formData,
        indexNo: formData.indexNo, // Ensure you're sending the indexNo
      });
      const updatedGoals = goals.map((goal, index) =>
        index === editIndex ? formData : goal
      );
      setGoals(updatedGoals);
      setEditIndex(null);
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  const handleEdit = (indexNo) => {
    const goal = goals.find((g) => g.indexNo === indexNo); // Find goal by indexNo
    setFormData(goal);
    setEditIndex(goals.findIndex((g) => g.indexNo === indexNo)); // Set editIndex using findIndex
    setIsFormVisible(true);
  };

  const handleDelete = async (indexNo) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9999/delete-goal/${token}/${indexNo}`);
      setGoals(goals.filter((goal) => goal.indexNo !== indexNo)); // Update state after deletion
      alert("Goal deleted successfully.");
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("Failed to delete the goal.");
    }
  };

  const handleCheckboxChange = (indexNo) => {
    const updatedGoals = [...goals];
    updatedGoals[indexNo].completed = !updatedGoals[indexNo].completed; // Toggle completion status
    setGoals(updatedGoals);
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.headerTitle}>Goal Management</h1>
      <button style={styles.addButton} onClick={toggleForm}>
        {isFormVisible ? "Cancel" : "Add Goal"}
      </button>

      {isFormVisible && (
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <FormGroup label="Title:" name="title" value={formData.title} onChange={handleChange} />
            <FormGroup label="Description:" name="description" value={formData.description} onChange={handleChange} textarea />
            <FormGroup label="Start Time:" name="startTime" type="time" value={formData.startTime} onChange={handleChange} />
            <FormGroup label="End Time:" name="endTime" type="time" value={formData.endTime} onChange={handleChange} />
            <FormGroup label="Start Date:" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
            <FormGroup label="End Date:" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
            <button type="submit" style={styles.submitButton}>
              {editIndex !== null ? "Update Goal" : "Submit"}
            </button>
          </form>
        </div>
      )}

      <div style={styles.goalsContainer}>
        <h2>Your Goals:</h2>

        {goals.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>There are no goals.</p>
        ) : (
          goals.map((goal, indexNo) => (
            <div key={goal.indexNo} style={styles.goalItem}>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={goal.completed || false}
                  onChange={() => handleCheckboxChange(indexNo)}
                  style={styles.checkbox}
                />
              </div>
              <div style={styles.goalContent}>
                <p><strong>{goal.title}</strong></p>
                <p>{goal.description}</p>
                <p>{formatTime(goal.startTime)} - {formatTime(goal.endTime)}</p>
                <p>{formatDate(goal.startDate)} to {formatDate(goal.endDate)}</p>
              </div>
              <div style={styles.goalActions}>
                <button style={styles.editButton} onClick={() => handleEdit(goal.indexNo)}>Edit</button>
                <button style={styles.deleteButton} onClick={() => handleDelete(goal.indexNo)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Separate FormGroup component for better organization
const FormGroup = ({ label, name, value, onChange, textarea, type }) => {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} style={styles.textarea} required />
      ) : (
        <input type={type || "text"} name={name} value={value} onChange={onChange} style={styles.input} required />
      )}
    </div>
  );
};

// Styles with Coolors color palette
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#293241", // Dark Gray
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    height: "100vh",
  },
  headerTitle: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#ee6c4d", // Orange
  },
  addButton: {
    backgroundColor: "#ee6c4d", // Orange
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  formContainer: {
    margin: "20px 0",
    backgroundColor: "#98c1d9", // Light Blue
    padding: "20px",
    borderRadius: "8px",
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#293241", // Dark Gray
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    backgroundColor: "#3d5a80", // Dark Blue
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  goalsContainer: {
    width: "100%",
    marginTop: "20px",
  },
  goalItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#e0fbfc", // Light Cyan
    borderRadius: "5px",
    marginBottom: "10px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    cursor: "pointer",
    marginRight: "10px",
  },
  goalContent: {
    flex: 1,
    color: "#293241", // Dark Gray
  },
  goalActions: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#98c1d9", // Light Blue
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#ee6c4d", // Orange
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

