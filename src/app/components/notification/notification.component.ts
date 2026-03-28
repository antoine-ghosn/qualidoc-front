import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBackgroundNotifications } from '../../store/tracking/tracking.reducer';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  store = inject(Store);
  notifications$ = this.store.select(selectBackgroundNotifications);

  getFlowIcon(flow?: any) {
    if (flow == 'import') {
      return 'database-import';
    } else {
      return 'database-export';
    }
  }

  getColor(flow?: any) {
    if (flow == 'import') {
      return 'success';
    } else {
      return 'warning';
    }
  }
}
