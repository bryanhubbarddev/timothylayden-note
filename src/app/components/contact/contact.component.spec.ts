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
});
