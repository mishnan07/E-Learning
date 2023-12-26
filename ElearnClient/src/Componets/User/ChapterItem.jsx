// ChapterItem.js
import React, { useEffect, useState } from 'react';
import CreateUserInstance from '../../Axios/userAxios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChapterItem = ({ chapter, setShowPaymentModal, setAmount, setSelectedChapterId ,state}) => {
  const userAxios = CreateUserInstance();
  const userId = useSelector((state) => state.ClientAuth.Id);
  const [purchasedChaptersIds, setPurchasedChaptersIds] = useState([]);

  const userPurchased = async () => {
    try {
      const response = await userAxios.get(`/userPurchased/${userId}`);
      setPurchasedChaptersIds(response.data.purchasedChaptersIds);
    } catch (error) {
      console.error('Error fetching user purchased chapters:', error);
    }
  };

  useEffect(() => {
    userPurchased();
  }, [state]);

  const isLocked = !purchasedChaptersIds.includes(chapter._id);

  const payment = () => {
    setAmount(chapter.amount);
    setSelectedChapterId(chapter._id);
    setShowPaymentModal(true);
  };
 const navigate = useNavigate()
  const goToContent = ()=>{

     navigate(`/content?tittle=${chapter.tittle}&msg=${chapter.content}`)
  }
  return (
    <div className={`border p-4 mb-4 flex items-center justify-between ${isLocked ? 'locked-chapter' : ''}`}>
      <div>
        <h3 onClick={isLocked?payment:goToContent} className="text-xl font-bold">{chapter.tittle}</h3>
      </div>
      {isLocked ? (
        <div onClick={payment}>
        <div  className="text-red-500 cursor-pointer">
          🔒 Locked

        </div>
        <p className='text-sm text-gray-500 cursor-pointer'>Amount: ₹{chapter.amount}</p>

        </div>

      ) : (
        <div onClick={goToContent} className="text-green-500 cursor-pointer">🔓 Unlocked</div>
      )}
    </div>
  );
};

export default ChapterItem;
