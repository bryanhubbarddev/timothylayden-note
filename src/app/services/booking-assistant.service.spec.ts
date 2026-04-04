import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { BookingAssistantService } from "./booking-assistant.service";
import { environment } from "../../environments/environment";
import { siteContent } from "../data/site-content";

describe("BookingAssistantService", () => {
  let service: BookingAssistantService;
  let httpMock: HttpTestingController;

  const savedKey = environment.geminiApiKey;
  const savedModel = environment.geminiModel;

  beforeEach(() => {
    environment.geminiApiKey = "test-gemini-key";
    environment.geminiModel = "gemini-2.0-flash";

    TestBed.configureTestingModule({
      providers: [
        BookingAssistantService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(BookingAssistantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    environment.geminiApiKey = savedKey;
    environment.geminiModel = savedModel;
  });

  it("isConfigured is true when geminiApiKey is set", () => {
    expect(service.isConfigured()).toBeTrue();
  });

  it("isConfigured is false when geminiApiKey is empty", () => {
    environment.geminiApiKey = "";
    expect(service.isConfigured()).toBeFalse();
    environment.geminiApiKey = "test-gemini-key";
  });

  it("buildSystemPrompt includes stage name and booking email", () => {
    const prompt = service.buildSystemPrompt(siteContent);
    expect(prompt).toContain(siteContent.stageName);
    expect(prompt).toContain(siteContent.bookingEmail);
    expect(prompt).toContain(siteContent.bookingContact);
  });

  it("sendMessage POSTs to Gemini and returns trimmed text", (done) => {
    const sys = "You are helpful.";
    service.sendMessage(sys, [], "Hello").subscribe({
      next: (text) => {
        expect(text).toBe("Hi there");
        done();
      },
      error: done.fail,
    });

    const req = httpMock.expectOne((r) =>
      r.url.includes("generativelanguage.googleapis.com"),
    );
    expect(req.request.method).toBe("POST");
    expect(req.request.body.systemInstruction.parts[0].text).toBe(sys);
    req.flush({
      candidates: [
        {
          content: { parts: [{ text: "  Hi there  " }] },
        },
      ],
    });
  });

  it("sendMessage errors when API returns error in body", (done) => {
    service.sendMessage("sys", [], "x").subscribe({
      next: () => done.fail("expected error"),
      error: (e: Error) => {
        expect(e.message).toContain("blocked");
        done();
      },
    });

    const req = httpMock.expectOne((r) =>
      r.url.includes("generativelanguage.googleapis.com"),
    );
    req.flush({ error: { message: "blocked" } });
  });

  it("sendMessage errors when key missing", (done) => {
    environment.geminiApiKey = "";
    service.sendMessage("sys", [], "x").subscribe({
      next: () => done.fail("expected error"),
      error: (e: Error) => {
        expect(e.message).toContain("not configured");
        done();
      },
    });
    environment.geminiApiKey = "test-gemini-key";
  });
});
