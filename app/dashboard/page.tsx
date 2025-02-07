"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import Button from "@mui/material/Button";
import { firestore } from "../../firebase/firebase";

const Dashboard = () => {
    const [user, setUser ] = useState<User | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    console.log(user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser (user);
                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserName(`${userData.firstName} ${userData.lastName}`);
                }
            } else {
                router.push("/login");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout Error", error);
        }
    };

    if (loading) {
        return <p>Loading....</p>;
    }

    return (
        <div
            style={{
                background: 'linear-gradient(to right, #B259D2, #5981D2)',
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
            }}>
            <nav style={{
                backgroundColor: "#000080",
                padding: "12px",
                boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.9)',
            }}>
                <div style={{
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                }}>DASHBOARD</div>
            </nav>
            <main style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px"
            }}>
                {userName && (
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "6px", marginLeft: "10px" }}>
                        Welcome, {userName}!
                    </h1>
                )}
                <div style={{ marginLeft: "4px", marginRight: "4px" }}>
                    <Button sx={{
                        backgroundColor: "#EE2540",
                        color: "white",
                        margin: "15px",
                        fontSize: "24px",
                        fontWeight: "bold",
                        borderRadius: "20px",
                        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.9)',
                        '&:hover': {
                            backgroundColor: "#BF1E33",
                        }
                    }}
                        onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;