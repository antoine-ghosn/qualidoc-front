import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Document, DocumentType } from '../../open-api/generated';

export const DocumentActions = createActionGroup({
  source: 'document',
  events: {
    Opened: emptyProps(),
    'Load Document': emptyProps(),
    'change page size': props<{ pageSize: number }>(),
    'paginate Document': props<{ pageIndex: number }>(),
    'set Document Type': props<{ documentType: DocumentType }>(),
    'Add Document': props<{ document: Document }>(),
    'Update Document': props<{ id:string, document: Document }>(),
    'Delete Document': props<{ document: Document }>(),
    'search by keyword': props<{ keyWord: any }>(),
    'search by Category': props<{ category: any }>(),
  },
});

export const DocumentActionsAPIActions = createActionGroup({
  source: 'type API',
  events: {
    Opened: emptyProps(),
    'Load Document Success': props<{ items?: any[] , total?:number }>(),
    'Load Document Fail': props<{ error: any }>(),
    'Update Document Success': props<{ document: any }>(),
    'Update Document Fail': props<{ error: any }>(),
  },
});
