import React, { useState, useEffect } from 'react';
import CreateAdminInstance from '../../Axios/adminAxios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddChapter = ({ setIsOpen1 }) => {
  const adminAxios = CreateAdminInstance();
  const ID = useSelector((state) => state.AdminAuth.Id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedCourse: '',
    content: '',
    tittle: '',
    amount: '', // Added amount field to formData
  });

  const [courseList, setCourseList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isAmountValid = /^[1-9]\d*$/.test(formData.amount);
  
    if (formData.selectedCourse.trim().length === 0) {
      return toast.error('Please select a course');
    } else if (formData.tittle.trim().length === 0) {
      return toast.error('Please enter title');
    } else if (formData.amount.trim().length === 0 || !isAmountValid) {
      return toast.error('Please enter a valid amount greater than 1');
    }else if (formData.content.trim().length === 0) {
      return toast.error('Please enter content');
    } 
  
    try {
      const response = await adminAxios.post('/addChapter', formData);
      if (response.data.message === 'ok') {
        setFormData({});
        toast.success('Form submitted successfully');
        setIsOpen1(false);
      } else {
        toast.error('Form submission failed');
      }
    } catch (error) {
      toast.error('Form submission failed');
    }
  };
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await adminAxios.get('/courses');
        setCourseList(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center p-12">

        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-5">
              <label
                htmlFor="selectedCourse" // changed 'name' to 'selectedCourse'
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Course name
              </label>
              <select
                name="selectedCourse" // changed 'name' to 'selectedCourse'
                id="selectedCourse"
                value={formData.selectedCourse}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courseList.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tittle
              </label>
              <input
                type="text"
                name="tittle"
                id="tittle"
                placeholder="Tittle"
                value={formData.tittle}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
        <label
          htmlFor="amount"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Amount
        </label>
        <input
          type="text"
          name="amount"
          id="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

            <div className="mb-5">
              <label
                htmlFor="content"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Content
              </label>
              <textarea
                rows="4"
                name="content"
                id="content"
                placeholder="Type your content"
                value={formData.content}
                onChange={handleChange}
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
