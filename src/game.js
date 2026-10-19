// ゲームロジック：数値の計算だけ。画面のことは何も知らない
export const W = 960, H = 540;

export const state = {
  t: 0,
  hp: 20, maxhp: 20, inv: 0,
  box: { x: 480, y: 330, w: 260, h: 200 },
  soul: { x: 480, y: 330, r: 6, speed: 3.6 },
  bullets: [],
};

const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// 攻撃の例：箱の上から粒が降ってくる
function spawn(s) {
  const b = s.box;
  if (s.t % 10 === 0) s.bullets.push({ kind: 'orb', x: rnd(b.x - b.w / 2, b.x + b.w / 2), y: b.y - b.h / 2 - 20, vx: rnd(-0.6, 0.6), vy: rnd(2, 3.4), r: 5 });
}

export function update(I) {
  const s = state, so = s.soul, b = s.box;
  s.t++;

  // ハートの移動（キー + タッチのドラッグ）
  so.x += I.x * so.speed + I.dragX * 0.6;
  so.y += I.y * so.speed + I.dragY * 0.6;
  so.x = clamp(so.x, b.x - b.w / 2 + so.r, b.x + b.w / 2 - so.r);
  so.y = clamp(so.y, b.y - b.h / 2 + so.r, b.y + b.h / 2 - so.r);

  // 箱をゆっくり伸び縮みさせる（変形する枠の例）
  b.w = 260 + Math.sin(s.t / 90) * 60;

  spawn(s);
  for (const o of s.bullets) { o.x += o.vx; o.y += o.vy; }
  s.bullets = s.bullets.filter(o => o.y < H + 40);

  // 当たり判定（円と円）
  if (s.inv > 0) s.inv--;
  else for (const o of s.bullets) {
    if (Math.hypot(o.x - so.x, o.y - so.y) < o.r + so.r - 2) { s.hp = Math.max(0, s.hp - 3); s.inv = 45; break; }
  }
  if (s.hp <= 0) { s.hp = s.maxhp; s.bullets.length = 0; }
}
