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
        encodeURIComponent("Booking inquiry — live piano"),
    );
  });
});
