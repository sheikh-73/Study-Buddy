const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
require("dotenv").config();
// const fs = require('fs');
// const path = require('path');

// const uploadDir = path.join(__dirname, 'Uploads');

// // Ensure upload directory exists
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }
const crypto = require('crypto'); 

const resetToken = crypto.randomBytes(16).toString('hex'); // Generates a random token
console.log("Generated reset token: ", resetToken);

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("/Uploads"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
const database = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// if(database.connect())
// {
//     console.log("database connect...");
// }
// else
// {
//     console.log("database connection failed...");
// }


database.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Database connected...");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

// const upload = multer({storage: storage});
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });
const transport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (receiverEmail, subject, text) => {
    try
    {
        const mailOption = {
            from: process.env.EMAIL,
            to: receiverEmail,
            subject: subject,
            text: text
        }
    
        await transport.sendMail(mailOption, (error, info) => {
            if(error)
            {
                return console.log("Error: "+error);
                // return res.status(404).json(error);
            }
            console.log('Email sent: ' + info.response);
            res.status(201).json({message: `${subject} send ${receiverEmail} successful.`});
        });
    }
    catch(error)
    {
        console.log("Error: "+error);
        return res.status(404).json({message: "server error."});
    }
}

app.get("/msg", (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0];  // Get current date
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: true });  // Get current time
    console.log(currentDate);
    console.log(currentTime);
    res.status(201).json({message: "server running..."});
});

// sign up:
app.post("/signup", upload.single("photo"), async(req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const checkAvailableEmail = "SELECT * FROM users where userId=?";
    database.query(checkAvailableEmail, [req.body.userId], (error, results) => {
        if(error) { console.log("Error: "+error); return res.status(404).json(error);}
        else if(results.length > 0) { console.log("Hello"); return res.status(400).json({message: "This ID has an account."});}
        else
        {
            const sql = "INSERT INTO users (`userId`, `name`, `email`, `password`, `photo`) VALUES (?)";
            const values = [
                req.body.userId,
                req.body.name,
                req.body.email,
                hashPass,
                req.file.filename
            ];
            database.query(sql, [values], (error, data) => {
                if(error)
                {
                    console.log("Error: "+error);
                    return res.status(404).json(error);
                }
                return res.status(200).json({message: `Wlcome ${req.body.name}.`});
            });
        }
    });
});

// sign in:
app.post("/signin", async(req, res) => {
    const sql = "SELECT * FROM users WHERE userId=?";
    database.query(sql, [req.body.userId], (error, results) => {
        if(error)
        {
            console.log("Error: "+error);
            return res.status(404).json(error);
        }
        else if(results.length === 0)
        {
            return res.status(400).json({message: "wrong ID."});
        }

        const user = results[0];
        bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
            if(error)
            {
                console.log("Error: "+error);
                return res.status(404).json(error);
            }
            else if(isMatch)
            {
                const token = jwt.sign({userId: user.userId}, process.env.BCRYPT_KEY, {expiresIn: "1d"});
                res.cookie("token", token);
            
                return res.status(201).json({token,message: `Hello ${user.name}.`});
            }
            else
            {
                res.status(400).json({message: "wrong password"});
            }
        });
    });
});


