import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../config/firebase";

const AuthContext = () => {
    const [user, setUser] = useState(null);
    const [dob, setdob] = useState("");
    const [uid, setUid] = useState("");
    const [lastName, setlastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [haveCar, setHaveCar] = useState(false);

    // Here we will find the current user that is logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // This method will access all the attributes of the user 
    useEffect(() => {
        if (user) {
        const fetchUserData = async () => {
            try {
                // We will acess the data base
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    //once we access we will store the data
                    const userData = userDocSnap.data();
                    //we will set the values here
                    setdob(userData.dob)
                    setUid(user.uid);
                    setlastName(userData.lastName);
                    setfirstName(userData.firstName);
                    setContactNumber(userData.contactNumber);
                    setAddress(userData.address);
                    setHaveCar(userData.haveCar);
                }
            } catch (error) {
            console.error('Error: No user signed in', error);
            }
        };
        fetchUserData();
        }
    }, [user]);

    return { user, dob, uid, firstName, lastName, contactNumber, address, haveCar };
};

export default AuthContext;