window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "appendix",
  num: "A",
  title: "作业与 OJ 实战",
  subtitle: "判题 · 调试 · 规范 · 典型错解",
  pdf: "",
  intro: "这一部分不是新的知识章节，而是把课程作业安排、OpenJudge 使用、调试方法和前三章习题讲解中的典型错解集中起来。算法会做但拿不到分，往往不是思路问题，而是边界、格式、溢出、初始化或复杂度估算出了问题。考前把这里的清单过一遍，能避免大量“非算法失分”。",
  links: [
    { label: "作业安排 PPT", href: "assets/slide/课程作业安排及编程注意事项.pptx" },
    { label: "前三章习题讲解", href: "assets/hw/前三章作业习题讲解.pdf" }
  ],
  knowledge: [
    {
      id: "kA-01",
      title: "考核构成与作业安排",
      tags: ["成绩", "作业", "考试"],
      body: `<p>课程总评由<strong>平时成绩</strong>和<strong>考试成绩</strong>两部分构成。课件列出的平时环节包括：书面作业与考勤、课堂测验、MOOC 练习、OpenJudge 编程；考试环节包括期中、期末和 POJ 上机考试。</p>
<ul>
<li>书面作业：在教学网提交；</li>
<li>MOOC：在课程网站完成基本概念、算法填空和小测；</li>
<li>编程作业：在 OpenJudge 提交，通常每章一次；</li>
<li>期末考试包含上机部分，也在 OpenJudge 完成；</li>
<li>教学团队可能根据实际教学情况微调比例，具体以最终通知为准。</li>
</ul>`,
      tip: "平时分不是“交了就满分”：书面作业看正确性，课堂测验和 MOOC 有客观分，POJ 只有 AC 才得分。"
    },
    {
      id: "kA-02",
      title: "提交渠道、DDL 与学术规范",
      tags: ["提交", "DDL", "抄袭"],
      body: `<ul>
<li>不同作业走不同渠道：书面作业→教学网，MOOC→课程网站，编程→OpenJudge；不要交错地方。</li>
<li>提交不得超过规定 DDL，<strong>逾期作业不计入成绩</strong>。</li>
<li>教学网提交后要确认“提交成功”，避免只保存草稿。</li>
<li>禁止抄袭；发现后按 0 分处理。</li>
<li>同学间讨论思路是鼓励的，但必须自己独立完成代码和书面解答；直接复制他人代码/答案属于抄袭。</li>
</ul>`,
      tip: "DDL 前至少留出半天做“提交—刷新—确认”的缓冲；OpenJudge 在截止前可能拥堵。"
    },
    {
      id: "kA-03",
      title: "OpenJudge 判题结果速查",
      tags: ["OJ", "AC", "WA", "TLE"],
      body: `<table>
<tr><th>结果</th><th>含义</th><th>是否得分</th></tr>
<tr><td>Accepted (AC)</td><td>通过所有测试样例</td><td><strong>只有 AC 得分</strong></td></tr>
<tr><td>Wrong Answer (WA)</td><td>某组样例输出错误</td><td>否</td></tr>
<tr><td>Time Limit Exceeded (TLE)</td><td>超出运行时间</td><td>否</td></tr>
<tr><td>Runtime Error (RE)</td><td>运行错误（越界、非法运算、爆栈等）</td><td>否</td></tr>
<tr><td>Presentation Error (PE)</td><td>答案基本正确，格式不对</td><td>否（部分 OJ 可能折算）</td></tr>
<tr><td>Compile Error (CE)</td><td>编译错误</td><td>否</td></tr>
<tr><td>Memory Limit Exceeded (MLE)</td><td>内存超限</td><td>否</td></tr>
<tr><td>Output Limit Exceeded (OLE)</td><td>输出超限</td><td>否</td></tr>
<tr><td>System Error (SE)</td><td>OJ 自身故障</td><td>通常不计，等恢复</td></tr>
</table>
<p>OpenJudge <strong>不返回测试样例</strong>，助教也查不到具体哪组错了，所以不要问“我 WA 是哪个样例错了”，要靠自己构造边界数据排查。</p>`,
      tip: "看到 PE 说明算法已经对了，只需改空格/换行；看到 WA 才需要怀疑算法和数据。"
    },
    {
      id: "kA-04",
      title: "WA 常见原因清单",
      tags: ["WA", "边界", "溢出"],
      body: `<ul>
<li><strong>算法实现有误</strong>：思路对但循环/条件写错；</li>
<li><strong>变量、数组未初始化</strong>：全局变量默认 0，局部变量是随机值；</li>
<li><strong>边界没考虑</strong>：n=1、空输入、k&gt;n、全是相同元素、没有解；</li>
<li><strong>输出格式</strong>：行末多/少空格，最后一行多/少换行；</li>
<li><strong>字符混淆</strong>：数字 1、字母 I、字母 l、竖线 |；数字 0 与字母 O；</li>
<li><strong>拼写错误</strong>：输出字符串与题目要求不完全一致；</li>
<li><strong>溢出</strong>：int 不够时改 <code>long long</code>；浮点用 <code>double</code>，输入输出用 <code>%lf</code>（cin/cout 不用）；</li>
<li><strong>数组越界</strong>：越界不一定崩，可能悄悄改掉别的变量，表现为 WA；</li>
<li><strong>取模/负数</strong>：C++ 中负数取模仍为负，必要时先加模数。</li>
</ul>`,
      tip: "WA 排查顺序：先读题对格式，再构造 n=1/最小/最大/全相同/无解，最后才怀疑算法。"
    },
    {
      id: "kA-05",
      title: "TLE 常见原因与优化",
      tags: ["TLE", "复杂度", "IO"],
      body: `<ul>
<li><strong>算法复杂度太高</strong>：把 O(n²) 的暴力换成课程中学过的 O(n log n) 或 O(n) 算法；</li>
<li><strong>重复计算</strong>：保存中间结果（前缀和、记忆化、预处理）；</li>
<li><strong>输入输出太慢</strong>：大量数据时用 <code>scanf/printf</code>，或关闭同步：<code>ios::sync_with_stdio(false); cin.tie(0); cout.tie(0);</code>；</li>
<li><strong>死循环</strong>：检查循环变量是否更新、边界是否可达；</li>
<li><strong>STL 使用不当</strong>：频繁在 vector 头部插入/删除、频繁拷贝大对象；</li>
<li><strong>递归/函数调用开销</strong>：必要时改成迭代。</li>
</ul>`,
      tip: "先估算：n=10⁶ 时 O(n log n) 可过，O(n²) 必超；n=10⁵ 时 O(n√n) 也要谨慎。"
    },
    {
      id: "kA-06",
      title: "RE、PE、CE 与其他错误",
      tags: ["RE", "PE", "CE", "MLE"],
      body: `<ul>
<li><strong>RE</strong>：<code>main()</code> 中数组过大导致栈溢出（大数组放全局）；分母为 0、模 0、根号负数、log 非正数、0 的非正数幂；数组越界；指针指向非法区域；递归层数过深。</li>
<li><strong>PE</strong>：答案正确但格式错误——多了/少了换行或空格。多一个空格也可能被判 WA。</li>
<li><strong>CE</strong>：本地能编译而 OJ 不能，常见原因是编译器版本不同、缺少 <code>#include</code>、使用了 OJ 不支持的扩展。</li>
<li><strong>MLE</strong>：开了过大的数组/链表；注意题目内存限制。</li>
<li><strong>OLE</strong>：输出量异常大，通常是死循环里不断输出。</li>
</ul>`,
      tip: "大数组（如 10⁶ 个 int）定义在全局或静态区，不要放在 main 的栈上；递归深度大时改用显式栈。"
    },
    {
      id: "kA-07",
      title: "四种调试方法",
      tags: ["调试", "方法"],
      body: `<ol>
<li><strong>读题/读代码法</strong>：先逐字读题，确认空格、换行、特殊情况的输出；再按“字符串拼写→数组越界→循环边界→变量覆盖→算法正确性”的顺序读代码。</li>
<li><strong>小黄鸭调试法</strong>：把代码逻辑一步步讲给“不懂的鸭子”听；讲不清的地方往往就是 bug。</li>
<li><strong>输出调试法</strong>：在关键位置打印中间变量；用二分定位法缩小出错区间；用 <code>#ifndef ONLINE_JUDGE</code> 包住调试输出，提交时无需删除；用 <code>freopen("in.txt","r",stdin)</code> 从文件读入，避免反复粘贴。</li>
<li><strong>场外求助法</strong>：和同学讨论思路（不是抄袭）；考试时不要死磕一题，先拿能拿的分。</li>
</ol>`,
      tip: "最推荐输出调试法：先打印输入，再打印每轮关键状态，最后用二分法定位“从哪一步开始不对”。"
    },
    {
      id: "kA-08",
      title: "输出调试模板",
      tags: ["调试", "模板", "ONLINE_JUDGE"],
      body: `<pre><code>#ifndef ONLINE_JUDGE
    freopen("in.txt", "r", stdin);
    // freopen("out.txt", "w", stdout);
#endif

// 需要打印中间值时：
#ifdef LOCAL_DEBUG
    cerr &lt;&lt; "i=" &lt;&lt; i &lt;&lt; " sum=" &lt;&lt; sum &lt;&lt; endl;
#endif</code></pre>
<p>提交到 OJ 时，<code>ONLINE_JUDGE</code> 通常会被定义，因此 <code>#ifndef ONLINE_JUDGE</code> 包住的代码不会执行；本地则可以从 <code>in.txt</code> 读入。也可以用 <code>cerr</code> 输出调试信息，它不会进入标准输出。</p>`,
      tip: "不要把调试输出留在标准输出里；提交前搜索一遍 <code>cout</code>/<code>printf</code>，确认没有多余的调试行。"
    },
    {
      id: "kA-09",
      title: "代码规范：清晰优先",
      tags: ["代码规范", "可读性"],
      body: `<ul>
<li>变量名有意义；关键步骤加简短注释；</li>
<li>缩进一致，括号风格统一；</li>
<li>把“读入、初始化、核心算法、输出”分成清晰的段落；</li>
<li>避免过度封装：课程作业以清晰、正确为主，不必模仿大型工程；</li>
<li>在可读性和效率之间平衡：先写对，再优化；</li>
<li>多用小函数拆分复杂逻辑，但不要为三行代码写一个函数。</li>
</ul>
<p>课件强调：本课程编程场景与现实软件开发有差距，不必拘泥于大厂规范，但要保持“清晰易读”。</p>`,
      tip: "代码乱会浪费大量调试时间；先花五分钟整理结构，往往比盲目打印更有效。"
    },
    {
      id: "kA-10",
      title: "AI 使用边界",
      tags: ["AI", "学术规范"],
      body: `<p>课程鼓励用 AI 辅助<strong>理解</strong>，但禁止直接用 AI 完成作业。</p>
<ul>
<li>可以：让 AI 解释概念、检查代码错误、提供不同思路、帮助理解报错；</li>
<li>不可以：直接复制 AI 生成的作业代码/答案；</li>
<li>使用 AI 后，必须确保自己看懂，并能独立写出正确程序；</li>
<li>考试中不能使用 AI；平时作业的代码要能自己讲清楚。</li>
</ul>
<p>课程的目标是培养“抽象问题、应用算法、完成高质量程序”的能力，AI 应辅助理解而不是代替理解。</p>`,
      tip: "一个简单的自检：关掉 AI，能否从空白文件开始把这道题独立写出来？不能就说明还没掌握。"
    },
    {
      id: "kA-11",
      title: "前三章典型错解：链表三题",
      tags: ["错解", "链表", "边界"],
      body: `<p><strong>1. 原地逆置：漏掉尾结点。</strong>错解在循环中用 <code>v != NULL</code> 判断是否继续，但实际处理的是 <code>u</code>；当 <code>u</code> 到达尾结点时 <code>v == NULL</code>，尾结点没有被接入。正确做法是用 <code>u != NULL</code> 控制循环，每轮先保存 <code>v = u-&gt;next</code>，再改 <code>u-&gt;next</code>。</p>
<p><strong>2. 找中间结点：循环条件漏尾结点。</strong>错解用 <code>while (cur-&gt;next != NULL)</code> 把结点存入数组，长度 1 时一个都没存，长度 2 时只存了第一个，后面却读 <code>nodes[(len+1)/2]</code>，越界/错位。快慢指针的正确循环条件是 <code>fast != NULL &amp;&amp; fast-&gt;next != NULL</code>，循环结束 slow 恰好指向偶数个结点的后中间。</p>
<p><strong>3. 链表相交：先走后判、换头时机错。</strong>错解先执行 <code>p=p-&gt;next; q=q-&gt;next;</code> 再判空换头，可能跳过第一个交点；两条等长且不相交的链表还会无限循环。正确写法是在循环入口判 <code>p != q</code>，走到 NULL 后切换到另一条链表，最终要么在交点相遇，要么同时为 NULL。</p>`,
      tip: "链表题的三个高频边界：空表、只有一个结点、两条链表等长/不相交。写完先用手工小例子走一遍。"
    },
    {
      id: "kA-12",
      title: "前三章典型错解：归纳法与取整",
      tags: ["错解", "归纳法", "复杂度", "取整"],
      body: `<p><strong>1. 归纳法基础情况不成立。</strong>证明 <code>T(n)=2T(⌊n/2⌋)+n=O(n log n)</code> 时，若假设对所有 <code>1≤k&lt;n</code> 有 <code>T(k)≤Ck log k</code>，则 <code>k=1</code> 时 <code>1 log 1=0</code>，而 <code>T(1)=1</code>，基础情况不成立。应单独验证 n=2、3 等小规模，再从 n≥4 开始归纳。</p>
<p><strong>2. 只对 2 的幂展开。</strong>把 <code>T(n)=2T(n/2)+n</code> 直接展开成 <code>nT(1)+n log n</code>，只适用于 n 是 2 的幂；一般整数有取整，必须用放缩或换元处理。</p>
<p><strong>3. 两个同阶项相减直接消掉。</strong>计算 <code>n log n − log(n!)</code> 时，不能把 <code>log(n!)</code> 粗略当成 <code>Θ(n log n)</code> 后说“相减为 0 或 Θ(n log n)”；要保留低阶项：<code>log(n!) = n log n − (log e)n + O(log n)</code>，所以差为 <code>Θ(n)</code>。</p>
<p><strong>4. 取整放缩方向错。</strong>证上界时要把 <code>⌊n/2⌋</code> 放大到 <code>n/2</code>；证下界时要用 <code>⌊n/2⌋ ≥ n/2 − 1</code> 等不等式，方向反了会得到错误结论。</p>`,
      tip: "复杂度证明的三件套：基础情况单独验、取整放缩看方向、同阶相减保留低阶项。"
    },
    {
      id: "kA-13",
      title: "考试策略与时间分配",
      tags: ["考试", "策略", "上机"],
      body: `<ul>
<li>上机考试按<strong>通过样例比例</strong>给分，不要在一道题上死磕；先拿能拿的分，再回头攻坚。</li>
<li>开考先浏览所有题目，参考“状态”里通过人数判断难度；通过人数多的题通常较简单。</li>
<li>先写暴力/部分分版本，确保有分，再优化到满分。</li>
<li>每题提交前检查：数组大小、初始化、边界、输出格式、溢出。</li>
<li>预留时间做最终检查：文件名、输入输出格式、多组数据是否清空。</li>
<li>遇到 OJ 故障（SE）不要慌，助教会视情况调整开放时间。</li>
</ul>`,
      tip: "考试时“会做但没拿分”通常输在格式和边界；把提交前检查清单固定成肌肉记忆。"
    }
  ],
  questions: [],
  cheats: [
    {
      title: "OJ 错误速查",
      html: `<table>
<tr><th>结果</th><th>首要怀疑</th><th>快速处理</th></tr>
<tr><td>WA</td><td>算法、边界、格式、溢出、越界</td><td>读题→构造 n=1/最小/最大/无解→打印中间量</td></tr>
<tr><td>TLE</td><td>复杂度、重复计算、IO、死循环</td><td>换算法/记忆化/快读/检查循环变量</td></tr>
<tr><td>RE</td><td>大数组在栈上、越界、非法运算、爆栈</td><td>大数组放全局；检查下标/分母/递归深度</td></tr>
<tr><td>PE</td><td>空格/换行</td><td>逐字对照输出格式</td></tr>
<tr><td>CE</td><td>缺 include、编译器差异</td><td>本地用 G++ 同标准编译</td></tr>
<tr><td>MLE</td><td>数组/容器过大</td><td>改滚动数组/缩短生命周期</td></tr>
</table>
<ul>
<li>只有 AC 得分；PE 说明算法已对。</li>
<li>OJ 不返回样例，助教也查不到；必须自己构造数据。</li>
<li>char 混淆：1/I/l/|、0/O。</li>
<li>int 溢出改 long long；double 输入用 %lf。</li>
</ul>`
    },
    {
      title: "提交前检查清单",
      html: `<ol>
<li>读题：输出几行？空格/换行？有没有特殊情况的固定输出？</li>
<li>数据范围：数组开够了吗？n=1、n=0、k&gt;n 会怎样？</li>
<li>初始化：局部变量、多组数据的清空、visited/indegree 重置。</li>
<li>边界：循环从 0 还是 1？<code>&lt;=</code> 还是 <code>&lt;</code>？</li>
<li>溢出：累加/乘积用 long long？</li>
<li>调试输出：有没有多余的 cout/printf？</li>
<li>提交：选 G++，不要出现 system；提交后刷新确认状态。</li>
<li>DDL：不要卡最后一分钟。</li>
</ol>`
    },
    {
      title: "全课程复杂度与公式总表",
      html: `<table>
<tr><th>内容</th><th>关键公式 / 复杂度</th></tr>
<tr><td>顺序表</td><td>随机访问 O(1)；插入/删除平均移动 n/2、(n−1)/2，O(n)</td></tr>
<tr><td>单链表</td><td>查找 O(n)；已知前驱插入/删除 O(1)</td></tr>
<tr><td>栈 / 队列</td><td>push/pop/enqueue/dequeue 均 O(1)</td></tr>
<tr><td>KMP</td><td>求 next O(m)，匹配 O(n+m)</td></tr>
<tr><td>BST</td><td>平均 O(log n)，最坏 O(n)</td></tr>
<tr><td>堆</td><td>建堆 O(n)；插入/删除 O(log n)</td></tr>
<tr><td>Huffman</td><td>O(n log n)；WPL 最小</td></tr>
<tr><td>二叉树遍历</td><td>O(n)，递归栈 O(h)</td></tr>
<tr><td>并查集</td><td>按规模合并 + 路径压缩：O(α(n))≈O(1)</td></tr>
<tr><td>DFS / BFS</td><td>邻接表 O(V+E)，邻接矩阵 O(V²)</td></tr>
<tr><td>拓扑排序</td><td>邻接表 O(V+E)，邻接矩阵 O(V³)</td></tr>
<tr><td>Dijkstra</td><td>数组 O(V²)，堆 O((V+E)logE)</td></tr>
<tr><td>Floyd</td><td>O(V³)，空间 O(V²)</td></tr>
<tr><td>Prim</td><td>O(V²)，堆 O(E logV)</td></tr>
<tr><td>Kruskal</td><td>O(E logE)</td></tr>
<tr><td>AOE 关键路径</td><td>O(V+E)</td></tr>
</table>
<ul>
<li>完全二叉树：n₀=n₂+1；深度 ⌊log₂n⌋；下标 2i+1/2i+2/(i−1)/2。</li>
<li>K 叉树空指针 n(K−1)+1；完全 K 叉树高度 H 的结点范围用等比数列。</li>
<li>图：无向完全图 n(n−1)/2；有向完全图 n(n−1)；Σd=2e。</li>
<li>哈希/排序等若课件未展开，以教材章节为准。</li>
</ul>`
    }
  ]
});
