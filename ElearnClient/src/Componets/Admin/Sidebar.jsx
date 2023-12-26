import React, { useState } from 'react';
import './admin.css'
import AddCourse from './AddCourse';
import Modal from './Modal';
import { FaTimes } from 'react-icons/fa';
import AddChapter from './AddChapter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserTable from './UserTable';
import OrderTable from './OrderTable';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../Redux/AdminAuth';

const Sidebar = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false)
    const [user,setUser] = useState(true)
    const dispatch = useDispatch()

   const Logout = ()=>{
       dispatch(adminLogout())
   }

  return (
    <div className='flex '>
                <ToastContainer position="top-center" />

      <aside className="relative  bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
            <a href="" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
            <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i className="fas fa-plus mr-3"></i> E LEARN
            </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
            <a onClick={()=>setUser(true)} href="#" className="flex items-center  text-white py-4 pl-6 nav-item">
                <i className="fas fa-tachometer-alt mr-3"></i>
                Dashboard
            </a>
            <a onClick={()=>setUser(false)} href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                <i className="fas fa-sticky-note mr-3"></i>
                orders
            </a>
           
          
         

            
            <a onClick={()=>setIsOpen1(!isOpen1)} href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                <i className="fas fa-tablet-alt mr-3"></i>
                Add Courses
            </a>
            <Modal isOpen={isOpen1} onClose={()=>setIsOpen1(false)}>
            <button className="p-2 " onClick={() => setIsOpen1(false)}>
                  <FaTimes color='black'/> 
          </button>
                  <AddCourse setIsOpen1={setIsOpen1}/>        
           </Modal>


           <a onClick={()=>setIsOpen2(!isOpen2)} href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                <i className="fas fa-align-left mr-3"></i>
                Add chapter
            </a>
            <Modal isOpen={isOpen2} onClose={()=>setIsOpen2(false)}>
            <button className="p-2 " onClick={() => setIsOpen2(false)}>
                  <FaTimes color='black'/> 
          </button>
                  <AddChapter setIsOpen1={setIsOpen2} />        
           </Modal>

           <a onClick={Logout} href="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                <i className="fas fa-align-left mr-3"></i>
                Logout
            </a>

          
        </nav>
        <a href="#" className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
            <i className="fas fa-arrow-circle-up mr-3"></i>
        
        </a>


    </aside>
    <div className='w-10'></div>
    {user?
        <UserTable />

    :
    <OrderTable />

    }
    <div className='w-10'></div>

    </div>
  );
};

export default Sidebar;
