import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { useEffect } from 'react';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
//-> 계정선택화면이 안나오는 오류때문에 사용
const database = getDatabase(app);
export async function login() {
  signInWithPopup(auth, provider).catch(console.error);
  // signInWithRedirect(auth, provider).catch(console.error);
}

export async function logout() {
  signOut(auth).catch(console.error);
}

export function ouUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}
async function adminUser(user) {
  return get(ref(database, 'admin'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admin = snapshot.val();
        // console.log('나는 snapshot', admin);
        const isAdmin = admin.includes(user.uid);
        // console.log(isAdmin);
        return { ...user, isAdmin };
      }
      return user;
    })
    .catch(console.error);
}

export async function addNewProduct(product, url, url2) {
  const id = uuid();
  return set(ref(database, `product/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: url,
    image2: url2,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return get(ref(database, 'product')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    // console.log(items); // id와 image 배열을 받아옴
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
