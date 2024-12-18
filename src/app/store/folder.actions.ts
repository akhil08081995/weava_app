import { createAction, props } from '@ngrx/store';

// Action to Load Folders
export const loadFolders = createAction('[Folder API] Load Folders');

export const loadFoldersSuccess = createAction(
  '[Folder API] Load Folders Success',
  props<{ folderList: any[] }>()
);

export const loadFoldersFailure = createAction(
  '[Folder API] Load Folders Failure',
  props<{ error: any }>()
);

// Action to Create a Folder
export const createFolder = createAction(
  '[Folder API] Create Folder',
  props<{ folder: any }>() // Pass folder data
);

export const createFolderSuccess = createAction(
  '[Folder API] Create Folder Success',
  props<{ folder: any }>() // Add created folder to store
);

export const createFolderFailure = createAction(
  '[Folder API] Create Folder Failure',
  props<{ error: any }>()
);
