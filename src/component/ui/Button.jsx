import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      className='bg-brand border-2 border-black rounded-md py-2 px-4 text-white hover:brightness-110'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
