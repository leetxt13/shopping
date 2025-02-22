import React from 'react';

export default function Bottom() {
  return (
    <div>
      <h2 className='text-brand font-bold pl-2 border-t border-gray-500 mt-3 pt-3'>
        (주)JoyShop
      </h2>
      <p className='text-xs p-3 text-center'>
        (주)joyShop의 결제정보의 중개서비스 또는 통신판매시스템의 제공자입니다.
        당사는 고객님의 안전거래를 위해 관련 법률에 의거하여 업무를 처리하고
        있습니다.
      </p>
      <p className='pl-2 text-lg text-red-600 font-bold'>고객센터 1588-1234</p>
      <p className='pl-2 text-sm'>영업시간 : AM 09:00 ~ PM 10:00(1h)</p>
      <p className='pl-2 text-sm'>사업장주소 : 서울시 광진구 군자동</p>
    </div>
  );
}
