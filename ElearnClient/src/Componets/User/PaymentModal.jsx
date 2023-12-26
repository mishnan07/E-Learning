// PaymentModal.js
import React from 'react';
import { useSelector } from 'react-redux';

const PaymentModal = ({ chapterId,amount, onClose ,setState,state}) => {

    // const amount=500
    const userId = useSelector((state) => state.ClientAuth.Id);
    const currency = "INR"
    const receiptId = "qwsaq1"
    const paymentHandler = async (e) => {
        try {
          const response = await fetch('http://localhost:3000/order', {
            method: 'POST',
            body: JSON.stringify({
              amount,
              currency,
              receipt: receiptId,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          // Check if the response status is OK (200)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          // Parse the JSON response
          const order = await response.json();
          console.log(order);

         
          var options = {
            key: "rzp_test_TLXaRFEzTABOEf", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "Acme Corp", //your business name
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler:async function (response){
            
              console.log(response,'kkkkkkkkkkkkkkkkk');
               const body = {
                ...response,
                amount,
                userId,
                chapterId
               }
             const validateRes =  await fetch("http://localhost:3000/order/validate",{
                method:"POST",
                body:JSON.stringify(body),
                headers:{
                  "content-Type":"application/json"
                },
               });
               const jsonRes = await validateRes.json()
               if(jsonRes){
                setState(!state)
               }
               console.log(jsonRes,'lll');
            },
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: "Web dev Matrix", //your customer's name
                email: "mishnanc@gmail.com", 
                contact: "8592909240"  //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
          };
          var rzp1 = new window.Razorpay(options);
          rzp1.on('payment.failed', function (response){
                  alert(response.error.code);
                  alert(response.error.description);
                  alert(response.error.source);
                  alert(response.error.step);
                  alert(response.error.reason);
                  alert(response.error.metadata.order_id);
                  alert(response.error.metadata.payment_id);
          });
        rzp1.open();
        e.preventDefault();
        } catch (error) {
          console.error('Payment Handler Error:', error);
        }

        onClose()
      };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Unlock Chapter</h2>
        {/* <p>{chapter.title}</p> */}
        <p className="text-red-500 mb-4">Payment required to unlock this chapter.</p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={paymentHandler}
        >
          Make Payment
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;






