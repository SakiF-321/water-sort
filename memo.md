const title = document.getElementById("title");
title.textContent = "さきが自己肯定感を高めるために作ったゲーム";
const button = document.getElementById("button");

button.addEventListener("click", function (){
    title.textContent="祝！ボタン押され記念(^▽^)/"
});

↑これはタイトルの文字変更とボタンの実装、ボタンを押した際の挙動について