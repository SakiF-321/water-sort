console.log("今日も挫折せず続けててえらい");
const colors = {
    1:"#ff7f7f",
    2:"#ffff7f",
    3:"#7fbfff",
    4:"#2fda18"
};
const game = document.getElementById("game");
const tubeContainer = document.getElementById("tubeContainer");
const selectScreen = document.getElementById("selectScreen");
let stageNumber = null

// 固定の初期状態
const initialStage =[
    [
        [1, 1, 2, 2],
        [2, 2, 1, 1],
        []
    ],
    [
        [2, 1, 4, 3],
        [4, 4, 2, 1],
        [2, 1, 4, 3],
        [3, 3, 1, 2],
        []
    ],
    [
        [1, 2, 3, 4],
        [2, 1, 3, 4],
        [3, 1, 2, 4],
        [2, 3, 4, 1],
        []
    ]
];


const selectStageButton = document.getElementById("selectStageButton")
selectStageButton.addEventListener("click", function(){
    //hiddenが機能しない
    game.classList.add("hidden")
    clearScreen.classList.add("hidden")
    selectScreen.classList.remove("hidden")
    createButtonForStage();
})


let history = [];
let selectedTube = null;
let firstIndex = null;
let secondIndex = null;

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame)
const retryButton = document.getElementById("retryButton");
retryButton.addEventListener("click", resetGame)
const undoButton = document.getElementById("undoButton");
undoButton.addEventListener("click", undoGame)
const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", goNextStage)
//const addTubeButton = document.getElementById("");
//addTubeButton.addEventListener("click", tubeを1本増やし、スコアを減らすような処理)


//ステージボタン生成
function createButtonForStage(){
    selectScreen.innerHTML = "";
    tubeContainer.innerHTML = "";
    for(let i = 0; i < initialStage.length; i++){
        const stageButton = document.createElement("div");
        stageButton.textContent = ("Stage " + (i+1));
        selectScreen.append(stageButton)
        stageButton.className = "button";
        stageButton.dataset.index = i;
        stageButton.addEventListener("click", function(){
            stageNumber = i;
            game.classList.remove("hidden")
            selectScreen.classList.add("hidden")
            stage = structuredClone(initialStage[i])
            // forのletで作ったiはイベントの中でも覚えている
            createSomeTubes();
            render();
        })
    }
}

// indexがiのtubeを作成
function createOneTube(i){
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
            console.log(firstIndex, secondIndex);
        }else{
            if(selectedTube === tube){
                tube.classList.remove("selected");
                selectedTube = null;
                firstIndex = null;
            }else{
                // 異なる2色を選択した場合
                secondIndex = Number(tube.dataset.index);
                console.log(firstIndex, secondIndex);
                moveSomeLiquid(firstIndex, secondIndex);
                selectedTube.classList.remove("selected")

                selectedTube = null;
                firstIndex = null;
                secondIndex = null;
                // 自身を呼び出して二回目以降の移動に備える 実はこれあんまり理解してない　違うこれは動かしたらその状態を描画する目でを1セットにしてるんだ
                render();
            }
        }
    })
    tubeContainer.append(tube);
}


function createSomeTubes(){
    tubeContainer.innerHTML = "";
    for(let i = 0; i < stage.length; i++){
        createOneTube(i);
    }
}

// liquidの更新とクリア判定を行う
function render(){
    for(let i = 0; i < stage.length; i++){
        let tube = tubeContainer.children[i];
        tube.innerHTML = "";
        for(let j = 0; j < stage[i].length; j++){
            const liquid = document.createElement("div");
            liquid.className = "liquid";
            liquid.style.backgroundColor = colors[stage[i][j]];
            tube.append(liquid);
        }
    }
showClearScreen();
}


// 移動が可能か判定する関数
function canMove(firstIndex, secondIndex){
    //console.log(firstIndex, secondIndex);
    //console.log(stage[firstIndex]);
    //console.log(stage[secondIndex]);
    // 移動元が空じゃない かつ 移動先に空きがある
    if(stage[firstIndex].length > 0 && stage[secondIndex].length < 4){
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
}

// バックエンドで試験管の状態を変更する関数
function moveSingleLiquid(firstIndex, secondIndex){
    const moveColor = stage[firstIndex].shift()
    stage[secondIndex].unshift(moveColor)
}

// 移動元の連続色数を確認して数字を返す
function getContinusColors(firstIndex){
    const topColor1st = stage[firstIndex][0]
    let count = 1;
    for(let i = 1; i < 4; i++){
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
    if (canMove(firstIndex, secondIndex)){
        // canMoveならば履歴を採取
        history.push(structuredClone(stage))
        const amount = getMovingAmount(firstIndex, secondIndex);
        console.log(amount + "滴移動しました")
        for(i = 0; i < amount; i++){
            moveSingleLiquid(firstIndex, secondIndex);
        }
    }
}

function resetGame(){
    stage = structuredClone(initialStage[stageNumber]);
    selectedTube = null;
    firstIndex = null;
    secondIndex = null;
    clearScreen.classList.add("hidden")
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
        game.classList.add("hidden")
        clearScreen.classList.remove("hidden")
    }
}


function retryStage(){
    resetGame()
}

function undoGame(){
    if(history.length !== 0){
        stage = history.pop();
        selectedTube = null;
        firstIndex = null;
        secondIndex = null;
        render();
    }
}

function goNextStage(){
    console.log(stageNumber);
    stageNumber = stageNumber + 1;
    stage = structuredClone(initialStage[stageNumber])
    console.log(stage)
    clearScreen.classList.add("hidden")
    game.classList.remove("hidden")
    createSomeTubes();
    render();
}



//初期画面の描画
createButtonForStage();