//forget_password
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body; // Get the email from the request body

    // Query to find the user by email
    const findUserSql = "SELECT userId FROM users WHERE email = ?";
    database.query(findUserSql, [email], (error, results) => {
        if (error) {
            console.error("Error finding user: ", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const userId = results[0].userId; // Get the userId from the query result
        const resetToken = crypto.randomBytes(32).toString('hex'); // Generate a secure random token

        // Update the database with the reset token
        const sql = "UPDATE users SET resetToken = ? WHERE userId = ?";
        database.query(sql, [resetToken, userId], (error) => {
            if (error) {
                console.error("Error updating reset token: ", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
            
            // Here you would send the reset link via email. Example:
            const resetLink = `http://localhost:3000/reset-password/${userId}`;
            // Send an email to the user with the reset link and token

            // For testing, we'll just return the reset link
            res.status(200).json({ message: "Reset link sent to your email.", userId });
        });
    });
});
// app.post("/reset-password", async (req, res) => {
//     const { userId, newPassword, resetToken } = req.body;

//     const sql = "SELECT * FROM users WHERE userId = ? AND resetToken = ?";
//     database.query(sql, [userId, resetToken], (error, results) => {
//         if (error) {
//             console.error("Error fetching user: ", error);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }

//         if (results.length === 0) {
//             return res.status(400).json({ message: "Invalid token or user ID" });
//         }

//         // If valid, hash the new password and update it
//         bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
//             if (err) {
//                 console.error("Error hashing password: ", err);
//                 return res.status(500).json({ message: "Internal Server Error" });
//             }

//             const updateSql = "UPDATE users SET password = ?, resetToken = NULL WHERE userId = ?";
//             database.query(updateSql, [hashedPassword, userId], (updateError) => {
//                 if (updateError) {
//                     console.error("Error updating password: ", updateError);
//                     return res.status(500).json({ message: "Internal Server Error" });
//                 }
//                 res.status(200).json({ message: "Password reset successfully" });
//             });
//         });
//     });
// });


// //get goals
// app.get('/set-goal/:token', verifyToken, async (req, res) => {
//     const userId = req.userId; // Extract userId from the token after verification
  
//     try {
//       const goals = await db.query('SELECT * FROM goals WHERE userId = ?', [userId]);
//       res.status(200).json(goals); // Send goals as response
//     } catch (error) {
//       console.error("Error fetching goals:", error);
//       res.status(500).json({ message: "Error fetching goals." });
//     }
//   });
  





app.post('/reset-password', async (req, res) => {
    const { userId, password } = req.body;

    console.log("Received data:", req.body); // Debugging line

    if (!userId || !password) {
        return res.status(400).json({ error: "User ID and password are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
        const query = 'UPDATE users SET password = ? WHERE userId = ?'; // Adjust based on your schema

        database.query(query, [hashedPassword, userId], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error." });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "User not found." });
            }

            res.status(200).json({ message: "Password reset successfully." });
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Error resetting password." });
    }
});
  


// get user:
app.get("/profile/:token", (req, res) => {
    try
    {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if(error)
            {
                console.log("Error: "+error);
                return res.status(404).json({error: error, message: "Invalid or expired token.Please sign in again."});
            }
            const sql = "select userId, name, email, photo from users where userId=?";
            database.query(sql, [decode.userId], (error, r) => {
                if(error)
                {
                    console.log("Error: "+error);
                    return res.status(404).json({error: error});
                }
                res.status(201).json({data: r});
            });
        });
    }
    catch(error)
    {
        console.log("Error: "+error);
        res.status(404).json({message: "Server error."});
    }
});



// send notificaton for remind him/her goals:
app.get("/send-notification", (req, res) => 
    {
        try
        {
            const currentDate = new Date().toISOString().split('T')[0];
            const currentTime = new Date().toLocaleTimeString('en-GB', {hour12: false});
    
            console.log(currentDate);
            console.log(currentTime);
    
            const sql = "select * from goals where startDate<=? and endDate>=? and startTime=?";
            database.query(sql, [currentDate, currentDate, currentTime], (error, results) => {
                if(error)
                {
                    console.log("Error: "+error);
                    return res.status(404).json({error: error});
                }
                if(results.length == 0)
                {
                    return res.status(400).json({message: "There have no goals yet."});
                }
                results.map((result) => {
                    const sql = "select email from users where userId=?";
                    database.query(sql, [result.userId], (error, r) => {
                        if(error)
                        {
                            console.log("Error: "+error);
                            return res.status(404).json({error: error});
                        }
                        sendEmail(r.email, "Goal Alert", `Your ${result.title} Goal has been trigged.`);
                    });
                });
                res.status(201).json({data: results, message: "Notification send successful."});
            });
        }
        catch(error)
        {
            console.log("Error: "+error);
            res.status(404).json({message: "server error."});
        }
    });


//------------------------------ViewGraph-------------->>>>>>>>>>


// app.get('/get-progress-data/:token', (req, res) => {
//     try {
//         const token = req.params.token;
//         const secret = process.env.JWT_SECRET;

//         if (!secret) {
//             return res.status(500).json({ message: 'JWT secret is not defined' });
//         }

//         jwt.verify(token, secret, (error, decode) => {
//             if (error) {
//                 console.log("Error verifying token: " + error);
//                 return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
//             }

//             const userId = decode.userId;

//             const goalsSql = "SELECT * FROM goals WHERE userId=?";
//             database.query(goalsSql, [userId], (error, goalsResults) => {
//                 if (error) {
//                     console.log("Error fetching goals: " + error);
//                     return res.status(500).json({ error: error });
//                 }

//                 const prayerTimesSql = "SELECT * FROM prayer_times WHERE userId=?";
//                 database.query(prayerTimesSql, [userId], (error, prayerTimesResults) => {
//                     if (error) {
//                         console.log("Error fetching prayer times: " + error);
//                         return res.status(500).json({ error: error });
//                     }

//                     res.status(200).json({ 
//                         goals: goalsResults || [], 
//                         prayerTimes: prayerTimesResults || [] 
//                     });
//                 });
//             });
//         });
//     } catch (error) {
//         console.log("Server error: " + error);
//         res.status(500).json({ message: "Internal Server Error." });
//     }
// });
app.get('/get-progress-data/:token', (req, res) => {
    try {
        const token = req.params.token;
        
        // Verify the JWT token
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decoded) => {
            if (error) {
                console.error('JWT Verification Error:', error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }

            const userId = decoded.userId;
            // SQL query to fetch user progress data
            const sqlGoals = "SELECT * FROM goals WHERE userId = ?";
            const sqlPrayerTimes = "SELECT * FROM prayertimes WHERE userId = ?"; // Assuming similar table structure for prayer times

            // Fetch goals
            database.query(sqlGoals, [userId], (error, goalResults) => {
                if (error) {
                    console.error("Error fetching goals: ", error);
                    return res.status(500).json({ error: error });
                }

                // Fetch prayer times
                database.query(sqlPrayerTimes, [userId], (error, prayerResults) => {
                    if (error) {
                        console.error("Error fetching prayer times: ", error);
                        return res.status(500).json({ error: error });
                    }

                    // Respond with both goals and prayer times
                    return res.status(200).json({
                        goals: goalResults.length > 0 ? goalResults : [],
                        prayerTimes: prayerResults.length > 0 ? prayerResults : [],
                        message: "Data retrieved successfully."
                    });
                });
            });
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error." });
    }
});







  



///-----------------------All the goals--------------------->>>>>>>>>>>>>>>>>

// Create goals:
app.post("/set-goal/:token", async (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }
            const sql = "INSERT INTO goals (`title`, `description`, `startTime`, `endTime`, `startDate`, `endDate`, `userId`) VALUES (?)";
            const values = [
                req.body.title,
                req.body.description,
                req.body.startTime,
                req.body.endTime,
                req.body.startDate,
                req.body.endDate,
                decode.userId
            ];
            database.query(sql, [values], (error, r) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error });
                }
                res.status(201).json({ message: `Your ${req.body.title} is set to your goal.` });
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});

