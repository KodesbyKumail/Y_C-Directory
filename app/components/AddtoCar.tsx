'use client';
import React from 'react'

const AddtoCart = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add to Cart Component</h3>
      <button 
        onClick={() => console.log('Click')} 
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        Add to cart
      </button>
      <p className="text-green-600 font-medium mt-2">Item added to cart!</p>
    </div>
  )
}

export default AddtoCart
