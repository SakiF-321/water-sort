console.log("今日も挫折せず続けててえらい");
const colors = {
    1:"#ff7f7f",
    2:"#ffff7f",
    3:"#7fbfff",
    4:"#bfff7f"
};


// 固定の初期状態
const initialStage =[    
    [2, 1, 3, 3],
    [4, 4, 2, 1],
    [2, 1, 4, 3],
    [3, 4, 1, 2],
    []
];

// 現在のステージの状態
let stage = structuredClone(initialStage);
const game = document.getElementById("game");

let selectedTube = null;
let firstIndex = null;
let secondIndex = null;

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame)

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
                // 異なる2色を選択した場合
                secondIndex = Number(tube.dataset.index);
                console.log(
                    "移動元", firstIndex,
                    "移動先" , secondIndex
                );
                // 移動処理
                moveSomeLiquid(firstIndex, secondIndex);

                selectedTube = null;
                firstIndex = null;
                secondIndex = null;
                // 自身を呼び出して二回目以降の移動に備える 実はこれあんまり理解してない
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
showClearScreen();
}
render();

// 移動が可能か判定する関数
function canMove(firstIndex, secondIndex){
    // 移動元が空じゃない
    if(stage[firstIndex].length > 0){
        // 移動先に空きがある
        if(stage[secondIndex].length < 4){
            // 移動先の色と一致している
            if(stage[secondIndex].length === 0 || stage[firstIndex][0] === stage[secondIndex][0]){
                return true;
            }else{
                // 変数の名前に失敗の原因を埋め込み、console.log(失敗理由)としてもいい
                console.log("色が違うので注げません")
                return false
            }
        }else{
            console.log("もう注げません")
            return false;
        }
    }else{
        console.log("注げる液体がありません")
        return false;
    }
}

// バックエンドで試験管の状態を変更する関数
function moveSingleLiquid(firstIndex, secondIndex){
    if (canMove(firstIndex, secondIndex)){
        // 液体移動処理
        const moveColor = stage[firstIndex].shift()
        stage[secondIndex].unshift(moveColor)
        // render(); // 画面の更新はこの関数の仕事ではない
    }else{
        // エラーメッセージの表示
        alert("注ぐことができません")
    }
}

// 移動元の連続色数を確認して数字を返す
function getContinusColors(firstIndex){
    const topColor1st = stage[firstIndex][0]
    let count = 1;
    for(i = 1; i < 4; i++){
        if(topColor1st === stage[firstIndex][i]){
            count = count + 1;
        }else{
            break;
        }
    }   
    return(count);
}

// 移動元の色が実際に何滴注げるのか判断して返す
function getRemainingSpace(secondIndex){
    return(4 - stage[secondIndex].length);
}

// 移動可能な色を取得する。
function getMovingAmount(firstIndex, secondIndex){
    const continuousColors = getContinusColors(firstIndex);
    const remainingSpace = getRemainingSpace(secondIndex);
    if(continuousColors > remainingSpace){
        return(remainingSpace)
    }else{
        return(continuousColors)
    }
}

function moveSomeLiquid(firstIndex, secondIndex){
    const amount = getMovingAmount(firstIndex, secondIndex);
    for(i = 0; i < amount; i++){
        moveSingleLiquid(firstIndex, secondIndex);
    }
}

function resetGame(){
    stage = structuredClone(initialStage);
    selectedTube = null;
    firstIndex = null;
    secondIndex = null;
    render();
}

function isTubeClear(index){
    if(stage[index].length === 0){return true}
    else if(stage[index].length === 4){
        if(stage[index][0] === stage[index][1] 
            && stage[index][0] === stage[index][2] 
            && stage[index][0] === stage[index][3]){
                return true}
    return false}
}

function isGameClear(){
    for(let i = 0; i < stage.length; i++){
        if(!isTubeClear(i)){return false}
    }return true
}

function showClearScreen(){
    if(isGameClear()){
        clearScreen.classList.remove("hidden")
    }
}

function retryStage(){
    resetGame()
}

/*function goNextStage(i){
    stage = structuredClone(initialStage[i+1])
}*/