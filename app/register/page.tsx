"use client"
import TextField from "@mui/material/TextField";
import { useState, FormEvent } from "react";
import { useRouter} from "next/navigation";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";    // one is this "@/firebase/firebase"
// import { useRouter } from "next/router";
import  Button  from "@mui/material/Button";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if(password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try{
            const userCredential = await createUserWithEmailAndPassword( auth, email, password );
            const user = userCredential.user;
            await sendEmailVerification(user);

            localStorage.setItem("registrationData", JSON.stringify({firstName, lastName , gender, email,}));

            setMessage("Registration successful! Please check your email for verification.");

            setFirstName("");
            setLastName("");
            setGender("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/login");
        } catch(error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else 
            {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div 
            style={{
                background: 'linear-gradient(to right, #B259D2, #5981D2)',
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                padding: "20px",
                boxSizing: "border-box",
            }}>
            <h2
            style={{
                fontSize: "35px",
                fontWeight: "bold",
                color: "#000080",
                marginBottom: "20px",
                backgroundColor: "#F0fFFF",
                padding: "8px",
                borderRadius: "16px",
                border: "5px solid",
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.9)',
            }}>Dashboard</h2>
            <div style={{
                backgroundColor: '#000080',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.9)',
                width: "100%",
                maxWidth: "550px",
            }}>
                <form onSubmit={handleRegister}
                    style={{
                        width: "100%",
                    }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                    }}>
                        <div style={{
                            width: "48%",
                        }}>
                            <label htmlFor="firstName"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    color: "white",
                                }}>First Name</label>
                            <TextField 
                               type="text"
                                variant="standard"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                fullWidth
                                style={{
                                    padding:"5px",
                                    marginBottom: "8px",
                                    backgroundColor: "white",
                                    color: "#000080",
                                    borderRadius:"8px"
                                }}
                                placeholder="First name...."
                            />
                        </div>
                        <div style={{
                            width: "48%",
                        }}>
                            <label htmlFor="lastName"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    color: "white",
                                }}>Last Name</label>
                            <TextField 
                                type="text"
                                variant="standard"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                fullWidth
                                style={{
                                    padding:"5px",
                                    marginBottom: "8px",
                                    backgroundColor: "white",
                                    color: "#000080",
                                    borderRadius:"8px"
                                }}
                                placeholder="Last name...."
                            />
                        </div>
                    </div>
                    <div style={{
                        marginBottom: "16px",
                    }}>
                        <label htmlFor="gender"
                            style={{
                                fontWeight: "bold",
                                    fontSize: "16px",
                                    color: "white",
                            }}>Gender</label>
                        <select 
                            value={gender} 
                            id="gender"
                            onChange={(e) => setGender(e.target.value)}
                            required 
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                marginBottom: "8px",
                                fontSize: "14px",
                                color:"#000080"
                            }}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                            <label htmlFor="email"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    color: "white",
                                }}>Email</label>
                            <TextField 
                                type="email"
                                variant="standard"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                style={{
                                    padding:"5px",
                                    marginBottom: "8px",
                                    backgroundColor: "white",
                                    color: "#000080",
                                    borderRadius:"8px"
                                }}
                                placeholder="Enter your email...."
                            />
                        </div>
                        <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
}}>
    <div style={{
        width: "48%",
    }}>
        <label htmlFor="password"
            style={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "white",
            }}>Password</label>
        <TextField 
            type="password"
            variant="standard"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            style={{
                padding:"5px",
                marginBottom: "8px",
                backgroundColor: "white",
                color: "#000080",
                borderRadius:"8px"
            }}
            placeholder="Password....."
        />
    </div>
    <div style={{
        width: "48%",
    }}>
        <label htmlFor="confirmPassword"
            style={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "white",
            }}>Confirm Password</label>
        <TextField 
            type="password"
            variant="standard"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            style={{
                padding:"5px",
                marginBottom: "8px",
                backgroundColor: "white",
                color: "#000080",
                borderRadius:"8px"
            }}
            placeholder="Confirm Password...."
        />
    </div>
</div>
                    {error && <p style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "8px",
                    }}>{error}</p>}
                    {message && <p style={{
                        color: "lightGreen",
                        fontSize: "14px",
                        marginBottom: "8px",
                    }}>{message}</p>}
                    <Button 
                        variant="contained"
                        
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color:"White",
                            borderRadius: "30px",
                            backgroundColor: "	#0000CD",
                        }}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;