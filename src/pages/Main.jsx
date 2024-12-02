import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { getAllApplications } from "../services/http.service";

export const Main = () => {
    const [counter, setCounter] = useState(0);
    const [previousCounter, setPreviousCounter] = useState(0);
    const [applications, setApplications] = useState({ default: [], four: [] });

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
            setPreviousCounter(counter); // Сохраняем предыдущее значение counter
            setCounter(resolvedApplications.length);
        };
        init();
        const interval = setInterval(init, 5000);
        return () => clearInterval(interval);
    }, []);

    const playSound = () => {
        const audio = new Audio('./notification.mp3');
        audio.play();
    };

    useEffect(() => {
        if (counter > previousCounter) {
            playSound();
        }
    }, [counter, previousCounter]);

    function sortByField(arr) {
        return arr
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 4)
            .map((application) => <MainCard key={application._id} application={application}></MainCard>);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-x-2">
                <h2>Решённые проблемы</h2>
                <div className="bg-red-400 rounded-full py-0 px-4 flex items-center text-white text-lg">
                    <p>{counter}</p>
                </div>
            </div>
            <div className="flex flex-row gap-5 mt-16">
                {applications.four}
            </div>
        </div>
    )
}