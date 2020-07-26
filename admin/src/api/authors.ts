import Axios, { AxiosResponse } from 'axios';
import urls from "./urls";
import { IAuthor } from '../interfaces/author';

export const fetchAuthors = (params: any = {}): Promise<AxiosResponse<IAuthor[]>> => {
  return Axios.get(`${urls.authors}.json`, { params });
}

export const fetchAuthor = (id: string | number, params: any = {}): Promise<AxiosResponse<IAuthor>> => {
  return Axios.get(`${urls.authors}/${id}.json`, { params });
}