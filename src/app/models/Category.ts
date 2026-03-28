 export interface DocumentCategory {
  id: string;
  name: string;
  ParentType?: DocumentCategory;
  typeId?: string;
}
