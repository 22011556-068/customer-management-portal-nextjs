import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div id='header'>
      <h1>Customer Service </h1> 
       <div>
       <Image
        src="/flat-design-illustration-customer-support_23-2148887720.jpg"
      
        width={400}
        height={300}
          alt="its an customer support image"
          className='image'
       />
       </div>
    </div>
  )
}

export default Header