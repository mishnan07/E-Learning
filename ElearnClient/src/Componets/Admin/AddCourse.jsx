import React, { useState } from 'react';
import CreateAdminInstance from '../../Axios/adminAxios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const AddCourse = ({setIsOpen1}) => {
  const adminAxios = CreateAdminInstance();
  const ID = useSelector((state) => state.AdminAuth.Id);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === 'image') {
      const selectedFile = files[0];

      // Check if a file is selected
      if (selectedFile) {
        // Check if the selected file is an image (you can extend the list of allowed file types)
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(selectedFile.type)) {
          toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
          return;
        }

        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (selectedFile.size > maxSizeInBytes) {
          toast.error("Image size exceeds the maximum allowed size (5 MB)");
          return;
        }

        setFormData((prevData) => ({
          ...prevData,
          [name]: selectedFile,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length === 0) {
      return toast.error("Please enter course name");
    } else if (formData.message.trim().length === 0) {
      return toast.error("Please enter message");
    }else if (!formData.image){
      return toast.error("Please add image");
    }

    try {
      console.log(ID);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('adminId',ID)

      const response = await adminAxios.post('/addCourse', formDataToSend);
      if (response.data.message==='ok') {
       setFormData({})
       toast.success('Form submitted successfully');
       setIsOpen1(false)
      } else {
        return toast.error('Form submission failed');
      }
    } catch (error) {
      toast.error('Form submission failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">

        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Course name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message"
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="image"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
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

export default AddCourse;
