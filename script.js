// ===== 打字机效果 =====
// JS 注释用 // 或 /* */，和 CSS 不一样哦

// 1. 选中页面元素：document.querySelector 通过 CSS 选择器找元素
const typingEl = document.querySelector("#typing");

// 2. 准备要循环显示的句子
const sentences = [
  "我正在学 自学ai",
  "目标：做自己想用的软件！",
  "Patience is ...key in life",
];

let sentenceIndex = 0; // 当前第几句
let charIndex = 0;     // 当前打到第几个字
let deleting = false;  // 是否正在删除

// ===== v3.0 升级：用 setTimeout 递归代替 setInterval =====
// 好处：每一轮都能动态调整速度（打字慢、删除快、句尾停顿），这才是正经写法
const TYPE_SPEED = 200;   // 打字速度：每 200ms 出一个字（之前 100ms 太快了）
const DELETE_SPEED = 45;  // 删除速度
const PAUSE_TIME = 2400;  // 一句话打完后的停顿

function typeLoop() {
  const current = sentences[sentenceIndex];
  let delay;

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    delay = TYPE_SPEED; // 打字：慢慢来

    if (charIndex === current.length) {
      deleting = true;
      delay = PAUSE_TIME; // 打完整句：停 2.4 秒欣赏一下
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    delay = DELETE_SPEED; // 删除：快进

    if (charIndex === 0) {
      deleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      delay = 500; // 换句前稍微缓一下
    }
  }
  setTimeout(typeLoop, delay); // 递归调用自己，实现无限循环
}
typeLoop(); // 启动！

// ===== 打招呼交互 =====
// 4. 选中按钮和输出区域
const greetBtn = document.querySelector("#greetBtn");
const nameInput = document.querySelector("#nameInput");
const greetOutput = document.querySelector("#greetOutput");

// 5. addEventListener：给按钮绑定"点击"事件
//    用户每次点击，都会执行这个函数 —— 这就是"事件驱动"
greetBtn.addEventListener("click", function () {
  const name = nameInput.value.trim(); // .trim() 去掉首尾空格

  if (name === "") {
    // 输入为空的提醒
    greetOutput.textContent = "⚠️ 名字都不填，敷衍谁呢？";
  } else {
    // 模板字符串：用反引号 ` 包裹，${} 里可以放变量
    const hour = new Date().getHours(); // 获取当前小时（0-23）
    let timeGreeting;

    if (hour < 6) {
      timeGreeting = "熬夜冠军是你了";
    } else if (hour < 12) {
      timeGreeting = "早上好";
    } else if (hour < 18) {
      timeGreeting = "下午好";
    } else {
      timeGreeting = "晚上好";
    }

    greetOutput.textContent = `${timeGreeting}，${name}！欢迎来看 Jerry 的主页 🎉`;
  }
});

// ===== 本课小结 =====
// 你刚学到的 JS 核心概念：
// 1. querySelector  —— 获取页面元素
// 2. setInterval / setTimeout —— 定时器
// 3. 变量、数组、字符串操作
// 4. addEventListener —— 事件监听（前端交互的灵魂）
// 5. 模板字符串 `${变量}` —— 拼接文字的神器
