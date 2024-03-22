import { MatchData } from "@/type/MatchDataDef";
import { useEffect, useState } from "react";
import MatchUpSummary from "./MatchUpSummary";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/app/firebase";


const MatchUpContainerTab = ({matchName}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchData = async (matchName) => {
        const db = getDatabase(app);
        const matchRef = ref(db, matchName);
        onValue(matchRef, snapshot => {
            const matchData = snapshot.val();
            setIsLoading(true);
            setData(matchData.matchData);
            
            setIsLoading(false);
        })
    }
    
    useEffect(() => {
        fetchData(matchName);
    }, []);
    
    if (isLoading || !data)
        return <div>Loading...</div>;

    return (
        <div>
            <MatchUpSummary {...data}/>
        </div>
    )
}


export default MatchUpContainerTab