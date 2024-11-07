// import { useNavigate } from "react-router-dom";

// export default function Setgoals() {
//     const navigate=useNavigate();
//     const handleChange=(e)=>{
//        e.preventDefault();
//        try{
//              navigate("/setyourgoals");
//        }catch(error){
//         console.log(error);
//        }
//     }


//     const handleChange1=(e)=>{
//        e.preventDefault();
//        try{
//              navigate("/setprayertime");
//        }catch(error){
//         console.log(error);
//        }
//     }

    
//     const handleChange2=(e)=>{
//       e.preventDefault();
//       try{
//             navigate("/viewprogress");
//       }catch(error){
//        console.log(error);
//       }
//    }

//   //   const handleChange2=(e)=>{
//   //     e.preventDefault();
//   //     try{
//   //           navigate("/setclasstime");
//   //     }catch(error){
//   //      console.log(error);
//   //     }
//   //  }

   
//    const handleChange3=(e)=>{
//     e.preventDefault();
//     try{
//           navigate("/setexamroutine");
//     }catch(error){
//      console.log(error);
//     }
//  }
//     return (
//       <div style={styles.pageContainer}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.headerTitle}>Features</h1>
//           <p style={styles.headerSubtitle}>Manage your tasks and activities efficiently</p>
//         </div>
  
//         {/* Features Grid */}
//         <div style={styles.featuresGrid}>
//           <FeatureCard title="Set Your Goals" handleChange={handleChange}/>
//           <FeatureCard title="View Progress"  handleChange={handleChange2} />
//           <FeatureCard title="Set Prayer Time" handleChange={handleChange1}/>
//           {/* <FeatureCard title="Set Class Time" handleChange={handleChange2}/> */}
//           <FeatureCard title="Set Exam Routine" handleChange={handleChange3}/>
//         </div>
//       </div>
//     );
//   }
  
//   const FeatureCard = ({ title,handleChange }) => {
//     return (
//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>{title}</h2>
//         <button
//           style={styles.cardButton}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = "#16a085")}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = "#1abc9c")}
//           onClick={handleChange}
//         >
//           Start
//         </button>
//       </div>
//     );
//   };
  
//   const styles = {
//     pageContainer: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       height: "100vh",
//       backgroundColor: "#121212",
//       color: "#ffffff",
//       fontFamily: "Arial, sans-serif",
//       padding: "20px",
//     },
//     header: {
//       marginBottom: "30px",
//       textAlign: "center",
//     },
//     headerTitle: {
//       fontSize: "36px",
//       marginBottom: "10px",
//     },
//     headerSubtitle: {
//       fontSize: "18px",
//       color: "#bbbbbb",
//     },
//     featuresGrid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//       gap: "20px",
//       width: "100%",
//       maxWidth: "800px",
//     },
//     card: {
//       backgroundColor: "#1f1f1f",
//       borderRadius: "10px",
//       padding: "20px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
//       textAlign: "center",
//       transition: "transform 0.2s ease",
//     },
//     cardTitle: {
//       fontSize: "24px",
//       marginBottom: "15px",
//     },
//     cardButton: {
//       backgroundColor: "#1abc9c",
//       color: "#ffffff",
//       border: "none",
//       borderRadius: "8px",
//       padding: "10px 15px",
//       cursor: "pointer",
//       fontSize: "18px",
//       transition: "transform 0.2s ease",
//     },
//   };
  
//   // Add scaling effect on hover
//   const handleCardHover = (e) => {
//     e.currentTarget.style.transform = "scale(1.05)";
//   };
  
//   const handleCardLeave = (e) => {
//     e.currentTarget.style.transform = "scale(1)";
//   };
  
//   // Attach the hover handlers to the card
import { useNavigate } from "react-router-dom";

export default function Setgoals() {
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        try {
            navigate("/setyourgoals");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange1 = (e) => {
        e.preventDefault();
        try {
            navigate("/setprayertime");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange2 = (e) => {
        e.preventDefault();
        try {
            navigate("/viewprogress");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange3 = (e) => {
        e.preventDefault();
        try {
            navigate("/setexamroutine");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={styles.pageContainer}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>Features</h1>
                <p style={styles.headerSubtitle}>Manage your tasks and activities efficiently</p>
            </div>

            {/* Features Grid */}
            <div style={styles.featuresGrid}>
                <FeatureCard title="Set Your Goals" handleChange={handleChange} />
                <FeatureCard title="View Progress" handleChange={handleChange2} />
                <FeatureCard title="Set Prayer Time" handleChange={handleChange1} />
                <FeatureCard title="Set Exam Routine" handleChange={handleChange3} />
            </div>
        </div>
    );
}

const FeatureCard = ({ title, handleChange }) => {
    return (
        <div
            style={styles.card}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
        >
            <h2 style={styles.cardTitle}>{title}</h2>
            <button
                style={styles.cardButton}
                onClick={handleChange}
            >
                Start
            </button>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#3d5a80", // Background color from your palette
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    header: {
        marginBottom: "30px",
        textAlign: "center",
    },
    headerTitle: {
        fontSize: "36px",
        marginBottom: "10px",
    },
    headerSubtitle: {
        fontSize: "18px",
        color: "#eeeeee", // Lighter shade for better contrast
    },
    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "800px",
    },
    card: {
        backgroundColor: "#98c1d9", // Card background color
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        transition: "transform 0.2s ease",
    },
    cardTitle: {
        fontSize: "24px",
        marginBottom: "15px",
    },
    cardButton: {
        backgroundColor: "#ee6c4d", // Button color
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 15px",
        cursor: "pointer",
        fontSize: "18px",
        transition: "background-color 0.3s ease",
    },
};

// Add scaling effect on hover
const handleCardHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
};

const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
};
