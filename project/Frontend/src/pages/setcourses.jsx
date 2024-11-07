import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialFile, setMaterialFile] = useState(null); // Store the file selected
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [error, setError] = useState(null);

  //Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:9999/courses/${token}`
        );

        if (response.data && Array.isArray(response.data.courses)) {
          const fetchedCourses = response.data.courses.map((course) => ({
            ...course,
            materials: course.materials || [], // Ensure materials is always an array
          }));
          setCourses(fetchedCourses);
        } else {
          console.error("Expected an array of courses but got:", response.data);
          setError("Unexpected response structure.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Error fetching courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  // Create a new course
  const createCourse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:9999/create-course/${token}`, {
        name: courseName,
        code: courseCode,
      });
      setCourseName("");
      setCourseCode("");
      const response = await axios.get(
        `http://localhost:9999/courses/${token}`
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  // Add material to a course
  const addMaterial = async (e) => {
    e.preventDefault();
    if (selectedCourseId && materialFile) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", materialFile); // Append the selected file

      try {
        // First, upload the file
        const uploadResponse = await axios.post(
          `http://localhost:9999/upload-file/${token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const materialUrl = uploadResponse.data.url; // Assuming your API returns the URL of the uploaded file

        // Now add the material with the obtained URL
        await axios.post(`http://localhost:9999/add-material/${token}`, {
          courseId: selectedCourseId,
          title: materialTitle,
          url: materialUrl,
        });
        setMaterialTitle("");
        setMaterialFile(null); // Reset the file input
        const response = await axios.get(
          `http://localhost:9999/courses/${token}`
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error adding material:", error);
      }
    }
  };

  // Delete a course
  const deleteCourse = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9999/courses/${courseId}/${token}`);
      const response = await axios.get(
        `http://localhost:9999/courses/${token}`
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Delete material
  const deleteCourseMaterial = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:9999/course-materials/${id}/${token}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Course material deleted successfully");
        // Refresh the list of materials or update the UI as necessary
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting course material:", error);
    }
  };

  return (
    <div style={styles.body}>
    <div style={styles.container}>
      <h1 style={styles.heading}>Course Management</h1>
      <form onSubmit={createCourse} style={styles.form}>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Add Course
        </button>
      </form>

      <div style={styles.addSection}>
        <h3>Add Material</h3>
        <select
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Course</option>
          {courses &&
            courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
        </select>
        <form onSubmit={addMaterial} style={styles.form}>
          <input
            type="text"
            placeholder="Material Title"
            value={materialTitle}
            onChange={(e) => setMaterialTitle(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="file" // File input for choosing files
            onChange={(e) => setMaterialFile(e.target.files[0])}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Add Material
          </button>
        </form>
      </div>

      {/* <ul style={styles.courseList}>
        {courses &&
          courses.map((course) => (
            <li key={course.id} style={styles.courseItem}>
              <strong>
                {course.name} ({course.code})
              </strong>
              <button
                onClick={() => deleteCourse(course.id)}
                style={styles.deleteButton}
              >
                Delete Course
              </button>
              <ul>
                {course.materials &&
                  course.materials.map((material) => (
                    <li key={material.id}>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {material.title}
                      </a>
                      <button
                        onClick={() => deleteCourseMaterial(material.id)}
                        style={styles.deleteButton}
                      >
                        Delete Material
                      </button>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul> */}


<ul style={styles.courseList}>
  {courses &&
    courses.map((course) => (
      <li key={course.id} style={styles.courseItem}>
        <strong>
          {course.name} ({course.code})
        </strong>
        <button
          onClick={() => deleteCourse(course.id)}
          style={styles.deleteButton}
        >
          Delete Course
        </button>
        <button
          onClick={() => window.location.href='/add-question'} // Navigate to Add Question page
          style={styles.button}
        >
          Add Question
        </button>
        <button
          onClick={() => window.location.href='/add-solution'} // Navigate to Add Solution page
          style={styles.button}
        >
          Add Solution
        </button>
        <ul>
          {course.materials &&
            course.materials.map((material) => (
              <li key={material.id}>
                <a
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {material.title}
                </a>
                <button
                  onClick={() => deleteCourseMaterial(material.id)}
                  style={styles.deleteButton}
                >
                  Delete Material
                </button>
              </li>
            ))}
        </ul>
      </li>
    ))}
</ul>

    </div>
     </div>
  );
};

// CSS Styles in JS (unchanged)
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#c0c0c0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  body:{
    backgroundColor: "#cad2c5",
    
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    margin: "20px 0",
  },
  input: {
    width: "calc(100% - 22px)",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#2f3e46",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "5px",
  },
  addSection: {
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  courseList: {
    listStyleType: "none",
    padding: 0,
  },
  courseItem: {
    backgroundColor: "#e9ecef",
    margin: "10px 0",
    padding: "15px",
    borderRadius: "4px",
    position: "relative",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    marginLeft: "10px",
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "15px",
  },
};

export default App;
