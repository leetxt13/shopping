import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const cartsQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    // enabled: !!uid, // uid(null->false)가 없으면 쿼리 사용불가
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] }); // carts이면서 로그인한 사용자(uid)만 캐시
    },
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  return { cartsQuery, addOrUpdateItem, removeItem };
}
