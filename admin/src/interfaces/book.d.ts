import { IModel } from "./model";
import { ITheme } from "./theme";

export interface IBook extends IModel {
  image_urls: string[]
  is_free: boolean;
  publication_year: number;
  resume: string;
  truncate_resume: string;
  title: string;
  url: null | string;
  themes: ITheme[];
  theme_ids?: number[];
}