import { IModel } from "./model";

export interface ISurname extends IModel {
  name: string;
  surnameable_id: number;
  surnameable_type: 'Author'
}