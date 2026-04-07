import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContactComponent } from "./contact.component";

describe("ContactComponent", () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it("bookingMailto is empty when bookingEmail is blank", () => {
    fixture.componentRef.setInput("bookingEmail", "");
    expect(component.bookingMailto).toBe("");
  });

  it("bookingMailto includes mailto address and encoded subject", () => {
    fixture.componentRef.setInput("bookingEmail", "tim@example.com");
    expect(component.bookingMailto).toBe(
      "mailto:tim@example.com?subject=" +
        encodeURIComponent("Booking Request — live piano"),
    );
  });

  it("does not render mailto links when bookingEmail is blank", () => {
    fixture.componentRef.setInput("bookingEmail", "");
    fixture.detectChanges();
    const mailtoAnchors = fixture.nativeElement.querySelectorAll(
      'a[href^="mailto:"]',
    );
    expect(mailtoAnchors.length).toBe(0);
  });

  it("uses alternate email for CTA when primary is blank but alt is set", () => {
    fixture.componentRef.setInput("bookingEmail", "");
    fixture.componentRef.setInput("bookingEmailAlt", "alt@example.com");
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector("a.btn-full");
    expect(btn?.getAttribute("href")).toContain("alt@example.com");
  });

  it("bookingMailtoInfo includes mailto when bookingEmailInfo is set", () => {
    fixture.componentRef.setInput("bookingEmailInfo", "info@example.com");
    expect(component.bookingMailtoInfo).toBe(
      "mailto:info@example.com?subject=" +
        encodeURIComponent("Booking Request — live piano"),
    );
  });

  it("bookingMailtoForAction falls back to info when primary and alt are blank", () => {
    fixture.componentRef.setInput("bookingEmail", "");
    fixture.componentRef.setInput("bookingEmailAlt", "");
    fixture.componentRef.setInput("bookingEmailInfo", "info@example.com");
    expect(component.bookingMailtoForAction).toContain("info@example.com");
  });

  it("renders info email link in the card when bookingEmailInfo is set", () => {
    fixture.componentRef.setInput("bookingContact", "Tim");
    fixture.componentRef.setInput("bookingEmail", "primary@example.com");
    fixture.componentRef.setInput("bookingEmailInfo", "info@example.com");
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll("a.contact-email-link");
    const infoLink = Array.from(links as NodeListOf<HTMLAnchorElement>).find(
      (a) => a.textContent?.includes("info@example.com"),
    );
    expect(infoLink).toBeTruthy();
    expect(infoLink!.getAttribute("href")).toContain("info@example.com");
  });

  it("CTA href uses bookingEmailInfo when primary and alt are empty", () => {
    fixture.componentRef.setInput("bookingContact", "Tim");
    fixture.componentRef.setInput("bookingEmail", "");
    fixture.componentRef.setInput("bookingEmailAlt", "");
    fixture.componentRef.setInput("bookingEmailInfo", "info@example.com");
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector("a.btn-full");
    expect(btn?.getAttribute("href")).toContain("info@example.com");
  });
});
