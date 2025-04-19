import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Server } from 'src/app/models/server.model';
import { ServerMessage } from 'src/app/models/server-message';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  @Input() _server!: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  color?: string;
  buttonText?: string;
  serverStatus?: string;
  isLoading?: boolean;

  constructor() {}

  ngOnInit(): void {
    this.setServerStatus(this._server.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this._server.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A';
      this.buttonText = 'Shut Down';
    } else {
      this._server.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  makeLoading() {
    this.color = '#FFCA28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean) {
    console.log('sendServerAction called');
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if (isOnline) {
      return {
        id: this._server.id,
        payload: 'deactivate'
      };
    } else {
      return {
        id: this._server.id,
        payload: 'activate'
      };
    }
  }

}
