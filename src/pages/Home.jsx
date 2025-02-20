import React from 'react';
import Products from '../component/Products';
import Banner from '../component/Banner';

export default function Home() {
  return (
    <section>
      <Banner />
      <h2 className='text-center py-4'>
        옷을 클릭하면 모델들의 실제
        <br />
        착용한 모습을 보실 수 있습니다.
        <br />
        🔽 🔽
      </h2>
      <Products />
    </section>
  );
}
