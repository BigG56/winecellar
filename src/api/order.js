import API from './client';

// API interface for loading a user's orders
export const fetchOrders = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/orders`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// API interface for loading a user's order by order ID
/*export const fetchOrder = async (orderId) => {
  try {
    const response = await API.get(`orders/${orderId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}*/

export const fetchOrderItems = async (orderId) => {
  try {
    const response = await API.get(`/users/:userId/orders/${orderId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}