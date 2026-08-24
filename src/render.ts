// 描画層 (render.ts)
// 状態を受け取って画面(DOM)に表示するだけを担当する。
// おみくじを引くロジックは omikuji.ts、ボタンと処理の連携は main.ts が持つ。

// なおちゃんみえますか

import type { OmikujiResult } from "./omikuji";
const resultElement = document.getElementById("result")!;

// ステップ1（最初の課題）: この関数を実装する。
//
// いまは「引く」ボタンを押すと開発者ツール(F12)の Console に
// 「引いた結果: 大吉」と出るが、画面の文字は変わらない。
// この関数の中身が空だからで、ここに DOM 操作を書けば画面に反映される。
//
// ヒント:
//  - 表示先は index.html の id="result" の要素。document.getElementById で取れる。
//  - 要素の中の文字は textContent で書き換えられる。
//  - result が null のとき（リセット直後など）は初期メッセージを出す。
//エフェクトを表示するために関数の中身を差し替えた
export function renderResult(result: OmikujiResult | null): void {
  const boxWrapper = document.querySelector(".omikuji-box-wrapper");
  const box = document.getElementById("omikuji-box");
  const resultElement = document.getElementById("result");

  // 画面演出をリセット
  document.body.classList.remove("kyo-bg");
  const effects = document.getElementById("effects");
  if (effects) effects.innerHTML = "";

  if (result !== null) {
    // 1. 箱を表示した状態でアニメーション開始
    if (boxWrapper) boxWrapper.classList.remove("is-hidden");
    if (resultElement) resultElement.classList.add("is-hidden");

    if (box) {
      box.classList.remove("shake");
      void box.offsetWidth; // リフロー発生でアニメーション再実行
      box.classList.add("shake");
    }

    // 2. 揺れ（0.4秒）が終わった後に箱を隠し、お札とエフェクトを表示
    setTimeout(() => {
      if (boxWrapper) boxWrapper.classList.add("is-hidden");
      if (resultElement) {
        resultElement.textContent = `${result}`;
        resultElement.className = `omikuji-result result-${result}`;
        resultElement.classList.remove("is-hidden");
      }
      playEffect(result);
    }, 400);

    } else {
      // リセット時：箱を再表示してお札を隠す（nullチェック追加済み）
      if (boxWrapper) boxWrapper.classList.remove("is-hidden");
      if (resultElement) {
        resultElement.textContent = "";
        resultElement.classList.add("is-hidden");
      }
  }
  }

//演出内容を指定
function playEffect(result: OmikujiResult): void {
  const container = document.getElementById("effects");
  if (!container) return;

  if (result === "大吉") {
    spawn(container, "gold", 35);
  } else if (["吉", "中吉", "小吉", "末吉"].includes(result)) {
    spawn(container, "sakura", 20);
  } else if (result === "凶") {
    document.body.classList.add("kyo-bg");
    container.innerHTML = '<div class="fog"></div>';
  }
}

function spawn(parent: HTMLElement, type: "gold" | "sakura", count: number): void {
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${2.5 + Math.random() * 2}s`;

    if (type === "gold") {
      p.style.width = p.style.height = `${10 + Math.random() * 10}px`;
      p.style.backgroundColor = Math.random() > 0.5 ? "#ffd700" : "#e6b800";
    } else {
      p.textContent = "🌸";
      p.style.fontSize = `${14 + Math.random() * 10}px`;
    }
    parent.appendChild(p);
  }
}
// 拡張ポイント（ステップ2以降）。必要になったら関数を足す。
//  - 履歴をリスト表示する: document.createElement で <li> を作り、<ul id="history"> に足す関数。
//  - 残りくじ枚数を表示する: omikuji.ts に残数を返す関数を足したうえで表示用の関数を足す。
