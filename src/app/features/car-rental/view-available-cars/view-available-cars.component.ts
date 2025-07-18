import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './view-available-cars.component.html',
  styleUrl: './view-available-cars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAvailableCarsComponent { }
