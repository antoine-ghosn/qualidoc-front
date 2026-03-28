import { DocumentCategory } from './Category';

export interface BaseDocument {
  id: string;
  name: string;
  folder:string;
  category?: DocumentCategory;
  typeId: string;
  date: Date;
  path: string;
}

export interface Document extends BaseDocument {
  [key: string]: any;
}

 
