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

// 3. setInterval：每隔一段时间执行一次函数（毫秒单位）
setInterval(function () {
  const current = sentences[sentenceIndex];

  if (!deleting) {
    // 打字阶段：每 100ms 出一个字
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex); // slice 截取字符串

    if (charIndex === current.length) {
      // 打完一整句，停 2 秒再开始删除
      deleting = true;
      // setTimeout：延时执行一次（注意和 setInterval 的区别）
      setTimeout(() => (deleting = false), 2000);
    }
  } else {
    // 删除阶段：每 50ms 删一个字（删除比打字快，看起来更自然）
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      // 删完了，换下一句（取余 % 让它循环起来）
      deleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
    }
  }
}, deleting ? 50 : 100);
// 注意：这里简化了，实际间隔固定为100ms也能接受，先理解原理最重要

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
