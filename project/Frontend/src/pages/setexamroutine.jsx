// import { useState, useEffect } from 'react';

// const styles = {
//     container: {
//         backgroundColor: '#2E2E2E',
//         color: '#FFFFFF',
//         padding: '20px',
//         borderRadius: '8px',
//         maxWidth: '600px',
//         margin: 'auto',
//     },
//     title: {
//         textAlign: 'center',
//     },
//     input: {
//         padding: '10px',
//         margin: '5px',
//         border: '1px solid #4B4B4B',
//         borderRadius: '4px',
//         width: 'calc(100% - 22px)',
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         color: '#FFFFFF',
//         padding: '10px',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         marginRight: '10px',
//     },
//     deleteButton: {
//         backgroundColor: '#DC3545',
//         color: '#FFFFFF',
//         padding: '10px',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     routineList: {
//         marginTop: '20px',
//     },
//     routineItem: {
//         border: '1px solid #4B4B4B',
//         borderRadius: '4px',
//         padding: '10px',
//         marginBottom: '10px',
//     },
// };

// const SetExamRoutine = () => {
//     const [routine, setRoutine] = useState({
//         day: '',
//         course_name: '',
//         course_code: '',
//         classroom: '',
//         start_time: '',
//         end_time: '',
//         exam_date: '',
//     });
//     const [routines, setRoutines] = useState([]);
//     const token = localStorage.getItem('token'); // Assuming token is stored in local storage

//     const handleChange = (e) => {
//         setRoutine({ ...routine, [e.target.name]: e.target.value });
//     };

//     const handleAddRoutine = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:9999/set-routine/${token}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ routines: [routine] }),
//             });
//             if (response.ok) {
//                 alert('Routine added successfully!');
//                 fetchRoutines(); // Refresh the routine list
//                 setRoutine({ day: '', course_name: '', course_code: '', classroom: '', start_time: '', end_time: '', exam_date: '' }); // Reset form
//             } else {
//                 const errorData = await response.json();
//                 alert(`Error: ${errorData.message}`);
//             }
//         } catch (error) {
//             console.error('Error adding routine:', error);
//             alert('Failed to add routine.');
//         }
//     };

//     const fetchRoutines = async () => {
//         try {
//             const response = await fetch(`http://localhost:9999/get-routines/${token}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setRoutines(data);
//             } else {
//                 const errorData = await response.json();
//                 alert(`Error: ${errorData.message}`);
//             }
//         } catch (error) {
//             console.error('Error fetching routines:', error);
//         }
//     };

//     const handleDeleteRoutine = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:9999/delete-routine/${id}/${token}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 alert('Routine deleted successfully!');
//                 fetchRoutines(); // Refresh the routine list
//             } else {
//                 const errorData = await response.json();
//                 alert(`Error: ${errorData.message}`);
//             }
//         } catch (error) {
//             console.error('Error deleting routine:', error);
//             alert('Failed to delete routine.');
//         }
//     };

//     useEffect(() => {
//         fetchRoutines();
//     }, []);

//     return (
//         <div style={styles.container}>
//             <h2 style={styles.title}>Exam Routine</h2>
//             <form onSubmit={handleAddRoutine}>
//                 <input
//                     style={styles.input}
//                     type="text"
//                     name="day"
//                     placeholder="Day (e.g., Monday)"
//                     value={routine.day}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     style={styles.input}
//                     type="text"
//                     name="course_name"
//                     placeholder="Course Name"
//                     value={routine.course_name}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     style={styles.input}
//                     type="text"
//                     name="course_code"
//                     placeholder="Course Code"
//                     value={routine.course_code}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     style={styles.input}
//                     type="text"
//                     name="classroom"
//                     placeholder="Classroom"
//                     value={routine.classroom}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     style={styles.input}
//                     type="time"
//                     name="start_time"
//                     value={routine.start_time}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     style={styles.input}
//                     type="time"
//                     name="end_time"
//                     value={routine.end_time}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     style={styles.input}
//                     type="date"
//                     name="exam_date"
//                     value={routine.exam_date}
//                     onChange={handleChange}
//                 />
//                 <button style={styles.button} type="submit">Add Routine</button>
//             </form>

//             <div style={styles.routineList}>
//                 <h3>Current Routines</h3>
//                 {routines.map((r) => (
//                     <div style={styles.routineItem} key={r.id}>
//                         <p><strong>Day:</strong> {r.day}</p>
//                         <p><strong>Course Name:</strong> {r.course_name}</p>
//                         <p><strong>Course Code:</strong> {r.course_code}</p>
//                         <p><strong>Classroom:</strong> {r.classroom}</p>
//                         <p><strong>Start Time:</strong> {r.start_time}</p>
//                         <p><strong>End Time:</strong> {r.end_time}</p>
//                         <p><strong>Exam Date:</strong> {r.exam_date}</p>
//                         <button style={styles.deleteButton} onClick={() => handleDeleteRoutine(r.id)}>Delete Routine</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SetExamRoutine;
import { useState, useEffect } from 'react';

