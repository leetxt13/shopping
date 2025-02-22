import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';
// import { getRedirectResult } from 'firebase/auth';
// import { auth } from '../api/firebase';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  // useEffect(() => {
  //   async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //   };
  // }, []);
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link
        to='/'
        className='flex items-center text-xl md:text-4xl text-brand pr-1'
      >
        <FiShoppingBag />
        <h1 className='pl-1'>JoyShop</h1>
      </Link>
      <nav className='flex items-center gap-3 md:gap-4 font-semibold text-xs md:text-lg'>
        <Link to='/products'>Products</Link>
        {user && (
          <Link to='/carts'>
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to='/product/new' className='text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'login'} onClick={login} />}
        {user && <Button text={'logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
