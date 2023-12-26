import React from "react";
import Cards from "./Cards";
import DropDown from "./DropDown";
import Sidebar from "./Sidebar";
import ChapterList from "./ChapterList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClientLogout } from "../../Redux/ClientAuth";


const Main = () => {
  const userId = useSelector((state) => state.ClientAuth.Id);
  const Token = useSelector((state) => state.ClientAuth.Token);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = ()=>{
    Token?dispatch(ClientLogout()):navigate('/login')
   
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-white to-[#f0f1ff] bg-no-repeat overflow-hidden">
      <div className="px-5 xl:px-0 max-w-3xl lg:max-w-5xl xl:max-w-5xl w-full mx-auto relative">
        <div className="flex justify-between pt-5 max-w-2xl lg:max-w-[850px] xl:max-w-5xl ">
          <a href="#_" className="flex items-center">
          <img
  src="https://imageio.forbes.com/specials-images/imageserve/62a26c35375cdb5c75876078/Youth-imaginative-creativity-leveraging-AI-addressing-the-world-s-biggest-issues/960x0.jpg?format=jpg&width=1440"
  alt="Logo"
  style={{ width: '100px', height: 'auto' }}
/>
          </a>
          <div>
            <button onClick={handleLogin} className="z-10 hover:opacity-80 bg-[#13183f] rounded-3xl text-white font-bold py-3 px-6 group relative overflow-hidden">
             {Token?'Logout':'Login'}
            </button>
          </div>
        </div>
        <div className="flex justify-start items-end my-5 xl:my-20">
          <div className="md:max-w-[400px] flex flex-col gap-6 my-14">
            <div>
              <h1 className="text-[#13183f] xl:text-[52px] text-[40px] font-extrabold leading-[50px]">
                Maximize skill, minimize budget
              </h1>
            </div>
            <div>
              <p className="text-[#83869a]">
                Our modern courses across a range of in-demand skills will give
                you the knowledge you need to live the life you want.
              </p>
            </div>
            <div>
              <button onClick={()=>navigate('/profile')} className="py-3 px-7 text-white font-bold bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl group relative overflow-hidden">
                Get Started
                <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
              </button>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:-right-32 md:left-auto xl:">
            <img
              src="https://goalcryst.com/assets/images/phone-support.png"
              alt=""
              className="relative md:max-w-[500px] lg:max-w-[600px] xl:max-w-[650px] hidden md:block"
            />
           
          </div>
        </div>
        <Cards />

      </div>
      <div className="flex justify-between items-center bg-[#13183f] py-5">
        <div className="px-5 max-w-3xl lg:max-w-5xl xl:max-w-5xl w-full flex justify-between mx-auto">
          <a href="#_" className="flex items-center">
            <img src="/assets/e-learning/footerlogo.svg" alt="Logo" />
          </a>
          <a href="#_">
            <button className="bg-gradient-to-r from-blue-500 to-pink-600 rounded-3xl text-white font-bold py-3 px-6 group relative overflow-hidden">
              Get Started
              <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Main;