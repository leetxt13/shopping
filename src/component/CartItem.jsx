import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
// import { addOrUpdateToCart, removeFromCart } from '../api/firebase';
import useCarts from '../hooks/useCarts';
const ICON_CLASS =
  'transition-all cursor-pointer hover:text-brand hover:scale-110 mx-1';
export default function CartItem({
  product,
  product: { id, image, title, price, option, quantity },
}) {
  const { addOrUpdateItem, removeItem } = useCarts();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(id);

  return (
    <li className='flex justify-between items-center my-2'>
      <img className='w-24 md:w-48 rounded-lg mr-2' src={image} alt={title} />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='text-xl font-bold text-brand'>{option}</p>
          <p className='text-xl'>{price}원</p>
        </div>

        <div className='text-2xl flex items-center'>
          <AiOutlineMinusSquare onClick={handleMinus} className={ICON_CLASS} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} className={ICON_CLASS} />
          <RiDeleteBin5Fill onClick={handleDelete} className={ICON_CLASS} />
        </div>
      </div>
    </li>
  );
}
