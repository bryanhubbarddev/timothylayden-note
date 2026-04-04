import { TestBed } from "@angular/core/testing";
import { ScrollService } from "./scroll.service";

describe("ScrollService", () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  it("calls scrollIntoView on element with matching id", () => {
    const el = document.createElement("section");
    el.id = "contact";
    document.body.appendChild(el);
    const spy = spyOn(el, "scrollIntoView").and.callThrough();

    service.scrollTo("contact");

    expect(spy).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("does not throw when element is missing", () => {
    expect(() => service.scrollTo("nonexistent-id-xyz")).not.toThrow();
  });
});
