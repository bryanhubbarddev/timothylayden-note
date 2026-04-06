import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  buildPiano88Layout,
  PIANO_DESIGN_WIDTH,
} from "../../data/piano-88-layout";

@Component({
  selector: "app-piano-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./piano-bar.component.html",
  styleUrl: "./piano-bar.component.css",
})
export class PianoBarComponent {
  readonly designWidth = PIANO_DESIGN_WIDTH;
  readonly layout = buildPiano88Layout();

  get innerStyle(): Record<string, string> {
    const w = this.designWidth;
    return {
      width: `${w}px`,
      /* calc() division must use a unitless number on the right; 100vw / 1200px is invalid. */
      transform: `scaleX(calc(100vw / ${w}))`,
    };
  }
}
