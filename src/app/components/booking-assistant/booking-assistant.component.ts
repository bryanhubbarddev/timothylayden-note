import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SiteContentService } from "../../services/site-content.service";
import { BookingAssistantService } from "../../services/booking-assistant.service";
import { environment } from "../../../environments/environment";

interface ChatTurn {
  role: "user" | "model";
  text: string;
}

@Component({
  selector: "app-booking-assistant",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./booking-assistant.component.html",
  styleUrl: "./booking-assistant.component.css",
})
export class BookingAssistantComponent {
  private site = inject(SiteContentService);
  private assistant = inject(BookingAssistantService);

  @ViewChild("panel") panelRef?: ElementRef<HTMLElement>;
  @ViewChild("inputField") inputRef?: ElementRef<HTMLTextAreaElement>;

  open = false;
  draft = "";
  loading = false;
  error = "";
  readonly configured = this.assistant.isConfigured();
  readonly bookingEmail = this.site.getContent().bookingEmail;

  private systemPrompt = "";
  /** Exposed for template */
  history: ChatTurn[] = [];

  constructor() {
    this.systemPrompt = this.assistant.buildSystemPrompt(this.site.getContent());
  }

  toggle(): void {
    this.open = !this.open;
    this.error = "";
    if (this.open) {
      queueMicrotask(() => {
        this.inputRef?.nativeElement?.focus();
      });
    }
  }

  close(): void {
    this.open = false;
    this.error = "";
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.open) this.close();
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || this.loading) return;
    this.error = "";
    this.draft = "";
    this.history.push({ role: "user", text });
    this.loading = true;

    const prior = this.history.slice(0, -1).map((t) => ({
      role: t.role,
      text: t.text,
    }));

    this.assistant.sendMessage(this.systemPrompt, prior, text).subscribe({
      next: (reply) => {
        this.history.push({ role: "model", text: reply });
        this.loading = false;
        queueMicrotask(() => this.scrollPanelEnd());
      },
      error: (e: Error) => {
        this.history.pop();
        this.error = e.message || "Something went wrong.";
        this.loading = false;
      },
    });
  }

  private scrollPanelEnd(): void {
    const el = this.panelRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  newChat(): void {
    this.history = [];
    this.error = "";
    this.draft = "";
  }

  /** For template: show setup note only in dev when key missing */
  showDevHint(): boolean {
    return !environment.production && !this.configured;
  }
}
