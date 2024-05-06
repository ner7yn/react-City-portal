import BaseButton from '../components/BaseButton';
import { useState,useEffect, useContext } from 'react';
import SelectCastom from '../components/profile/SelectCastom';
import { ProfileCard } from '../components/profile/ProfileCard';
import {getMeAllApplications} from '../services/http.service';
import { UserContext } from '../context/UserProvider';

  

export const Profile = ()=>{
    const status = ["Новая","Решена","Отклонена","Все"];
    const [selectedStatus, setSelectedStatus] = useState('');
    const [count,setCount] = useState(3);
    const [myApplications, setMyApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
    const token = localStorage.getItem('token');

    const handleStatusChange = (event) => {
      setSelectedStatus(event.target.value);
      setCount(3);
    };

    const loadMoreApplications = () => {
      setCount(prevCount => prevCount + 3);
    };

    useEffect(() => {
      let filtered = myApplications;
      if (selectedStatus !== 'Все' && selectedStatus !== '') {
        filtered = myApplications.filter(application => application.status === selectedStatus);
      }
      setFilteredApplications(filtered);
    }, [selectedStatus, myApplications]);

    useEffect(() => {
      const init = async () => {
        const res = await getMeAllApplications(token);
        if (!res) return;
        setMyApplications(res);
        setFilteredApplications(res);
      };
      init();
    }, [token]);

    return(
        <div className="flex items-center justify-center pt-5 flex-col">
        <div className="flex gap-16 justify-between items-center">
            <BaseButton text='Создать заявку'/>
            <h2>Мои заявки</h2>
          <SelectCastom status={status} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
        </div>
        <div className="flex flex-col gap-5 my-5">
        {filteredApplications.slice(0, count).map(application => (
          <ProfileCard key={application._id} application={application} />
        ))}
        </div>
        {filteredApplications.length > count && <BaseButton text='Загрузить ещё' onClick={loadMoreApplications}/>}
        </div>
    )
}