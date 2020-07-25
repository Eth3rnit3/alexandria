import { IModel } from "./model";
import { IBook } from "./book";
import { ISecretOrder } from "./secretOrder";
import { ISurname } from "./surname";

export interface IBiography extends IModel {
  body: string;
  name: string;
  record_id: number;
  record_type: "Author"
}

export interface IAuthor extends IModel {
  birthdate:  string;
  deathdate:  string;
  firstname:  string;
  is_master:  boolean;
  lastname:   string;
  user_id:    bigint;
  image_urls: string[];
  pending_images: string[];
  display_name: string;
  biography: IBiography;
  nationality_id: number;
  books: IBook[];
  secret_orders: ISecretOrder[];
  surnames: ISurname[];
}