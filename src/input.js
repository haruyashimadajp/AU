// 入力：キーボード（押しっぱなし / 押した瞬間）とタッチのドラッグ
const held = new Set(), pressed = new Set();
const drag = { dx: 0, dy: 0, id: null, x: 0, y: 0 };

addEventListener('keydown', e => {
  if (!held.has(e.code)) pressed.add(e.code);
  held.add(e.code);
  if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', e => held.delete(e.code));
addEventListener('blur', () => held.clear());

addEventListener('pointerdown', e => { drag.id = e.pointerId; drag.x = e.clientX; drag.y = e.clientY; });
addEventListener('pointermove', e => {
  if (e.pointerId !== drag.id) return;
  drag.dx += e.clientX - drag.x; drag.dy += e.clientY - drag.y;
  drag.x = e.clientX; drag.y = e.clientY;
});
addEventListener('pointerup', e => { if (e.pointerId === drag.id) drag.id = null; });
addEventListener('contextmenu', e => e.preventDefault());

// 1フレームぶんの入力をまとめて返す
export function readInput() {
  const I = {
    x: (held.has('ArrowRight') || held.has('KeyD') ? 1 : 0) - (held.has('ArrowLeft') || held.has('KeyA') ? 1 : 0),
    y: (held.has('ArrowDown') || held.has('KeyS') ? 1 : 0) - (held.has('ArrowUp') || held.has('KeyW') ? 1 : 0),
    ok: pressed.has('KeyZ') || pressed.has('Enter'),
    dragX: drag.dx, dragY: drag.dy,
  };
  pressed.clear(); drag.dx = drag.dy = 0;
  return I;
}
