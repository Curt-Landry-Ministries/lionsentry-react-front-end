"use client";
import VideoThumb from '@/public/images/deepfake_detection.png'
import ModalVideo from '@/components/modal-video'
import ShutterStockPhoto from './ShutterStockPhoto.jpeg';
import NewImage from './NewImage.webp';
import Image from 'next/image';
// import { Link } from 'react-scroll';
import ShutterImage from 'ShutterStockPhoto.jpeg';



export default function Hero() {
  return (
    <section className="relative image-bg">

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 grid grid-cols-3 gap-4">

          {/* Section header */}
          <div className="text-left pb-12 md:pb-16 col-span-2">
            <h1 className="text-5xl text-white md:text-3xl  font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Understand Your Deeper Purpose By Writing Out <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Your Core Truths</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-white text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Take a simple quiz to instantly generate a purpose statement</p>
      

              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-start" data-aos="zoom-y-out" data-aos-delay="300">
              {/* <Link to="target-component" smooth={true} duration={500}> */}
              <button 
  className="btn text-white cyan-blue-bg hover:bg-gray-800 w-full sm:w-auto" 
  onClick={() => typeof window !== 'undefined' && window.scrollTo(0, window.innerHeight / 2)}
>
  Try it Now
</button>

<button 
  className="btn text-white azure-blue-bg hover:bg-gray-800 w-full sm:w-auto sm:ml-6" 
  onClick={() => typeof window !== 'undefined' && window.scrollTo(0, window.innerHeight * 2)}
>
  Subscribe
</button>

</div>

            </div>
          </div>

          {/* Hero image */}

     
        <div className="col-span-1 rounded-lg overflow-hidden">
  </div>
  </div>
      </div>
    </section>
  )
}