// Get goals:
app.get("/get-goals/:token", (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }
            const sql = "SELECT * FROM goals WHERE userId=?";
            database.query(sql, [decode.userId], (error, results) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error });
                }
                if (results.length > 0) {
                    return res.status(200).json({ data: results, message: "success" });
                }
                res.status(200).json({ message: "No goals have yet." });
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});

// Update goal:
app.put("/update-goal/:token/:indexNo", (req, res) => {
    try {
        const token = req.params.token;
        const indexNo = req.params.indexNo;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }
            const sql = "UPDATE goals SET title=?, description=?, startTime=?, endTime=?, startDate=?, endDate=? WHERE indexNo=?";
            const values = [
                req.body.title,
                req.body.description,
                req.body.startTime,
                req.body.endTime,
                req.body.startDate,
                req.body.endDate,
                indexNo
            ];
            database.query(sql, values, (error, r) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error });
                }
                res.status(200).json({ message: `Your ${req.body.title} goal update successful.` });
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});


// Delete goal:
app.delete("/delete-goal/:token/:indexNo", (req, res) => {
    try {
        const token = req.params.token;
        const indexNo = req.params.indexNo; // Use params instead of query
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }
            const sql = "DELETE FROM goals WHERE indexNo=?";
            database.query(sql, [indexNo], (error, r) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error });
                }
                res.status(200).json({ message: "Delete Your goal successful." });
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});







//--------------------------Prayer Time Section------------------------->>>>>>>>>>>>>>>>>>>>>>


// Set prayer time:
app.post("/set-prayer/:token", async (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error verifying token: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }

            const { description, startTime, endTime } = req.body;

            // Log received values
            console.log("Received values:", { description, startTime, endTime });

            // Validate time format
            const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
            if (!isValidTime(startTime) || !isValidTime(endTime)) {
                return res.status(400).json({ message: "Invalid time format. Please use HH:MM format." });
            }

            const sql = "INSERT INTO prayertimes (`description`, `startTime`, `endTime`, `userId`) VALUES (?)";
            const values = [description, startTime, endTime, decode.userId];

            console.log("SQL Values to be inserted:", values);

            database.query(sql, [values], (error, result) => {
                if (error) {
                    console.log("Error inserting into database: " + error);
                    return res.status(500).json({ error: error, message: "Database insert failed." });
                }
                res.status(201).json({ message: `Your ${description} is set to your prayer.` });
            });
        });
    } catch (error) {
        console.log("Server Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});


// Get all set prayer time:
app.get("/prayer-times/:token", (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }

            const sql = "SELECT * FROM prayertimes WHERE userId=?";
            database.query(sql, [decode.userId], (error, results) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error, message: "Database query failed." });
                }

                if (results.length > 0) {
                    return res.status(200).json({ data: results, message: "Success" });
                } else {
                    return res.status(204).json({ message: "No prayer times have been set yet." });
                }
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});

