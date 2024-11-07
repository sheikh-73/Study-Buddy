
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
// import { faUser, faBullseye, faBookOpen, faFolder, faComments, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

// export default function Dashboard() {
//     const navigate = useNavigate();

//     const handleNavigation = (path) => {
//         try {
//             navigate(path);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div style={styles.dashboardContainer}>
//             {/* Left-side Div with buttons */}
//             <div style={styles.sidebar}>
//                 <h2 style={styles.sidebarTitle}>Navigation</h2>
//                 <button style={styles.sidebarButton} onClick={() => handleNavigation("/profile")}>
//                     <FontAwesomeIcon icon={faUser} /> Profile
//                 </button>
//                 <button style={styles.sidebarButton} onClick={() => handleNavigation("/setgoals")}>
//                     <FontAwesomeIcon icon={faBullseye} /> Set Goals
//                 </button>
//                 <button style={styles.sidebarButton} onClick={() => handleNavigation("/setcourses")}>
//                     <FontAwesomeIcon icon={faBookOpen} /> Your Courses
//                 </button>
//                 <button style={styles.sidebarButton} onClick={() => handleNavigation("/personalfolder")}>
//                     <FontAwesomeIcon icon={faFolder} /> Personal Folder
//                 </button>
//                 <button style={styles.sidebarButton} onClick={() => handleNavigation("/globalchat")}>
//                     <FontAwesomeIcon icon={faComments} /> Global Chat
//                 </button>
//                 <button style={styles.sidebarButton} onClick={() => handleNavigation("/findq&s")}>
//                     <FontAwesomeIcon icon={faQuestionCircle} /> Find Q&S
//                 </button>
//             </div>

//             {/* Right-side Div */}
//             <div style={styles.rightContainer}>
//                 <div style={styles.blueBox}>
//                     <h2 style={styles.title}>Welcome to Your Dashboard</h2>
//                     <p style={styles.subtitle}>Manage your goals and courses efficiently.</p>
//                 </div>

//                 <div style={styles.redBox}>
//                     <h3 style={styles.featuresList}>Features List</h3>
//                     <div style={styles.largeButtonGroup}>
//                         <button style={styles.largeButton} onClick={() => handleNavigation("/setgoals")}>
//                             <FontAwesomeIcon icon={faBullseye} /> Set Goals
//                         </button>
//                         <button style={styles.largeButton} onClick={() => handleNavigation("/setcourses")}>
//                             <FontAwesomeIcon icon={faBookOpen} /> Your Courses
//                         </button>
//                         <button style={styles.largeButton} onClick={() => handleNavigation("/personalfolder")}>
//                             <FontAwesomeIcon icon={faFolder} /> Personal Folder
//                         </button>
//                         <button style={styles.largeButton} onClick={() => handleNavigation("/globalchat")}>
//                             <FontAwesomeIcon icon={faComments} /> Global Chat
//                         </button>
//                         <button style={styles.largeButton} onClick={() => handleNavigation("/findq&s")}>
//                             <FontAwesomeIcon icon={faQuestionCircle} /> Find Q&S
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     dashboardContainer: {
//         display: "flex",
//         flexDirection: "row",
//         height: "100vh",
//         backgroundColor: "#f4f4f4",
//         fontFamily: "Arial, sans-serif",
//     },
//     sidebar: {
//         border: "2px solid #ddd",
//         height: "94vh",
//         width: "250px",
//         padding: "20px",
//         backgroundColor: "#ffffff",
//         boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
//     },
//     sidebarTitle: {
//         fontSize: "24px",
//         textAlign: "center",
//         marginBottom: "20px",
//         color: "#333",
//     },
//     sidebarButton: {
//         marginTop: "10px",
//         width: "100%",
//         border: "none",
//         backgroundColor: "#007bff", // Bootstrap primary color
//         cursor: "pointer",
//         borderRadius: "8px",
//         color: "#ffffff",
//         padding: "10px 0",
//         fontSize: "18px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "background-color 0.3s ease",
//     },
//     rightContainer: {
//         display: "flex",
//         flexDirection: "column",
//         flexGrow: 1,
//         marginLeft: "20px",
//     },
//     blueBox: {
//         border: "2px solid #4a90e2",
//         height: "70vh",
//         padding: "20px",
//         borderRadius: "10px",
//         backgroundColor: "#e6f7ff",
//     },
//     redBox: {
//         marginTop: "20px",
//         border: "2px solid #ff4d4f",
//         padding: "20px",
//         fontSize: "20px",
//         height: "50vh",
//         borderRadius: "10px",
//         backgroundColor: "#ffdddd",
//     },
//     title: {
//         fontSize: "24px",
//         marginBottom: "10px",
//         color: "#333",
//     },
//     subtitle: {
//         fontSize: "18px",
//         color: "#666",
//     },
//     featuresList: {
//         fontSize: "24px",
//         marginTop: "35px",
//         textAlign: "center",
//         fontWeight: "bold",
//         color: "#333",
//     },
//     largeButtonGroup: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginTop: "20px",
//     },
//     largeButton: {
//         height: "100px",
//         width: "180px",
//         backgroundColor: "#007bff", // Bootstrap primary color
//         color: "#ffffff",
//         border: "none",
//         borderRadius: "12px",
//         fontSize: "24px",
//         cursor: "pointer",
//         transition: "transform 0.3s ease, background-color 0.3s ease",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//     },
// };

import { useState } from "react"; // Import useState for managing sidebar state
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUser, faBullseye, faBookOpen, faFolder, faComments, faQuestionCircle, faList } from "@fortawesome/free-solid-svg-icons"; 

