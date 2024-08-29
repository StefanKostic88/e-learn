import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderComponent } from '../../ui/loader/loader.component';

@Component({
  selector: 'app-spiner',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinerComponent {}