// Update prayer time:
app.put("/update-prayer-time/:token", (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }

            const { description, startTime, endTime } = req.body;

            // Validate time format
            const isValidTime = (time) => {
                const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM format
                return timeRegex.test(time);
            };

            if (!isValidTime(startTime) || !isValidTime(endTime)) {
                return res.status(400).json({ message: "Invalid time format. Please use HH:MM format." });
            }

            const sql = "UPDATE prayertimes SET description=?, startTime=?, endTime=? WHERE indexNo=?";
            const values = [description, startTime, endTime];

            database.query(sql, [...values, req.query.indexNo], (error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error, message: "Database update failed." });
                }
                res.status(200).json({ message: `Your ${description} prayer update successful.` });
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});

// Delete prayer:
app.delete("/delete-prayer/:token", (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                console.log("Error: " + error);
                return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
            }

            const sql = "DELETE FROM prayertimes WHERE indexNo=?";
            database.query(sql, [req.query.indexNo], (error, result) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ error: error, message: "Database delete failed." });
                }
                res.status(200).json({ message: "Your prayer has been successfully deleted." });
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error." });
    }
});


//---------------------Rotines----------------------->>>>>>>>>>>>>>>>>>>>>>



app.post("/set-routine/:token", async (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, async (error, decode) => {
        if (error) {
            console.error("Token verification error:", error.message);
            return res.status(401).json({ error: error.message, message: "Invalid or expired token. Please sign in again." });
        }

        const { routines } = req.body;

        try {
            const sql = "INSERT INTO exam_routines (day, course_name, course_code, classroom, start_time, end_time, exam_date, userId) VALUES ?";
            const values = routines.map(routine => [
                routine.day,
                routine.course_name,
                routine.course_code,
                routine.classroom,
                routine.start_time,
                routine.end_time,
                routine.exam_date,
                decode.userId,
            ]);

            await database.query(sql, [values]);
            res.status(201).json({ message: "Routines added successfully." });
        } catch (error) {
            // Log only the relevant properties
            console.error('Error adding routine:', error.message);
         
            res.status(500).json({ error: 'Failed to add routine.' });
        }
    });
});


// Get routines for a user

app.post("/set-routine/:token", async (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, async (error, decode) => {
        if (error) {
            console.error("Token verification error:", error.message);
            return res.status(401).json({ error: error.message, message: "Invalid or expired token. Please sign in again." });
        }

        const { routines } = req.body;

        try {
            const sql = "INSERT INTO exam_routines (day, course_name, course_code, classroom, start_time, end_time, exam_date, userId) VALUES ?";
            const values = routines.map(routine => [
                routine.day,
                routine.course_name,
                routine.course_code,
                routine.classroom,
                routine.start_time,
                routine.end_time,
                routine.exam_date,
                decode.userId,
            ]);

            await database.query(sql, [values]);
            res.status(201).json({ message: "Routines added successfully." });
        } catch (error) {
            // Log only the relevant properties
            console.error('Error adding routine:', error.message);
         
            res.status(500).json({ error: 'Failed to add routine.' });
        }
    });
});


// Get routines for a user
app.get("/get-routines/:token", async (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, async (error, decode) => {
        if (error) {
            console.log("Error: " + error);
            return res.status(401).json({ error: error.message, message: "Invalid or expired token. Please sign in again." });
        }

        try {
            const sql = "SELECT * FROM exam_routines WHERE userId = ?";
            // In the mysql package, the result is a single value, not destructurable.
            const results = await new Promise((resolve, reject) => {
                database.query(sql, [decode.userId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);  // Only the results, no need to destructure
                    }
                });
            });

            // Send the plain result
            res.status(200).json(results);
        } catch (error) {
            console.log("Error: " + error);
            res.status(500).json({ error: error.message });
        }
    });
});


// Delete a routine by ID
app.delete("/delete-routine/:id/:token", async (req, res) => {
    const token = req.params.token;
    const routineId = req.params.id;

    jwt.verify(token, process.env.BCRYPT_KEY, async (error, decode) => {
        if (error) {
            console.log("Error: " + error);
            return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
        }

        try {
            const sql = "DELETE FROM exam_routines WHERE id = ? AND userId = ?";
            await database.query(sql, [routineId, decode.userId]);
            res.status(200).json({ message: "Routine deleted successfully." });
        } catch (error) {
            console.log("Error: " + error);
            res.status(500).json({ error: error.message });
        }
    });
});

// Delete a routine by ID
app.delete("/delete-routine/:id/:token", async (req, res) => {
    const token = req.params.token;
    const routineId = req.params.id;

    jwt.verify(token, process.env.BCRYPT_KEY, async (error, decode) => {
        if (error) {
            console.log("Error: " + error);
            return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
        }

        try {
            const sql = "DELETE FROM exam_routines WHERE id = ? AND userId = ?";
            await database.query(sql, [routineId, decode.userId]);
            res.status(200).json({ message: "Routine deleted successfully." });
        } catch (error) {
            console.log("Error: " + error);
            res.status(500).json({ error: error.message });
        }
    });
});

