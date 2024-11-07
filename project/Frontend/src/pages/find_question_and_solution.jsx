/*import axios from 'axios';
import { useEffect, useState } from 'react';

const FindQuestionAndSolution = () => {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Fetch questions on component mount
    useEffect(() => {
        const fetchQuestions = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:9999/get-all-questions/${token}`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setError("Error fetching questions. Please try again later.");
            }
        };

        fetchQuestions();
    }, []);

    // Filter questions based on search term
    const filteredQuestions = questions.filter(q => 
        q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Find Question and Answer</h1>
            <input
                type="text"
                placeholder="Search by Question Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />

            {error && <p style={styles.error}>{error}</p>}

            <ul style={styles.questionList}>
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                        <li key={q.questionId} style={styles.questionItem}>
                            <strong>{q.questionTitle}</strong>
                            <p>Course ID: {q.questionCourseId}</p>
                            <a href={q.questionUrl} target="_blank" rel="noopener noreferrer">View Question</a>
                            {q.solutionTitle && (
                                <div style={styles.solution}>
                                    <p><strong>Solution Title:</strong> {q.solutionTitle}</p>
                                    <p>Course ID: {q.solutionCourseId}</p>
                                    <a href={q.solutionUrl} target="_blank" rel="noopener noreferrer">View Solution</a>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </ul>
        </div>
    );
};

// CSS Styles in JS
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#d8e2dc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        color: "#333",
    },
    input: {
        width: "97.5%",
        padding: "10px",
        margin: "5px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    questionList: {
        listStyleType: "none",
        padding: 0,
    },
    questionItem: {
        backgroundColor: "#f8f9fa",
        margin: "10px 0",
        padding: "15px",
        borderRadius: "4px",
    },
    solution: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#e9ecef",
        borderRadius: "4px",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
};

export default FindQuestionAndSolution;*/
import axios from 'axios';
import { useEffect, useState } from 'react';

const FindQuestionAndSolution = () => {
    const [questionsAndSolutions, setQuestionsAndSolutions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Fetch questions and solutions on component mount
    useEffect(() => {
        const fetchQuestionsAndSolutions = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:9999/get-all-questions/${token}`);
                console.log('Questions and Solutions:', response.data); // Debugging
                setQuestionsAndSolutions(response.data);
            } catch (error) {
                console.error("Error fetching questions and solutions:", error);
                setError("Error fetching data. Please try again later.");
            }
        };

        fetchQuestionsAndSolutions();
    }, []);

    // Filter questions based on search term
    const filteredQuestions = questionsAndSolutions.filter(q => 
        q.questionTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Find Question and Answer</h1>
            <input
                type="text"
                placeholder="Search by Question Title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />

            {error && <p style={styles.error}>{error}</p>}

            <ul style={styles.questionList}>
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                        <li key={q.questionId} style={styles.questionItem}>
                            <strong>{q.questionTitle}</strong>
                            <p>Course ID: {q.questionCourseId}</p>
                            <a href={q.questionUrl} target="_blank" rel="noopener noreferrer">View Question</a>
                            
                            {/* Only display the solution if solutionId is not null */}
                            {q.solutionId && (
                                <div style={styles.solution}>
                                    <p><strong>Solution Title:</strong> {q.solutionTitle}</p>
                                    <p>Course ID: {q.solutionCourseId}</p>
                                    <a href={q.solutionUrl} target="_blank" rel="noopener noreferrer">View Solution</a>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </ul>
        </div>
    );
};

// CSS Styles in JS
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#d8e2dc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        color: "#333",
    },
    input: {
        width: "97.5%",
        padding: "10px",
        margin: "5px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    questionList: {
        listStyleType: "none",
        padding: 0,
    },
    questionItem: {
        backgroundColor: "#f8f9fa",
        margin: "10px 0",
        padding: "15px",
        borderRadius: "4px",
    },
    solution: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#e9ecef",
        borderRadius: "4px",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
};

export default FindQuestionAndSolution;

