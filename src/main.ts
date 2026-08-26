// イベント層 (main.ts)
// クリックされた時の処理とボタンを結びつける。
// おみくじ箱を用意し、ボタンのクリックで reset / draw を呼び、結果を描画層に渡す。

import {
  resetOmikuji,
  drawOmikuji,
  getRemainingCount,
} from "./omikuji";
import {
  renderResult,
  renderRemainingCount,
} from "./render";

function main(): void {
  // おみくじ箱を用意する
  resetOmikuji();
  renderRemainingCount(getRemainingCount());

  const drawButton = document.getElementById("draw-button");
  const resetButton = document.getElementById("reset-button");

  drawButton?.addEventListener("click", () => {
    const result = drawOmikuji();
    renderResult(result);
    renderRemainingCount(getRemainingCount());
  });

  resetButton?.addEventListener("click", () => {
    resetOmikuji();
    renderResult(null);
    renderRemainingCount(getRemainingCount());
  });
}

main();