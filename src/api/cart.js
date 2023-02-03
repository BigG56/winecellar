import API from './client';

// API interface for loading the user's cart
export const fetchCart = async (user) => {
  try {
    const response = await API.get(`/users/:userId/carts/:cartId`, {user});

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// API interface for adding a product to a user's cart
export const addToCart = async (user, product, quantity) => {
  try {
    const response = await API.post(`users/:userId/carts/:cartId`, {user, product, quantity});

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// API interface for removing a product from a user's cart
export const removeFromCart = async (productId) => {
  try {
    const response = await API.delete(`carts/myCart/items/${productId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// API interface for checking out a user's cart
export const checkout = async (cartId, paymentInfo) => {
  try {
    const response = await API.post(`carts/myCart/checkout`, { cartId, paymentInfo });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}