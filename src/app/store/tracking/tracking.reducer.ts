import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import {
  TrackingAPIActions,
  TrackingWebSocketActions,
} from './tracking.action';
import {
  FileCompressionUpdate,
  FileTransferUpdate,
  Tracking,
} from '../../open-api/generated';

/**
 * State definition
 */
export type TrackingState = {
  trackingRecords: Tracking[];
  transfertProgress: Map<string, FileTransferUpdate>;
  compressionProgress: Map<string, FileCompressionUpdate>;
  isLoading: boolean;
};

const initialState: TrackingState = {
  trackingRecords: [],
  transfertProgress: new Map<string, FileTransferUpdate>(),
  compressionProgress: new Map<string, FileCompressionUpdate>(),
  isLoading: false,
};

export const trackingFeature = createFeature({
  name: 'tracking',
  reducer: createReducer(
    initialState,

    on(TrackingAPIActions.loadTrackingSuccess, (state, { items }) => ({
      ...state,
      trackingRecords: items,
    })),

    on(TrackingAPIActions.transfertStartedSuccess, (state, { tracking }) => ({
      ...state,
      trackingRecords: [tracking, ...state.trackingRecords],
    })),

    on(TrackingAPIActions.cancelTransfertSuccess, (state, { trackingId }) => {
      const updatedRecords = state.trackingRecords.map((record) =>
        record.id === trackingId
          ? { ...record, status: Tracking.StatusEnum.Cancelled }
          : record
      );
      return { ...state, trackingRecords: updatedRecords };
    }),

    on(TrackingAPIActions.deleteTransfertSuccess, (state, { id }) => ({
      ...state,
      trackingRecords: state.trackingRecords.filter((r) => r.id !== id),
    })),

    on(
      TrackingWebSocketActions.updateFileTransfertProgress,
      (state, { update }) => {
        const updatedProgress = new Map(state.transfertProgress);
        if (update.trackingId) {
          updatedProgress.set(update.trackingId, update);
        }
        return { ...state, transfertProgress: updatedProgress };
      }
    ),

    on(
      TrackingWebSocketActions.updateFileCompressionProgress,
      (state, { update }) => {
        const updatedCompressionProgress = new Map(state.compressionProgress);
        if (update.transfertId) {
          updatedCompressionProgress.set(update.transfertId.toString(), update);
        }
        return { ...state, compressionProgress: updatedCompressionProgress };
      }
    ),

    on(
      TrackingWebSocketActions.fileTransfertFinishedSuccess,
      (state, { update }) => {
        const updatedRecords = state.trackingRecords.map((record) =>
          record.id.toString() === update.trackingId
            ? {
                ...record,
                status: Tracking.StatusEnum.Completed,
                ok: new Array(update.transferredFiles).fill(''),
                total: new Array(update.totalFiles).fill(''),
              }
            : record
        );

        return {
          ...state,
          trackingRecords: updatedRecords,
        };
      }
    )
  ),
});

export const {
  name,
  reducer,
  selectTrackingRecords,
  selectTransfertProgress,
  selectCompressionProgress,
} = trackingFeature;

export const selectBackgroundNotifications = createSelector(
  selectTransfertProgress,
  selectCompressionProgress,
  (transfertProgress, compressionProgress) => {
    const transfers = Array.from(transfertProgress.values()).map((t) => ({
      trackingId: t.trackingId ?? 'N/A',
      trackingName: t.trackingName ?? 'Transfert',
      totalFiles: t.totalFiles,
      progress: t.transferredFiles ? (t.totalFiles || 0 / t.transferredFiles) * 100 : 0,
      transferredFiles: t.transferredFiles,
      status: t.status ?? 'UNKNOWN',
      flowType: t.flowType,
      type: 'TRANSFER' as const,
      message: t.message ?? null,
    }));

    const compressions = Array.from(compressionProgress.values()).map((c) => ({
      trackingId: c.transfertId,
      trackingName: c.fileName ?? 'Compression',
      totalFiles: c.totalFiles,
      transferredFiles: c.currentIndex,
      progress: c.progress,
      status: c.status,
      type: 'COMPRESSION' as const,
      message: c.message ?? null,
    }));

    return [...transfers, ...compressions];
  }
);
