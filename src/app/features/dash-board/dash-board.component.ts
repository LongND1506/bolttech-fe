import { TokenStoreService } from '@/app/shares/services';
import { UserProfileStore } from '@/app/shares/stores';
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
    RouterLink
  ],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashBoardComponent {
  private readonly userProfileStore = inject(UserProfileStore);
  private readonly tokenStore = inject(TokenStoreService);

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
      label: 'Cars Management',
      icon: 'pi pi-calendar',
      routerLink: 'cars-management',
    },
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