//----------------------Chats Section--------------------->>>>>>>>>>>>>



 // messaging:
app.post("/set-message", (req, res) => {
    console.log("Incoming data:",req.body);
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('en-GB', {hour12: false});
    const sql = "insert into global_chats (`message`, `date`, `time`, `userId`) values (?,?,?,?)";
    const values = [
        req.body.message,
        currentDate,
        currentTime,
        req.body.userId
    ];
    database.query(sql, values, (error, r) => {
        if(error)
        {
            console.log("Error: "+error);
            return res.status(404).json({error: error});
        }
        res.status(201).json({message: "success."});
    });
});
// get all messages:
app.get("/messages", (req, res) => {
    const sql = "select * from global_chats";
    database.query(sql, (error, results) => {
        if(error)
        {
            console.log("Error: "+error);
            return res.status(404).json({error: error});
        }
        if(results.length == 0)
        {
            return res.status(400).json({message: "No chats have yet"});
        }
        res.status(201).json({data: results});
    });
});

// delete chat:

app.delete("/delete-message", (req, res) => {
    console.log("Delete request received with indexNo:", req.query.indexNo);
    const sql = "DELETE FROM global_chats WHERE indexNo=?";
    database.query(sql, [req.query.indexNo], (error, result) => {
        if (error) {
            console.log("Error: " + error);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Message not found." });
        }
        res.status(200).json({ message: "Delete success." });
    });
});


// create personal folders:
// app.post("/create-folder/:token", (req, res) => {
//     try
//     {
//         const token = req.params.token;
//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if(error)
//             {
//                 console.log("Error: "+error);
//                 return res.status(404).json({error: error, message: "Invalid or expired token.Please sign in again."});
//             }
//             const sql = "insert into personal_folders (`title`, `description`, `userId`) values (?)";
//             const values = [
//                 req.body.title,
//                 req.body.description,
//                 decode.userId
//             ];
//             database.query(sql, [values], (error, r) => {
//                 if(error)
//                 {
//                     console.log("Error: "+error);
//                     return res.status(404).json({error: error});
//                 }
//                 res.status(201).json({message: "folder create successful."});
//             });
//         });
//     }
//     catch(error)
//     {
//         console.log("Error: "+error);
//         res.status(404).json({message: "Server error."});
//     }
// });




//--------------Personal Folder Section------------------------->



app.post("/create-personal-folder/:token", (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { name } = req.body;

        const sql = "INSERT INTO personal_folders (userId, name) VALUES (?, ?)";
        database.query(sql, [decoded.userId, name], (err, results) => {
            if (err) {
                console.error("Error creating personal folder:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(201).json({ folderId: results.insertId });
        });
    });
});



// get  folder:
app.get("/get-folders/:token", (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const sql = `
        SELECT f.id AS folderId, f.name AS folderName,
               cm.id AS materialId, cm.title AS materialTitle, cm.url AS materialUrl
        FROM personal_folders f
        LEFT JOIN pf_materials cm ON f.id = cm.pfid
        WHERE f.userId = ?`;

        database.query(sql, [decoded.userId], (error, results) => {
            if (error) {
                console.error("Database query error:", error);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (results.length === 0) {
                return res.status(200).json({ folders: [] }); // Send an empty array
            }

            const folders = results.reduce((acc, row) => {
                const { folderId, folderName, materialId, materialTitle, materialUrl } = row;

                let folder = acc.find(f => f.id === folderId);
                if (!folder) {
                    folder = { id: folderId, name: folderName, materials: [] };
                    acc.push(folder);
                }
                if (materialId) {
                    folder.materials.push({ id: materialId, title: materialTitle, url: materialUrl });
                }
                return acc;
            }, []);

            res.status(200).json({ folders });
        });
    });
});



