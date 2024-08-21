import React from 'react';

function About() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-600 mb-4">Welcome to Leaf&Bloom, where green meets serenity!</p>
      <p className="text-lg text-gray-600 mb-4">
        At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of 
        high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and 
        more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, we have something for every 
        plant enthusiast.
      </p>
      <div className="flex justify-center mb-4">
        <img src="https://p1.hiclipart.com/preview/922/979/640/green-leaf-logo-emoji-seedling-emoticon-sticker-plant-plant-stem-flower-png-clipart-thumbnail.jpg" alt="" className="w-12 h-12" />
      </div>
      <p className="text-lg text-gray-600 mb-4">
        Our team of experts is dedicated to ensuring that each plant meets our strict standards of quality and care. 
        Whether you're a seasoned gardener or just starting your green journey, we're here to support you every step of 
        the way. Feel free to explore our collection, ask questions, and let us help you find the perfect plant for your 
        home or office.
      </p>
      <div className="flex justify-center mb-4">
        <img src="https://p1.hiclipart.com/preview/922/979/640/green-leaf-logo-emoji-seedling-emoticon-sticker-plant-plant-stem-flower-png-clipart-thumbnail.jpg" alt="" className="w-12 h-12" />
      </div>
      <p className="text-lg text-gray-600 mb-4">
        Join us in our mission to create a greener, healthier world. Visit Leaf&Bloom today and experience the 
        beauty of nature right at your doorstep.
      </p>
    </div>
  );
}

export default About;