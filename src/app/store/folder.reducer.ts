import { createReducer, on } from '@ngrx/store';
import {
  loadFoldersSuccess,
  createFolderSuccess,
} from './folder.actions';

export interface FolderState {
  folderList: any[];
}

export const initialState: FolderState = {
  folderList: [],
};

export const folderReducer = createReducer(
  initialState,
  on(loadFoldersSuccess, (state, { folderList }) => ({
    ...state,
    folderList,
  })),
  on(createFolderSuccess, (state, { folder }) => ({
    ...state,
    folderList: [...state.folderList, folder],
  }))
);
