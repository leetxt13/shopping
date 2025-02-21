import React from 'react';
import Productcard from './Productcard';
import useProducts from '../hooks/useProducts';

export default function Products() {
  // const {
  //   isLoading,
  //   error,
  //   data: products,
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: getProducts,
  //   staleTime: 1000 * 60,
  // });
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {products &&
          products.map((product) => (
            <Productcard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
