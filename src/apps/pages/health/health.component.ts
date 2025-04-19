import { Component, OnDestroy, OnInit } from '@angular/core';
import { Server } from '../../models/server.model';
import { ServerService } from 'src/app/services/server.service';
import { ServerMessage } from 'src/app/models/server-message';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css'],
})
export class HealthComponent implements OnInit, OnDestroy {
  constructor(private _serverService: ServerService) {}

  servers?: Server[];
  timerSubs?: Subscription;

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this._serverService.getServers().subscribe((res) => {
      this.servers = res;
    });

    this.subscribeData();
  }

  subscribeData() {
    this.timerSubs = timer(3000)
      .pipe(take(1))
      .subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg)
      .subscribe({
        next: res => console.log('Message sent to server:', msg),
        error: err => console.log('Error:', err),
      });
  }

  ngOnDestroy() {
    if (this.timerSubs) {
      this.timerSubs.unsubscribe();
    }
  }
}
