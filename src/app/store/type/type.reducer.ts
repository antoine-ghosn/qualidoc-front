import { createFeature, createReducer, on } from '@ngrx/store';
import { DocumentTypeAPIActions } from './type.actions';
import { DocumentType } from '../../open-api/generated';

type DocumentTypesState = {
  documentTypes: DocumentType[];
  documentType: DocumentType | null;
  isLoading: boolean;
};

const initialState: DocumentTypesState = {
  documentTypes: [],
  documentType: null,
  isLoading: false,
};

export const typeFeature = createFeature({
  name: 'types',
  reducer: createReducer(
    initialState,
    on(
      DocumentTypeAPIActions.loadDocumentTypesSuccess,
      (state, { documentTypes }) => ({
        ...state,
        documentTypes,
      })
    ),
    on(
      DocumentTypeAPIActions.updateDocumentTypesSuccess,
      (state, { documentType }) => {
        const updatedType = {
          ...documentType,
          columns: [...(documentType.columns ?? [])],
        };

        return {
          ...state,
          documentType:
            state.documentType?.id === documentType.id
              ? updatedType
              : state.documentType,
          documentTypes: state.documentTypes.map((d) =>
            d.id === documentType.id ? updatedType : d
          ),
        };
      }
    ),

    on(
      DocumentTypeAPIActions.loadDocumentTypeByTenantSuccess,
      (state, { documentType }) => ({
        ...state,
        documentType,
      })
    )
  ),
});

export const { name, reducer, selectDocumentTypes, selectDocumentType } =
  typeFeature;
