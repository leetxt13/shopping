import React from 'react';

export default function Banner() {
  return (
    <section className='h-80 bg-yellow-900 relative'>
      <div className='w-full h-full bg-cover bg-center bg-banner opacity-70'></div>
      <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-4xl'>Show With Joy & Tay</h2>
        <p className='text-2xl'>Show you Best Products</p>
      </div>
    </section>
  );
}
