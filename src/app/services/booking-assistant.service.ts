import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, map, catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import type { SiteData } from "../data/site-content";

interface GeminiPart {
  text?: string;
}

interface GeminiContent {
  role?: string;
  parts?: GeminiPart[];
}

interface GeminiCandidate {
  content?: { parts?: GeminiPart[] };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  error?: { message?: string; code?: number };
}

@Injectable({ providedIn: "root" })
export class BookingAssistantService {
  private http = inject(HttpClient);

  isConfigured(): boolean {
    return !!environment.geminiApiKey?.trim();
  }

  buildSystemPrompt(d: SiteData): string {
    const rep = d.repertoire.map((r) => r.name).join(", ");
    const hi = d.highlights.join("; ");
    return [
      `You are a concise, warm booking assistant for ${d.stageName}, a professional live pianist.`,
      `Location / reach: ${d.location}.`,
      `About: ${d.subheadline}`,
      `Highlights: ${hi}`,
      `Repertoire styles: ${rep}.`,
      `Official booking contact: ${d.bookingContact} <${d.bookingEmail}>.`,
      "",
      "Help with:",
      "1) Visitor questions — event types (restaurants, weddings, churches, galas, private events), repertoire, and how to inquire.",
      "2) Drafting email replies when the user says they are replying to a client — professional, friendly, short paragraphs.",
      "",
      "Rules: Never guarantee specific dates, prices, or contracts. If facts are not in the text above, say you are not sure and give the booking email.",
      "Keep replies brief unless the user asks for detail. When a booking inquiry should go to the artist, encourage email to the address above.",
    ].join("\n");
  }

  sendMessage(
    systemPrompt: string,
    history: { role: "user" | "model"; text: string }[],
    userText: string,
  ): Observable<string> {
    const key = environment.geminiApiKey?.trim();
    if (!key) {
      return throwError(() => new Error("Booking assistant is not configured."));
    }

    const model = environment.geminiModel?.trim() || "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

    const contents: GeminiContent[] = [];
    for (const turn of history) {
      contents.push({
        role: turn.role === "user" ? "user" : "model",
        parts: [{ text: turn.text }],
      });
    }
    contents.push({ role: "user", parts: [{ text: userText }] });

    const body = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 768,
      },
    };

    return this.http.post<GeminiResponse>(url, body).pipe(
      map((res) => {
        if (res.error?.message) {
          throw new Error(res.error.message);
        }
        const text = res.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!text) {
          throw new Error("No response from assistant.");
        }
        return text;
      }),
      catchError((err: HttpErrorResponse | Error) => {
        let msg = "Could not reach the assistant. Try email instead.";
        if (err instanceof HttpErrorResponse) {
          const body = err.error as { error?: { message?: string } } | undefined;
          msg = body?.error?.message || err.message || msg;
        } else if (err?.message) {
          msg = err.message;
        }
        return throwError(() => new Error(msg));
      }),
    );
  }
}
