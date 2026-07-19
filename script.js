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
    // clickした場合の挙動
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
                // 自身を呼び出して二回目以降の移動に備える
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

// 移動が可能か判定する関数
function canMove(firstIndex, secondIndex){
    // 移動元が空じゃない
    if(stage[firstIndex].length > 0){
        // 移動先に空きがある
        if(stage[secondIndex].length < 4){
            // 移動先の色と一致している
            if(stage[secondIndex].length === 0 || stage[firstIndex][0] === stage[secondIndex][0]){
                return(true);
            }else{
                // 変数の名前に失敗の原因を埋め込み、console.log(失敗理由)としてもいい
                console.log("色が違うので注げません")
                return(false)
            }
        }else{
            console.log("もう注げません")
            return(false);
        }
    }else{
        console.log("注げる液体がありません")
        return(false);
    }
}

render();