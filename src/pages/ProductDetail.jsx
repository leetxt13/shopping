import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../component/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateToCart } from '../api/firebase';

export default function ProductDetail() {
  const { uid } = useAuthContext();
  const {
    state: {
      product: {
        id,
        image,
        image2,
        category,
        price,
        title,
        options,
        description,
      },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // 여기서 장바구니에 추가!
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img
          className='w-full mx-auto basis-6/12 h-40 md:h-auto border border-1 rounded-md border-gray-700'
          src={image2}
          alt={title}
        />
        <div className='w-full basis-6/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2 '>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>{`${price}원`}</p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label
              htmlFor='select'
              className='text-center text-brand font-bold'
            >
              옵션:
            </label>
            <select
              id='select'
              className='text-center p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
