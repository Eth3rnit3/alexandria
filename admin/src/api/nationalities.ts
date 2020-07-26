import Axios, { AxiosResponse } from 'axios';
import urls from "./urls";
import { INationality } from '../interfaces/nationality';

export const fetchNationalities = (params: any = {}): Promise<AxiosResponse<INationality[]>> => {
  return Axios.get(`${urls.nationalities}.json`, { params });
}