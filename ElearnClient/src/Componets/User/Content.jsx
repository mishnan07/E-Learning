import React from 'react'
import { useLocation } from 'react-router-dom';

const Content = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const tittle = queryParams.get('tittle');
    const content = queryParams.get('msg');

  return (
    <div>
        <section className="relative py-16 bg-blueGray-200 mt-32">
            <div className='w-full h-20'></div>
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative inline-block">
                     
                     
                    </div>
                  </div>

                </div>

             

                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                    {tittle}
                  </h3>
                  
                  
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {content}
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </section>
    </div>
  )
}

export default Content
