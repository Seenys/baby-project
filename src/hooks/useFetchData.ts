//React
import {useState, useEffect, useRef} from 'react';
//Firebase & Firestore
import {doc, getDoc} from 'firebase/firestore';
import { db } from '@/firebase';
//Context
import { useAuth } from '@/context/AuthContext';
//Types
import { Gifts } from '../types/firebase';


const useFetchData = (uid?: string | string[]) => {
    const [dbGift, setDbGift] = useState<Gifts>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | String>(null);

    const {user} = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const userId = uid ? uid : user?.uid;
            try
            {
                setLoading(true);
                const docRef = doc(db, "Users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setDbGift(docSnap.data().GiftList);      
            }catch(err){
                setError('Error fetching data');
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return {
        dbGift,
        loading,
        error,
        setDbGift
    }
}

export default useFetchData;