console.log("Hello JavaScript!");
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

const game = document.getElementById("game");
for(let i = 0; i < 5; i++){
    const tube = document.createElement("div");
    tube.className = "tube";

    tube.addEventListener("click",function(){
        if(selectedTube){
            if(selectedTube === tube){
                tube.classList.remove("selected");
                selectedTube = null;
            }else{
                selectedTube.classList.remove("selected");
                /**クリックされたtubeというHTML要素に、selectedというclassを追加した */
                tube.classList.add("selected");
                selectedTube = tube;
            }
        }else{
            selectedTube = tube;
            tube.classList.add("selected");
        }
        console.log(selectedTube);
    })

    game.append(tube);

    for(let j=0; j<4; j++){
        const liquid = document.createElement("div");
        liquid.className = "liquid";
        liquid.style.backgroundColor = colors[stage[i][j]];
        tube.append(liquid);
    }
    }

