// 游戏数据  
const gameState = {  
    player: {  
        name: "皮卡丘",  
        hp: 100,  
        maxHp: 100,  
        img: document.getElementById('player-hp-fill')  
    },  
    enemy: {  
        name: "喷火龙",  
        hp: 120,  
        maxHp: 120,  
        img: document.getElementById('enemy-hp-fill')  
    },  
    isProcessing: false  
};  
  
// 技能数据  
const moves = {  
    attack1: { name: "十万伏特", damage: [25, 35], type: "attack" },  
    attack2: { name: "电光一闪", damage: [10, 15], type: "attack" },  
    heal: { name: "全复药", amount: 40, type: "heal" },  
    enemyMove: { name: "喷射火焰", damage: [15, 25] }  
};  
  
// 处理玩家点击  
async function handleAction(actionType) {  
    if (gameState.isProcessing) return;  
    gameState.isProcessing = true;  
  
    const move = moves[actionType];  
    const msgBox = document.getElementById('msg-box');  
  
    if (move.type === "attack") {  
        // 玩家攻击逻辑  
        const damage = getRandomInt(move.damage[0], move.damage[1]);  
        gameState.enemy.hp -= damage;  
        msgBox.innerText = `${gameState.player.name} 使用了 ${move.name}！`;  
          
        playSound('snd-hit');  
        animate('enemy-container', 'animate-shake');  
          
    } else if (move.type === "heal") {  
        // 治疗逻辑  
        gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + move.amount);  
        msgBox.innerText = `${gameState.player.name} 使用了药水，回复了体力！`;  
    }  
  
    updateUI();  
  
    // 检查敌方是否死亡  
    if (gameState.enemy.hp <= 0) {  
        msgBox.innerText = "喷火龙倒下了！你是冠军！";  
        return;  
    }  
  
    // 延迟后轮到敌人  
    await sleep(1500);  
    enemyTurn();  
}  
  
// 敌方回合  
async function enemyTurn() {  
    const msgBox = document.getElementById('msg-box');  
    const move = moves.enemyMove;  
    const damage = getRandomInt(move.damage[0], move.damage[1]);  
  
    gameState.player.hp -= damage;  
    msgBox.innerText = `敌方喷火龙发动了 ${move.name}！`;  
      
    playSound('snd-hit');  
    animate('player-container', 'animate-shake');  
      
    updateUI();  
  
    if (gameState.player.hp <= 0) {  
        msgBox.innerText = "皮卡丘失去了战斗能力... 游戏结束。";  
    } else {  
        await sleep(1000);  
        msgBox.innerText = "该你行动了！";  
        gameState.isProcessing = false;  
    }  
}  
  
// 辅助工具函数  
function getRandomInt(min, max) {  
    return Math.floor(Math.random() * (max - min + 1)) + min;  
}  
  
function updateUI() {  
    const pPercent = (gameState.player.hp / gameState.player.maxHp) * 100;  
    const ePercent = (gameState.enemy.hp / gameState.enemy.maxHp) * 100;  
  
    document.getElementById('player-hp-fill').style.width = Math.max(0, pPercent) + "%";  
    document.getElementById('enemy-hp-fill').style.width = Math.max(0, ePercent) + "%";  
  
    document.getElementById('player-hp-text').innerText = `${Math.max(0, gameState.player.hp)}/${gameState.player.maxHp}`;  
    document.getElementById('enemy-hp-text').innerText = `${Math.max(0, gameState.enemy.hp)}/${gameState.enemy.maxHp}`;  
}  
  
function animate(id, className) {  
    const el = document.getElementById(id);  
    el.classList.add(className);  
    setTimeout(() => el.classList.remove(className), 500);  
}  
  
function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
}  
  
function playSound(id) {  
    const snd = document.getElementById(id);  
    snd.currentTime = 0;  
    snd.play().catch(e => console.log("等待交互以播放音效"));  
}  
