import { IModel } from "./model";

export interface ISecretOrder extends IModel {
  creation_date: string
  dissolution_date: string;
  name: string;
}