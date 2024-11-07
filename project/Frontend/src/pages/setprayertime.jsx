
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function SetPrayerTime() {
//   const [prayertime, setPrayerTime] = useState({
//     indexNo: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//   });
//   const [goals, setGoals] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPrayerTime({ ...prayertime, [name]: value });
//   };

//   // Fetching all prayer times
//   useEffect(() => {
//     const fetchPrayerData = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(`http://localhost:9999/prayer-times/${token}`);
//         console.log("Fetch prayer time response:", response.data);
        
//         if (Array.isArray(response.data.data)) {
//           // Log each goal's start and end times to check their formats
//           response.data.data.forEach((goal) => {
//             console.log(`Goal: ${goal.description}, Start Time: ${goal.startTime}, End Time: ${goal.endTime}`);
//           });
//           setGoals(response.data.data);
//         } else {
//           console.error("Expected an array but received:", response.data.data);
//           setGoals([]);
//         }
//       } catch (error) {
//         console.error("Error in fetchPrayerData:", error);
//       }
//     };
//     fetchPrayerData();
//   }, []);

//   const formatTime = (timeString) => {
//     console.log(`Formatting time: ${timeString}`); // Log the time being formatted
//     if (!timeString || typeof timeString !== "string") return "Invalid Time";
  
//     const timeParts = timeString.split(':');
//     if (timeParts.length === 2) {
//       // 24-hour format (HH:MM)
//       const [hours, minutes] = timeParts.map(Number);
  
//       if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
//       if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
//         return "Invalid Time";
//       }
  
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     } else if (timeParts.length === 3) {
//       // 24-hour format (HH:MM:SS)
//       const [hours, minutes, seconds] = timeParts.map(Number);
  
//       if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return "Invalid Time";
//       if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
//         return "Invalid Time";
//       }
  
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     } else if (timeString.match(/(AM|PM)/)) {
//       // 12-hour format
//       const [time, period] = timeString.split(" ");
//       let [hours, minutes] = time.split(':').map(Number);
  
//       if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
  
//       // Convert 12-hour format to 24-hour format
//       if (period === "PM" && hours < 12) {
//         hours += 12;
//       }
//       if (period === "AM" && hours === 12) {
//         hours = 0;
//       }
  
//       return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//     }
  
//     return "Invalid Time";
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (prayertime.description && prayertime.startTime && prayertime.endTime) {
//       try {
//         if (editIndex !== null) {
//           const updatedGoals = goals.map((goal, index) =>
//             index === editIndex ? prayertime : goal
//           );
//           setGoals(updatedGoals);
//           setEditIndex(null);
//         } else {
//           const response = await axios.post(
//             `http://localhost:9999/set-prayer/${token}`,
//             prayertime
//           );
//           console.log("Response of Add a new prayer time", response.data);
//           setGoals((prevGoals) => [...prevGoals, prayertime]); // Adjust to push the local state
//         }
//       } catch (err) {
//         console.log("Error in setting prayer time: ", err);
//       }
//     } else {
//       console.warn("Form submission error: All fields must be filled out.");
//     }
//   };

//   const handleEdit = (indexNo) => {
//     const goal = goals[indexNo];
//     setPrayerTime(goal);
//     setEditIndex(indexNo);
//   };

//   const handleDelete = async (indexNo) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`http://localhost:9999/delete-prayer/${token}?indexNo=${goals[indexNo].indexNo}`);
//       const updatedGoals = goals.filter((_, i) => i !== indexNo);
//       setGoals(updatedGoals);
//     } catch (err) {
//       console.log("Error in deleting prayer time", err);
//     }
//   };

//   return (
//     <div style={styles.pageContainer}>
//       <div style={styles.formContainer}>
//         <form onSubmit={handleSubmit}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Description:</label>
//             <textarea
//               name="description"
//               value={prayertime.description}
//               onChange={handleChange}
//               style={styles.textarea}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Start Time:</label>
//             <input
//               type="time"
//               name="startTime"
//               value={prayertime.startTime}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>End Time:</label>
//             <input
//               type="time"
//               name="endTime"
//               value={prayertime.endTime}
//               onChange={handleChange}
//               style={styles.input}
//               required
//             />
//           </div>
//           <button type="submit" style={styles.submitButton}>
//             {editIndex !== null ? "Update Goal" : "Submit"}
//           </button>
//         </form>
//       </div>

//       <div style={styles.goalsContainer}>
//         <h2>Your Goals:</h2>
//         {goals.length === 0 ? (
//           <p style={{ textAlign: "center", color: "gray" }}>
//             There are no goals.
//           </p>
//         ) : (
//           goals.map((goal, index) => (
//             <div key={index} style={styles.goalItem}>
//               <div style={styles.goalContent}>
//                 <p>
//                   <strong>{goal.description}</strong>
//                 </p>
//                 <p>
//                   {goal.description} {/* Display description */}
//                 </p>
//                 <p>
//                   {formatTime(goal.startTime)} - {formatTime(goal.endTime)}
//                 </p>
//               </div>
//               <div style={styles.goalActions}>
//                 <button style={styles.editButton} onClick={() => handleEdit(index)}>
//                   Edit
//                 </button>
//                 <button style={styles.deleteButton} onClick={() => handleDelete(index)}>
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

// // Add your styles here...

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

export default function SetPrayerTime() {
  const [prayertime, setPrayerTime] = useState({
    indexNo: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [goals, setGoals] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedGoals, setSelectedGoals] = useState(new Set()); // To track selected goals

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrayerTime({ ...prayertime, [name]: value });
  };

  // Fetching all prayer times
  useEffect(() => {
    const fetchPrayerData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:9999/prayer-times/${token}`);
        console.log("Fetch prayer time response:", response.data);

        if (Array.isArray(response.data.data)) {
          setGoals(response.data.data);
        } else {
          console.error("Expected an array but received:", response.data.data);
          setGoals([]);
        }
      } catch (error) {
        console.error("Error in fetchPrayerData:", error);
      }
    };
    fetchPrayerData();
  }, []);

  const formatTime = (timeString) => {
    console.log(`Formatting time: ${timeString}`); // Log the time being formatted
    if (!timeString || typeof timeString !== "string") return "Invalid Time";

    const timeParts = timeString.split(':');
    if (timeParts.length === 2 || timeParts.length === 3) {
      // Split time into hours and minutes (and possibly seconds)
      const [hours, minutes] = timeParts.slice(0, 2).map(Number);

      if (isNaN(hours) || isNaN(minutes)) return "Invalid Time";
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return "Invalid Time";
      }

      // Convert to 12-hour format
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12; // Convert 0 hours to 12

      return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return "Invalid Time";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (prayertime.description && prayertime.startTime && prayertime.endTime) {
      try {
        if (editIndex !== null) {
          const updatedGoals = goals.map((goal, index) =>
            index === editIndex ? prayertime : goal
          );
          setGoals(updatedGoals);
          setEditIndex(null);
        } else {
          const response = await axios.post(
            `http://localhost:9999/set-prayer/${token}`,
            prayertime
          );
          console.log("Response of Add a new prayer time", response.data);
          setGoals((prevGoals) => [...prevGoals, prayertime]);
        }
      } catch (err) {
        console.log("Error in setting prayer time: ", err);
      }
    } else {
      console.warn("Form submission error: All fields must be filled out.");
    }
  };

  const handleEdit = (indexNo) => {
    const goal = goals[indexNo];
    setPrayerTime(goal);
    setEditIndex(indexNo);
  };

  const handleDelete = async (indexNo) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9999/delete-prayer/${token}?indexNo=${goals[indexNo].indexNo}`);
      const updatedGoals = goals.filter((_, i) => i !== indexNo);
      setGoals(updatedGoals);
      setSelectedGoals((prev) => {
        const newSelected = new Set(prev);
        newSelected.delete(indexNo);
        return newSelected;
      });
    } catch (err) {
      console.log("Error in deleting prayer time", err);
    }
  };

  const toggleGoalSelection = (indexNo) => {
    setSelectedGoals((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(indexNo)) {
        newSelected.delete(indexNo);
      } else {
        newSelected.add(indexNo);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");
    const deletePromises = Array.from(selectedGoals).map(async (indexNo) => {
      await axios.delete(`http://localhost:9999/delete-prayer/${token}?indexNo=${goals[indexNo].indexNo}`);
    });

    try {
      await Promise.all(deletePromises);
      const updatedGoals = goals.filter((_, indexNo) => !selectedGoals.has(indexNo));
      setGoals(updatedGoals);
      setSelectedGoals(new Set()); // Reset selected goals
    } catch (err) {
      console.log("Error in deleting selected prayer times", err);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="description"
              value={prayertime.description}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={prayertime.startTime}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>End Time:</label>
            <input
              type="time"
              name="endTime"
              value={prayertime.endTime}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            {editIndex !== null ? "Update Goal" : "Submit"}
          </button>
        </form>
      </div>

      <div style={styles.goalsContainer}>
        <h2>Your Prayer Times:</h2>
        {goals.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            There are no goals.
          </p>
        ) : (
          <>
            {goals.map((goal, index) => (
              <div key={index} style={styles.goalItem}>
                <div style={styles.goalContent}>
                  <input
                    type="checkbox"
                    checked={selectedGoals.has(index)}
                    onChange={() => toggleGoalSelection(index)}
                  />
                  <strong>{goal.description}</strong>
                  <p>{formatTime(goal.startTime)} - {formatTime(goal.endTime)}</p>
                </div>
                <div style={styles.goalActions}>
                  <button style={styles.editButton} onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button 
              style={styles.deleteSelectedButton} 
              onClick={handleDeleteSelected} 
              disabled={selectedGoals.size === 0}
            >
              Delete Selected
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Add your styles here...

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f0f4f8", // Light gray background
    color: "", // Darker text for contrast
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    height: "100vh",
  },
  formContainer: {
    marginTop: "20px",
    backgroundColor: "#3d5a80", // Dark Blue
    borderRadius: "8px",
    padding: "40px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    
  },
  formGroup: {
    marginBottom: "15px",
  
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#ffffff",
  },
  textarea: {
    width: "100%",
    height: "60px",
    borderRadius: "4px",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#e0fbfc", // Light Cyan
  },
  input: {
    width: "100%",
    borderRadius: "4px",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#e0fbfc", // Light Cyan
  },
  submitButton: {
    backgroundColor: "#0077b6", // Blue
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#f1faee", // Off White
  },
  goalsContainer: {
    marginTop: "30px",
    width: "400px",
    backgroundColor: "#3d5a80", // Dark Blue
    borderRadius: "8px",
    padding: "40px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  goalItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ffffff",
    padding: "10px 0",
  },
  goalContent: {
    flexGrow: 1,
  },
  goalActions: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#ee6f57", // Light Red
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#d62839", // Red
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteSelectedButton: {
    backgroundColor: "#ee6f57", // Light Red
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

