console.log("Hello JavaScript!");
const title = document.getElementById("title");
title.textContent = "さきが自己肯定感を高めるために作ったゲーム";
const button = document.getElementById("button");

button.addEventListener("click", function (){
    title.textContent="祝！ボタン押され記念(^▽^)/"
});