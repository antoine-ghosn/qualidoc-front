import { inject, Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { Store } from '@ngrx/store';
import { TrackingWebSocketActions } from '../store/tracking/tracking.action';
import { FileCompressionUpdate, FileTransferUpdate } from '../open-api/generated';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient!: Client;
  private wsUrl = 'http://localhost:8081/ws-progress';
  store = inject(Store);

  connect(): void {
    this.stompClient = new Client({
      brokerURL: this.wsUrl,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('[WebSocket] Connected');
        this.subscribeToFileTransfertProgressQueue();
        this.subscribeToFileCompressionProgressQueue();
      },
      onStompError: (frame) => {
        console.error('[STOMP Error]', frame);
      },
    });

    this.stompClient.activate();
  }

  private subscribeToFileTransfertProgressQueue(): StompSubscription {
    return this.stompClient.subscribe(
      '/topic/file-transfert-progress',
      (message: IMessage) => {
        const body = JSON.parse(message.body) as FileTransferUpdate;
        this.store.dispatch(
          TrackingWebSocketActions.updateFileTransfertProgress({ update: body })
        );
      }
    );
  }

  private subscribeToFileCompressionProgressQueue(): StompSubscription {
    return this.stompClient.subscribe(
      '/topic/file-compression-progress',
      (message: IMessage) => {
        const body = JSON.parse(message.body) as FileCompressionUpdate;
        this.store.dispatch(
          TrackingWebSocketActions.updateFileCompressionProgress({ update: body })
        );
      }
    );
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('[WebSocket] Disconnected');
    }
  }
}
