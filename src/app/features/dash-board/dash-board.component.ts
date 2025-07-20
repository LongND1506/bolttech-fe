import { DATE_FORMAT } from '@/app/shares/constants';
import { TokenStoreService } from '@/app/shares/services';
import { UserProfileStore } from '@/app/shares/stores';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    MenuModule,
    AvatarModule,
    RippleModule,
    TagModule,
    DividerModule,
    RouterLink,
    Tooltip,
    DatePipe,
  ],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashBoardComponent {
  private readonly userProfileStore = inject(UserProfileStore);
  private readonly tokenStore = inject(TokenStoreService);

  readonly DATE_FORMAT = DATE_FORMAT;
  readonly userProfile = this.userProfileStore.user;
  readonly userAvatarText = computed(() =>
    this.userProfile()?.email?.slice(0, 1)
  );
  readonly MENU_ITEMS: MenuItem[] = [
    {
      label: 'Available Cars',
      icon: 'pi pi-car',
      routerLink: 'available-cars',
    },
    {
      label: 'Bookings History',
      icon: 'pi pi-book',
      routerLink: 'bookings-history',
    },
    // {
    //   label: 'Cars Management',
    //   icon: 'pi pi-calendar',
    //   routerLink: 'cars-management',
    // },
  ];

  constructor() {
    this.userProfileStore.getCurrentUser();
  }

  signOut(): void {
    this.userProfileStore.clearUser();
    this.tokenStore.removeAccessToken();
    window.location.reload();
  }
}