const styles = {
    dashboardContainer: {
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
    },
    listButton: {
        margin: "10px",
        padding: "5px", // Adjust padding for better alignment
        color: "#007bff", // Set text color
        border: "none",
        backgroundColor: "transparent", // No background color
        cursor: "pointer",
        fontSize: "24px", // Increase font size if needed
        position: "absolute", // Position the button at the top right
        top: "10px",
        right: "10px",
        zIndex: 1000, // Ensure button is above other elements
    },
    sidebarOpen: {
        border: "2px solid #ddd",
        height: "94vh",
        width: "250px",
        padding: "20px",
        backgroundColor: "#cad2c5",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        position: "relative", // Make the sidebar relative for positioning the button
    },
    sidebarClosed: {
        width: "50px", // Keep a small width when closed
        transition: "width 0.3s ease", // Smooth transition
        overflow: "hidden", // Hide overflow content
    },
    sidebarTitle: {
        fontSize: "24px",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    sidebarButton: {
        marginTop: "10px",
        width: "100%",
        border: "none",
        backgroundColor: "#52796f", // Bootstrap primary color
        cursor: "pointer",
        borderRadius: "8px",
        color: "#ffffff",
        padding: "10px 0",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
    },
    rightContainer: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        marginLeft: "20px",
    },
    blueBox: {
        height: "70vh",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#94d2bd",
    },
    redBox: {
        marginTop: "20px",
        padding: "20px",
        fontSize: "20px",
        height: "50vh",
        borderRadius: "10px",
        backgroundColor: "#00a896",
    },
    title: {
        fontSize: "54px",
        marginBottom: "10px",
      
        color: "#black",
    },
    subtitle: {
        fontSize: "18px",
        color: "#222",
    },
    featuresList: {
        fontSize: "24px",
        marginTop: "35px",
        textAlign: "center",
        fontWeight: "bold",
        color: "#black",
    },
    largeButtonGroup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
    },
    largeButton: {
        height: "100px",
        width: "180px",
        backgroundColor: "#d9d9d9", // Bootstrap primary color
        color: "#284b63",
        border: "none",
        borderRadius: "12px",
        fontSize: "24px",
        cursor: "pointer",
        transition: "transform 0.3s ease, background-color 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Initialize sidebar state to open

    const handleNavigation = (path) => {
        try {
            navigate(path);
        } catch (err) {
            console.log(err);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    return (
        <div style={styles.dashboardContainer}>
            {/* Left-side Div with buttons (Sidebar) */}
            <div style={isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}>
                {/* List button to toggle sidebar */}
                <button style={styles.listButton} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faList} />
                </button>
                {isSidebarOpen && (
                    <>
                        <h2 style={styles.sidebarTitle}>Navigation</h2>
                        <button style={styles.sidebarButton} onClick={() => handleNavigation("/profile")}>
                            <FontAwesomeIcon icon={faUser} /> Profile
                        </button>
                        <button style={styles.sidebarButton} onClick={() => handleNavigation("/setgoals")}>
                            <FontAwesomeIcon icon={faBullseye} /> Set Goals
                        </button>
                        <button style={styles.sidebarButton} onClick={() => handleNavigation("/setcourses")}>
                            <FontAwesomeIcon icon={faBookOpen} /> Your Courses
                        </button>
                        <button style={styles.sidebarButton} onClick={() => handleNavigation("/personalfolder")}>
                            <FontAwesomeIcon icon={faFolder} /> Personal Folder
                        </button>
                        <button style={styles.sidebarButton} onClick={() => handleNavigation("/globalchat")}>
                            <FontAwesomeIcon icon={faComments} /> Global Chat
                        </button>
                        <button style={styles.sidebarButton} onClick={() => handleNavigation("/findq&s")}>
                            <FontAwesomeIcon icon={faQuestionCircle} /> Find Q&S
                        </button>
                    </>
                )}
            </div>

            {/* Right-side Div */}
            <div style={styles.rightContainer}>
                <div style={styles.blueBox}>
                    <h1 style={styles.title}>Welcome to Studdy Buddy</h1>
                    <p style={styles.subtitle}>Manage your goals and courses efficiently.</p>
                    {/* <img src="Frontend\src\public\image\intellectual image.jpg" alt="Intellectual Image" style={{ width: "100%", borderRadius: "10px" }} /> */}

                </div>

                <div style={styles.redBox}>
                    <h3 style={styles.featuresList}>Features List</h3>
                    <div style={styles.largeButtonGroup}>
                        <button style={styles.largeButton} onClick={() => handleNavigation("/setgoals")}>
                            <FontAwesomeIcon icon={faBullseye} /> Set Goals
                        </button>
                        <button style={styles.largeButton} onClick={() => handleNavigation("/setcourses")}>
                            <FontAwesomeIcon icon={faBookOpen} /> Your Courses
                        </button>
                        <button style={styles.largeButton} onClick={() => handleNavigation("/personalfolder")}>
                            <FontAwesomeIcon icon={faFolder} /> Personal Folder
                        </button>
                        <button style={styles.largeButton} onClick={() => handleNavigation("/globalchat")}>
                            <FontAwesomeIcon icon={faComments} /> Global Chat
                        </button>
                        <button style={styles.largeButton} onClick={() => handleNavigation("/findq&s")}>
                            <FontAwesomeIcon icon={faQuestionCircle} /> Find Q&S
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}




