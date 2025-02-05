"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth"; // Import User type
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser ] = useState<User | null>(null); // Use union type for user state
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (user.emailVerified) {
                    const userDoc = await getDoc(doc(firestore, "users", user.uid));
                    if (!userDoc.exists()) {
                        const registrationData = localStorage.getItem("registrationData");
                        const {
                            firstName = "",
                            lastName = "",
                            gender = "",
                        } = registrationData ? JSON.parse(registrationData) : {};

                        await setDoc(doc(firestore, "users", user.uid), {
                            firstName,
                            lastName,
                            gender,
                            email: user.email,
                        });
                        localStorage.removeItem("registrationData");
                    }
                    setUser (user);
                    router.push("/dashboard");
                } else {
                    // Handle case where email is not verified
                    setUser (null);
                    router.push("/login");
                }
            } else {
                setUser (null);
                router.push("/login");
            }
            setLoading(false); // Move this here to ensure it's called after the checks
        });

        return () => unsubscribe(); // Ensure unsubscribe is returned correctly
    }, [router]);

    if (loading) {
        return <p>Loading....</p>;
    }

    return (
        <div>
            {user ? "Redirecting to dashboard..." : "Redirecting to Login..."}
        </div>
    );
};

export default HomePage;