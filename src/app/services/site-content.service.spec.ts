import { TestBed } from "@angular/core/testing";
import { SiteContentService } from "./site-content.service";
import { siteContent } from "../data/site-content";

describe("SiteContentService", () => {
  let service: SiteContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteContentService);
  });

  it("returns siteContent from getContent()", () => {
    expect(service.getContent()).toBe(siteContent);
  });

  it("returns data with required booking fields", () => {
    const d = service.getContent();
    expect(d.bookingEmail).toContain("@");
    expect(d.bookingContact.length).toBeGreaterThan(0);
    expect(d.stageName.length).toBeGreaterThan(0);
  });
});