// Endpoint to upload a file
app.post('/upload-file-personal/:token', upload.single('file'), (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const fileUrl = `http://localhost:9999/Uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    });
});



// Add folder material

app.post("/add-material-folder/:token", (req, res) => {
    const token = req.params.token;

    // Verify JWT token
    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Destructure the expected properties from req.body
        const { pfid, title, url } = req.body; // Ensure 'pfid' is used here

        // Debugging: Log the values received
        console.log("Received data for adding material:", { pfid, title, url });

        // SQL query to insert a new material
        const sql = "INSERT INTO pf_materials (pfid, title, url) VALUES (?, ?, ?)";
        
        // Execute the query
        database.query(sql, [pfid, title, url], (err, results) => {
            if (err) {
                console.error("Error adding material to folder:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            // Respond with the ID of the newly created material
            res.status(201).json({ materialId: results.insertId });
        });
    });
});



// delete folder:
app.delete("/folders/:folderId/:token", (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const folderId = req.params.folderId;

        const sql = "DELETE FROM personal_folders WHERE id = ?";
        database.query(sql, [folderId], (err) => {
            if (err) {
                console.error("Error deleting folder:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(204).send();
        });
    });
});

// Delete a folders material
app.delete("/delete-folder-materials/:materialId/:token", (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const materialId = req.params.materialId;

        const sql = "DELETE FROM pf_materials WHERE id = ?";
        database.query(sql, [materialId], (err) => {
            if (err) {
                console.error("Error deleting folder material:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(204).send();
        });
    });
});
















///------------------Here All the course Section------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// Add a course
app.post("/create-course/:token", (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { name, code } = req.body;

        const sql = "INSERT INTO courses (userId, name, code) VALUES (?, ?, ?)";
        database.query(sql, [decoded.userId, name, code], (err, results) => {
            if (err) {
                console.error("Error adding course:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(201).json({ courseId: results.insertId });
        });
    });
});

// Endpoint to upload a file
app.post('/upload-file/:token', upload.single('file'), (req, res) => {
    const token = req.params.token;

    // Verify the token
    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const fileUrl = `http://localhost:9999/Uploads/${req.file.filename}`; // URL to access the uploaded file
        res.json({ url: fileUrl });
    });
});


// Add course material
app.post("/add-material/:token", (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { courseId, title, url } = req.body;

        const sql = "INSERT INTO course_materials (courseId, title, url) VALUES (?, ?, ?)";
        database.query(sql, [courseId, title, url], (err, results) => {
            if (err) {
                console.error("Error adding material:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(201).json({ materialId: results.insertId });
        });
    });
});



app.get("/courses/:token", (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err); // More specific error log
            return res.status(401).json({ error: "Unauthorized" });
        }

        console.log("Decoded token:", decoded);

        // Updated SQL query to join courses and materials
        const sql = `
            SELECT c.id AS courseId, c.name AS courseName, c.code AS courseCode,
                   cm.id AS materialId, cm.title AS materialTitle, cm.url AS materialUrl
            FROM courses c
            LEFT JOIN course_materials cm ON c.id = cm.courseId
            WHERE c.userId = ?`;

        database.query(sql, [decoded.userId], (error, results) => {
            if (error) {
                console.error("Database query error:", error); // Log database errors
                return res.status(500).json({ error: "Internal server error" });
            }

            if (results.length === 0) {
                console.log("No courses found for userId:", decoded.userId);
                return res.status(404).json({ message: "No courses found" });
            }

            // Structure results into courses with their materials
            const courses = results.reduce((acc, row) => {
                const { courseId, courseName, courseCode, materialId, materialTitle, materialUrl } = row;

                let course = acc.find(c => c.id === courseId);
                if (!course) {
                    course = { id: courseId, name: courseName, code: courseCode, materials: [] };
                    acc.push(course);
                }
                if (materialId) {
                    course.materials.push({ id: materialId, title: materialTitle, url: materialUrl });
                }
                return acc;
            }, []);

            res.status(200).json({ courses });
        });
    });
});


// Delete a course
app.delete("/courses/:courseId/:token", (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const courseId = req.params.courseId;

        const sql = "DELETE FROM courses WHERE id = ?";
        database.query(sql, [courseId], (err) => {
            if (err) {
                console.error("Error deleting course:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(204).send();
        });
    });
});

// Delete a course material
app.delete("/course-materials/:id/:token", (req, res) => {
    const token = req.params.token; // Get token from route parameters

    // Verify JWT token
    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const materialId = req.params.id; // Get material ID from parameters

        // SQL query to delete the course material
        const sql = "DELETE FROM course_materials WHERE id = ?";
        database.query(sql, [materialId], (err) => {
            if (err) {
                console.error("Error deleting course material:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(204).send(); // No content to send back
        });
    });
});

//------------------Questions Part------------------------->>>>>>>>>>>>>>>>>>>>>>>




// Route to upload files with JWT verification
app.post('/upload/:courseId/:token', (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        upload.single('file')(req, res, (uploadErr) => {
            if (uploadErr) {
                return res.status(400).json({ error: 'File upload failed' });
            }

            if (req.file) {
                const fileUrl = `http://localhost:9999/Uploads/${req.file.filename}`; // Adjust based on your setup
                res.status(200).json({ url: fileUrl });
            } else {
                res.status(400).json({ error: 'File upload failed' });
            }
        });
    });
});

// Route to get questions for a specific course with JWT verification
const questions = []; // Initialize an empty array to hold the questions

app.get('/questions/:courseId/:token', (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { courseId } = req.params;

        // SQL query to fetch questions for the course from the database
        const sql = "SELECT * FROM questions WHERE courseId = ?";
        database.query(sql, [parseInt(courseId, 10)], (err, results) => {
            if (err) {
                console.error("Error fetching questions from the database:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            res.status(200).json(results);
        });
    });
});



