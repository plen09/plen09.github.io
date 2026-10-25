window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch3",
  num: "03",
  title: "栈与队列",
  subtitle: "LIFO · FIFO · 表达式 · 递归 · 循环队列",
  pdf: "assets/slide/第3章栈与队列.pdf",
  intro: "栈和队列都是操作受限的线性表：栈只在一端进出，队列一端进另一端出。本章考题集中在三处：循环队列的下标公式、出栈序列的合法性与计数（Catalan）、以及用栈完成表达式转换/求值。作业四道题分别考辅助最大值栈、括号序列计数、双栈浏览器和两栈模拟队列。",
  links: [
    { label: "第三章作业", href: "assets/hw/第三章作业.pdf" },
    { label: "前三章习题讲解", href: "assets/hw/前三章作业习题讲解.pdf" }
  ],
  knowledge: [
    {
      id: "k3-01",
      title: "栈的定义：后进先出（LIFO）",
      tags: ["栈", "定义"],
      body: `<p>栈是<strong>只允许在一端</strong>进行插入和删除的线性表。允许操作的一端叫<strong>栈顶（top）</strong>，另一端叫<strong>栈底（bottom）</strong>。</p>
<ul>
<li>插入称压栈/入栈（push），删除称出栈/弹栈（pop）；</li>
<li>特性：后进先出（Last-In First-Out，LIFO），也称“下推表”；</li>
<li>栈底元素最先入栈、最后出栈；栈顶元素最后入栈、最先出栈；</li>
<li>栈是操作受限的线性结构，元素之间仍是线性关系。</li>
</ul>`,
      tip: "“操作受限”不等于“存储受限”：栈可以用数组实现，也可以用链表实现。"
    },
    {
      id: "k3-02",
      title: "栈的 ADT 与基本操作",
      tags: ["栈", "ADT"],
      body: `<p>栈的典型运算：</p>
<ul>
<li><code>push(item)</code>：入栈，成功返回真；</li>
<li><code>pop(item)</code>：返回栈顶并弹出；</li>
<li><code>top(item)</code>：返回栈顶但不弹出；</li>
<li><code>isEmpty()</code>：判空；</li>
<li><code>isFull()</code>：判满（顺序栈需要，链式栈不需要）；</li>
<li><code>clear()</code>：清空。</li>
</ul>
<p>所有基本操作都是 O(1)。实现时统一约定“栈顶指针指向栈顶元素”，可以避免大量 ±1 的边界错误。</p>`,
      tip: "top 只读不弹；pop 读并弹。答题时不要把两者混用。"
    },
    {
      id: "k3-03",
      title: "顺序栈：top 指针、上溢与下溢",
      tags: ["顺序栈", "溢出"],
      body: `<p>顺序栈用数组 <code>st[mSize]</code> 存放元素，<code>top</code> 记录栈顶下标，初值 −1。</p>
<pre><code>bool push(const T item) {
    if (top == mSize - 1) return false;   // 上溢
    st[++top] = item;                     // 先 ++ 再存
    return true;
}
bool pop(T &amp;item) {
    if (top == -1) return false;          // 下溢
    item = st[top--];                     // 先取再 --
    return true;
}</code></pre>
<ul>
<li><strong>上溢（overflow）</strong>：栈已有 mSize 个元素仍要入栈；</li>
<li><strong>下溢（underflow）</strong>：空栈仍要出栈；</li>
<li>空栈条件 top == −1，栈满条件 top == mSize−1，元素个数 top+1；</li>
<li>“向上生成”的栈入栈地址增大；“向下生成”的栈入栈地址减小。</li>
</ul>`,
      tip: "push 用 ++top（先加后存），pop 用 top--（先取后减）；写反会覆盖或越界。"
    },
    {
      id: "k3-04",
      title: "链式栈：栈顶就是链表头",
      tags: ["链式栈", "指针"],
      body: `<p>链式栈用单链表存储，指针方向从栈顶指向栈底，所有插入/删除都在表头完成。</p>
<ul>
<li>因为只在头部操作，<strong>不需要头结点</strong>；</li>
<li>栈顶指针 top 就是链表头指针；</li>
<li>空栈条件 top == NULL；</li>
<li>入栈：<code>tmp = new Node(item, top); top = tmp;</code></li>
<li>出栈：<code>tmp = top; top = top-&gt;next; delete tmp;</code></li>
<li>只有内存耗尽才会“满”，没有固定容量限制。</li>
</ul>`,
      tip: "链式栈的出栈必须先保存 top 再改 top，最后 delete 旧栈顶；顺序不能乱。"
    },
    {
      id: "k3-05",
      title: "顺序栈与链式栈的比较",
      tags: ["比较", "选型"],
      body: `<table>
<tr><th>维度</th><th>顺序栈</th><th>链式栈</th></tr>
<tr><td>单次操作</td><td>O(1)</td><td>O(1)</td></tr>
<tr><td>容量</td><td>固定，可能上溢</td><td>动态，无栈满</td></tr>
<tr><td>空间开销</td><td>可能预留浪费</td><td>每结点一个指针</td></tr>
<tr><td>实现</td><td>数组下标，简单</td><td>指针操作，稍繁</td></tr>
<tr><td>适用</td><td>容量可预估</td><td>深度不确定</td></tr>
</table>
<p>两者时间效率难分伯仲；实际应用中顺序栈更常见，因为数组访问快、无动态分配开销。</p>`,
      tip: "链式栈“没有上溢”只是理论上的；内存耗尽仍会失败。"
    },
    {
      id: "k3-06",
      title: "出栈序列合法性：模拟法",
      tags: ["栈", "合法性", "模拟"],
      body: `<p>给定入栈序列 1,2,…,n 和一个目标出栈序列，判断是否合法：按入栈顺序依次压栈；每压入一个元素后，只要栈顶等于目标序列当前待出元素就弹出并后移指针；全部入栈完成后，若栈空则合法，否则不合法。</p>
<pre><code>bool valid(int a[], int n) {
    stack&lt;int&gt; st;
    int nxt = 1;
    for (int i = 0; i &lt; n; i++) {
        while (st.empty() || st.top() != a[i]) {
            if (nxt &gt; n) return false;
            st.push(nxt++);
        }
        st.pop();
    }
    return true;
}</code></pre>
<p>若题目允许目标序列含非法值或重复值（如 OJ 题），先检查每个数都在 [1,n] 内且不重复，再模拟。</p>`,
      tip: "模拟失败只有两种原因：目标元素还压在栈里但不在栈顶；或该元素已经出过栈。"
    },
    {
      id: "k3-07",
      title: "出栈序列计数：Catalan 数",
      tags: ["Catalan", "计数", "递推"],
      body: `<p>n 个元素按固定顺序入栈，可能的出栈序列数为第 n 个 Catalan 数：</p>
<span class="formula">F(0)=F(1)=1，F(n)=Σ<sub>i=1</sub><sup>n</sup> F(i−1)·F(n−i)</span>
<span class="formula">F(n) = (1/(n+1))·C(2n, n) = C(2n,n) − C(2n,n+1)</span>
<p>前几项：1, 1, 2, 5, 14, 42, 132, …。它同时计数 n 对括号的合法序列数、n 个结点的不同二叉树形态数。</p>
<p><strong>递推含义</strong>：设第 1 个元素在第 i 个位置出栈，则它出栈前有 i−1 个元素完成入出栈，出栈后有 n−i 个元素完成入出栈，二者互不影响，故贡献 F(i−1)F(n−i)。</p>`,
      tip: "Catalan 的递推与括号匹配是同一个问题：入栈=左括号，出栈=右括号，任意前缀出栈次数不能超过入栈次数。"
    },
    {
      id: "k3-08",
      title: "栈的应用：数制转换",
      tags: ["应用", "进制"],
      body: `<p>十进制 N 转 d 进制，利用</p>
<span class="formula">N = (N div d)·d + (N mod d)</span>
<p>反复取余得到从低位到高位的数字，正好逆序输出，因此把余数依次压栈，最后逐个弹出。</p>
<p>例：(1348)<sub>10</sub> = (2504)<sub>8</sub>。计算过程：1348 mod 8 = 4，168 mod 8 = 0，21 mod 8 = 5，2 mod 8 = 2，逆序读出 2 5 0 4。</p>`,
      tip: "余数是从低位到高位产生的，必须用栈逆序；直接顺序输出会得到反串。"
    },
    {
      id: "k3-09",
      title: "栈的应用：括号匹配",
      tags: ["应用", "括号匹配"],
      body: `<p>扫描表达式，遇到左括号压栈；遇到右括号时：</p>
<ul>
<li>栈空 → 右括号多余，不匹配；</li>
<li>栈顶不是对应的左括号 → 类型不匹配；</li>
<li>否则弹出栈顶，继续扫描。</li>
</ul>
<p>扫描结束后栈必须为空，否则左括号多余。三种括号 <code>() [] {}</code> 混合时，栈中保存左括号类型即可。</p>`,
      tip: "“栈空时遇到右括号”和“扫描结束栈非空”是两类不同的错误，答题要分别说明。"
    },
    {
      id: "k3-10",
      title: "表达式的三种表示：中缀、前缀、后缀",
      tags: ["表达式", "前缀", "后缀"],
      body: `<p>一个表达式由操作数、运算符和分界符组成。</p>
<ul>
<li><strong>中缀</strong>：<code>&lt;操作数&gt; &lt;运算符&gt; &lt;操作数&gt;</code>，如 A+B；</li>
<li><strong>前缀</strong>（波兰式）：<code>&lt;运算符&gt; &lt;操作数&gt; &lt;操作数&gt;</code>，如 +AB；</li>
<li><strong>后缀</strong>（逆波兰式）：<code>&lt;操作数&gt; &lt;操作数&gt; &lt;运算符&gt;</code>，如 AB+。</li>
</ul>
<p>三种表示中<strong>操作数的相对次序不变</strong>，变的是运算符的位置。后缀表达式不含括号，运算严格从左到右按运算符出现顺序进行。</p>
<p>例：<code>31*(5−22)+70</code> 的后缀为 <code>31 5 22 − * 70 +</code>，前缀为 <code>+ * 31 − 5 22 70</code>。</p>`,
      tip: "转换时先按优先级给所有运算加括号，再把运算符移到对应括号前/后，最后去括号，最不容易错。"
    },
    {
      id: "k3-11",
      title: "中缀转后缀：运算符栈规则",
      tags: ["表达式", "转换", "栈"],
      body: `<p>从左到右扫描中缀表达式，用栈暂存运算符：</p>
<ul>
<li>操作数：直接输出；</li>
<li>左括号：压栈；</li>
<li>右括号：弹栈并输出，直到遇到左括号；左括号弹出但不输出；若没遇到左括号则不匹配；</li>
<li>运算符 op：当栈非空、栈顶不是左括号、且栈顶优先级 <strong>≥</strong> op 时，持续弹栈输出；然后 op 入栈；</li>
<li>扫描结束后，把栈中剩余运算符全部弹出输出；若弹出左括号则不匹配。</li>
</ul>
<p>优先级：<code>* /</code> 高于 <code>+ −</code>；同级运算符左结合，所以“≥”时才弹出，保证先左后右。</p>`,
      tip: "右括号只弹出、不输出；左括号只入栈/弹出、不输出。栈中永远不会出现右括号。"
    },
    {
      id: "k3-12",
      title: "后缀表达式求值",
      tags: ["表达式", "求值", "栈"],
      body: `<p>只需一个操作数栈：从左到右扫描后缀表达式。</p>
<ul>
<li>遇到操作数：压栈；</li>
<li>遇到二元运算符：弹出两个操作数，<strong>先弹出的是右操作数</strong>，后弹出的是左操作数，计算后把结果压栈；</li>
<li>扫描结束，栈顶即结果；若栈中不只有一个元素，表达式有误。</li>
</ul>
<p>例：<code>31 5 22 − * 70 +</code>：22、5 出栈算 5−22=−17；再与 31 算 31×(−17)=−527；70 入栈后算 −527+70=<strong>−457</strong>。</p>`,
      tip: "减法和除法不满足交换律，弹出顺序写反会得到相反的结果。"
    },
    {
      id: "k3-13",
      title: "递归与运行栈：活动记录",
      tags: ["递归", "运行栈"],
      body: `<p>递归是函数直接或间接调用自身。能递归求解的问题需要：一个或多个<strong>递推公式</strong>，以及一个<strong>递归出口</strong>。写递归必须先测试出口，再递归调用。</p>
<p>函数调用遵循“后调用先返回”，与栈的 LIFO 一致。系统用<strong>运行栈</strong>管理调用：每次调用把被调函数的<strong>活动记录</strong>（实参、局部变量、返回地址、临时变量等）压栈；返回时弹栈，恢复调用者的数据区。</p>
<ul>
<li>递归深度 = 运行栈中活动记录的个数；</li>
<li>同一局部变量在不同递归层有不同存储空间；</li>
<li>代码只有一份，运行多次但不会被复制多份；</li>
<li>非递归情况下可用静态分配；递归必须动态分配，否则各层数据会互相覆盖。</li>
</ul>`,
      tip: "递归深度过大会导致“递归爆栈”（OJ 的 RE 原因之一）；可改写成显式栈的迭代版本。"
    },
    {
      id: "k3-14",
      title: "队列的定义：先进先出（FIFO）",
      tags: ["队列", "定义"],
      body: `<p>队列只允许在<strong>一端插入</strong>、在<strong>另一端删除</strong>。允许删除的一端叫<strong>队头（front）</strong>，允许插入的一端叫<strong>队尾（rear）</strong>。</p>
<ul>
<li>特性：先进先出（First-In First-Out，FIFO）；</li>
<li>基本操作：enQueue（入队）、deQueue（出队）、getFront（取队头）、isEmpty、isFull；</li>
<li>所有基本操作 O(1)；</li>
<li>典型应用：调度与缓冲、消息/邮件缓冲、设备通信、操作系统资源管理、广度优先搜索。</li>
</ul>`,
      tip: "栈顶对应“最后”，队头对应“最早”；做应用题先判断该用 LIFO 还是 FIFO。"
    },
    {
      id: "k3-15",
      title: "顺序队列与“假溢出”",
      tags: ["顺序队列", "假溢出"],
      body: `<p>顺序队列用数组存放，front 指向当前队头元素，rear 指向队尾元素的<strong>下一个空位</strong>。</p>
<ul>
<li>入队：<code>elem[rear] = x; rear++;</code></li>
<li>出队：<code>front++;</code>（不搬移元素）</li>
<li>空队列：front == rear。</li>
</ul>
<p>若不做循环，随着反复入队/出队，rear 会到达数组末端；此时前面可能还有大量空位，却无法再入队，这叫<strong>假溢出</strong>。解决办法是把数组逻辑上看成环，即循环队列。</p>`,
      tip: "假溢出不是真的满了，而是 rear 走到了数组末尾；循环队列就是为解决它而设计的。"
    },
    {
      id: "k3-16",
      title: "循环队列：判空、判满与长度公式",
      tags: ["循环队列", "公式", "重点"],
      body: `<p>把数组 <code>A[m]</code> 首尾相接。常用“<strong>少用一个存储单元</strong>”区分空与满：</p>
<ul>
<li>空：<code>front == rear</code>；</li>
<li>满：<code>(rear + 1) % m == front</code>；</li>
<li>元素个数：<code>(rear − front + m) % m</code>；</li>
<li>若当前有 k 个元素，则 <code>rear = (front + k) % m</code>；</li>
<li>入队：<code>A[rear] = x; rear = (rear + 1) % m;</code></li>
<li>出队：<code>x = A[front]; front = (front + 1) % m;</code></li>
<li>实际最多存 m−1 个元素。</li>
</ul>
<p>另一种做法是额外设一个计数器 size 或标志位，此时可以存满 m 个元素。</p>`,
      tip: "所有下标运算都要加 m 再取模，避免 C/C++ 中负数取模为负；满条件是 rear+1 追上 front。"
    },
    {
      id: "k3-17",
      title: "链式队列：队头在链头，队尾在链尾",
      tags: ["链式队列", "指针"],
      body: `<p>链式队列用单链表实现，指针方向从队头指向队尾，需维护 front 与 rear 两个指针。</p>
<ul>
<li>空队列：front == rear == NULL；</li>
<li>入队：在 rear 后接新结点并更新 rear；空队列时 front 也要指向新结点；</li>
<li>出队：删除 front 结点并 front 后移；若出队后队列为空，必须把 rear 置 NULL；</li>
<li>无队满问题，有队空问题。</li>
</ul>
<pre><code>void enQueue(T x) {
    Node *p = new Node(x, NULL);
    if (rear == NULL) front = rear = p;
    else { rear-&gt;next = p; rear = p; }
}
T deQueue() {
    Node *tmp = front;
    T x = tmp-&gt;data;
    front = front-&gt;next;
    if (front == NULL) rear = NULL;
    delete tmp;
    return x;
}</code></pre>`,
      tip: "链式队列最容易漏的是“出队后队空要把 rear 置 NULL”，否则 rear 悬空，下一次入队会出错。"
    },
    {
      id: "k3-18",
      title: "双端队列与栈/队列的变种",
      tags: ["双端队列", "双栈", "变种"],
      body: `<ul>
<li><strong>双端队列（deque）</strong>：队首和队尾都能插入、删除；</li>
<li><strong>双栈</strong>：两个栈底相连，共享一块数组空间，从两端向中间生长，空间利用率更高；</li>
<li><strong>超队列</strong>：删除只允许在一端，插入可在两端；</li>
<li><strong>超栈</strong>：插入只允许在一端，删除可在两端。</li>
</ul>
<p>双栈共享空间时，栈满条件是两栈顶指针相遇（如 <code>top1 + 1 == top2</code>）。</p>`,
      tip: "名称容易混：以“超”开头时，受限的是“超队列删一端、超栈插一端”，插入/删除的另一侧仍开放。"
    },
    {
      id: "k3-19",
      title: "两个栈模拟队列 / 两个队列模拟栈",
      tags: ["互模拟", "技巧", "重点"],
      body: `<p><strong>两栈模拟队列</strong>：S1 负责入队，S2 负责出队。入队直接压 S1；出队时若 S2 空，把 S1 全部倒入 S2（顺序自然反转），再从 S2 弹出。判空为两栈均空。</p>
<ul>
<li>enQueue：O(1)；</li>
<li>deQueue：最坏 O(n)，但<strong>均摊 O(1)</strong>——每个元素最多搬移一次。</li>
</ul>
<p><strong>两队列模拟栈</strong>：始终保持一个队列为空。入栈压入非空队列；出栈时把非空队列前 n−1 个元素移到另一队列，弹出最后一个，再交换两队列角色。</p>
<ul>
<li>入栈 O(1)，出栈 O(n)；也可反过来让入栈 O(n)、出栈 O(1)。</li>
</ul>`,
      tip: "两栈模拟队列的关键是“S2 不空时不要倒”，否则顺序会被打乱；只有 S2 空了才整体搬一次。"
    },
    {
      id: "k3-20",
      title: "队列应用：广度优先搜索（农夫过河）",
      tags: ["应用", "BFS", "状态空间"],
      body: `<p>农夫、狼、羊、菜过河，船只能载农夫和至多一样东西，无人看管时狼羊、羊菜不能独处。把四个角色是否在目标岸用 4 个二进制位表示，状态为 0…15。</p>
<ul>
<li>起点 0000（0），终点 1111（15）；</li>
<li>只保留安全状态，转移为农夫带 0 或 1 样东西过河；</li>
<li>用队列做 BFS：取出队头状态，把所有未访问的合法后继入队；</li>
<li>用数组 route[16] 记录每个状态的前驱，−1 表示未访问；</li>
<li>BFS 按步数逐层扩展，第一次到达 15 的路径就是最短操作序列。</li>
</ul>
<p>一条可行解的前驱链为 15→6→14→2→11→1→9→0，倒推即得步骤。若改用栈，则得到深度优先搜索，不保证最短。</p>`,
      tip: "BFS 用队列、DFS 用栈；求“最少步数”必须 BFS，DFS 只保证找到一条路。"
    },
    {
      id: "k3-21",
      title: "补充：单调栈求“下一个更大元素”",
      tags: ["单调栈", "补充", "OJ"],
      body: `<p>对每个位置 i，求最小的 j&gt;i 使 a<sub>j</sub>&gt;a<sub>i</sub>，不存在则为 0。</p>
<p>维护一个<strong>下标栈</strong>，栈中元素对应的值从栈底到栈顶<strong>单调不增</strong>，保存“尚未找到答案”的位置。扫描到 a<sub>j</sub> 时：</p>
<ul>
<li>若栈顶值 &lt; a<sub>j</sub>，则 j 就是栈顶位置的答案，弹出并记录，重复比较新栈顶；</li>
<li>直到栈空或栈顶值 ≥ a<sub>j</sub>，把 j 压栈。</li>
</ul>
<p>扫描结束后仍在栈中的位置答案为 0。每个下标最多入栈、出栈各一次，时间 O(n)，空间 O(n)。</p>
<p>样例 <code>3,1,3,4,3,2,1,5,6</code> 的答案为 <code>4,3,4,8,8,8,8,9,0</code>。</p>`,
      tip: "栈里存下标而不是值，才能把答案写回对应位置；比较时用 a[st.top()]。"
    },
    {
      id: "k3-22",
      title: "补充：单调队列求滑动窗口最值",
      tags: ["单调队列", "双端队列", "OJ"],
      body: `<p>长度为 n 的数组，窗口大小 k，从左到右滑动，求每个窗口的最小值和最大值。</p>
<p>以最小值为例，维护双端队列存下标，满足：下标递增，且对应值从队首到队尾<strong>严格递增</strong>。</p>
<ul>
<li>队首过期：若 <code>q.front() &lt;= i−k</code>，从队首弹出；</li>
<li>队尾淘汰：若 <code>a[q.back()] &gt;= a[i]</code>，说明队尾元素又大又早离开，永远不可能成为后续最小值，从队尾弹出；</li>
<li>把 i 从队尾加入；当 i≥k 时，队首就是当前窗口最小值；</li>
<li>最大值只需把比较符号反过来。</li>
</ul>
<p>每个元素最多入队、出队各一次，总时间 O(n)。样例 <code>1 3 -1 -3 5 3 6 7</code>、k=3：最小值为 <code>-1 -3 -3 -3 3 3</code>，最大值为 <code>3 3 5 5 6 7</code>。</p>`,
      tip: "“下标过期”先于“队尾淘汰”；求最大值维护递减队列，求最小值维护递增队列。"
    },
    {
      id: "k3-23",
      title: "补充：C 语言位运算要点",
      tags: ["位运算", "补充"],
      body: `<ul>
<li><code>&amp;</code> 按位与、<code>|</code> 按位或、<code>^</code> 按位异或、<code>~</code> 按位取反；</li>
<li><code>x &lt;&lt; n</code>：左移，空位补 0，相当于 x·2<sup>n</sup>；</li>
<li><code>x &gt;&gt; n</code>：右移，无符号数补 0；有符号数通常补符号位（算术右移），相当于除以 2<sup>n</sup> 向下取整；</li>
<li>异或性质：<code>A^B=C ⇒ A=C^B，B=C^A</code>，可用于交换两数、找出只出现一次的数；</li>
<li>有符号数移位时符号位不参与移动。</li>
</ul>`,
      tip: "位移的“乘/除 2 的幂”结论只在没有溢出、且右移为非负数时严格成立。"
    }
  ],
  questions: [
    {
      id: "q3-01",
      title: "只用原栈实现 O(1) 的 getMax",
      source: "第三章作业 · 第 1 题",
      kind: "作业",
      star: true,
      statement: `<p>给定一个只保存 int 的栈 S，原有 push(x)、pop()、top()。在不增加新的容器类数据结构的前提下，重写必要操作并增加 <code>getMax()</code>，要求所有操作均为 O(1)。可以在原栈中额外压入辅助整数，无需考虑栈空或栈满。</p>`,
      answer: `<p><strong>思路</strong>：每个真实值后面跟一个“当前前缀最大值”。栈内容形如</p>
<span class="formula">x<sub>1</sub>, M<sub>1</sub>, x<sub>2</sub>, M<sub>2</sub>, …, x<sub>k</sub>, M<sub>k</sub>，M<sub>i</sub>=max(x<sub>1</sub>,…,x<sub>i</sub>)</span>
<p>这样栈顶永远是全局最大值；弹出一对后，上一组最大值自然恢复。</p>
<pre><code>void push(int x) {
    int m = x;
    if (!S.empty() &amp;&amp; S.top() &gt; m) m = S.top();
    S.push(x);   // 真实值
    S.push(m);   // 前缀最大值
}
int pop() {
    S.pop();          // 先弹辅助最大值
    int x = S.top();
    S.pop();          // 再弹真实值
    return x;
}
int top() {
    int m = S.top();
    S.pop();          // 暂时取下最大值
    int x = S.top();
    S.push(m);        // 恢复
    return x;
}
int getMax() {
    return S.top();
}</code></pre>
<p>各操作只做常数次 push/pop，均为 O(1)；额外空间为每个元素一个辅助整数，O(n)。</p>`,
      note: "关键在 top()：不能直接读栈顶下两个元素，必须先弹出辅助值、读完真实值再压回。"
    },
    {
      id: "q3-02",
      title: "n 对括号的合法序列数与 n=3 的全部序列",
      source: "第三章作业 · 第 2 题",
      kind: "作业",
      star: true,
      statement: `<p>由 n 对左右括号组成的字符串，若任意前缀中左括号数都不少于右括号数，且最终数量相等，则称合法。求长度为 2n 的合法序列数，写出递推关系、初始条件与通项公式，并列出 n=3 的全部合法序列。</p>`,
      answer: `<p><strong>初始条件</strong>：F(0)=1（空串），F(1)=1。</p>
<p><strong>递推关系</strong>：考虑第一个左括号与它匹配的右括号之间的部分。设第一对括号内部包含 i−1 对括号，则其右侧有 n−i 对，两部分互相独立：</p>
<span class="formula">F(n) = Σ<sub>i=1</sub><sup>n</sup> F(i−1)·F(n−i)</span>
<p><strong>通项公式</strong>（Catalan 数）：</p>
<span class="formula">F(n) = (1/(n+1))·C(2n, n) = C(2n, n) − C(2n, n+1)</span>
<p>n=1,2,3 时分别为 1, 2, 5。n=3 的全部 5 个合法序列：</p>
<ol>
<li><code>((()))</code></li>
<li><code>(()())</code></li>
<li><code>(())()</code></li>
<li><code>()(())</code></li>
<li><code>()()()</code></li>
</ol>
<p>它与“n 个元素依次入栈的出栈序列数”是同一个计数问题：左括号对应入栈，右括号对应出栈。</p>`,
      note: "枚举时按“第一个左括号的匹配位置”分类，可以做到不重不漏，正好对应递推式。"
    },
    {
      id: "q3-03",
      title: "双栈实现浏览器的后退与前进",
      source: "第三章作业 · 第 3 题",
      kind: "作业",
      star: true,
      statement: `<p>浏览器用两个栈实现前进/后退：Back 保存可后退页面，Forward 保存可前进页面，current 为当前页面。访问新页面时，原 current 压入 Back，并清空 Forward。</p>
<p>（1）仅用 push、pop、empty 描述 visit(p)、back()、forward()。<br>（2）初始 current=Home、两栈为空，依次执行 <code>visit(A), visit(B), back(), visit(C), back(), forward(), back()</code>，求最后的 current 及两栈内容（从栈底到栈顶）。</p>`,
      answer: `<p><strong>（1）伪代码</strong></p>
<pre><code>void visit(Page p) {
    Back.push(current);
    current = p;
    while (!Forward.empty()) Forward.pop();
}
void back() {
    if (Back.empty()) return;
    Forward.push(current);
    current = Back.pop();
}
void forward() {
    if (Forward.empty()) return;
    Back.push(current);
    current = Forward.pop();
}</code></pre>
<p><strong>（2）逐步模拟</strong></p>
<table>
<tr><th>操作</th><th>current</th><th>Back（底→顶）</th><th>Forward（底→顶）</th></tr>
<tr><td>初始</td><td>Home</td><td>[]</td><td>[]</td></tr>
<tr><td>visit(A)</td><td>A</td><td>[Home]</td><td>[]</td></tr>
<tr><td>visit(B)</td><td>B</td><td>[Home, A]</td><td>[]</td></tr>
<tr><td>back()</td><td>A</td><td>[Home]</td><td>[B]</td></tr>
<tr><td>visit(C)</td><td>C</td><td>[Home, A]</td><td>[]</td></tr>
<tr><td>back()</td><td>A</td><td>[Home]</td><td>[C]</td></tr>
<tr><td>forward()</td><td>C</td><td>[Home, A]</td><td>[]</td></tr>
<tr><td>back()</td><td>A</td><td>[Home]</td><td>[C]</td></tr>
</table>
<p>最终：<strong>current = A</strong>，Back = <strong>[Home]</strong>，Forward = <strong>[C]</strong>。</p>`,
      note: "visit 必须清空 Forward；back/forward 在对应栈空时什么也不做（不能让 current 变成空）。"
    },
    {
      id: "q3-04",
      title: "两个栈实现队列（含均摊复杂度与模拟）",
      source: "第三章作业 · 第 4 题",
      kind: "作业",
      star: true,
      statement: `<p>用两个普通栈 S1、S2 实现队列的 enQueue(x)、deQueue()、isEmpty()。</p>
<p>（1）说明两栈各保存什么，写出伪代码。<br>（2）分析单次操作的最坏复杂度。<br>（3）依次执行 <code>enQueue(5), enQueue(8), deQueue(), enQueue(2), enQueue(7), deQueue(), deQueue()</code>，写出每次 deQueue 的返回值及最终队列内容。</p>`,
      answer: `<p><strong>（1）思路</strong>：S1 只负责入队，S2 只负责出队。S2 不空时直接弹 S2；S2 空时把 S1 全部倒入 S2，顺序正好反转成队头在顶。</p>
<pre><code>void enQueue(int x) {
    push(S1, x);
}
int deQueue() {
    if (!isEmpty(S2)) return pop(S2);
    while (!isEmpty(S1)) push(S2, pop(S1));
    return pop(S2);
}
bool isEmpty() {
    return isEmpty(S1) &amp;&amp; isEmpty(S2);
}</code></pre>
<p><strong>（2）复杂度</strong>：enQueue 最坏 O(1)；deQueue 最坏 O(n)（需要整体搬移），但每个元素一生最多从 S1 搬到 S2 一次，因此<strong>均摊 O(1)</strong>。空间 O(n)。</p>
<p><strong>（3）模拟</strong></p>
<table>
<tr><th>操作</th><th>S1（底→顶）</th><th>S2（底→顶）</th><th>返回</th></tr>
<tr><td>enQueue(5)</td><td>[5]</td><td>[]</td><td>—</td></tr>
<tr><td>enQueue(8)</td><td>[5, 8]</td><td>[]</td><td>—</td></tr>
<tr><td>deQueue()</td><td>[]</td><td>[8]</td><td>5</td></tr>
<tr><td>enQueue(2)</td><td>[2]</td><td>[8]</td><td>—</td></tr>
<tr><td>enQueue(7)</td><td>[2, 7]</td><td>[8]</td><td>—</td></tr>
<tr><td>deQueue()</td><td>[2, 7]</td><td>[]</td><td>8</td></tr>
<tr><td>deQueue()</td><td>[]</td><td>[7]</td><td>2</td></tr>
</table>
<p>三次返回依次为 <strong>5、8、2</strong>，最终队列（队头→队尾）为 <strong>[7]</strong>。</p>`,
      note: "常见错误：每次 deQueue 都把 S1 倒进 S2，导致顺序反复颠倒；正确做法是 S2 非空时绝不动它。"
    },
    {
      id: "q3-05",
      title: "课件练习：出栈序列、循环队列尾指针、栈队列模拟",
      source: "第三章课件 · 练习",
      kind: "课件练习",
      statement: `<p>（1）1,2,…,n 顺序入栈，输出序列为 p<sub>1</sub>,…,p<sub>n</sub>，若 p<sub>1</sub>=n，则 p<sub>i</sub>=？<br>（2）数组 A[m] 存放循环队列元素，头指针 front，当前有 k 个元素，尾指针为？<br>（3）a,b,c,d,e,f 依次通过栈 S，一个元素出栈后立即进入队列 Q；若出队顺序为 b,d,c,f,e,a，写出进栈/出栈顺序。</p>`,
      answer: `<p><strong>（1）</strong> p<sub>1</sub>=n 说明 n 最先出栈，即 1…n 已全部入栈。之后只能从栈顶依次弹出，故</p>
<span class="formula">p<sub>i</sub> = n − i + 1</span>
<p>整个输出序列就是 n, n−1, …, 1。</p>
<p><strong>（2）</strong> 尾指针指向待入队位置，从 front 起数 k 个元素后到达：</p>
<span class="formula">rear = (front + k) % m</span>
<p><strong>（3）</strong> 队列顺序就是出栈顺序。逐步模拟：</p>
<ol>
<li>push a, push b, pop b（队列 b）；</li>
<li>push c, push d, pop d, pop c（队列 d,c）；</li>
<li>push e, push f, pop f, pop e（队列 f,e）；</li>
<li>pop a（队列 a）。</li>
</ol>
<p>操作序列：<code>push a, push b, pop b, push c, push d, pop d, pop c, push e, push f, pop f, pop e, pop a</code>。</p>`,
      note: "第（3）题先由队列顺序反推出栈顺序；每次出栈的元素必须当时在栈顶，这是唯一的约束。"
    },
    {
      id: "q3-06",
      title: "判断出栈序列是否合法（含 OJ 堆栈基本操作）",
      source: "第三章课件 / 前三章习题讲解 · OJ",
      kind: "补充",
      star: true,
      statement: `<p>将 1,2,…,n 按顺序入栈，入栈和出栈可以交替进行。给定目标序列，判断它能否成为最终出栈序列；若可以，输出一组合法操作（PUSH x / POP x），否则输出 NO。目标序列中可能出现不在 1…n 范围内的数。样例：n=7，目标 <code>4 5 3 6 2 7 1</code>。</p>`,
      answer: `<p><strong>先做合法性检查</strong>：每个数必须在 [1,n] 内且互不重复，否则直接 NO。</p>
<p><strong>模拟算法</strong>：依次考虑目标中的每个数 a<sub>i</sub>：</p>
<ul>
<li>若 a<sub>i</sub> 尚未入栈，从下一个未入栈的数开始依次压栈，直到把 a<sub>i</sub> 压入；</li>
<li>若此时 a<sub>i</sub> 在栈顶，弹出；</li>
<li>否则（不在栈顶或已经出过栈）无解，输出 NO。</li>
</ul>
<pre><code>int nxt = 1;
for (int i = 1; i &lt;= n; i++) {
    while (nxt &lt;= a[i]) {
        push(nxt);
        printf("PUSH %d\n", nxt);
        nxt++;
    }
    if (st.top() == a[i]) {
        printf("POP %d\n", a[i]);
        st.pop();
    } else {
        puts("NO");
        return 0;
    }
}</code></pre>
<p>样例操作：push 1,2,3,4 → pop 4；push 5 → pop 5,3；push 6 → pop 6,2；push 7 → pop 7,1。</p>
<p><strong>正确性</strong>：若目标元素 x 已在栈中却不在栈顶，想弹出 x 必须先弹出栈顶 y，而下一个目标不是 y，矛盾；若 x 已出过栈，每个数只能出栈一次，也矛盾。因此模拟失败必然不合法。每个数至多入栈、出栈各一次，时间 O(n)。</p>`,
      note: "考试常考“判断合法性”而不要求输出操作；此时可以只返回 true/false，逻辑相同。"
    },
    {
      id: "q3-07",
      title: "补充：单调栈求下一个更大元素",
      source: "前三章习题讲解 · 第三章补充题",
      kind: "补充",
      star: true,
      statement: `<p>给定长度为 n 的序列 a<sub>1</sub>…a<sub>n</sub>，对每个 i&lt;n 求最小的 j&gt;i 使 a<sub>j</sub>&gt;a<sub>i</sub>，不存在则答案为 0。样例 <code>3,1,3,4,3,2,1,5,6</code>。</p>`,
      answer: `<p><strong>暴力</strong>：对每个 i 向右扫描，O(n²)，且大量位置会重复扫描同一个更大值。</p>
<p><strong>单调栈</strong>：维护下标栈，栈内对应值从栈底到栈顶单调不增，表示尚未找到答案的位置。</p>
<pre><code>for (int j = 1; j &lt;= n; j++) {
    while (!st.empty() &amp;&amp; a[st.top()] &lt; a[j]) {
        ans[st.top()] = j;   // j 是栈顶位置右边第一个更大值
        st.pop();
    }
    st.push(j);
}
// 扫描结束后仍在栈中的位置 ans 保持 0</code></pre>
<p><strong>样例结果</strong>：</p>
<table>
<tr><th>i</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
<tr><td>a<sub>i</sub></td><td>3</td><td>1</td><td>3</td><td>4</td><td>3</td><td>2</td><td>1</td><td>5</td><td>6</td></tr>
<tr><td>答案 j</td><td>4</td><td>3</td><td>4</td><td>8</td><td>8</td><td>8</td><td>8</td><td>9</td><td>0</td></tr>
</table>
<p>每个下标最多入栈、出栈一次，时间 O(n)，空间 O(n)。</p>`,
      note: "求“下一个更大”用单调不增栈；求“下一个更小”把比较符号反过来即可。栈中必须存下标。"
    },
    {
      id: "q3-08",
      title: "补充：单调队列求滑动窗口最值",
      source: "前三章习题讲解 · OJ 滑动窗口",
      kind: "补充",
      star: true,
      statement: `<p>给定长度 n≤10<sup>6</sup> 的数组和窗口大小 k，窗口从左向右每次移动一格，求每个窗口的最小值与最大值。样例：n=8, k=3，数组 <code>1 3 -1 -3 5 3 6 7</code>。</p>`,
      answer: `<p><strong>关键观察</strong>：若 i&lt;j 且 a<sub>i</sub>≥a<sub>j</sub>，则 a<sub>i</sub> 比 a<sub>j</sub> 更早离开窗口，且值不更优，所以 a<sub>i</sub> 永远不可能再成为后续窗口的最小值，可以立即淘汰。</p>
<p>用双端队列存下标，维护：下标递增、对应值从队首到队尾递增。</p>
<pre><code>deque&lt;int&gt; q;
for (int i = 1; i &lt;= n; i++) {
    while (!q.empty() &amp;&amp; q.front() &lt;= i - k) q.pop_front(); // 队首过期
    while (!q.empty() &amp;&amp; a[q.back()] &gt;= a[i]) q.pop_back();  // 队尾淘汰
    q.push_back(i);
    if (i &gt;= k) cout &lt;&lt; a[q.front()] &lt;&lt; " ";
}</code></pre>
<p>求最大值时把 <code>&gt;=</code> 改为 <code>&lt;=</code>，维护递减队列。每个元素最多入队、出队各一次，总时间 O(n)。</p>
<p>样例输出：最小值 <code>-1 -3 -3 -3 3 3</code>；最大值 <code>3 3 5 5 6 7</code>。</p>`,
      note: "窗口长度为 k 时，下标 i 有效范围是 [i−k+1, i]；队首下标 ≤ i−k 即已过期。"
    },
    {
      id: "q3-09",
      title: "中缀转后缀并求值：31*(5−22)+70",
      source: "第三章课件 · 表达式求值",
      kind: "课件练习",
      star: true,
      statement: `<p>将中缀表达式 <code>31*(5−22)+70</code> 转换为后缀表达式，并用栈求值，写出每一步栈的变化。</p>`,
      answer: `<p><strong>转后缀</strong>：先按优先级加括号 <code>((31*(5−22))+70)</code>，把运算符移到对应右括号后，去括号得</p>
<span class="formula">31 5 22 − * 70 +</span>
<p><strong>求值过程</strong></p>
<table>
<tr><th>读入</th><th>操作</th><th>栈（底→顶）</th></tr>
<tr><td>31</td><td>压栈</td><td>[31]</td></tr>
<tr><td>5</td><td>压栈</td><td>[31, 5]</td></tr>
<tr><td>22</td><td>压栈</td><td>[31, 5, 22]</td></tr>
<tr><td>−</td><td>弹 22、5，算 5−22=−17，压栈</td><td>[31, −17]</td></tr>
<tr><td>*</td><td>弹 −17、31，算 31×(−17)=−527，压栈</td><td>[−527]</td></tr>
<tr><td>70</td><td>压栈</td><td>[−527, 70]</td></tr>
<tr><td>+</td><td>弹 70、−527，算 −527+70=−457</td><td>[−457]</td></tr>
</table>
<p>结果 <strong>−457</strong>。</p>`,
      note: "遇到运算符时先弹出的是右操作数；若写成 22−5 会得到错误的正数。"
    },
    {
      id: "q3-10",
      title: "思考：两个队列如何模拟一个栈",
      source: "第三章课件 · 思考题",
      kind: "课件练习",
      statement: `<p>如何用两个队列模拟一个栈？要求给出入栈、出栈的思路并分析复杂度。</p>`,
      answer: `<p><strong>思路</strong>：始终保持一个队列为空，另一个队列存放全部元素。</p>
<ul>
<li><strong>入栈</strong>：把元素压入非空队列（都空时任选一个）；</li>
<li><strong>出栈</strong>：把非空队列的前 n−1 个元素依次出队并放入另一个队列，剩下的最后一个元素出队即为栈顶；然后交换两队列角色；</li>
<li><strong>取栈顶</strong>：同样搬移，但把最后一个元素记录后再放回。</li>
</ul>
<p><strong>复杂度</strong>：入栈 O(1)，出栈 O(n)，空间 O(n)。也可以反过来设计“入栈 O(n)、出栈 O(1)”的版本：入栈时先把新元素放入空队列，再把另一队列全部搬过来。</p>`,
      note: "队列只能从队头删除，因此要取出“最后进来的”，必须先把前面 n−1 个搬走，这正是代价所在。"
    },
    {
      id: "q3-11",
      title: "课件应用：数制转换与括号匹配",
      source: "第三章课件 · 栈的应用",
      kind: "课件练习",
      statement: `<p>（1）用栈把十进制 1348 转换为八进制，写出过程。<br>（2）判断括号串 <code>([]{})([)]</code> 是否匹配，说明扫描过程。</p>`,
      answer: `<p><strong>（1）</strong> 反复除 8 取余：</p>
<table>
<tr><th>N</th><th>N div 8</th><th>N mod 8</th></tr>
<tr><td>1348</td><td>168</td><td>4</td></tr>
<tr><td>168</td><td>21</td><td>0</td></tr>
<tr><td>21</td><td>2</td><td>5</td></tr>
<tr><td>2</td><td>0</td><td>2</td></tr>
</table>
<p>余数依次 4,0,5,2 压栈，弹出顺序 2,5,0,4，故 (1348)<sub>10</sub>=(2504)<sub>8</sub>。</p>
<p><strong>（2）</strong> 扫描：<code>(</code> 入栈；<code>[</code> 入栈；<code>]</code> 与栈顶 <code>[</code> 匹配，弹出；<code>{</code> 入栈；<code>}</code> 匹配弹出；<code>)</code> 与栈顶 <code>(</code> 匹配弹出；<code>[</code> 入栈；<code>)</code> 与栈顶 <code>[</code> 类型不符 → <strong>不匹配</strong>。</p>`,
      note: "括号匹配不仅要求数量相等，还要求类型与嵌套顺序正确；本题最后一步败在类型不符。"
    }
  ],
  cheats: [
    {
      title: "栈与队列核心对照",
      html: `<table>
<tr><th></th><th>栈</th><th>队列</th></tr>
<tr><td>特性</td><td>LIFO 后进先出</td><td>FIFO 先进先出</td></tr>
<tr><td>操作端</td><td>同一端（栈顶）</td><td>队尾进、队头出</td></tr>
<tr><td>顺序实现</td><td>top=−1；满 top=m−1</td><td>循环队列，少用一个单元</td></tr>
<tr><td>链式实现</td><td>头部插入删除，无需头结点</td><td>头删尾插，需 front/rear</td></tr>
<tr><td>基本操作</td><td>O(1)</td><td>O(1)</td></tr>
<tr><td>典型应用</td><td>递归、括号、表达式、DFS、回溯</td><td>调度、缓冲、BFS</td></tr>
</table>`
    },
    {
      title: "循环队列与计数公式",
      html: `<table>
<tr><th>项目</th><th>公式</th></tr>
<tr><td>空队</td><td>front == rear</td></tr>
<tr><td>满队（少用一个单元）</td><td>(rear + 1) % m == front</td></tr>
<tr><td>元素个数</td><td>(rear − front + m) % m</td></tr>
<tr><td>已知 k 个元素求 rear</td><td>(front + k) % m</td></tr>
<tr><td>入队</td><td>A[rear]=x; rear=(rear+1)%m</td></tr>
<tr><td>出队</td><td>x=A[front]; front=(front+1)%m</td></tr>
<tr><td>出栈序列数</td><td>Catalan：F(n)=ΣF(i−1)F(n−i)=(1/(n+1))C(2n,n)</td></tr>
</table>`
    },
    {
      title: "表达式与合法性检查清单",
      html: `<ul>
<li>中缀转后缀：操作数直接输出；左括号入栈；右括号弹到左括号；运算符按优先级“≥ 就弹”。</li>
<li>后缀求值：操作数入栈；遇运算符弹两个，<strong>先右后左</strong>。</li>
<li>出栈合法性：模拟压栈，栈顶等于目标就弹出；最终栈空才合法。</li>
<li>括号匹配：右括号看栈顶类型；结束栈必须空。</li>
<li>两栈模拟队列：S2 非空不搬；均摊 O(1)。</li>
<li>两队列模拟栈：搬 n−1 个，剩下的出队。</li>
<li>BFS 用队列求最短路；DFS 用栈，不保证最短。</li>
</ul>`
    }
  ]
});