const colors = {
    primary: '#3d5a80',   // Dark Blue
    secondary: '#98c1d9', // Light Blue
    accent: '#e0fbfc',    // Light Cyan
    highlight: '#ee6c4d', // Coral
    dark: '#293241',      // Dark Gray
};

const styles = {
    container: {
        backgroundColor: colors.accent,
        color: colors.dark,
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: colors.primary,
    },
    input: {
        padding: '10px',
        margin: '5px 0',
        border: `1px solid ${colors.secondary}`,
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: colors.primary,
        color: '#FFFFFF',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        marginRight: '10px',
    },
    deleteButton: {
        backgroundColor: colors.highlight,
        color: '#FFFFFF',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    routineList: {
        marginTop: '30px',
    },
    routineItem: {
        border: `1px solid ${colors.secondary}`,
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: colors.secondary,
        color: colors.dark,
    },
    routineItemText: {
        margin: '5px 0',
    },
};

const SetExamRoutine = () => {
    const [routine, setRoutine] = useState({
        day: '',
        course_name: '',
        course_code: '',
        classroom: '',
        start_time: '',
        end_time: '',
        exam_date: '',
    });
    const [routines, setRoutines] = useState([]);
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage

    const handleChange = (e) => {
        setRoutine({ ...routine, [e.target.name]: e.target.value });
    };

    const handleAddRoutine = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9999/set-routine/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ routines: [routine] }),
            });
            if (response.ok) {
                alert('Routine added successfully!');
                fetchRoutines(); // Refresh the routine list
                setRoutine({
                    day: '',
                    course_name: '',
                    course_code: '',
                    classroom: '',
                    start_time: '',
                    end_time: '',
                    exam_date: '',
                }); // Reset form
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding routine:', error);
            alert('Failed to add routine.');
        }
    };

    const fetchRoutines = async () => {
        try {
            const response = await fetch(`http://localhost:9999/get-routines/${token}`);
            if (response.ok) {
                const data = await response.json();
                setRoutines(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error fetching routines:', error);
        }
    };

    const handleDeleteRoutine = async (id) => {
        try {
            const response = await fetch(`http://localhost:9999/delete-routine/${id}/${token}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Routine deleted successfully!');
                fetchRoutines(); // Refresh the routine list
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting routine:', error);
            alert('Failed to delete routine.');
        }
    };

    // Helper function to format time as AM/PM
    const formatTime = (time) => {
        const date = new Date(`1970-01-01T${time}`);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    // Helper function to format exam date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    useEffect(() => {
        fetchRoutines();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Exam Routine</h2>
            <form onSubmit={handleAddRoutine}>
                <input
                    style={styles.input}
                    type="text"
                    name="day"
                    placeholder="Day (e.g., Monday)"
                    value={routine.day}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    name="course_name"
                    placeholder="Course Name"
                    value={routine.course_name}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    name="course_code"
                    placeholder="Course Code"
                    value={routine.course_code}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    name="classroom"
                    placeholder="Classroom"
                    value={routine.classroom}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="time"
                    name="start_time"
                    value={routine.start_time}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="time"
                    name="end_time"
                    value={routine.end_time}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    type="date"
                    name="exam_date"
                    value={routine.exam_date}
                    onChange={handleChange}
                />
                <button style={styles.button} type="submit">
                    Add Routine
                </button>
            </form>

            <div style={styles.routineList}>
                <h3>Current Routines</h3>
                {routines.map((r) => (
                    <div style={styles.routineItem} key={r.id}>
                        <p style={styles.routineItemText}>
                            <strong>Day:</strong> {r.day}
                        </p>
                        <p style={styles.routineItemText}>
                            <strong>Course Name:</strong> {r.course_name}
                        </p>
                        <p style={styles.routineItemText}>
                            <strong>Course Code:</strong> {r.course_code}
                        </p>
                        <p style={styles.routineItemText}>
                            <strong>Classroom:</strong> {r.classroom}
                        </p>
                        <p style={styles.routineItemText}>
                            <strong>Start Time:</strong> {formatTime(r.start_time)}
                        </p>
                        <p style={styles.routineItemText}>
                            <strong>End Time:</strong> {formatTime(r.end_time)}
                        </p>
                        <p style={styles.routineItemText}>
                            <strong>Exam Date:</strong> {formatDate(r.exam_date)}
                        </p>
                        <button
                            style={styles.deleteButton}
                            onClick={() => handleDeleteRoutine(r.id)}
                        >
                            Delete Routine
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SetExamRoutine;

