import React from 'react';

export default function User({ user: { displayName, photoURL } }) {
  return (
    <>
      <div className='flex flex-col items-center shrink-0'>
        {/*shrink-0은 축소해도 사진이 쪼그라들지 않게 해줌 */}
        <img
          src={photoURL}
          alt={displayName.substring(1, 3)}
          className='rounded-full w-10 h-10 bg-red-300'
        ></img>
        <span className='hidden md:block'>{displayName.substring(1, 3)}</span>
      </div>
    </>
  );
}