// Route to add a question with JWT verification
app.post('/questions/:courseId/:token', (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { title, url } = req.body;
        const { courseId } = req.params;

        // Validate request data
        if (!title || !courseId) {
            return res.status(400).json({ error: 'Title and Course ID are required' });
        }

        // SQL query to insert question into database
        const sql = "INSERT INTO questions (courseId, title, url) VALUES (?, ?, ?)";
        database.query(sql, [parseInt(courseId, 10), title, url], (err, result) => {
            if (err) {
                console.error("Error adding question to the database:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            res.status(201).json({ message: 'Question added successfully', questionId: result.insertId });
        });
    });
});



//---------------------------------Solution Part------------------->>>>>>>>>>>>>>>>>>>>>

app.post('/upload/:courseId/:token', (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        upload.single('file')(req, res, (uploadErr) => {
            if (uploadErr) {
                return res.status(400).json({ error: 'File upload failed' });
            }

            if (req.file) {
                const fileUrl = `http://localhost:9999/Uploads/${req.file.filename}`; // Adjust based on your setup
                res.status(200).json({ url: fileUrl });
            } else {
                res.status(400).json({ error: 'File upload failed' });
            }
        });
    });
});

// Route to get solutions for a specific course with JWT verification
const solutions = []; // Initialize an empty array to hold the solutions

app.get('/solutions/:courseId/:token', (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { courseId } = req.params;

        // SQL query to fetch questions for the course from the database
        const sql = "SELECT * FROM solutions WHERE courseId = ?";
        database.query(sql, [parseInt(courseId, 10)], (err, results) => {
            if (err) {
                console.error("Error fetching questions from the database:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            res.status(200).json(results);
        });
    });
});



