window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch2",
  num: "02",
  title: "线性表",
  subtitle: "顺序表 · 单链表 · 双链表 · 循环链表",
  pdf: "assets/slide/第2章线性表.pdf",
  intro: "线性表是最基础的线性结构。本章的核心不是背 API，而是掌握两种存储实现的代价差异：顺序表随机访问快、插删要搬元素；链表插删只改指针、按下标访问慢。作业三道题都是链表指针操作与双指针技巧。",
  links: [
    { label: "第二章作业", href: "assets/hw/第二章作业.pdf" },
    { label: "前三章习题讲解", href: "assets/hw/前三章作业习题讲解.pdf" }
  ],
  knowledge: [
    {
      id: "k2-01",
      title: "线性表的逻辑特征",
      tags: ["定义", "逻辑结构"],
      body: `<p>线性表是由 n（n≥0）个<strong>相同类型</strong>数据元素组成的有限序列，记作 (a<sub>0</sub>, a<sub>1</sub>, …, a<sub>n−1</sub>)。</p>
<ul>
<li>有唯一的首结点（无前驱）和尾结点（无后继）；</li>
<li>除首尾外，每个元素有且仅有一个直接前驱和一个直接后继；</li>
<li>元素有确定的位置，下标范围 [0, n−1]；</li>
<li>n 为表长，n=0 时为空表。</li>
</ul>
<p>“相同类型”与“有限”是关键：元素类型一致才能统一存储与运算。</p>`,
      tip: "线性表是逻辑结构；顺序表和链表是它的两种存储实现，不要把二者混为一谈。"
    },
    {
      id: "k2-02",
      title: "线性表 ADT 的运算分类",
      tags: ["ADT", "操作"],
      body: `<p>线性表的运算通常分四类：</p>
<ul>
<li><strong>创建/销毁</strong>：构造函数、析构函数；</li>
<li><strong>信息查询</strong>：求长度、判空、按位置取元素、按值找位置；</li>
<li><strong>修改结构</strong>：插入、删除、修改、清空、追加；</li>
<li><strong>辅助管理</strong>：遍历、复制等。</li>
</ul>
<p>ADT 只规定“有哪些运算、语义是什么”，不规定用数组还是指针实现。顺序表和链表给出同一组运算的两种实现，复杂度不同。</p>`,
      tip: "答题时先写清运算语义与边界（位置范围、空表、表满），再写实现。"
    },
    {
      id: "k2-03",
      title: "顺序表（向量）：连续存储与随机访问",
      tags: ["顺序表", "存储结构"],
      body: `<p>顺序表用一组<strong>地址连续</strong>的存储单元依次存放元素，逻辑相邻即物理相邻。若首地址为 base、每个元素占 L 字节，则第 i 个元素地址为 base+i·L，因此可以<strong>O(1) 随机访问</strong>。</p>
<pre><code>template &lt;class T&gt;
class arrList {
    T *aList;      // 动态数组
    int maxSize;   // 容量
    int curLen;    // 当前长度
};</code></pre>
<p>顺序表既可以静态数组实现（长度固定），也可以动态数组实现（容量不足时扩容并搬移）。</p>`,
      tip: "顺序表的“随机访问”指按下标 O(1)，不是“按值查找 O(1)”；按值查找仍要顺序扫描。"
    },
    {
      id: "k2-04",
      title: "顺序表插入/删除的平均移动次数",
      tags: ["顺序表", "复杂度", "平均分析"],
      body: `<p>长度为 n 的顺序表，在下标 i（0≤i≤n）处插入，需要把 i…n−1 共 n−i 个元素后移；若 n+1 个插入位置等概率，平均移动</p>
<span class="formula">(1/(n+1))·Σ<sub>i=0</sub><sup>n</sup>(n−i) = n/2</span>
<p>删除下标 i（0≤i&lt;n）需要把 i+1…n−1 共 n−i−1 个元素前移；n 个位置等概率时平均移动</p>
<span class="formula">(1/n)·Σ<sub>i=0</sub><sup>n−1</sup>(n−i−1) = (n−1)/2</span>
<p>两者都是 Θ(n)，所以顺序表的插入/删除最坏与平均均为 O(n)。在表尾插入/删除是 O(1)。</p>`,
      tip: "插入有 n+1 个合法位置，删除只有 n 个；平均移动公式的分子分母不要弄反。"
    },
    {
      id: "k2-05",
      title: "顺序表的优缺点",
      tags: ["顺序表", "优缺点"],
      body: `<p><strong>优点</strong>：</p>
<ul>
<li>不用指针，无额外指针开销，存储密度高；</li>
<li>支持按下标随机访问，取/改第 i 个元素 O(1)；</li>
<li>存储连续，缓存友好。</li>
</ul>
<p><strong>缺点</strong>：</p>
<ul>
<li>长度固定（静态）或扩容要整体搬移（动态）；</li>
<li>插入/删除平均要移动一半元素，代价 O(n)；</li>
<li>需要连续的大块空间，容易产生碎片。</li>
</ul>
<p>适合<strong>静态数据</strong>、以查询为主、很少在中间插删的场景。</p>`,
      tip: "顺序表“长度固定”是静态实现的缺点；动态数组虽可扩容，但扩容本身是 O(n)。"
    },
    {
      id: "k2-06",
      title: "单链表结点结构与头指针/头结点",
      tags: ["单链表", "头结点"],
      body: `<pre><code>struct ListNode {
    T data;
    ListNode *next;
};</code></pre>
<p>每个结点由数据域和指针域组成，next 指向直接后继；尾结点的 next 为 NULL。结点物理上不必相邻，逻辑关系完全由指针表达。</p>
<p><strong>头指针</strong>指向链表第一个结点，是访问链表的入口；<strong>头结点</strong>是额外增设的哨兵结点，其 data 不存有效元素，next 指向首元素。</p>
<ul>
<li>带头结点：空表条件 head→next == NULL；在表头插删与普通位置一致，无需特判。</li>
<li>不带头结点：空表条件 head == NULL；在表头插删要修改 head 本身。</li>
</ul>`,
      tip: "作业第 2 题明确“不带头结点”，第 1、3 题是“带头结点”；写代码前先确认，否则边界会错。"
    },
    {
      id: "k2-07",
      title: "单链表的插入与删除：先连后断",
      tags: ["单链表", "指针操作"],
      body: `<p>在 p 所指结点之后插入 q：</p>
<pre><code>q-&gt;next = p-&gt;next;   // ① 先让 q 接上后继
p-&gt;next = q;         // ② 再让 p 指向 q</code></pre>
<p>顺序不能反：若先执行 p→next=q，就丢失了原来的后继地址。</p>
<p>删除 p 的后继 d：</p>
<pre><code>d = p-&gt;next;
p-&gt;next = d-&gt;next;
delete d;</code></pre>
<p>删除前提是 p 存在且 p 不是尾结点。若要删除 p 本身，必须知道 p 的前驱（单链表不能“原地”找前驱）。</p>`,
      tip: "单链表插入/删除的关键是“先保存后继，再改指针”；画图确认每一步后哪些指针还有效。"
    },
    {
      id: "k2-08",
      title: "双链表：插入与删除的四步指针",
      tags: ["双链表", "指针操作"],
      body: `<pre><code>struct DblListNode {
    T data;
    DblListNode *prev, *next;
};</code></pre>
<p>在 p 之后插入 q（q 为新结点）：</p>
<pre><code>q-&gt;next = p-&gt;next;
q-&gt;prev = p;
p-&gt;next-&gt;prev = q;   // 若 p 有后继
p-&gt;next = q;</code></pre>
<p>删除 p：</p>
<pre><code>p-&gt;prev-&gt;next = p-&gt;next;
p-&gt;next-&gt;prev = p-&gt;prev;
delete p;</code></pre>
<p>双链表可以 O(1) 找到前驱，因此删除给定结点、双向遍历都方便；代价是每个结点多一个指针，存储密度更低。</p>`,
      tip: "双链表插入的四步中，修改 p→next→prev 必须在前两步之后、p→next=q 之前完成，否则会丢链。"
    },
    {
      id: "k2-09",
      title: "循环链表",
      tags: ["循环链表"],
      body: `<p>循环链表中尾结点的 next 指向头结点（或首结点），整个链表形成一个环。</p>
<ul>
<li>带头结点的循环单链表：空表时 head→next == head；</li>
<li>不带头结点：空表时 head == NULL；</li>
<li>遍历终止条件不是 NULL，而是“回到起点”；</li>
<li>若只设尾指针 rear，则 rear→next 是头结点，取表头、表尾都 O(1)。</li>
</ul>
<p>循环双链表中，头结点的 prev 指向尾结点，尾结点的 next 指向头结点，形成双向环。</p>`,
      tip: "循环链表遍历必须用“是否回到起点”判断结束；照搬 NULL 判断会死循环。"
    },
    {
      id: "k2-10",
      title: "顺序表与链表的比较",
      tags: ["比较", "选型"],
      body: `<table>
<tr><th>操作/特性</th><th>顺序表</th><th>单链表</th></tr>
<tr><td>按下标访问</td><td>O(1)</td><td>O(n)</td></tr>
<tr><td>按值查找</td><td>O(n)</td><td>O(n)</td></tr>
<tr><td>表头插入/删除</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>表尾插入/删除</td><td>O(1)（有尾指针/不扩容）</td><td>O(n)（无尾指针）</td></tr>
<tr><td>中间插入/删除</td><td>O(n)（搬移）</td><td>O(1)（已知前驱）</td></tr>
<tr><td>空间</td><td>连续、可能预留/浪费</td><td>离散、按需分配、有指针开销</td></tr>
<tr><td>存储密度</td><td>接近 1</td><td>E/(P+E) &lt; 1</td></tr>
<tr><td>长度变化</td><td>固定或扩容搬移</td><td>动态，方便</td></tr>
</table>
<p>结论：<strong>静态、查询多</strong>选顺序表；<strong>动态、插删多</strong>选链表。</p>`,
      tip: "“链表插入 O(1)”的前提是已经拿到插入位置的前驱指针；若还要先按位置查找，总代价仍是 O(n)。"
    },
    {
      id: "k2-11",
      title: "链表常用技巧：哑结点、快慢指针、就地逆置、双指针",
      tags: ["技巧", "双指针"],
      body: `<ul>
<li><strong>哑结点（哨兵）</strong>：统一空表、表头插删的处理，减少特判。</li>
<li><strong>快慢指针</strong>：快指针每次两步、慢指针一步，可找中点、判环、找环入口。</li>
<li><strong>就地逆置</strong>：维护 prev/cur/next 三个指针，逐个把 cur→next 改为 prev，O(n) 时间、O(1) 空间。</li>
<li><strong>双指针找交点</strong>：先求两表长度并对齐，或让两指针走完本表后跳到另一表头，第二次相遇即交点。</li>
<li><strong>三指针</strong>：逆置、删除、合并时同时保存前驱、当前、后继，避免断链。</li>
</ul>`,
      tip: "快慢指针找中点时，循环条件写 fast && fast→next；偶数个结点返回后一个中点，正好是 slow 停下的位置。"
    },
    {
      id: "k2-12",
      title: "链表边界与常见错误",
      tags: ["易错", "边界"],
      body: `<ul>
<li><strong>空表</strong>：不带头结点时 head==NULL，带头结点时 head→next==NULL；先判空再访问 data。</li>
<li><strong>单结点</strong>：删除/逆置后要正确置空，避免悬空指针。</li>
<li><strong>头尾操作</strong>：在表头插入要更新 head；在表尾删除要知道前驱。</li>
<li><strong>指针丢失</strong>：改指针前先保存后继。</li>
<li><strong>释放后使用</strong>：delete 后不要再访问该结点。</li>
<li><strong>环</strong>：无环假设下才能用“走到 NULL”遍历；有环要先判环。</li>
</ul>`,
      tip: "写链表代码前先在纸上画 0 个、1 个、2 个结点的三种情况，逐行模拟指针变化。"
    },
    {
      id: "k2-13",
      title: "存储密度",
      tags: ["存储密度", "空间"],
      body: `<p>存储密度定义为数据本身占用的空间与结点总占用空间之比：</p>
<span class="formula">ρ = 数据域大小 / (数据域 + 指针域) = E/(P+E)</span>
<p>顺序表没有指针域，ρ≈1；单链表每个结点多一个指针，ρ&lt;1；双链表多两个指针，ρ 更低。存储密度高不等于时间效率高，选择结构时要综合操作频度。</p>`,
      tip: "存储密度只算结点内部的数据/指针，不算头指针、头结点等额外开销。"
    }
  ],
  questions: [
    {
      id: "q2-01",
      title: "带头结点单链表原地逆置（O(1) 额外空间）",
      source: "第二章作业 · 第 1 题",
      kind: "作业",
      star: true,
      statement: `<p>给定一个带头结点的单链表 L，设计算法将链表中所有元素<strong>原地逆置</strong>，要求只使用 O(1) 的额外空间。</p>`,
      answer: `<p><strong>三指针法</strong>：保留头结点，依次把每个数据结点的 next 反向。</p>
<pre><code>void reverse(Node *L) {
    Node *prev = NULL;
    Node *cur = L-&gt;next;
    while (cur != NULL) {
        Node *next = cur-&gt;next;  // 先存后继
        cur-&gt;next = prev;        // 反向
        prev = cur;
        cur = next;
    }
    L-&gt;next = prev;              // 头结点接上新首结点
}</code></pre>
<p>也可用<strong>头插法</strong>：把原链表结点依次摘下，插到头结点之后。</p>
<pre><code>void reverse2(Node *head) {
    Node *u = head-&gt;next;
    head-&gt;next = NULL;
    while (u != NULL) {
        Node *v = u-&gt;next;
        u-&gt;next = head-&gt;next;
        head-&gt;next = u;
        u = v;
    }
}</code></pre>
<p>时间 O(n)，额外空间 O(1)。</p>`,
      note: "易错：忘记最后把 L→next 指向新的首结点；或先改 cur→next 再保存后继，导致断链。"
    },
    {
      id: "q2-02",
      title: "一次遍历找单链表的中间结点（偶数取后一个）",
      source: "第二章作业 · 第 2 题",
      kind: "作业",
      star: true,
      statement: `<p>给定一个不带头结点的单链表，head 指向第一个数据结点。设计算法找到其中间结点；若结点数为偶数，返回两个中间结点中的<strong>后一个</strong>。要求只遍历链表一次。</p>`,
      answer: `<p><strong>快慢指针</strong>：慢指针每次走一步，快指针每次走两步。快指针到尾时，慢指针正好在中点。</p>
<pre><code>Node *middle(Node *head) {
    if (head == NULL) return NULL;
    Node *slow = head, *fast = head;
    while (fast != NULL &amp;&amp; fast-&gt;next != NULL) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
    }
    return slow;
}</code></pre>
<p>偶数 n=4 时，slow 停在第 3 个结点（后一个中点）；奇数 n=5 时停在第 3 个结点（正中间）。时间 O(n)，空间 O(1)。</p>`,
      note: "若题目要求偶数取前一个，可让 fast 从 head→next 出发或调整循环条件。作业原答案用计数器奇偶控制 slow 前进，本质相同。"
    },
    {
      id: "q2-03",
      title: "判断两个无环单链表是否相交并求第一个公共结点",
      source: "第二章作业 · 第 3 题",
      kind: "作业",
      star: true,
      statement: `<p>给定两个无环单链表 L、M，设计算法判断它们是否相交；若相交，找出第一个公共结点。要求 O(1) 额外空间。</p>`,
      answer: `<p><strong>方法一：长度对齐</strong></p>
<ol>
<li>分别遍历求长度 l、m；</li>
<li>长表指针先走 |l−m| 步；</li>
<li>两指针同步后移，第一次相等即为第一个公共结点；若同时到 NULL，则不相交。</li>
</ol>
<pre><code>Node *common(Node *L, Node *M) {
    int l = length(L), m = length(M);
    Node *p = L, *q = M;
    while (l &gt; m) { p = p-&gt;next; l--; }
    while (m &gt; l) { q = q-&gt;next; m--; }
    while (p != NULL &amp;&amp; q != NULL) {
        if (p == q) return p;
        p = p-&gt;next; q = q-&gt;next;
    }
    return NULL;
}</code></pre>
<p><strong>方法二：走完全程换头</strong>（更简洁）</p>
<pre><code>Node *common2(Node *L, Node *M) {
    Node *p = L, *q = M;
    while (p != q) {
        p = (p == NULL) ? M : p-&gt;next;
        q = (q == NULL) ? L : q-&gt;next;
    }
    return p;
}</code></pre>
<p>两指针都走 l+m 步，若相交会在交点相遇；若不相交会同时变为 NULL。时间 O(l+m)，空间 O(1)。</p>`,
      note: "易错：走到 NULL 后立即换头再判等，可能把“两条空链”误判为相交；应先判 p==q 再移动，或循环结束后返回 p（NULL 也可）。"
    },
    {
      id: "q2-04",
      title: "补充：判断单链表是否有环并求环入口",
      source: "前三章习题讲解 · 链表技巧补充",
      kind: "补充",
      statement: `<p>给定一个单链表，判断其中是否有环；若有，返回环的入口结点。要求 O(1) 额外空间。</p>`,
      answer: `<p><strong>判环</strong>：快慢指针。若 fast 追上 slow，则有环；若 fast 走到 NULL，则无环。</p>
<p><strong>找入口</strong>：相遇后，让一个指针回到 head，另一个留在相遇点，两指针每次各走一步，再次相遇处就是环入口。</p>
<pre><code>Node *cycleEntry(Node *head) {
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
        if (slow == fast) {
            Node *p = head;
            while (p != slow) { p = p-&gt;next; slow = slow-&gt;next; }
            return p;
        }
    }
    return NULL;
}</code></pre>
<p>原理：设头到入口距离 a、入口到相遇点距离 b、环长 c，则相遇时慢指针走 a+b，快指针走 a+b+kc，且快是慢的两倍，得 a = (k−1)c + (c−b)，故从头与从相遇点同速走会在入口相遇。</p>`,
      note: "判环必须用“指针相等”而不是“值相等”；快指针每步走两步，循环条件要防 fast→next 为空。"
    },
    {
      id: "q2-05",
      title: "推导顺序表插入、删除的平均移动次数",
      source: "第二章课件 · 顺序表操作分析",
      kind: "课件练习",
      statement: `<p>长度为 n 的顺序表，在下标 i 处插入一个元素需移动多少个元素？在等概率下平均移动多少次？删除下标 i 的元素呢？</p>`,
      answer: `<p><strong>插入</strong>：合法位置 i=0…n，需把 i…n−1 共 n−i 个元素后移。n+1 个位置等概率：</p>
<span class="formula">(1/(n+1))Σ<sub>i=0</sub><sup>n</sup>(n−i) = (1/(n+1))·n(n+1)/2 = n/2</span>
<p><strong>删除</strong>：合法位置 i=0…n−1，需把 i+1…n−1 共 n−i−1 个元素前移。n 个位置等概率：</p>
<span class="formula">(1/n)Σ<sub>i=0</sub><sup>n−1</sup>(n−i−1) = (1/n)·n(n−1)/2 = (n−1)/2</span>
<p>两者均为 Θ(n)。</p>`,
      note: "插入位置比删除多一个（表尾之后也可插入），所以平均值分母分别是 n+1 和 n。"
    },
    {
      id: "q2-06",
      title: "思考：带头结点与不带头结点、顺序表与链表如何选",
      source: "第二章课件 · 思考题",
      kind: "课件练习",
      statement: `<p>（1）带头结点的单链表与不带头结点的单链表各有什么优缺点？<br>（2）顺序表和链表应如何选择？</p>`,
      answer: `<p><strong>（1）头结点</strong></p>
<ul>
<li>带头结点：空表与非空表操作统一，表头插删不用修改 head，代码更简洁；代价是多一个结点空间，且初始化/销毁要处理。</li>
<li>不带头结点：节省一个结点；但表头插删要特判并可能修改 head，边界更多。</li>
</ul>
<p><strong>（2）选型</strong></p>
<ul>
<li>数据量已知、变化小，频繁按下标访问 → 顺序表；</li>
<li>长度动态变化、频繁在中间插删 → 链表；</li>
<li>需要连续内存/缓存友好/存储密度高 → 顺序表；</li>
<li>需要 O(1) 合并、拆分、表头操作 → 链表。</li>
</ul>`,
      note: "没有绝对“更好”的结构，只有与操作频度和规模更匹配的结构。"
    }
  ],
  cheats: [
    {
      title: "单链表/双链表操作速查",
      html: `<table>
<tr><th>操作</th><th>关键代码</th><th>注意</th></tr>
<tr><td>p 后插入 q</td><td>q→next=p→next; p→next=q;</td><td>先连后断</td></tr>
<tr><td>删除 p 的后继 d</td><td>d=p→next; p→next=d→next; delete d;</td><td>p 不能是尾</td></tr>
<tr><td>双链表 p 后插入 q</td><td>q→next=p→next; q→prev=p; p→next→prev=q; p→next=q;</td><td>四步顺序</td></tr>
<tr><td>双链表删除 p</td><td>p→prev→next=p→next; p→next→prev=p→prev;</td><td>先改外侧</td></tr>
<tr><td>就地逆置</td><td>next=cur→next; cur→next=prev; prev=cur; cur=next;</td><td>最后接 head</td></tr>
</table>`
    },
    {
      title: "复杂度对照表",
      html: `<table>
<tr><th>操作</th><th>顺序表</th><th>单链表（已知前驱）</th><th>单链表（按位置）</th></tr>
<tr><td>取第 i 个</td><td>O(1)</td><td>—</td><td>O(i)</td></tr>
<tr><td>表头插入</td><td>O(n)</td><td>O(1)</td><td>O(1)</td></tr>
<tr><td>表尾插入</td><td>O(1)*</td><td>O(1)（有尾指针）</td><td>O(n)</td></tr>
<tr><td>中间插入/删除</td><td>O(n) 搬移</td><td>O(1) 改指针</td><td>O(n) 查找 + O(1)</td></tr>
<tr><td>按值查找</td><td>O(n)</td><td>O(n)</td><td>O(n)</td></tr>
</table>
<p>* 不扩容且直接在表尾追加时。</p>`
    },
    {
      title: "链表边界检查清单",
      html: `<ul>
<li>空表：head==NULL 或 head→next==NULL？</li>
<li>单结点：删除后 head 是否置空？</li>
<li>表头：是否修改了 head/头结点？</li>
<li>表尾：p→next 是否为 NULL？</li>
<li>断链：改指针前是否保存后继？</li>
<li>释放：delete 后是否还访问该结点？</li>
<li>环：遍历是否可能死循环？</li>
</ul>`
    }
  ]
});
