import { baseApiCall } from './BaseApiCall';
import { GET_PRODUCTS } from './EndPoint';

export const getProductsAPI = () => {
  return baseApiCall({
    url: `${GET_PRODUCTS}`,
    method: 'get',
  });
};
