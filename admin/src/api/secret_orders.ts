import Axios, { AxiosResponse } from 'axios';
import urls from "./urls";
import { ISecretOrder } from '../interfaces/secretOrder';

export const fetchSecretOrders = (params: any = {}): Promise<AxiosResponse<ISecretOrder[]>> => {
  return Axios.get(`${urls.secret_orders}.json`, { params });
}