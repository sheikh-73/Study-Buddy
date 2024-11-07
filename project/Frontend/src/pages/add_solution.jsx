import { useState, useEffect } from 'react';
import axios from 'axios';

const Solutions = () => {
    const [solutions, setSolutions] = useState([]);
    const [solution, setSolution] = useState({ title: '', url: '' });
    const [file, setFile] = useState(null); // State to hold the file
    const courseId = 1; // Replace this with your actual courseId or implement logic to get it dynamically
    const token=localStorage.getItem("token");
    useEffect(() => {
        fetchSolutions();
    }, []);

    const fetchSolutions = async () => {
              
        const response = await axios.get(`http://localhost:9999/solutions/${courseId}/${token}`);
        setSolutions(response.data);
    };

    const handleSolutionChange = (e) => {
      setSolution({ ...solution, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file
    };

    const addSolution = async (e) => {
        e.preventDefault();

        // Upload file to the server
        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Append the file to the form data

            // Assuming you have a file upload endpoint
            const fileUploadResponse = await axios.post(`http://localhost:9999/upload/${courseId}/${token}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Set the URL from the response after uploading the file
            solution.url = fileUploadResponse.data.url; // Update the URL with the uploaded file's URL
        }

        // Add courseId to the question data
        await axios.post(`http://localhost:9999/solutions/${courseId}/${token}`, { ...solution, courseId });
        fetchSolutions();
        setSolution({ title: '', url: '' }); // Reset form
        setFile(null); // Reset the file input
    };

    return (
        <div>
            <h1>Solution Manager</h1>
            <form onSubmit={addSolution}>
                <h2>Add Solution</h2>
                <input type="text" name="title" placeholder="Title" value={solution.title} onChange={handleSolutionChange} required />
                <input type="file" onChange={handleFileChange} required /> {/* File input for uploading files */}
                <button type="submit">Add Solutions</button>
            </form>

            <h2>Solutions List</h2>
            <ul>
                {solutions.map(s => (
                    <li key={s.title}>
                        {s.title} - <a href={s.url} target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Solutions;

            