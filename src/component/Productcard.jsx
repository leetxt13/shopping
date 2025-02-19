import React from 'react';

export default function Productcard({
  product: { id, image, title, category, price },
}) {
  return (
    <li className='rounded-lg shadow-md overflow-hidden cursor-pointer border border-slate-800'>
      <img className='bg-slate-200 w-full md:h-72 ' src={image} alt={title} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`${price}원`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  );
}
