//React
import {useState, useEffect, useRef} from 'react';
//Firebase & Firestore
import {doc, getDoc} from 'firebase/firestore';
import { db } from '@/firebase';
//Context
import { useAuth } from '@/context/AuthContext';
//Types
import { Gifts } from '../types/firebase';
import { formatConfirmedGift } from '@/utils/formatData';


const useFetchData = (uid?: string | string[]) => {
    const [dbGift, setDbGift] = useState<Gifts>({});
    const [dbConfirmed, setDbConfirmed] = useState<any>({});
    const [dbDiapers, setDbDiapers] = useState<any>({});
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
                console.log(docRef)
                const docSnap = await getDoc(docRef);
                console.log(docSnap)
                if (!docSnap.exists()) return;
                setDbGift(docSnap.data().GiftList);
                setDbConfirmed(docSnap.data().selectedGifts);
                setDbDiapers(docSnap.data().diapers);       
            }catch(err){
                setError('Error fetching data');
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return {
        dbDiapers,
        dbConfirmed,
        dbGift,
        loading,
        error,
        setDbGift
    }
}

export default useFetchData;