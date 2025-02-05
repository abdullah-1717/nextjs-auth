"use client"

import { useState } from "react";
// import {useRouter} from "next/navigation";
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Button from "@mui/material/Button";
import TextField  from "@mui/material/TextField";

const PasswordChangePage = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    // const router = useRouter();

    const handlePasswordChange = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);
        
        if (newPassword !== confirmNewPassword) {
            setError("New passwords do not match");
            return;
        }

        try{
            const user = auth.currentUser;
            if (user && user.email) {
                const credential = EmailAuthProvider.credential(user.email,currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
                setMessage("Password changed successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }
            else
            {
                setError("No user is currently signed in.");
            }
        }
        catch (error) {
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
            }}>Change Password</h2>
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
                  <form onSubmit={handlePasswordChange}>
                <div>
                        <label htmlFor="password"
                            style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "white",
                            }}>Current Password</label>
                        <TextField 
                            type="password"
                            variant="standard"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            fullWidth
                            style={{
                                padding:"5px",
                                marginBottom: "8px",
                                backgroundColor: "white",
                                color: "#000080",
                                borderRadius:"8px"
                            }}
                            placeholder="Current Password...."
                        />
                    </div>
<div>
    <label htmlFor="password"
        style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "white",
        }}>New Password</label>
    <TextField 
        type="password"
        variant="standard"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        fullWidth
        style={{
            padding:"5px",
            marginBottom: "8px",
            backgroundColor: "white",
            color: "#000080",
            borderRadius:"8px"
        }}
        placeholder="New Password....."
    />
</div>
<div>
                        <label htmlFor="password"
                            style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "white",
                            }}>Confirm New Password</label>
                        <TextField 
                            type="password"
                            variant="standard"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                            fullWidth
                            style={{
                                padding:"5px",
                                marginBottom: "8px",
                                backgroundColor: "white",
                                color: "#000080",
                                borderRadius:"8px"
                            }}
                            placeholder="Confirm New Password...."
                        />
                    </div>
                {error && <p style={{
                    color: "red",
                    fontSize: "14px",
                    marginBottom: "8px",
                }}>{error}</p>}
                {message && <p style={{
                    color: "lightgreen",
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
                        marginTop: "10px",
                    }}>
                    Password Change
                </Button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default PasswordChangePage;