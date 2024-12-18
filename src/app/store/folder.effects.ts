import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadFolders,
  loadFoldersSuccess,
  loadFoldersFailure,
  createFolder,
  createFolderSuccess,
  createFolderFailure,
} from './folder.actions';

@Injectable()
export class FolderEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  // Load folders
  loadFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFolders),
      mergeMap(() =>
        this.http.get<any>('https://weavadev1.azurewebsites.net/folders').pipe(
          map((response) => loadFoldersSuccess({ folderList: response.folderList })),
          catchError((error) => of(loadFoldersFailure({ error })))
        )
      )
    )
  );

  // Create a folder
  createFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createFolder),
      mergeMap((action) =>
        this.http.post<any>('https://weavadev1.azurewebsites.net/folders', action.folder).pipe(
          map((response) => createFolderSuccess({ folder: response })),
          catchError((error) => of(createFolderFailure({ error })))
        )
      )
    )
  );
}
