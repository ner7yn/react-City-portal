import { useState } from "react";
import { MainCard } from "../components/MainCard";

export const Main = ()=>{
    const counter= "12";
    const [applications,setApllicatins] = useState({default:[],four:[]}); 


    
    function sortByField(arr) {
        return arr
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
          .map((application) => <MainCard key={applications.id} application={application}></MainCard>);
      }
      
        return(
            <div className="flex items-center justify-center pt-6">
                <div className="flex gap-x-2">
                        <h2>Решённые проблемы</h2>
                        <div className="bg-red-400 rounded-full py-0 px-4 flex items-center text-white text-lg">
                            <p>{counter}</p>
                        </div>
                </div>
                <div className="grid grid-cols-4 gapx-4">
                    
                </div>
            </div>
        )
}

