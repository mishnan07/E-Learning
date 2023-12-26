import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import CreateUserInstance from '../../Axios/userAxios';

const DropDown = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const courseId = queryParams.get('courseId');
    const userAxios = CreateUserInstance()

    const getData = async()=>{
        try {
            const response = await userAxios.get(`/getSelectedCourses/${courseId}`)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getData()
    },[])

  return (
    <div >
<div className='flex justify-center mt-10'>
<button id="multiLevelDropdownButton" data-dropdown-toggle="multi-dropdown" className=" w-10/12 text-black bg-gray-50 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-200 dark:hover:bg-gray-50 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>
</div>      

<div className='flex justify-center'>

<div id="multi-dropdown" className="z-10 w-10/12    bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full" aria-labelledby="multiLevelDropdownButton">
      <li>
        <a href="#" className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown<svg className="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
  </svg></button>
         
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>
</div>





    </div>
  )
}

export default DropDown


