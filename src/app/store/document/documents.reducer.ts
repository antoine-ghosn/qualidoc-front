import { createFeature, createReducer, on } from '@ngrx/store';
import { DocumentActions, DocumentActionsAPIActions } from './documents.action';
import { Document } from '../../open-api/generated';

type DocumentsState = {
  documents: any[];
  total: number;
  isLoading: boolean;
  searchCategory: any;
  searchKeyWord: any;
  pageSize: number;
  pageIndex: number;
};

const initialState: DocumentsState = {
  documents: [],
  total: 0,
  isLoading: false,
  searchCategory: undefined,
  searchKeyWord: undefined,
  pageSize: 50,
  pageIndex: 0,
};

export const documentsFeature = createFeature({
  name: 'documents',
  reducer: createReducer(
    initialState,
    on(DocumentActions.setDocumentType, (state, { documentType }) => ({
      ...state,
      type: documentType,
    })),
    on(DocumentActions.changePageSize, (state, { pageSize }) => ({
      ...state,
      pageSize,
    })),
    on(DocumentActions.paginateDocument, (state, { pageIndex }) => ({
      ...state,
      pageIndex,
    })),
    on(DocumentActions.searchByCategory, (state, { category }) => ({
      ...state,
      searchCategory: category,
    })),
    on(DocumentActions.searchByKeyword, (state, { keyWord }) => ({
      ...state,
      searchKeyWord: keyWord,
    })),
    on(
      DocumentActionsAPIActions.loadDocumentSuccess,
      (state, { items, total }) => ({
        ...state,
        documents: items || [],
        total: total || 0,
      })
    ),
    on(
      DocumentActionsAPIActions.updateDocumentSuccess,
      (state, { document }) => {
        return {
          ...state,
          documents: state.documents.map((doc: any) => {
            console.log('comparing', doc.id, document.id);
            doc.id === document.id ? document : doc;
          }),
        };
      }
    )
  ),
});

export const {
  name,
  reducer,
  selectDocuments,
  selectSearchCategory,
  selectSearchKeyWord,
  selectPageSize,
  selectPageIndex,
} = documentsFeature;
