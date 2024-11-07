import { useState, useEffect } from 'react';
import axios from 'axios';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({ title: '', url: '' });
    const [file, setFile] = useState(null); // State to hold the file
    const courseId = 1; // Replace this with your actual courseId or implement logic to get it dynamically
    const token=localStorage.getItem("token");
    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
              
        const response = await axios.get(`http://localhost:9999/questions/${courseId}/${token}`);
        setQuestions(response.data);
    };

    const handleQuestionChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file
    };

    const addQuestion = async (e) => {
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
            question.url = fileUploadResponse.data.url; // Update the URL with the uploaded file's URL
        }

        // Add courseId to the question data
        await axios.post(`http://localhost:9999/questions/${courseId}/${token}`, { ...question, courseId });
        fetchQuestions();
        setQuestion({ title: '', url: '' }); // Reset form
        setFile(null); // Reset the file input
    };

    return (
        <div>
            <h1>Question Manager</h1>
            <form onSubmit={addQuestion}>
                <h2>Add Question</h2>
                <input type="text" name="title" placeholder="Title" value={question.title} onChange={handleQuestionChange} required />
                <input type="file" onChange={handleFileChange} required /> {/* File input for uploading files */}
                <button type="submit">Add Question</button>
            </form>

            <h2>Questions List</h2>
            <ul>
                {questions.map(q => (
                    <li key={q.title}>
                        {q.title} - <a href={q.url} target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Questions;
