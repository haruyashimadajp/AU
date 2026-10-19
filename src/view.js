// 描画：state を読んで Pixi のスプライトに写すだけ
import { Application, Container, Graphics, Sprite, Text, TextureStyle } from 'pixi.js';
import { W, H } from './game.js';
import { HEART, ORB } from './sprites.js';

TextureStyle.defaultOptions.scaleMode = 'nearest';   // ドット絵をぼかさない
const DOT = 3;                                       // 1ドット = 3px

let app, boxG, maskG, soulS, hpT, bulletLayer;
const bulletView = new Map();                        // 弾オブジェクト → スプライト

export async function initView() {
  app = new Application();
  await app.init({ width: W, height: H, background: '#000', antialias: false, autoStart: false, resolution: Math.min(devicePixelRatio, 2) });
  document.body.appendChild(app.canvas);

  bulletLayer = new Container();
  maskG = new Graphics();
  bulletLayer.mask = maskG;                          // 弾は箱の中だけに見せる
  boxG = new Graphics();
  soulS = new Sprite(HEART); soulS.anchor.set(0.5); soulS.scale.set(DOT);
  hpT = new Text({ text: '', style: { fontFamily: 'monospace', fontSize: 28, fill: '#ffffff' } });
  hpT.position.set(40, 480);
  app.stage.addChild(maskG, boxG, bulletLayer, soulS, hpT);
}

function syncBullets(bullets) {
  const alive = new Set(bullets);
  for (const o of bullets) {
    let sp = bulletView.get(o);
    if (!sp) { sp = new Sprite(ORB); sp.anchor.set(0.5); sp.scale.set(DOT); bulletLayer.addChild(sp); bulletView.set(o, sp); }
    sp.position.set(o.x, o.y);
  }
  for (const [o, sp] of bulletView) if (!alive.has(o)) { sp.destroy(); bulletView.delete(o); }
}

export function render(s) {
  const b = s.box;
  maskG.clear().rect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h).fill(0xffffff);
  boxG.clear().rect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h).stroke({ width: 5, color: 0xffffff, alignment: 1 });
  soulS.position.set(s.soul.x, s.soul.y);
  soulS.visible = s.inv === 0 || Math.floor(s.inv / 4) % 2 === 0;
  syncBullets(s.bullets);
  hpT.text = `HP ${s.hp} / ${s.maxhp}`;
  app.render();
}
