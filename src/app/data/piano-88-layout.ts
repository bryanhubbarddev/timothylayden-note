/** Layout constants for an 88-key piano (A0–C8): 52 white + 36 black. */

export const PIANO_WHITE_KEY_WIDTH = 12;
export const PIANO_BLACK_KEY_WIDTH = Math.round(PIANO_WHITE_KEY_WIDTH * 0.58);
export const PIANO_DESIGN_WIDTH = 52 * PIANO_WHITE_KEY_WIDTH;

export interface PianoWhiteKey {
  midi: number;
  left: number;
  dip: boolean;
  dipDelay: string;
}

export interface PianoBlackKey {
  midi: number;
  left: number;
  glow: boolean;
  glowDelay: string;
}

function isWhitePitch(midi: number): boolean {
  const pc = ((midi % 12) + 12) % 12;
  return [0, 2, 4, 5, 7, 9, 11].includes(pc);
}

function isBlackPitch(midi: number): boolean {
  const pc = ((midi % 12) + 12) % 12;
  return [1, 3, 6, 8, 10].includes(pc);
}

function whiteIndexForMidi(target: number): number {
  let idx = 0;
  for (let m = 21; m <= 108; m++) {
    if (isWhitePitch(m)) {
      if (m === target) return idx;
      idx++;
    }
  }
  return -1;
}

/**
 * Builds pixel positions in design space (height still from CSS: .wk / .bk).
 * Black keys sit on the treble side of the gap after their lower natural.
 */
export function buildPiano88Layout(): { whiteKeys: PianoWhiteKey[]; blackKeys: PianoBlackKey[] } {
  const W = PIANO_WHITE_KEY_WIDTH;
  const bkW = PIANO_BLACK_KEY_WIDTH;
  const inset = W * 0.54;

  const whiteKeys: PianoWhiteKey[] = [];
  let x = 0;
  for (let m = 21; m <= 108; m++) {
    if (isWhitePitch(m)) {
      whiteKeys.push({ midi: m, left: x, dip: false, dipDelay: "0s" });
      x += W;
    }
  }

  // Decorative motion: spread across the keyboard (by white index)
  const dipIndices = new Set([9, 26, 41]);
  const dipDelays = ["0s", "0.4s", "0.8s"];
  let dipN = 0;
  whiteKeys.forEach((k, i) => {
    if (dipIndices.has(i)) {
      k.dip = true;
      k.dipDelay = dipDelays[dipN++] ?? "0s";
    }
  });

  const blackKeys: PianoBlackKey[] = [];
  for (let m = 21; m <= 108; m++) {
    if (!isBlackPitch(m)) continue;
    const prevWhite = m - 1;
    const wi = whiteIndexForMidi(prevWhite);
    if (wi < 0) continue;
    const left = Math.round(wi * W + inset - bkW / 2);
    blackKeys.push({ midi: m, left, glow: false, glowDelay: "0s" });
  }

  // Glow on two blacks in mid range (by array index)
  const glowIdx = [8, 19];
  const glowDelays = ["0.55s", "1.15s"];
  glowIdx.forEach((bi, i) => {
    const k = blackKeys[bi];
    if (k) {
      k.glow = true;
      k.glowDelay = glowDelays[i] ?? "0s";
    }
  });

  return { whiteKeys, blackKeys };
}
