import { IModel } from "./model";

export interface IUser extends IModel {
  confirmation_sent_at:   Date
  confirmation_token:     string
  confirmed_at:           Date
  email:                  string;
  firstname:              string
  lastname:               string
  remember_created_at:    Date
  reset_password_sent_at: Date
  reset_password_token:   string
  unconfirmed_email:      string
}