import BaseButton from '../components/BaseButton';
import { useState,useEffect, useContext } from 'react';
import SelectCastom from '../components/profile/SelectCastom';
import { ProfileCard } from '../components/profile/ProfileCard';
import {getMeAllApplications, getAllApplications} from '../services/http.service';
import { UserContext } from '../context/UserProvider';
import { DeleteModal } from '../components/profile/DeleteModal';
import { CreateModall } from '../components/profile/CreateModal';
import { UpdateModal } from '../components/profile/UpdateModal';
import { CategoryModal } from '../components/profile/CategoryModal';

  

export const Profile = ()=>{
    const {user,setUser} = useContext(UserContext);
    const status = ["Новая","Решена","Отклонена","Все"];
    const [selectedStatus, setSelectedStatus] = useState('');
    const [count,setCount] = useState(3);
    const [myApplications, setMyApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const token = localStorage.getItem('token');
    const [modalDelete,setModalDelete] = useState({isOpen:false,name:"Вход",id:''})
    const [modalCreate,setModalCreate] = useState({isOpen:false})
    const [modalUpdate,setModalUpdate] = useState({isOpen:false,name:"",application:{}})
    const [categoryModal,setCategoryModal] =useState({isOpen:false})

    function openModalCreate() {
        setModalCreate({isOpen: true });
      }
    
      function closeModalCreate() {
        setModalCreate({isOpen: false });
      }

      function openModalCategory() {
        setCategoryModal({isOpen: true });
      }
    
      function closeModalCategory() {
        setCategoryModal({isOpen: false });
      }

      function openModalUpdate(name,application) {
        setModalUpdate({ name: name,application:application, isOpen: true });
      }
    
      function closeModalUpdate() {
        setModalUpdate({ ...modalDelete, isOpen: false });
      }

      function openModalDelete(name,id) {
        setModalDelete({ name: name,id:id, isOpen: true });
      }
    
      function closeModalDelete() {
        setModalDelete({ ...modalDelete, isOpen: false });
      }

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
        if (user && user.admin) {
          const res = await getAllApplications();
          if (!res) return;
      const sortedApplications = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMyApplications(sortedApplications);
        } else if (user) {
          const res = await getMeAllApplications(token);
          if (!res) return;
          const sortedApplications = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setMyApplications(sortedApplications);
        }
        setFilteredApplications(myApplications);
      };
      init();
    }, [user, token]);

    return(
      <>
        <div className="flex items-center justify-center pt-5 flex-col">
        <div className="flex gap-16 justify-between items-center">
          {user.admin ?(
            <>
            <BaseButton text='Управление категориями' onClick={() => openModalCategory()} />
              <h2>Все заявки</h2>
              <SelectCastom status={status} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
            </>
          ) : (
            <>
            <BaseButton text='Создать заявку' onClick={() => openModalCreate()} />
            <h2>Мои заявки</h2>
          <SelectCastom status={status} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
          </>
          )}
        </div>
        <div className="flex flex-col gap-5 my-5">
        {filteredApplications.slice(0, count).map(application => (
          <ProfileCard key={application._id} application={application} openModal={user.admin?openModalUpdate:openModalDelete} admin={user.admin}/>
        ))}
        </div>
        {filteredApplications.length > count && <BaseButton text='Загрузить ещё' onClick={loadMoreApplications}/>}
        </div>
        <DeleteModal onClose={closeModalDelete} open = {modalDelete.isOpen} name ={modalDelete.name} id={modalDelete.id}/>
        <CreateModall onClose={closeModalCreate} open = {modalCreate.isOpen}/>
        <UpdateModal onClose={closeModalUpdate} open = {modalUpdate.isOpen} name={modalUpdate.name} application={modalUpdate.application}/>
        <CategoryModal onClose={closeModalCategory} Open = {categoryModal.isOpen}/>
      </>
    )
}