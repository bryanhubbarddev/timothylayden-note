import { Component } from '@angular/core';

@Component({
  selector: 'app-piano-bar',
  standalone: true,
  templateUrl: './piano-bar.component.html',
  styleUrl: './piano-bar.component.css',
})
export class PianoBarComponent {
  segments = [1, 2, 3];
}
