import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, addNewProduct } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts, // => getProducts함수임 (in firebase)
    staleTime: 1000 * 60,
  });
  const addProduct = useMutation({
    mutationFn: ({ product, url, url2 }) => addNewProduct(product, url, url2),
    onSuccess: async () =>
      queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
  return { productsQuery, addProduct };
}
