import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gray-900 text-white p-6 md:p-12 flex flex-col md:flex-row flex-wrap justify-evenly">
        {/* ArtCart Branding Section */}
        <div className="flex flex-col justify-evenly mb-4 md:mb-0 text-center md:text-left">
          <div className="font-serif text-2xl font-bold text-indigo-600">ArtCart</div>
          <p className="font-bold cursor-pointer mt-2">Email us: support@artcart.com</p>
          <img src="" alt="ArtCart logo" className="mx-auto md:mx-0 mt-3 w-16 h-16 object-contain" />
        </div>

        {/* About Section */}
        <div className="flex flex-col justify-evenly mb-4 md:mb-0 text-center md:text-left">
          <h2 className="font-bold text-lg">ArtCart</h2>
          <div className="w-16 md:w-32 h-1 border-b-2 border-yellow-400 rounded-2xl my-2 mx-auto md:mx-0"></div>
          <div>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">About Us</p>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">FAQs</p>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">Privacy Policy</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col justify-evenly mb-4 md:mb-0 text-center md:text-left">
          <h2 className="font-bold text-lg">Follow Us</h2>
          <div className="w-16 md:w-32 h-1 border-b-2 border-yellow-400 rounded-2xl my-2 mx-auto md:mx-0"></div>
          <div>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">Instagram</p>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">Facebook</p>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">Twitter</p>
          </div>
        </div>

        {/* Growth Section */}
        <div className="flex flex-col justify-evenly text-center md:text-left">
          <h2 className="font-bold text-lg">Grow with Us</h2>
          <div className="w-16 md:w-32 h-1 border-b-2 border-yellow-400 rounded-2xl my-2 mx-auto md:mx-0"></div>
          <div>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">Be a Seller</p>
            <p className="cursor-pointer font-semibold hover:text-indigo-500">Become an Affiliate</p>
          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <div className="bg-gray-900 text-center text-gray-300 py-4 text-sm">
        © 2024 All rights reserved.
      </div>
    </>
  );
};

export default Footer;
