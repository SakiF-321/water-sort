console.log("今日も挫折せず続けててえらい");
const colors = {
    1:"#ff0000",
    2:"#0000ff",
    3:"#ffff00",
    4:"#00aa00"
};

/**初期状態を描画してる */
const stage =[
    [1, 2, 3, 4],
    [4, 3, 2, 1],
    [2, 1, 4, 3],
    [3, 4, 1, 2],
    []
];

/**現在の選択状態を入れる変数 */
let selectedTube = null;
let firstIndex = null;
let secondIndex = null;

const game = document.getElementById("game");


function render(){
    // tubeの中身をすべて削除
    game.innerHTML = "";
    // tubeの中身更新
    for(let i = 0; i < 5; i++){
    const tube = document.createElement("div");
    tube.className = "tube";
    tube.dataset.index = i;

    tube.addEventListener("click",function(){
        if(firstIndex === null){
            selectedTube = tube;
            tube.classList.add("selected");
            firstIndex = Number(tube.dataset.index);
            secondIndex = null;
        }else{
            if(selectedTube === tube){
                tube.classList.remove("selected");
                selectedTube = null;
                firstIndex = null;
            }else{
                /**異なる2色を選択した場合 */
                secondIndex = Number(tube.dataset.index);
                console.log(
                    "移動元", firstIndex,
                    "移動先" , secondIndex
                );
                const moveColor = stage[firstIndex].shift();
                stage[secondIndex].unshift(moveColor);
                selectedTube = null;
                firstIndex = null;
                secondIndex = null;
                render();
            }
        }
    })

    game.append(tube);

    for(let j = 0; j < stage[i].length; j++){
        const liquid = document.createElement("div");
        liquid.className = "liquid";
        liquid.style.backgroundColor = colors[stage[i][j]];
        tube.append(liquid);
    }
    }

}

render();