// Route to add a solutions with JWT verification
app.post('/solutions/:courseId/:token', (req, res) => {
    const token = req.params.token; // Get token from route parameters

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.log("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { title, url } = req.body;
        const { courseId } = req.params;

        // Validate request data
        if (!title || !courseId) {
            return res.status(400).json({ error: 'Title and Course ID are required' });
        }

        // SQL query to insert question into database
        const sql = "INSERT INTO solutions (courseId, title, url) VALUES (?, ?, ?)";
        database.query(sql, [parseInt(courseId, 10), title, url], (err, result) => {
            if (err) {
                console.error("Error adding question to the database:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            res.status(201).json({ message: 'Question added successfully', questionId: result.insertId });
        });
    });
});


//------------------------------Find question and solution-------------------------->>>>>>>>>>>>>>>>>>




// Endpoint to fetch questions and their solutions
app.get('/get-all-questions/:token', (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.error("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        // SQL query to fetch all questions and their solutions
        const sql = `
            SELECT q.id AS questionId, q.title AS questionTitle, q.courseId AS questionCourseId, q.url AS questionUrl,
                   s.id AS solutionId, s.title AS solutionTitle, s.courseId AS solutionCourseId, s.url AS solutionUrl
            FROM questions q
            LEFT JOIN solutions s ON q.title = s.title AND q.courseId = s.courseId
        `;
        
        database.query(sql, (err, results) => {
            if (err) {
                console.error("Error fetching questions:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.json(results);
        });
    });
});

app.get('/get-all-solutions/:token', (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.BCRYPT_KEY, (err, decoded) => {
        if (err) {
            console.error("Error decoding token:", err);
            return res.status(401).json({ error: "Unauthorized" });
        }

        const sql = `
            SELECT s.id AS solutionId, s.title AS solutionTitle, s.courseId AS solutionCourseId, s.url AS solutionUrl
            FROM solutions s
        `;

        database.query(sql, (err, results) => {
            if (err) {
                console.error("Error fetching solutions:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            res.json(results);
        });
    });
});



//---------------------Profile-------------->>>>>>>>



// app.get("/profile/:token", (req, res) => {
//     try {
//         const token = req.params.token;
        
//         // Verify the JWT token using your secret key
//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if (error) {
//                 console.log("Error: " + error);
//                 return res.status(404).json({
//                     error: error,
//                     message: "Invalid or expired token. Please sign in again."
//                 });
//             }

//             // SQL query to fetch the user details based on userId from the token
//             const sql = "SELECT userId, name, email, picture FROM users WHERE userId = ?";
//             database.query(sql, [decode.userId], (error, result) => {
//                 if (error) {
//                     console.log("Error: " + error);
//                     return res.status(404).json({ error: error });
//                 }

//                 // Send user data as a response
//                 res.status(201).json({ data: result });
//             });
//         });
//     } catch (error) {
//         console.log("Error: " + error);
//         res.status(404).json({ message: "Server error." });
//     }
// });


// Backend Route: Make sure 'photo' is correctly retrieved as 'picture'
// app.get("/profile/:token", (req, res) => {
//     try {
//         const token = req.params.token;

//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if (error) {
//                 return res.status(404).json({
//                     error: error,
//                     message: "Invalid or expired token. Please sign in again."
//                 });
//             }

//             const sql = "SELECT userId, name, email, photo AS picture FROM users WHERE userId = ?";
//             database.query(sql, [decode.userId], (error, result) => {
//                 if (error) {
//                     return res.status(404).json({ error: error });
//                 }

//                 res.status(201).json({ data: result });
//             });
//         });
//     } catch (error) {
//         res.status(404).json({ message: "Server error." });
//     }
// });
app.get("/profile/:token", (req, res) => {
    try {
        const token = req.params.token;

        jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
            if (error) {
                return res.status(404).json({
                    error: error,
                    message: "Invalid or expired token. Please sign in again."
                });
            }

            const sql = "SELECT userId, name, email, photo AS picture FROM users WHERE userId = ?";
            database.query(sql, [decode.userId], (error, result) => {
                if (error) {
                    return res.status(404).json({ error: error });
                }

                res.status(201).json({ data: result });
            });
        });
    } catch (error) {
        res.status(404).json({ message: "Server error." });
    }
});


// Update profile route
app.put('/profile/:token', upload.single('photo'), (req, res) => {
    try {
      const token = req.params.token;
      jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
        if (error) {
          return res.status(404).json({ error: "Invalid or expired token. Please sign in again." });
        }
  
        let sql = "UPDATE users SET name = ?, email = ? WHERE userId = ?";
        const values = [req.body.name, req.body.email, decode.userId];
  
        if (req.file) {
          // If a new photo is uploaded, update it as well
          sql = "UPDATE users SET name = ?, email = ?, photo = ? WHERE userId = ?";
          values.push(req.file.filename); // Use the uploaded file's name
          values.push(decode.userId); // Add userId for the SQL query
        }
  
        database.query(sql, values, (error, result) => {
          if (error) {
            return res.status(500).json({ error: "Database error" });
          }
          res.status(200).json({ message: "Profile updated successfully" });
        });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
//---------------------Notification------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// app.post("/api/notifications/:token", async (req, res) => {
//     try {
//         const token = req.params.token;
//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if (error) {
//                 console.log("Error: " + error);
//                 return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
//             }
//             const { message } = req.body;
//             const userId = decode.userId;

//             const sql = "INSERT INTO notifications (userId, message) VALUES (?, ?)";
//             database.query(sql, [userId, message], (error, results) => {
//                 if (error) {
//                     console.error("Error: ", error);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 res.status(201).json({ message: 'Notification created', notificationId: results.insertId });
//             });
//         });
//     } catch (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ message: "Server error." });
//     }
// });

// // Get all notifications for a user
// app.get("/api/notifications/:token", async (req, res) => {
//     try {
//         const token = req.params.token;
//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if (error) {
//                 console.log("Error: " + error);
//                 return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
//             }
//             const userId = decode.userId;

//             const sql = "SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC";
//             database.query(sql, [userId], (error, results) => {
//                 if (error) {
//                     console.error("Error: ", error);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 res.status(200).json(results);
//             });
//         });
//     } catch (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ message: "Server error." });
//     }
// });

// // Mark a notification as read
// app.put("/api/notifications/:token/:id", async (req, res) => {
//     try {
//         const token = req.params.token;
//         const { id } = req.params;
//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if (error) {
//                 console.log("Error: " + error);
//                 return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
//             }

//             const sql = "UPDATE notifications SET isRead = TRUE WHERE id = ?";
//             database.query(sql, [id], (error, results) => {
//                 if (error) {
//                     console.error("Error: ", error);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 if (results.affectedRows === 0) {
//                     return res.status(404).json({ error: 'Notification not found' });
//                 }
//                 res.status(200).json({ message: 'Notification marked as read' });
//             });
//         });
//     } catch (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ message: "Server error." });
//     }
// });

// // Delete a notification
// app.delete("/api/notifications/:token/:id", async (req, res) => {
//     try {
//         const token = req.params.token;
//         const { id } = req.params;
//         jwt.verify(token, process.env.BCRYPT_KEY, (error, decode) => {
//             if (error) {
//                 console.log("Error: " + error);
//                 return res.status(401).json({ error: error, message: "Invalid or expired token. Please sign in again." });
//             }

//             const sql = "DELETE FROM notifications WHERE id = ?";
//             database.query(sql, [id], (error, results) => {
//                 if (error) {
//                     console.error("Error: ", error);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 if (results.affectedRows === 0) {
//                     return res.status(404).json({ error: 'Notification not found' });
//                 }
//                 res.status(200).json({ message: 'Notification deleted' });
//             });
//         });
//     } catch (error) {
//         console.log("Error: " + error);
//         res.status(500).json({ message: "Server error." });
//     }
// });


app.listen(process.env.PORT, "0.0.0.0", () => { console.log("server running...")});