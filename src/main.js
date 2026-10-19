// ゲームループ：ロジックは 60fps 固定で進め、描画は毎フレーム1回
import { readInput } from './input.js';
import { state, update } from './game.js';
import { initView, render } from './view.js';

await initView();

const STEP = 1000 / 60;
let last = performance.now(), acc = 0;

function frame(now) {
  acc += Math.min(now - last, 250); last = now;
  while (acc >= STEP) { update(readInput()); acc -= STEP; }
  render(state);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
