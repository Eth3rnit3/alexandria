import Axios, { AxiosResponse } from 'axios';
import urls from "./urls";
import { ISurname } from '../interfaces/surname';

export const fetchSurnames = (params: any = {}): Promise<AxiosResponse<ISurname[]>> => {
  return Axios.get(`${urls.surnames}.json`, { params });
};

export const createSurname = (name: string): Promise<AxiosResponse<ISurname>> => {
  return Axios.post(`${urls.surnames}.json`, { surname: { name } });
};