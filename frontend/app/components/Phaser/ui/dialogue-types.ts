import { FontColor } from './FontManager';

export type DialogueStep =
  | { type: 'text'; text: string; color?: FontColor }
  | { type: 'event'; emit: string; data?: any }
  | { type: 'wait'; ms: number };

export type DialogueScript = DialogueStep[];
