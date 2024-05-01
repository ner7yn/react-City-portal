/**
 * Компонент Main в этом коде React JavaScript извлекает и отображает решенные приложения, обновляясь
 * каждые 5 секунд.
 * @returns Возвращается компонент Main. Он содержит переменные состояния для счетчика, приложений и
 * загрузки, а также перехватчик useEffect для периодической выборки и обновления данных приложений.
 * Компонент отображает заголовок решенных приложений вместе со счетчиком, показывающим количество
 * решенных приложений. Он также отображает до четырех разрешенных приложений подряд с помощью
 * компонента MainCard.
 */
import { useState,useEffect,useRef } from "react";
import { MainCard } from "../components/MainCard";
import { getAllApplications } from "../services/http.service";

export const Main = ()=>{
    const [counter,setCounter] = useState(0);
    const [applications, setApplications] = useState({ default: [], four: [] });
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const init = async () => {
          const res = await getAllApplications();
          if (!res) return;
          const resolvedApplications = res.filter(application => application.status === 'Решена');

          const sortedApplications = sortByField(resolvedApplications);
          setApplications({
            default: resolvedApplications,
            four: sortedApplications
          });
          setCounter(resolvedApplications.length);
        };
        init();
        const interval = setInterval(init, 5000);
        return () => clearInterval(interval);
      }, []);

    // const playSound = () => {
    //     const audio = new Audio('./notification.mp3');
    //     audio.play();
    //   };
    
    //   useEffect(() => {
    //     playSound();
    //   }, [counter]);
    
    function sortByField(arr) {
        return arr
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 4)
          .map((application) => <MainCard key={application._id} application={application}></MainCard>);
      }
      
        return(
            <div className="flex flex-col items-center justify-center pt-6">
                <div className="flex gap-x-2">
                        <h2>Решённые проблемы</h2>
                        <div className="bg-red-400 rounded-full py-0 px-4 flex items-center text-white text-lg">
                            <p>{counter}</p>
                        </div>
                </div>
                <div className="flex flex-row gap-5 mt-14">
                    {applications.four}
                </div>
            </div>
        )
}

