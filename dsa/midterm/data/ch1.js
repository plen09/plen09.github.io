window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch1",
  num: "01",
  title: "概论",
  subtitle: "数据结构 · 抽象数据类型 · 算法分析",
  pdf: "assets/slide/第1章概论.pdf",
  intro: "本章建立整门课的语言：什么是数据结构、逻辑结构与存储结构如何区分、抽象数据类型（ADT）怎样描述运算，以及如何用 O、Ω、Θ 度量算法代价。作业与考试中的推导题几乎都落在这里。",
  links: [
    { label: "第一章作业", href: "assets/hw/第一章作业.pdf" },
    { label: "前三章习题讲解", href: "assets/hw/前三章作业习题讲解.pdf" }
  ],
  knowledge: [
    {
      id: "k1-01",
      title: "数据结构三要素：逻辑结构、存储结构、运算",
      tags: ["基本概念", "三要素"],
      body: `<p><strong>逻辑结构</strong>描述数据元素之间的相互关系（如线性、树、图），与计算机无关；<strong>存储结构</strong>是逻辑结构到内存的映射，既包括元素本身如何存，也包括关系如何表示；<strong>数据的运算</strong>定义在逻辑结构上，但具体实现依赖存储结构。</p>
<p>同一个逻辑结构可以有多种存储实现（顺序、链接、索引、散列），不同实现决定同一运算的时间/空间代价。例如“取第 i 个元素”，顺序表 O(1)，单链表 O(i)。</p>`,
      tip: "判断“逻辑结构”还是“存储结构”时，看它是否涉及内存地址、指针、数组下标；涉及就是存储结构。"
    },
    {
      id: "k1-02",
      title: "四类逻辑结构：集合、线性、树、图",
      tags: ["逻辑结构"],
      body: `<ul>
<li><strong>集合结构</strong>：元素之间除“同属一个集合”外没有关系，R 为空。</li>
<li><strong>线性结构</strong>：每个元素最多一个前驱、一个后继（一对一）。线性表、栈、队列都属于此类。</li>
<li><strong>树形结构</strong>：每个结点最多一个前驱，但可有多个后继（一对多），最高层结点是根。</li>
<li><strong>图结构</strong>：前驱、后继个数都不限制（多对多）。</li>
</ul>
<p>区分口诀：<strong>线性 vs 树</strong>看“是否唯一后继”；<strong>树 vs 图</strong>看“是否唯一前驱”。</p>`,
      tip: "“二叉树是线性结构”是错的：它属于树形结构，只是可以线性化（遍历）成一个序列。"
    },
    {
      id: "k1-03",
      title: "四种存储方法：顺序、链接、索引、散列",
      tags: ["存储结构", "存储密度"],
      body: `<ul>
<li><strong>顺序</strong>：结点存放在地址相邻的单元中，用存储位置的先后表示逻辑后继；支持按下标随机访问。</li>
<li><strong>链接</strong>：结点内附加指针域，用指针指向表示后继关系；结点不必物理相邻。</li>
<li><strong>索引</strong>：建立索引表，用索引函数把索引值映射到存储地址。</li>
<li><strong>散列</strong>：索引方法的扩展，用散列函数 h(s)=z 直接把关键码映射为地址。</li>
</ul>
<p><strong>存储密度</strong> = 数据本身占用的存储 / 整个结构占用的存储 ≤ 1。单链表若数据域占 E、指针域占 P，则存储密度为 E/(P+E)。</p>`,
      tip: "存储密度只衡量“空间利用率”，不衡量时间效率；链表密度低但插入删除灵活。"
    },
    {
      id: "k1-04",
      title: "抽象数据类型 ADT：数据对象 + 关系 + 操作",
      tags: ["ADT"],
      body: `<p>ADT 是定义了一组运算的数学模型，<strong>与物理存储结构无关</strong>，强调“做什么”而不是“怎么做”。三元组表示为：</p>
<span class="formula">&lt;数据对象 D, 数据关系 S, 数据操作 P&gt;</span>
<p>ADT 的价值：隐藏实现细节、支持模块化与复用。C++ 中通常用抽象类/纯虚函数定义接口，再用不同存储结构派生实现（如 Graph 与 Graphm、Graphl）。</p>`,
      tip: "ADT 的运算定义在逻辑结构上；同一 ADT 可以有顺序、链式等多种实现。"
    },
    {
      id: "k1-05",
      title: "算法与程序；算法的四个特性",
      tags: ["算法", "基本概念"],
      body: `<p><strong>问题</strong>是从输入到输出的映射；<strong>算法</strong>是对求解过程的描述，是指令的有限序列；<strong>程序</strong>是算法在某种程序设计语言中的实现。</p>
<p>课程给出的算法特性：</p>
<ul>
<li><strong>通用性</strong>：对参数化输入求解，结果正确；</li>
<li><strong>有效性</strong>：由有限条具体指令组成，每条都可执行；</li>
<li><strong>确定性</strong>：下一步做什么必须明确、无歧义；</li>
<li><strong>有穷性</strong>：必须在有限步内结束，不能死循环。</li>
</ul>`,
      tip: "“程序 = 数据结构 + 算法”强调的是：选对数据组织方式与求解步骤，二者共同决定程序质量。"
    },
    {
      id: "k1-06",
      title: "时间代价与空间代价的定义",
      tags: ["复杂度", "定义"],
      body: `<p><strong>时间代价</strong>：问题规模由 1 增至 n 时，算法耗费的时间由 F(1) 增至 F(n)，称时间复杂性为 F(n)。时间单位通常取“执行一条简单语句（赋值、判断等）”的耗时。</p>
<p><strong>空间代价</strong>：问题规模由 1 增至 n 时，算法所需空间由 G(1) 增至 G(n)，称空间复杂性为 G(n)。空间单位通常取“一个简单变量”所占空间。</p>
<p>复杂度关注的是 <strong>n 增大时的增长趋势</strong>，不是某台机器上的绝对秒数。</p>`,
      tip: "输入本身占用的空间通常不计入算法的辅助空间；题目说“额外空间 O(1)”时只算辅助变量。"
    },
    {
      id: "k1-07",
      title: "大 O：增长率的上界",
      tags: ["渐进记号", "O"],
      body: `<p>若存在正常数 c 和 n<sub>0</sub>，使得对所有 n ≥ n<sub>0</sub> 都有</p>
<span class="formula">0 ≤ f(n) ≤ c·g(n)</span>
<p>则称 f(n) = O(g(n))。O 给出<strong>上界</strong>，而且上界不唯一；书写时应给出<strong>最紧</strong>的上界。例如 f(n)=3n³，可以写 O(n³)，也可写 O(n⁴)，但 O(n³) 更准确。</p>`,
      tip: "O 只要求“存在”c 和 n₀，不要求对所有 n 成立；证明时给出具体 c、n₀ 即可。"
    },
    {
      id: "k1-08",
      title: "大 Ω：增长率的下界",
      tags: ["渐进记号", "Ω"],
      body: `<p>若存在正常数 c 和 n<sub>0</sub>，使得对所有 n ≥ n<sub>0</sub> 都有</p>
<span class="formula">0 ≤ c·g(n) ≤ f(n)</span>
<p>则称 f(n) = Ω(g(n))。Ω 给出<strong>下界</strong>，同样应取最紧（最大）的下界。</p>
<p>O 与 Ω 的唯一区别是不等号方向。例如 2026<sup>n</sup> 与 2025<sup>n</sup> 的比值 (2026/2025)<sup>n</sup> → ∞，所以 2026<sup>n</sup> = Ω(2025<sup>n</sup>)，但不能写成 O(2025<sup>n</sup>)。</p>`,
      tip: "a<sup>n</sup> 与 b<sup>n</sup>：a ≤ b 时 a<sup>n</sup>=O(b<sup>n</sup>)，a ≥ b 时 a<sup>n</sup>=Ω(b<sup>n</sup>)，a=b 时才是 Θ。"
    },
    {
      id: "k1-09",
      title: "大 Θ：上、下界同阶",
      tags: ["渐进记号", "Θ"],
      body: `<p>若存在正常数 c<sub>1</sub>、c<sub>2</sub> 和 n<sub>0</sub>，使得对所有 n ≥ n<sub>0</sub> 都有</p>
<span class="formula">0 ≤ c<sub>1</sub>·g(n) ≤ f(n) ≤ c<sub>2</sub>·g(n)</span>
<p>则称 f(n) = Θ(g(n))。等价地：<strong>f(n)=Θ(g(n)) 当且仅当 f(n)=O(g(n)) 且 f(n)=Ω(g(n))</strong>。</p>
<p>Θ 是最精确的描述，说明两个函数增长率同阶。作业第 1.3 填空考的正是这条等价关系。</p>`,
      tip: "只证出 O 或只证出 Ω 都不能下 Θ 的结论；必须两侧都给出。"
    },
    {
      id: "k1-10",
      title: "加法规则与乘法规则",
      tags: ["复杂度", "计算规则"],
      body: `<p><strong>加法规则</strong>（顺序、if、switch 结构）：</p>
<span class="formula">f<sub>1</sub>(n) + f<sub>2</sub>(n) = O(max(f<sub>1</sub>(n), f<sub>2</sub>(n)))</span>
<p><strong>乘法规则</strong>（for、while、do-while 嵌套）：</p>
<span class="formula">f<sub>1</sub>(n) · f<sub>2</sub>(n) = O(f<sub>1</sub>(n) · f<sub>2</sub>(n))</span>
<p>例如两重循环 <code>for(i=0;i&lt;n;i++) for(j=i;j&lt;n;j++)</code>，内层次数 n-i，总计 Σ(n-i)=n(n+1)/2 = O(n²)。</p>`,
      tip: "加法规则取 max，不是相加；乘法规则用于嵌套，不是并列。"
    },
    {
      id: "k1-11",
      title: "常见增长阶与大小顺序",
      tags: ["复杂度", "增长阶"],
      body: `<p>从小到大：</p>
<span class="formula">O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2<sup>n</sup>) &lt; O(n!)</span>
<p>要点：</p>
<ul>
<li>对数底不影响量级：log<sub>2</sub>n、ln n、lg n 只差常数倍。</li>
<li>多项式与指数之间差距极大；n 很大时 2<sup>n</sup> 远大于任何 n<sup>k</sup>。</li>
<li>n log n 常出现在分治/排序；n² 常出现在两重循环；log n 常出现在折半。</li>
</ul>`,
      tip: "比较阶时取 n→∞ 的极限比值；不要用 n 很小时的数值大小下结论。"
    },
    {
      id: "k1-12",
      title: "最坏、最好、平均情况",
      tags: ["复杂度", "平均分析"],
      body: `<p>同一算法在不同输入上代价不同：</p>
<ul>
<li><strong>最好情况</strong>：最有利输入的代价（下界）；</li>
<li><strong>最坏情况</strong>：最不利输入的代价（上界），考试通常默认分析最坏情况；</li>
<li><strong>平均情况</strong>：按输入概率分布求期望代价。</li>
</ul>
<p>顺序查找：最好 1 次；最坏 n 次；若每个位置等概率，平均比较次数为</p>
<span class="formula">(1+2+…+n)/n = (n+1)/2 = Θ(n)</span>
<p>若概率不等，平均值会改变，但仍是线性阶。</p>`,
      tip: "“平均”必须说明概率分布；不说明分布时，等概率是默认假设。"
    },
    {
      id: "k1-13",
      title: "二分查找：前提、过程与复杂度",
      tags: ["查找", "二分"],
      body: `<p>前提：线性表<strong>顺序存储且已按关键码有序</strong>。每次取中点 mid，与 k 比较后舍弃一半区间。</p>
<pre><code>low = 1; high = n;
while (low &lt;= high) {
    mid = (low + high) / 2;
    if (k &lt; a[mid]) high = mid - 1;
    else if (k &gt; a[mid]) low = mid + 1;
    else return mid;
}
return 0;   // 查找失败</code></pre>
<p>时间 O(log n)，最大检索长度约为 ⌊log<sub>2</sub>(n+1)⌋，失败时约 ⌈log<sub>2</sub>(n+1)⌉。二分只适用于支持随机访问的顺序表，链表做不到 O(1) 取中点。</p>`,
      tip: "二分的前提“有序 + 顺序存储”缺一不可；在链表上二分，取中点本身就要 O(n)。"
    },
    {
      id: "k1-14",
      title: "递归式求解的常用套路",
      tags: ["递推式", "复杂度"],
      body: `<p>作业第 3 题的四种典型形态：</p>
<table>
<tr><th>递推式</th><th>展开/直觉</th><th>结果</th></tr>
<tr><td>T(n)=T(n−1)+Θ(n)</td><td>Σk = n(n+1)/2</td><td>Θ(n²)</td></tr>
<tr><td>T(n)=T(n−1)+Θ(log n)</td><td>Σlog k = log(n!)</td><td>Θ(n log n)</td></tr>
<tr><td>T(n)=T(n/2)+Θ(1)</td><td>每次规模减半，共 log n 层</td><td>Θ(log n)</td></tr>
<tr><td>T(n)=2T(n/2)+Θ(n)</td><td>每层总代价 n，共 log n 层</td><td>Θ(n log n)</td></tr>
<tr><td>T(n)=2T(n−1)+Θ(1)</td><td>展开得 2<sup>n</sup> 项</td><td>Θ(2<sup>n</sup>)</td></tr>
</table>
<p>方法：展开法（找规律求和）、代入法/数学归纳（先猜后证）、递归树（按层求和）。</p>`,
      tip: "展开法在 n 不是 2 的幂时要小心取整；严格证明一般用归纳法处理 ⌊n/2⌋。"
    },
    {
      id: "k1-15",
      title: "Θ 运算不能随意相减",
      tags: ["易错", "渐进记号"],
      body: `<p>习题讲解特别指出：<strong>n log n − Θ(n log n)</strong> 不能推出 Θ(n)，也不能推出 Θ(n log n)。因为 Θ(n log n) 只表示“介于 c₁n log n 与 c₂n log n 之间”，具体系数未知；两个同阶量相减可能剩低阶项、同阶项，甚至 0。</p>
<p>正确做法是保留具体表达式，利用取整不等式放缩后再求和。例如作业第 2 题：</p>
<span class="formula">S(n)=Σ<sub>k=0..⌊log n⌋</sub>⌊n/2<sup>k</sup>⌋，且 n ≤ S(n) &lt; 2n，所以 S(n)=Θ(n)</span>`,
      tip: "大 O/Θ 只适合做加法、乘法和放缩，不能像普通等式那样移项、相减、约分。"
    },
    {
      id: "k1-16",
      title: "Stirling 公式与 log(n!)",
      tags: ["公式", "阶乘"],
      body: `<p>课件最后一页给出 Stirling 公式：</p>
<span class="formula">n! ≈ √(2πn)·(n/e)<sup>n</sup></span>
<p>两边取对数得：</p>
<span class="formula">log(n!) = n log n − n log e + O(log n) = Θ(n log n)</span>
<p>作业第 1.2 要求证明 log(n!)=Θ(n log n)。上界：log(n!) ≤ n log n；下界：只取后一半项，每项 ≥ log(n/2)，得到 ≥ (n/2)log(n/2)=Ω(n log n)。</p>`,
      tip: "log(n!) 与 n log n 同阶，不是 n! 与 n<sup>n</sup> 同阶；阶乘本身是 Θ(n<sup>n+1/2</sup>e<sup>−n</sup>)。"
    },
    {
      id: "k1-17",
      title: "时空权衡与数据结构选择",
      tags: ["时空权衡", "设计"],
      body: `<p>增大空间开销往往能降低时间开销（如用辅助数组、哈希表、索引）；节省空间往往要增加运算时间（如压缩存储、链表代替数组）。这就是<strong>时空权衡</strong>。</p>
<p>选择数据结构时先分析问题的数据对象与逻辑关系（问题抽象、数据抽象），数据结构设计通常先于算法设计；同时要考虑<strong>可扩展性</strong>：输入规模变化时结构是否还能适应。</p>`,
      tip: "答题时若被问“为什么选这种结构”，要从操作频度、数据规模、是否频繁插删、是否需要随机访问四方面回答。"
    }
  ],
  questions: [
    {
      id: "q1-01",
      title: "填空四则：调和级数、log(n!)、Θ 的等价定义、指数比较",
      source: "第一章作业 · 第 1 题",
      kind: "作业",
      star: true,
      statement: `<p>填写合适的渐进记号（O、Ω 或 Θ）：</p>
<ol>
<li>Σ<sub>i=1</sub><sup>n</sup> 1/i = ______ 。</li>
<li>log(n!) = ______ 。</li>
<li>f(n)=O(g(n)) 且 f(n)=Ω(g(n)) 等价于 f(n)=______(g(n))。</li>
<li>2026<sup>n</sup> = ______(2025<sup>n</sup>)。（填 O、Ω 或 Θ）</li>
</ol>`,
      answer: `<ol>
<li><strong>Θ(log n)</strong>。因为 ln(n+1) &lt; Σ1/i ≤ 1+ln n，上下界同阶。</li>
<li><strong>Θ(n log n)</strong>。上界 log(n!) ≤ n log n；下界取后一半项：Σ<sub>i=⌈n/2⌉</sub><sup>n</sup> log i ≥ (n/2)log(n/2) = Ω(n log n)。</li>
<li><strong>Θ</strong>。这正是 Θ 的定义：同时被 g 从上、下界夹住。</li>
<li><strong>Ω</strong>。比值 (2026/2025)<sup>n</sup> → ∞，说明 2026<sup>n</sup> 增长严格更快，只能写下界 Ω；它不是 O(2025<sup>n</sup>)，更不是 Θ。</li>
</ol>`,
      note: "第 4 小问的易错点：看到两个指数就想填 Θ。只有底数相等（或同阶）时才是 Θ；底数不同且固定时，大小关系是严格的。"
    },
    {
      id: "q1-02",
      title: "分析双重循环（外层 i++，内层 j 每次乘 2）的时间复杂度",
      source: "第一章作业 · 第 2 题",
      kind: "作业",
      star: true,
      statement: `<pre><code>int cnt = 0;
int i = 1;
while (i &lt;= n) {
    int j = i;
    while (j &lt;= n) {
        cnt++;
        j *= 2;
    }
    i++;
}</code></pre>
<p>用大 O 表示该程序的时间复杂度，并给出推导过程。</p>`,
      answer: `<p>固定 i 时，j 依次取 i, 2i, 4i, …，循环次数为 ⌊log<sub>2</sub>(n/i)⌋+1。因此总执行次数</p>
<span class="formula">S(n) = Σ<sub>i=1</sub><sup>n</sup> (⌊log<sub>2</sub>(n/i)⌋+1) = Σ<sub>k=0</sub><sup>⌊log n⌋</sup> ⌊n/2<sup>k</sup>⌋</span>
<p>上界：⌊n/2<sup>k</sup>⌋ ≤ n/2<sup>k</sup>，故</p>
<span class="formula">S(n) &lt; n·Σ<sub>k≥0</sub>1/2<sup>k</sup> = 2n</span>
<p>下界：只取 k=0 一项，S(n) ≥ n。于是 n ≤ S(n) &lt; 2n，S(n)=Θ(n)。外层循环本身 n 次，故总时间 <strong>O(n)</strong>（且为 Θ(n)）。</p>`,
      note: "常见错解：把 n log n − log(n!) 用“同阶相减”直接消成 Θ(n)。不能对 Θ 项做减法，必须用取整不等式放缩。"
    },
    {
      id: "q1-03",
      title: "求四个递推式的 Θ 表示",
      source: "第一章作业 · 第 3 题",
      kind: "作业",
      statement: `<ol>
<li>T(n) = 4<sup>n</sup> + n<sup>5</sup>·3<sup>n</sup></li>
<li>T(n) = T(n−1) + Θ(n)</li>
<li>T(n) = T(n/2) + Θ(1)</li>
<li>T(n) = T(n−1) + Θ(log n)</li>
</ol>`,
      answer: `<ol>
<li><strong>Θ(4<sup>n</sup>)</strong>。4<sup>n</sup> 是主导项，n<sup>5</sup>3<sup>n</sup> 相对它可忽略（比值 → 0）。</li>
<li><strong>Θ(n²)</strong>。展开：T(n)=T(1)+Σ<sub>k=2</sub><sup>n</sup>Θ(k)=Θ(Σk)=Θ(n²)。</li>
<li><strong>Θ(log n)</strong>。每次规模减半，约 log<sub>2</sub>n 层，每层 Θ(1)。</li>
<li><strong>Θ(n log n)</strong>。展开：T(n)=T(1)+Σ<sub>k=2</sub><sup>n</sup>Θ(log k)=Θ(log(n!))=Θ(n log n)。</li>
</ol>`,
      note: "第 1 题是指数项比较，底数大的赢；第 2、4 题是“递推展开后求和”，分别对应算术级数与对数级数。"
    },
    {
      id: "q1-04",
      title: "证明 a<sup>n</sup>=O(b<sup>n</sup>) 当且仅当 a≤b",
      source: "第一章作业 · 第 4(1) 题",
      kind: "作业",
      star: true,
      statement: `<p>证明：对任意正实数 a、b，a<sup>n</sup> = O(b<sup>n</sup>) 当且仅当 a ≤ b。</p>`,
      answer: `<p><strong>充分性</strong>：若 a ≤ b，则对任意 n ≥ 1，a<sup>n</sup> ≤ b<sup>n</sup>。取 c=1、n<sub>0</sub>=1，按定义得 a<sup>n</sup>=O(b<sup>n</sup>)。</p>
<p><strong>必要性</strong>：设 a<sup>n</sup>=O(b<sup>n</sup>)，则存在 c&gt;0、n<sub>0</sub>，使 n≥n<sub>0</sub> 时 a<sup>n</sup> ≤ c b<sup>n</sup>，即 (a/b)<sup>n</sup> ≤ c。</p>
<p>反设 a&gt;b，则 a/b&gt;1，左边 (a/b)<sup>n</sup> 随 n 增大趋于无穷，不可能被常数 c 控制，矛盾。故 a ≤ b。</p>`,
      note: "取对数也可：n(ln a − ln b) ≤ ln c。若 ln a > ln b，左边随 n 线性增长，仍矛盾。"
    },
    {
      id: "q1-05",
      title: "证明 T(n)=2T(⌊n/2⌋)+n 满足 T(n)=O(n log n)",
      source: "第一章作业 · 第 4(2) 题",
      kind: "作业",
      star: true,
      statement: `<p>已知 T(1)=1，T(n)=2T(⌊n/2⌋)+n。证明 T(n)=O(n log n)。</p>`,
      answer: `<p>直接证明更强的结论：对所有整数 n ≥ 1，</p>
<span class="formula">T(n) ≤ n(log<sub>2</sub>n + 1)</span>
<p><strong>归纳</strong>：n=1 时 T(1)=1=1·(0+1)，成立。设对所有小于 n 的正整数成立，令 q=⌊n/2⌋，则</p>
<span class="formula">T(n) = 2T(q)+n ≤ 2q(log q + 1)+n ≤ n(log(n/2)+1)+n = n log n + n − n + n = n log n + n</span>
<p>（这里用了 q ≤ n/2 以及 log q ≤ log(n/2)。）于是 T(n) ≤ n(log n+1)=O(n log n)。</p>`,
      note: "常见错解一：假设 T(k) ≤ Ck log k 后代入，k=1 时右边为 0，无法覆盖 T(1)=1；错解二：只对 n 是 2 的幂展开，未处理一般整数。"
    },
    {
      id: "q1-06",
      title: "三段程序的复杂度：线性、常数、线性",
      source: "第一章课件 · p77 练习",
      kind: "课件练习",
      statement: `<p>分析下列三段程序的时间复杂度：</p>
<pre><code>(1) i=1; k=0;
    while (i&lt;n) { k=k+10*i; i++; }

(2) x=91; y=100;
    while (y&gt;0)
        if (x&gt;100) { x=x-10; y--; }
        else x++;

(3) i=1; j=0;
    while (i+j&lt;=n) { j++; i++; }</code></pre>`,
      answer: `<ol>
<li>循环执行 n−1 次，<strong>O(n)</strong>，线性阶。</li>
<li>循环总次数固定为 1100 次，与 n 无关，<strong>O(1)</strong>，常数阶。虽然“看起来吓人”，但问题规模不是循环次数。</li>
<li>i、j 每轮各加 1，i+j 每轮增加 2，循环约 n/2 次，<strong>O(n)</strong>，线性阶。</li>
</ol>`,
      tip: "判断复杂度看“执行次数与问题规模 n 的关系”，不要被循环变量的初值或循环体长度迷惑。"
    },
    {
      id: "q1-07",
      title: "线性筛（欧拉筛）为什么是 O(n)？",
      source: "前三章习题讲解 · 第一章补充题",
      kind: "补充",
      star: true,
      statement: `<pre><code>int primes[N], total;
bool not_prime[N];
void pre(int n) {
    for (int i = 2; i &lt;= n; i++) {
        if (!not_prime[i]) primes[total++] = i;
        for (int j = 0; j &lt; total; j++) {
            int p_j = primes[j];
            if (i * p_j &gt; n) break;
            not_prime[i * p_j] = true;
            if (i % p_j == 0) break;
        }
    }
}</code></pre>
<p>说明该算法的时间复杂度为什么是 O(n)。</p>`,
      answer: `<p>关键在 <code>if (i % p_j == 0) break;</code>：每个合数只会被它的<strong>最小质因子</strong>筛掉一次。</p>
<p>设合数 x 的最小质因子为 p，令 x=p·i。当外层枚举到 i 时，内层从小到大枚举质数；在枚举到 p 之前不会 break（因为 p 是 i 的最小质因子，更小的质数不整除 i），于是 x 在“i 与 p”这一组被标记。之后枚举到 p 时立即 break，保证 x 不会被更大的质因子重复标记。</p>
<p>因此每个合数恰好被标记一次，内层总执行次数为 O(n)，整个算法 <strong>O(n)</strong>。</p>`,
      note: "与埃氏筛 O(n log log n) 的区别：埃氏筛会让一个合数被多个质数重复筛；线性筛通过“最小质因子唯一”保证线性。"
    }
  ],
  cheats: [
    {
      title: "渐进记号一页表",
      html: `<table>
<tr><th>记号</th><th>含义</th><th>定义（存在正常数）</th><th>用途</th></tr>
<tr><td>O(g)</td><td>上界</td><td>f(n) ≤ c·g(n), n≥n₀</td><td>最坏情况、算法代价上界</td></tr>
<tr><td>Ω(g)</td><td>下界</td><td>f(n) ≥ c·g(n), n≥n₀</td><td>最好情况、问题下界</td></tr>
<tr><td>Θ(g)</td><td>同阶</td><td>c₁g(n) ≤ f(n) ≤ c₂g(n)</td><td>精确量级</td></tr>
</table>
<p><strong>等价</strong>：f=Θ(g) ⇔ f=O(g) 且 f=Ω(g)。</p>
<p><strong>规则</strong>：加法取 max；乘法相乘；对数底数无关；同阶项不能随意相减。</p>`
    },
    {
      title: "常见复杂度与典型算法",
      html: `<table>
<tr><th>阶</th><th>典型来源</th></tr>
<tr><td>O(1)</td><td>数组下标访问、栈/队列入出、哈希平均</td></tr>
<tr><td>O(log n)</td><td>二分查找、平衡树高度、堆调整</td></tr>
<tr><td>O(n)</td><td>顺序扫描、建堆、KMP、计数排序</td></tr>
<tr><td>O(n log n)</td><td>归并/堆/快速排序平均、分治</td></tr>
<tr><td>O(n²)</td><td>两重循环、冒泡/插入/选择排序、Dijkstra 数组实现</td></tr>
<tr><td>O(n³)</td><td>Floyd、矩阵乘法、课件中邻接矩阵拓扑排序</td></tr>
<tr><td>O(2ⁿ)</td><td>子集枚举、朴素递归斐波那契</td></tr>
<tr><td>O(n!)</td><td>全排列枚举、旅行商暴力</td></tr>
</table>`
    },
    {
      title: "递推式与求和公式",
      html: `<table>
<tr><th>递推/求和</th><th>结果</th></tr>
<tr><td>T(n)=T(n−1)+Θ(1)</td><td>Θ(n)</td></tr>
<tr><td>T(n)=T(n−1)+Θ(n)</td><td>Θ(n²)</td></tr>
<tr><td>T(n)=T(n−1)+Θ(log n)</td><td>Θ(n log n)</td></tr>
<tr><td>T(n)=T(n/2)+Θ(1)</td><td>Θ(log n)</td></tr>
<tr><td>T(n)=2T(n/2)+Θ(n)</td><td>Θ(n log n)</td></tr>
<tr><td>T(n)=2T(n−1)+Θ(1)</td><td>Θ(2ⁿ)</td></tr>
</table>
<p>Σ<sub>i=1</sub><sup>n</sup>i = n(n+1)/2；Σ<sub>i=1</sub><sup>n</sup>1/i = Θ(log n)；Σ<sub>i=0</sub><sup>n</sup>2<sup>i</sup> = 2<sup>n+1</sup>−1；log(n!) = Θ(n log n)。</p>`
    },
    {
      title: "二分查找与顺序查找",
      html: `<table>
<tr><th></th><th>顺序查找</th><th>二分查找</th></tr>
<tr><td>前提</td><td>无</td><td>有序 + 顺序存储</td></tr>
<tr><td>最好</td><td>O(1)</td><td>O(1)</td></tr>
<tr><td>最坏</td><td>O(n)</td><td>O(log n)</td></tr>
<tr><td>平均</td><td>(n+1)/2 = Θ(n)</td><td>Θ(log n)</td></tr>
<tr><td>链表可用？</td><td>可以</td><td>不适合（无法 O(1) 取中点）</td></tr>
</table>`
    }
  ]
});
