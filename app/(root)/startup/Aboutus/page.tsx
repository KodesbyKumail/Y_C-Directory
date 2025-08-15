import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <div>
            <h1 className="heading">Our Mission Statement</h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center min-h-screen px-6 pt-6 pb-1 bg-white text-black text-center font-work-sans">
  <h1 className="text-4xl font-bold mb-2 text-black">About Us</h1>

  <div className="max-w-3xl text-lg space-y-4">
    <p>
      At <span className="font-semibold">YC Directory</span>, we believe that great ideas deserve the right opportunities to grow. Our mission is simple — to bridge the gap between passionate entrepreneurs and visionary investors through a seamless online platform.
    </p>

    <p>
      We understand that building a business is challenging, and finding the right funding partner can be even harder. That’s why we’ve created a space where entrepreneurs can showcase their ventures, share their stories, and connect directly with investors who are ready to back innovative ideas.
    </p>

    <ul className="list-disc list-inside text-left mx-auto max-w-xl">
      <li>Showcase Your Vision with compelling profiles and pitch tools.</li>
      <li>Connect Instantly with a global network of investors.</li>
      <li>Secure Funding Faster with streamlined communication and match-making algorithms.</li>
    </ul>

    <p>
      Our platform goes beyond just connections — we are building a community of trust, transparency, and growth. Because when the right people meet at the right time, extraordinary things happen.
    </p>

    <p className="font-semibold">
      YC_Directory — Where innovation meets investment.
    </p>
  </div>
    <div>
        <hr className="divider"/>
         
    </div>
</section>

<section className="futer !min-h-[70px]">
    
    <img src="/logo.png" className="px-5 py-3" alt="logo" height={100} width={200}></img>


    <p className="justify-center font-work-sans font-semibold my-auto">Let this be your platform to shine</p>


    <Link href='/' className="pt-1 pr-3 place-items-end">
        <button className="bg-primary hover:bg-pink-700 text-white p-3 font-work-sans rounded-full " >
            Home
        </button>

        
    </Link>
    

</section>





    </>
  );
};

export default page;
