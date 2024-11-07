// // ProgressPage.jsx
// import { useEffect, useState } from 'react';

// const ProgressPage = () => {
//     const [goals, setGoals] = useState([]);
//     const [prayerTimes, setPrayerTimes] = useState([]);
//     const [error, setError] = useState(null);
    
//     // Retrieve token from local storage
//     const token = localStorage.getItem('token') || ''; // Default to empty string

//     // Fetch data function
//     const fetchData = async () => {
//         if (!token) {
//             console.error('Token is undefined, cannot fetch data.');
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:9999/get-progress-data/${token}`);

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setGoals(data.goals || []);
//             setPrayerTimes(data.prayerTimes || []);
//         } catch (error) {
//             console.error('Error fetching progress data:', error);
//             setError(error.message);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [token]); // Fetch data when the token changes

//     // Handle errors
//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h1>Your Progress</h1>
//             <h2>Goals</h2>
//             {goals.length > 0 ? (
//                 <ul>
//                     {goals.map(goal => (
//                         <li key={goal.indexNo}>{goal.title}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No goals found.</p>
//             )}
//             <h2>Prayer Times</h2>
//             {prayerTimes.length > 0 ? (
//                 <ul>
//                     {prayerTimes.map(prayer => (
//                         <li key={prayer.indexNo}>{prayer.description}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No prayer times found.</p>
//             )}
//         </div>
//     );
// };

// export default ProgressPage;
import { useEffect, useState } from 'react';

const ProgressPage = () => {
    const [goals, setGoals] = useState([]);
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [error, setError] = useState(null);
    
    const token = localStorage.getItem('token') || ''; // Default to empty string

    const fetchData = async () => {
        if (!token) {
            console.error('Token is undefined, cannot fetch data.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:9999/get-progress-data/${token}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setGoals(data.goals || []);
            setPrayerTimes(data.prayerTimes || []);
        } catch (error) {
            console.error('Error fetching progress data:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    // Handle errors
    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    // Calculate progress percentage for goals
    const calculateProgress = (items) => {
        const total = items.length;
        const completed = items.filter(item => item.completed).length; // Assuming `completed` is a boolean in your item data
        return total > 0 ? (completed / total) * 100 : 0;
    };

    const goalProgress = calculateProgress(goals);
    const prayerProgress = calculateProgress(prayerTimes);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Your Progress</h1>
            
            <h2 style={styles.sectionTitle}>Goals</h2>
            <div style={styles.progressContainer}>
                <div
                    style={{
                        ...styles.progressBar,
                        width: `${goalProgress}%`,
                        backgroundColor: goalProgress === 100 ? '#ee6c4d' : '#3d5a80',
                    }}
                />
            </div>
            <p style={styles.progressText}>{goalProgress.toFixed(2)}% completed</p>
            {goals.length > 0 ? (
                <ul style={styles.list}>
                    {goals.map(goal => (
                        <li key={goal.indexNo} style={styles.listItem}>
                            {goal.title} - {goal.completed ? "Completed" : "Not Completed"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No goals found.</p>
            )}

            <h2 style={styles.sectionTitle}>Prayer Times</h2>
            <div style={styles.progressContainer}>
                <div
                    style={{
                        ...styles.progressBar,
                        width: `${prayerProgress}%`,
                        backgroundColor: prayerProgress === 100 ? '#ee6c4d' : '#3d5a80',
                    }}
                />
            </div>
            <p style={styles.progressText}>{prayerProgress.toFixed(2)}% completed</p>
            {prayerTimes.length > 0 ? (
                <ul style={styles.list}>
                    {prayerTimes.map(prayer => (
                        <li key={prayer.indexNo} style={styles.listItem}>
                            {prayer.description} - {prayer.completed ? "Completed" : "Not Completed"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No prayer times found.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#e0fbfc', // Light background color
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
        color: '#293241', // Main text color
    },
    title: {
        textAlign: 'center',
        color: '#3d5a80', // Title color
        marginBottom: '20px',
    },
    sectionTitle: {
        color: '#3d5a80', // Section title color
        marginTop: '20px',
        fontSize: '24px',
    },
    progressContainer: {
        width: '100%',
        backgroundColor: '#98c1d9', // Progress container color
        borderRadius: '5px',
        margin: '10px 0',
        height: '20px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: '5px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        padding: '10px',
        backgroundColor: '#3d5a80', // List item background color
        borderRadius: '5px',
        marginBottom: '10px',
        color: '#ffffff', // List item text color
    },
    progressText: {
        color: '#293241', // Progress text color
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: '20px 0',
    },
};

export default ProgressPage;


