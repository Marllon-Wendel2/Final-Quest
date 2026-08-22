export const FONT_FAMILY = '"MedievalSharp", cursive';

export type FontColor =
  | 'font_white'
  | 'font_green'
  | 'font_brown'
  | 'font_gold'
  | 'font_blue'
  | 'font_yellow'
  | 'font_outlined';

export const COLOR_HEX: Record<FontColor, string> = {
  font_white:    '#ffffff',
  font_green:    '#00cc44',
  font_brown:    '#8b4513',
  font_gold:     '#ffd700',
  font_blue:     '#4488ff',
  font_yellow:   '#ffee00',
  font_outlined: '#cccccc',
};
