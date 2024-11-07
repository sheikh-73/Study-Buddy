import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [error, setError] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialFile, setMaterialFile] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:9999/get-folders/${token}`);
        if (response.data && Array.isArray(response.data.folders)) {
          const fetchedFolders = response.data.folders.map((folder) => ({
            ...folder,
            materials: folder.materials || [],
          }));
          setFolders(fetchedFolders);
        } else {
          setError("Unexpected response structure.");
        }
      } catch (error) {
        setError("Error fetching folders. Please try again later.");
      }
    };

    fetchFolders();
  }, []);

  const createFolder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:9999/create-personal-folder/${token}`, {
        name: folderName,
      });
      const response = await axios.get(`http://localhost:9999/get-folders/${token}`);
      setFolders(response.data.folders);
      setFolderName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const addMaterial = async (e) => {
    e.preventDefault();
    if (selectedFolderId && materialFile) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", materialFile);

      try {
        const uploadResponse = await axios.post(
          `http://localhost:9999/upload-file-personal/${token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const materialUrl = uploadResponse.data.url;

        await axios.post(`http://localhost:9999/add-material-folder/${token}`, {
          pfid: selectedFolderId,
          title: materialTitle,
          url: materialUrl,
        });

        const response = await axios.get(`http://localhost:9999/get-folders/${token}`);
        setFolders(response.data.folders);
        setMaterialTitle("");
        setMaterialFile(null);
      } catch (error) {
        console.error("Error adding material:", error);
      }
    } else {
      console.warn("Selected folder ID or material file is missing.");
    }
  };

  const deleteFolder = async (folderId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:9999/folders/${folderId}/${token}`);
      const response = await axios.get(`http://localhost:9999/get-folders/${token}`);
      setFolders(response.data.folders);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const deleteFolderMaterial = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:9999/delete-folder-materials/${id}/${token}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Folder material deleted successfully");
        const updatedFolders = folders.map(folder => {
          const updatedMaterials = folder.materials.filter(material => material.id !== id);
          return { ...folder, materials: updatedMaterials };
        });
        setFolders(updatedFolders);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting folder material:", error);
    }
  };

  return (
    <div style={styles.body}>
    <div style={styles.container}>
      <h1 style={styles.title}>Folder Management System</h1>
      <form onSubmit={createFolder} style={styles.form}>
        <input
          type="text"
          placeholder="New Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Create Folder
        </button>
      </form>

      <div style={styles.materialSection}>
        <h2>Add Material to Folder</h2>
        <select onChange={(e) => setSelectedFolderId(e.target.value)} style={styles.select}>
          <option value="">Select Folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
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
            type="file"
            onChange={(e) => setMaterialFile(e.target.files[0])}
            style={styles.fileInput}
            required
          />
          <button type="submit" style={styles.button}>
            Add Material
          </button>
        </form>
      </div>

      <div style={styles.folderList}>
        <h2>Folders</h2>
        {folders.map((folder) => (
          <div key={folder.id} style={styles.folderItem}>
            <h3 style={styles.folderName}>{folder.name}</h3>
            <button onClick={() => deleteFolder(folder.id)} style={styles.deleteFolderButton}>
              Delete Folder
            </button>
            <ul style={styles.materialList}>
              {folder.materials.map((material) => (
                <li key={material.id} style={styles.materialItem}>
                  <a href={material.url} target="_blank" rel="noopener noreferrer" style={styles.materialLink}>
                    {material.title}
                  </a>
                  <button
                    onClick={() => deleteFolderMaterial(material.id)}
                    style={styles.deleteMaterialButton}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#98c1d9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },

  title: {
    textAlign: "center",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  materialSection: {
    marginBottom: "30px",
  },
  folderList: {
    marginTop: "30px",
  },
  folderItem: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#ecf0f1",
  },
  folderName: {
    margin: "0",
  },
  materialList: {
    listStyleType: "none",
    padding: "0",
  },
  materialItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
  },
  materialLink: {
    textDecoration: "none",
    color: "#3498db",
  },
  deleteFolderButton: {
    marginLeft: "10px",
    backgroundColor: "#3A6D8C",
    color:"white"
  },
  deleteMaterialButton: {
    marginLeft: "10px",
    backgroundColor: "#D91656",
    color:"white",
    border:"none",
  },
};

export default App;
