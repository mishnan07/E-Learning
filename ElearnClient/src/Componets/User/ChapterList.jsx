// ChapterList.js
import React, { useEffect, useState } from 'react';
import ChapterItem from './ChapterItem';
import PaymentModal from './PaymentModal';
import { useLocation } from 'react-router-dom';
import CreateUserInstance from '../../Axios/userAxios';

const ChapterList = () => {
  // const [chapters, setChapters] = useState([
  //   { id: 1, title: 'Introduction to JavaScript', description: 'Basic concepts of JavaScript' },
  //   { id: 2, title: 'Variables and Data Types', description: 'Working with variables' },
  //   // Add more chapters as needed
  // ]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const courseId = queryParams.get('courseId');
  const courseName = queryParams.get('courseName');

  const userAxios = CreateUserInstance()
  const [chapters,setChapters] = useState([]) 
  const [amount,setAmount]=useState(0)
  const [selectedChapterId,setSelectedChapterId] = useState('')
  const [state,setState]=useState(0)

  const getData = async()=>{
      try {
          const response = await userAxios.get(`/getSelectedCourses/${courseId}`)
          setChapters(response.data.chapters)
          console.log(response.data.chapters,'llll');
      } catch (error) {
          
      }
  }

  useEffect(()=>{
      getData()
  },[])

  const handleUnlock = (chapterId) => {
    const selectedChapter = chapters.find((chapter) => chapter.id === chapterId);
    setSelectedChapter(selectedChapter);
    setShowPaymentModal(true);
  };

  return (
    <div className='md:px-40'>
      <h1 className="text-3xl font-bold mb-8">{courseName} Course</h1>
      {chapters.map((chapter) => (
        <ChapterItem
          key={chapter._id}
          chapter={chapter}
          // isLocked={selectedChapter && selectedChapter.id === chapter.id}
          // onUnlock={handleUnlock}
          setShowPaymentModal={setShowPaymentModal}
          setAmount={setAmount}
          setSelectedChapterId={setSelectedChapterId}
          state={state}
        />
      ))
      }
     {chapters.length===0&&<h1 className='text-gray-700 text-xl'>No chapters added</h1>} 
      {showPaymentModal && (
        <PaymentModal chapterId={selectedChapterId} amount={amount} onClose={() => setShowPaymentModal(false)} setState={setState} state={state}/>
      )}
    </div>
  );
};

export default ChapterList;
