import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [
    TableModule,
    ButtonModule,
  ],
  standalone: true,
  selector: 'app-cars-management',
  templateUrl: './cars-management.component.html',
  styleUrls: ['./cars-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsManagementComponent {}
