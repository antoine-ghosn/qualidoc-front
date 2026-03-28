export interface DocumentNode {
    category: string;
    name?: string;
    path?: string;
    meta_data?: Array<string>;
    children: Array<DocumentNode>;
  }
  