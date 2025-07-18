import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.html',
  styles: [
    `
      :host {
        display: flex;
        height: 100vh
      }
    `,
  ],
})
export class App {}
