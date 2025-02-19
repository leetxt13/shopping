import React, { useState } from 'react';
import Button from './../component/ui/Button';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [url, setUrl] = useState();
  const [url2, setUrl2] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('e.target:', e.target);
    console.log('files', files);
    if (name === 'file') {
      setFile(files && files[0]);
      setFile2(files && files[1]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file).then((url) => {
      console.log(url);
      setUrl(url);
    });
    uploadImage(file2).then((url2) => {
      console.log(url2);
      setUrl2(url2);
    });
    setTimeout(() => {
      addNewProduct(product, url, url2)
        .then(() => {
          setSuccess('성공적으로 제품이 추가되었습니다');
        })
        .finally(() => {
          setIsUploading(false);
        });
    }, 12000);
    setTimeout(() => {
      setSuccess(null);
    }, 15000);
  };
  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새 제품 등록</h2>
      {success && <p className='my-2'>✅{success}</p>}
      <div className='flex flex-wrap gap-3 px-3 max-w-screen-lg mx-auto'>
        {file && (
          <img
            className='w-72 h-72 border-2 flex-auto border-black '
            src={URL.createObjectURL(file)}
            alt='local file'
          ></img>
        )}
        {file2 && (
          <img
            className='w-72 h-72 border-2 flex-auto border-black '
            src={URL.createObjectURL(file2)}
            alt='local file'
          ></img>
        )}
      </div>
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          multiple
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
