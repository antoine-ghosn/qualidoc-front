import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DocumentType } from '../../open-api/generated';

export const DocumentTypeActions = createActionGroup({
  source: 'type',
  events: {
    Opened: emptyProps(),
    'Load Document Types': emptyProps(),
    'Load document type by tenant': props<{ documentType: string }>(),
    'Add Type': props<{ documentType: DocumentType }>(),
    'Update Type': props<{ documentType: DocumentType }>(),
    'Delete Type': props<{ id: string }>(),
  },
});

export const DocumentTypeAPIActions = createActionGroup({
  source: 'type API',
  events: {
    Opened: emptyProps(),
    'Load Document Types Success': props<{ documentTypes: Array<DocumentType> }>(),
    'Load Document Types Fail': props<{ error: any }>(),
    'Update Document Types Success': props<{ documentType: DocumentType }>(),
    'Update Document Types Fail': props<{ error: any }>(),
    'Delete Document Types Success': emptyProps(),
    'Delete Document Types Fail': props<{ error: any }>(),
    'Load Document Type by tenant Success': props<{ documentType: DocumentType }>(),
    'Load Document Type by tenant Fail': props<{ error: any }>(),
  },
});
