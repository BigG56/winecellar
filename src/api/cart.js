import API from './client';

// API interface for loading the user's cart
export const fetchCart = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/carts/:cartId`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// API interface for adding a product to a user's cart
export const addToCart = async (Item) => {
  try {
    const response = await API.post(`users/:userId/carts/:cartId`,Item);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// API interface for removing a product from a user's cart
export const removeFromCart = async (cartitemid) => {
  try {
    const response = await API.delete(`users/:userId/carts/:cartId/items/${cartitemid}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

export const updateCartItem = async (updatedItem) => {
  try {
    const response = await API.put(`/users/:userId/carts/:cartId/items/:cartitemid`, updatedItem);

    return response.data;

  } catch (err) {
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