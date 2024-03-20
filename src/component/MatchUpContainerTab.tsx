import { MatchData } from "@/type/MatchDataDef";
import { useEffect, useState } from "react";
import MatchUpSummary from "./MatchUpSummary";


const MatchUpContainerTab = ({matchName}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (matchName) => {
        setIsLoading(true);
        const res = await fetch(`/${matchName}.json`);
        const matchData : MatchData = await res.json();
        setData(matchData);
        
        setIsLoading(false);
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