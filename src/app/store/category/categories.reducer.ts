import { createFeature, createReducer, on } from '@ngrx/store';
import { DocumentCategory } from '../../models/Category';
import { categoryActions } from './categories.action';

type CategoriesState = {
  categories: DocumentCategory[];
  isLoading: boolean;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
};

export const categoriesFeature = createFeature({
  name: 'categories',
  reducer: createReducer(
    initialState,
    on(categoryActions.selectCategory, (state, { category }) => ({
      ...state,
      category,
    }))
  ),
});

export const { name, reducer, selectCategories } = categoriesFeature;
