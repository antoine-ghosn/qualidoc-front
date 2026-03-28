import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  FileCompressionUpdate,
  FileTransferUpdate,
  Tracking,
} from '../../open-api/generated';
import { IMessage } from '@stomp/stompjs';

export const TrackingActions = createActionGroup({
  source: 'tracking',
  events: {
    Opened: emptyProps(),
    'Load Tracking': props<{ flow?: 'IMPORT' | 'EXPORT' }>(),
    'Start Transfert': props<{
      flow: string;
      settingId: number;
      folder: string;
    }>(),
    'Cancel Transfert': props<{
      flow: string;
      id: number;
    }>(),
    'Resume Transfert': props<{
      flow: string;
      id: number;
    }>(),

    'Upload Files': props<{
      flow: 'IMPORT';
      folder: string;
      files: File[];
    }>(),

    'Download Transfert': props<{
      id: number;
    }>(),
    'Download Transfert Folder': props<{
      folder: string;
    }>(),
    'Delete Transfert': props<{
      id: number;
    }>(),
  },
});

export const TrackingAPIActions = createActionGroup({
  source: 'tracking API',
  events: {
    Opened: emptyProps(),
    'Transfert Started Success': props<{ tracking: Tracking }>(),
    'Transfert Started Fail': props<{ error: any }>(),
    'Cancel Transfert Success': props<{ trackingId: number }>(),
    'Cancel Transfert Fail': props<{ error: any }>(),
    'Resume Transfert Success': emptyProps(),
    'Resume Transfert Fail': props<{ error: any }>(),
    'Load Tracking Success': props<{ items: Tracking[] }>(),
    'Load Tracking Fail': props<{ error: any }>(),
    'Delete Transfert Success': props<{ id: number }>(),
    'Delete Transfert Fail': props<{ error: any }>(),
    'Download Transfert Success': emptyProps(),
    'Download Transfert Fail': props<{ error: any }>(),
    'Download Transfert Folder Success': emptyProps(),
    'Download Transfert Folder Fail': props<{ error: any }>(),
    'Upload Files Success': props<{ tracking: Tracking }>(),
    'Upload Files Fail': props<{ error: any }>(),
  },
});

export const TrackingWebSocketActions = createActionGroup({
  source: 'tracking WebSocket',
  events: {
    Opened: emptyProps(),
    'New Progress': props<{ message: IMessage }>(),
    'Update File Transfert Progress': props<{ update: FileTransferUpdate }>(),
    'Update File Compression Progress': props<{
      update: FileCompressionUpdate;
    }>(),
    'File Compression Finished Success': props<{
      update: FileCompressionUpdate;
    }>(),
    'File Compression Finished Fail': props<{ error: any }>(),
    'File Transfert Finished Success': props<{ update: FileTransferUpdate }>(),
    'File Transfert Finished Fail': props<{ error: any }>(),
  },
});
