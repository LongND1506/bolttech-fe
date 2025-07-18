import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    MenuModule,
    AvatarModule,
    RippleModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashBoardComponent {
  readonly MENU_ITEMS: MenuItem[] = [
    {
      label: 'Car',
      icon: 'pi pi-car',
      routerLink: '/dash-board',
    },
    {
      label: 'Booking',
      icon: 'pi pi-calendar',
      routerLink: '/dash-board/booking',
    },
  ];

  readonly USER_MENU_ITEMS: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
    },
  ];
}
