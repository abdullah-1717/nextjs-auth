"use client"
import { useState } from "react";
import { useRouter} from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import  {auth } from "../../firebase/firebase";
import { doc, getDoc, setDoc} from "firebase/firestore";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField  from "@mui/material/TextField";
import { firestore } from "../../firebase/firebase";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null> (null);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try{
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            if(user.emailVerified){
                const registrationData = localStorage.getItem("registrationData");
                const {
                    firstName = "",
                    lastName = "",
                    gender ="",
                } = registrationData ? JSON.parse(registrationData) : {};

                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if(!userDoc.exists()){
                    await setDoc(doc(firestore, "users", user.uid), {
                        
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });
                }
                router.push("/dashboard");
                }
                else
                {
                    setError("Please verify your email before logging in.");
                }
            } catch(error){
                if (error instanceof Error)
                {
                    setError(error.message);
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
                }}>Login</h2>
                <div style={{
                    backgroundColor: '#000080',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.9)',
                    width: "100%",
                    maxWidth: "400px",
                }}> 
                <div>
                      <form onSubmit={handleLogin}>
                    <div>
                            <label htmlFor="email"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "24px",
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
    <div>
        <label htmlFor="password"
            style={{
                fontWeight: "bold",
                fontSize: "24px",
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
                    {error && <p style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "8px",
                    }}>{error}</p>}
                    
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
                            marginBottom: "10px",
                        }}>
                        Login
                    </Button>
                </form>
                    <p 
                    style={{
                        fontWeight: "normal",
                        color: "white",
                        paddingBottom:"5px",
                    }}>
                       Don&apos;t have an account? {""} 
                       <Link href="/register"
                       style={{
                        color: "lightgreen",
                       }}>Register here</Link>
                    </p>
                </div>
                </div>
            </div>
        );
    };

    export default LoginPage;