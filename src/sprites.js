// ドット絵：文字列の行からテクスチャを作る（1文字 = 1ドット）
import { Texture } from 'pixi.js';

const PAL = { R: '#ff2a2a', W: '#ffffff', K: '#000000' };

export function fromRows(rows, pal = PAL) {
  const c = document.createElement('canvas');
  c.width = rows[0].length; c.height = rows.length;
  const g = c.getContext('2d');
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(x, y, 1, 1); }
  }));
  return Texture.from(c);
}

export const HEART = fromRows([
  '.RR.RR.',
  'RRRRRRR',
  'RRRRRRR',
  '.RRRRR.',
  '..RRR..',
  '...R...',
]);

export const ORB = fromRows([
  '.WWW.',
  'WWWWW',
  'WWWWW',
  'WWWWW',
  '.WWW.',
]);
