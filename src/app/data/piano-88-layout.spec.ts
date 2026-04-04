import {
  buildPiano88Layout,
  PIANO_DESIGN_WIDTH,
  PIANO_WHITE_KEY_WIDTH,
} from "./piano-88-layout";

describe("buildPiano88Layout", () => {
  it("has 52 white keys and 36 black keys (88-key piano)", () => {
    const { whiteKeys, blackKeys } = buildPiano88Layout();
    expect(whiteKeys.length).toBe(52);
    expect(blackKeys.length).toBe(36);
  });

  it("white keys span design width (52 × white key width)", () => {
    const { whiteKeys } = buildPiano88Layout();
    const last = whiteKeys[whiteKeys.length - 1];
    expect(last.left + PIANO_WHITE_KEY_WIDTH).toBe(PIANO_DESIGN_WIDTH);
  });

  it("white keys are ordered by MIDI and non-overlapping", () => {
    const { whiteKeys } = buildPiano88Layout();
    for (let i = 1; i < whiteKeys.length; i++) {
      expect(whiteKeys[i].midi).toBeGreaterThan(whiteKeys[i - 1].midi);
      expect(whiteKeys[i].left).toBe(whiteKeys[i - 1].left + PIANO_WHITE_KEY_WIDTH);
    }
  });

  it("marks three white keys for dip animation", () => {
    const { whiteKeys } = buildPiano88Layout();
    const dipping = whiteKeys.filter((k) => k.dip);
    expect(dipping.length).toBe(3);
  });

  it("marks two black keys for glow animation", () => {
    const { blackKeys } = buildPiano88Layout();
    const glowing = blackKeys.filter((k) => k.glow);
    expect(glowing.length).toBe(2);
  });
});
