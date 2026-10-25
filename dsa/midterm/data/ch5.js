window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch5",
  num: "05",
  title: "二叉树",
  subtitle: "遍历 · 性质 · BST · 堆 · Huffman",
  pdf: "assets/slide/第5章二叉树.pdf",
  intro: "二叉树是全书考点最密集的一章：性质公式、三种深度优先遍历与层序遍历、由两种序列重建二叉树、BST 的查找/插入/删除、堆的筛选与建堆、Huffman 编码。作业五道题覆盖了填序列画树、叶结点相对位置证明、Huffman 构造与编码、建堆与 O(n) 证明、三叉 Huffman。",
  links: [
    { label: "第五章作业", href: "assets/hw/第五章作业.pdf" }
  ],
  knowledge: [
    {
      id: "k5-01",
      title: "二叉树的递归定义与五种形态",
      tags: ["二叉树", "定义"],
      body: `<p>二叉树是 n（n≥0）个结点的有限集合：或为空集，或由一个根结点及两棵<strong>互不相交</strong>的、分别称为左子树和右子树的二叉树组成。</p>
<p>五种基本形态：</p>
<ol>
<li>空二叉树；</li>
<li>只有根，左右子树均空；</li>
<li>根 + 非空左子树、空右子树；</li>
<li>根 + 空左子树、非空右子树；</li>
<li>根 + 左右子树均非空。</li>
</ol>
<p>二叉树<strong>有序</strong>：左右子树不能互换，即使只有一个孩子也要区分左右。</p>`,
      tip: "二叉树不是“度至多为 2 的树”：一般树的子树不分左右，而二叉树的左/右孩子有严格区别。"
    },
    {
      id: "k5-02",
      title: "基本术语：度、层、深度、路径",
      tags: ["术语"],
      body: `<ul>
<li><strong>父母/孩子</strong>：结点的直接前驱/后继；</li>
<li><strong>兄弟</strong>：同一父母的结点；</li>
<li><strong>度</strong>：结点拥有的子树个数（0、1、2）；</li>
<li><strong>叶结点</strong>：度为 0；<strong>分支/内部结点</strong>：度大于 0；</li>
<li><strong>层数</strong>：根为第 0 层，孩子层数 = 父母层数 + 1；</li>
<li><strong>深度/高度</strong>：树中结点的最大层数（本课程根为 0 层）；</li>
<li><strong>路径长度</strong>：路径上的边数；结点的路径长度 = 其层数；</li>
<li><strong>祖先/子孙</strong>：沿父母链向上/向下可达的结点。</li>
</ul>`,
      tip: "本课程根结点层数为 0，所以 n 个结点的完全二叉树深度是 ⌊log₂n⌋；若教材根为 1 层，公式会差 1。"
    },
    {
      id: "k5-03",
      title: "满二叉树与完全二叉树",
      tags: ["满二叉树", "完全二叉树"],
      body: `<p><strong>满二叉树</strong>：每个结点或为叶结点（度 0），或有两棵非空子树（度 2）；即度为 1 的结点个数为 0。</p>
<p><strong>完全二叉树</strong>：</p>
<ul>
<li>最多只有最下面两层结点的度可以小于 2；</li>
<li>最下面一层的结点都集中在<strong>最左边、连续</strong>的位置上；</li>
<li>等价地，按层序编号 0…n−1 时，编号与满二叉树的前 n 个结点一一对应。</li>
</ul>
<p>满二叉树一定是完全二叉树，反之不成立。</p>`,
      tip: "判断完全二叉树：层序编号中间不能“空位”；只有最右下的若干位置可以缺失。"
    },
    {
      id: "k5-04",
      title: "完全二叉树的特点",
      tags: ["完全二叉树", "性质"],
      body: `<ul>
<li>叶结点只可能出现在最下面两层；</li>
<li>由根到各结点的路径长度总和，在结点数相同的二叉树中<strong>最小</strong>；</li>
<li>任意二叉树中根到结点的最长路径，不短于结点数相同的完全二叉树；</li>
<li>因此完全二叉树是“最紧凑”的形态，适合顺序存储；</li>
<li>n 个结点的完全二叉树深度为 ⌊log₂n⌋。</li>
</ul>`,
      tip: "满二叉树并不具有“路径长度总和最小”的性质；最紧凑的是完全二叉树。"
    },
    {
      id: "k5-05",
      title: "扩充二叉树与内/外部路径长度",
      tags: ["扩充二叉树", "路径长度"],
      body: `<p>把二叉树中所有空指针位置都补上一个特殊结点（空树叶/外部结点）：度为 1 的结点补 1 个，叶结点补 2 个。得到的树是<strong>满二叉树</strong>。</p>
<ul>
<li>原结点称<strong>内部结点</strong>，共 n 个；新增的称<strong>外部结点</strong>，共 n+1 个；</li>
<li><strong>内部路径长度 I</strong>：根到每个内部结点的路径长度之和；</li>
<li><strong>外部路径长度 E</strong>：根到每个外部结点的路径长度之和；</li>
<li>关系：<span class="formula">E = I + 2n</span>。</li>
</ul>
<p><strong>归纳证明</strong>：单个内部结点时 I=0、E=2，E=I+2。把一个深度 h 的外部结点替换为内部结点并添两个深度 h+1 的外部结点：I 增加 h；E 增加 2(h+1)−h=h+2。故每增加一个内部结点，E−I 增加 2，最终 E−I=2n。</p>`,
      tip: "扩充二叉树的外部结点数 = 内部结点数 + 1，与 n0=n2+1 是同一事实的两种表述。"
    },
    {
      id: "k5-06",
      title: "性质 1、2：每层最多与整树最多",
      tags: ["性质", "公式"],
      body: `<p><strong>性质 1</strong>：非空二叉树第 i 层（i≥0）至多有 <span class="formula">2<sup>i</sup></span> 个结点。</p>
<p><strong>性质 2</strong>：深度为 k（k≥0）的二叉树至多有</p>
<span class="formula">2<sup>0</sup>+2<sup>1</sup>+…+2<sup>k</sup> = 2<sup>k+1</sup>−1</span>
<p>个结点。结点最少的深度为 k 的二叉树是每层只有 1 个结点的单链，共 k+1 个结点。</p>`,
      tip: "这里深度 k 的根在第 0 层，所以满二叉树结点数是 2^{k+1}−1；不要把指数写成 k。"
    },
    {
      id: "k5-07",
      title: "性质 3：n₀ = n₂ + 1（必考证明）",
      tags: ["性质", "证明", "重点"],
      body: `<p>任何非空二叉树，叶结点数 n<sub>0</sub> 与度为 2 的结点数 n<sub>2</sub> 满足</p>
<span class="formula">n<sub>0</sub> = n<sub>2</sub> + 1</span>
<p><strong>证明</strong>：设度为 1 的结点数为 n<sub>1</sub>，总结点数</p>
<span class="formula">n = n<sub>0</sub> + n<sub>1</sub> + n<sub>2</sub></span>
<p>除根外每个结点恰有一条入边，故边数 B=n−1；另一方面边由度为 1、2 的结点发出：B=n<sub>1</sub>+2n<sub>2</sub>。联立得</p>
<span class="formula">n<sub>0</sub>+n<sub>1</sub>+n<sub>2</sub>−1 = n<sub>1</sub>+2n<sub>2</sub> ⇒ n<sub>0</sub>=n<sub>2</sub>+1</span>
<p>推论：满二叉树中叶子数比分支结点数多 1；Huffman 树（严格二叉树）同样满足。</p>`,
      tip: "证明的两个抓手：结点数与边数；边数既等于 n−1，又等于 Σ 度。"
    },
    {
      id: "k5-08",
      title: "性质 4：完全二叉树的深度",
      tags: ["性质", "深度"],
      body: `<p>具有 n 个结点的完全二叉树深度为</p>
<span class="formula">k = ⌊log<sub>2</sub> n⌋</span>
<p><strong>推导</strong>：前 k 层是满的，最少结点数 2<sup>k</sup>（前 k 层共 2<sup>k</sup>−1，再加第 k 层至少 1 个），最多 2<sup>k+1</sup>−1，故</p>
<span class="formula">2<sup>k</sup> ≤ n &lt; 2<sup>k+1</sup> ⇒ k ≤ log<sub>2</sub>n &lt; k+1 ⇒ k=⌊log<sub>2</sub>n⌋</span>`,
      tip: "n=1 时 k=0；n=2 或 3 时 k=1；n=4…7 时 k=2。用具体数验证公式最快。"
    },
    {
      id: "k5-09",
      title: "性质 5：完全二叉树的下标公式",
      tags: ["性质", "下标", "重点"],
      body: `<p>n 个结点的完全二叉树，从根开始按层、从左到右编号 0…n−1。对编号 i：</p>
<ul>
<li>父母：若 i&gt;0，为 <span class="formula">⌊(i−1)/2⌋</span>；i=0 为根，无父母；</li>
<li>左孩子：若 <span class="formula">2i+1 ≤ n−1</span>，为 2i+1；否则无左孩子；</li>
<li>右孩子：若 <span class="formula">2i+2 ≤ n−1</span>，为 2i+2；否则无右孩子；</li>
<li>左兄弟：i 为偶数且 i&gt;0 时，为 i−1；</li>
<li>右兄弟：i 为奇数且 i+1&lt;n 时，为 i+1；</li>
<li>第一个叶结点下标：⌊n/2⌋；最后一个非叶结点：⌊n/2⌋−1。</li>
</ul>`,
      tip: "所有公式的前提是“根编号 0、层序连续”。若根从 1 编号，则父母为 ⌊i/2⌋、孩子为 2i 和 2i+1。"
    },
    {
      id: "k5-10",
      title: "性质 7、8：扩充树的外部结点与 E=I+2n",
      tags: ["性质", "扩充二叉树"],
      body: `<p>在扩充二叉树中：</p>
<ul>
<li>外部结点数比内部结点数多 1：<span class="formula">N<sub>外</sub> = n + 1</span>；</li>
<li>内部路径长度 I 与外部路径长度 E 满足 <span class="formula">E = I + 2n</span>。</li>
</ul>
<p>证明思路：内部结点数 n=n<sub>0</sub>+n<sub>1</sub>+n<sub>2</sub>，由 n<sub>0</sub>=n<sub>2</sub>+1 得 n=n<sub>1</sub>+2n<sub>0</sub>−1；新增外部结点数为 n<sub>1</sub>+2n<sub>0</sub>=n+1。E=I+2n 可用上一条的“替换一个外部结点”归纳证明。</p>`,
      tip: "Huffman 树的 WPL 就是带权的外部路径长度，因此 E=I+2n 常用于推导 Huffman 的性质。"
    },
    {
      id: "k5-11",
      title: "k 叉树的空指针数：n(k−1)+1",
      tags: ["性质", "k 叉树", "重点"],
      body: `<p>具有 n 个<strong>总结点</strong>的 k 叉树，共有 nk 个指针域，其中非空指针（边）有 n−1 个，因此空指针数为</p>
<span class="formula">nk − (n−1) = n(k−1) + 1</span>
<p>k=2 时为空指针 n+1 个，正好等于扩充二叉树的内部结点数加 1。</p>
<p>注意：若题目的 n 指叶结点数，则不能直接套此式；先确认 n 的含义。</p>`,
      tip: "推导只用“总指针数 − 边数”，不要试图逐结点数；这是作业第六题的母公式。"
    },
    {
      id: "k5-12",
      title: "遍历：深度优先的三种次序",
      tags: ["遍历", "前序", "中序", "后序"],
      body: `<p>遍历是按某次序访问每个结点恰好一次，把非线性结构线性化。</p>
<ul>
<li><strong>前序</strong>：根 → 左子树 → 右子树；</li>
<li><strong>中序</strong>：左子树 → 根 → 右子树；</li>
<li><strong>后序</strong>：左子树 → 右子树 → 根；</li>
<li><strong>层序</strong>：从上到下、同层从左到右（广度优先）。</li>
</ul>
<pre><code>void preOrder(Node *t) {
    if (!t) return;
    visit(t);
    preOrder(t-&gt;left);
    preOrder(t-&gt;right);
}</code></pre>
<p>三种 DFS 的访问路径完全相同，只是访问结点的时机不同：沿递归路径每个结点经过 3 次，第 1/2/3 次经过时访问分别对应前/中/后序。</p>`,
      tip: "“左子树一定在右子树之前”对三种 DFS 都成立，这是叶结点相对位置不变的根本原因。"
    },
    {
      id: "k5-13",
      title: "遍历的复杂度与递归空间",
      tags: ["遍历", "复杂度"],
      body: `<p>每个结点访问一次，时间 O(n)。递归遍历的辅助空间来自运行栈：</p>
<ul>
<li>最好情况（平衡树）栈深 O(log n)；</li>
<li>最坏情况（单链）栈深 O(n)；</li>
<li>精确地说，树深为 k 的递归遍历需要 k+1 个辅助单元。</li>
</ul>
<p>层序遍历用队列，空间为树的最大宽度，最坏 O(n)（满二叉树最后一层约 n/2）。</p>`,
      tip: "DFS 空间看“高”，BFS 空间看“宽”；不要把两者都笼统写成 O(n) 而不说明最坏/平均。"
    },
    {
      id: "k5-14",
      title: "由遍历序列重建二叉树",
      tags: ["重建", "遍历", "重点"],
      body: `<p><strong>前序 + 中序</strong>：前序第一个是根；在中序中找到根，左边是左子树、右边是右子树；按左子树结点个数切分前序，递归。</p>
<p><strong>后序 + 中序</strong>：后序最后一个是根；其余同理。</p>
<p><strong>前序 + 后序不能唯一确定</strong>：只能确定根，无法区分只有一个孩子时它在左还是在右。</p>
<p>例：前序 AB、后序 BA，可能是 A 的左孩子 B，也可能是 A 的右孩子 B，共两棵不同的树。</p>
<p>重建递归式：<code>build(preL, preR, inL, inR)</code>，每次在中序中定位根，时间 O(n)（用哈希）或 O(n²)（线性查找）。</p>`,
      tip: "必须含中序才能唯一重建；前序+后序只有在每个结点度为 0 或 2 时才唯一。"
    },
    {
      id: "k5-15",
      title: "叶结点在三种序列中的相对位置不变",
      tags: ["遍历", "叶结点", "证明"],
      body: `<p><strong>结论</strong>：任意二叉树的所有叶结点，在前序、中序、后序序列中都按相同的相对次序出现（即从左到右的次序）。</p>
<p><strong>证明</strong>：任取两个不同的叶结点 u、v，设 w 是它们的最近公共祖先。由于 u、v 是叶结点，不可能互为祖先，故 u、v 必分别位于 w 的左、右子树（或反之）。三种深度优先遍历都遵循“左子树全部先于右子树”，所以 u、v 的先后关系在三种序列中一致。又任意两片叶子的相对次序都一致，故整体次序相同。</p>`,
      tip: "这个结论常用来“由前序和后序快速核对中叶顺序”，也可用于判断序列是否可能来自同一棵树。"
    },
    {
      id: "k5-16",
      title: "非递归遍历：栈的用法",
      tags: ["非递归", "栈", "遍历"],
      body: `<p><strong>前序</strong>：访问结点，先把右孩子压栈、再压左孩子（保证左先出栈）；或沿左链一路访问并压右孩子。</p>
<p><strong>中序</strong>：从当前结点沿左链一路压栈；左子树空时弹栈访问，再转向右子树。</p>
<pre><code>void inOrder(Node *t) {
    stack&lt;Node*&gt; st;
    while (t || !st.empty()) {
        while (t) { st.push(t); t = t-&gt;left; }
        t = st.top(); st.pop();
        visit(t);
        t = t-&gt;right;
    }
}</code></pre>
<p><strong>后序</strong>：需要知道右子树是否已访问，常用“结点 + 标记（左/右）”入栈，或记录上一个访问结点。每个结点会入/出栈两次，仍是 O(n)。</p>`,
      tip: "前序压栈“右先左后”；中序“一路向左压栈”；后序必须加状态标记，不能只靠一个指针。"
    },
    {
      id: "k5-17",
      title: "层序遍历与队列",
      tags: ["层序", "队列", "BFS"],
      body: `<p>从根开始，把根入队；每次出队一个结点并访问，然后把它的非空左、右孩子依次入队。队列的 FIFO 特性保证同层从左到右、上一层全部先于下一层。</p>
<pre><code>void levelOrder(Node *root) {
    if (!root) return;
    queue&lt;Node*&gt; q;
    q.push(root);
    while (!q.empty()) {
        Node *t = q.front(); q.pop();
        visit(t);
        if (t-&gt;left) q.push(t-&gt;left);
        if (t-&gt;right) q.push(t-&gt;right);
    }
}</code></pre>
<p>时间 O(n)，空间 O(最大宽度)。若需要按层输出，可在每轮记录当前队列大小。</p>`,
      tip: "层序用队列、DFS 用栈；把队列换成栈会变成一种“逆层序”的深度优先，不再是层序。"
    },
    {
      id: "k5-18",
      title: "二叉树的存储：二叉链表与三叉链表",
      tags: ["存储", "链表"],
      body: `<p><strong>二叉链表</strong>：每个结点存 data、left、right 三个域，空孩子用 NULL。n 个结点有 n+1 个空指针。</p>
<pre><code>struct Node {
    T data;
    Node *left, *right;
};</code></pre>
<p><strong>三叉链表</strong>：再加 parent 指针，支持 O(1) 向上访问，便于找父结点、求路径；代价是每个结点多一个指针。</p>
<p>链式存储适合任意形态的二叉树，插入/删除只改指针，但每个结点有指针开销。</p>`,
      tip: "找父结点：二叉链表需要从根遍历 O(n)，三叉链表 O(1)；这是三叉链表唯一的核心优势。"
    },
    {
      id: "k5-19",
      title: "顺序存储：只适合完全二叉树",
      tags: ["顺序存储", "下标"],
      body: `<p>按层序把结点存入数组，用下标表达父子关系（见性质 5）。</p>
<ul>
<li>完全二叉树：数组紧凑、无空洞，最省空间，且可 O(1) 定位父子；</li>
<li>非完全二叉树：必须给缺失结点留空位，单链树会浪费 O(2<sup>n</sup>) 空间；</li>
<li>顺序存储的“线性”只是物理布局，逻辑上仍是二叉树；</li>
<li>插入/删除可能引起大量搬移，动态性差。</li>
</ul>`,
      tip: "顺序存储的前提是形态稳定且接近完全；一般二叉树优先用链式存储。"
    },
    {
      id: "k5-20",
      title: "二叉搜索树（BST）的定义与中序有序性",
      tags: ["BST", "定义", "重点"],
      body: `<p>BST 或为空，或满足：对任意结点值 K，</p>
<ul>
<li>左子树（若非空）所有结点值 &lt; K；</li>
<li>右子树（若非空）所有结点值 &gt; K；</li>
<li>左右子树也分别是 BST；</li>
<li>结点值唯一（不存重复）。</li>
</ul>
<p><strong>核心性质</strong>：中序遍历 BST 得到从小到大的有序序列，因此又称二叉排序树。建立 BST 的过程相当于对关键码排序。</p>`,
      tip: "BST 的性质是“整棵左子树都小于根”，不是“左孩子小于根”；判断 BST 要用上下界或中序单调。"
    },
    {
      id: "k5-21",
      title: "BST 的查找与插入",
      tags: ["BST", "查找", "插入"],
      body: `<p><strong>查找</strong>：从根开始，K 等于当前结点则成功；小于走左，大于走右；走到空指针则失败。比较次数 = 根到目标结点的路径长度 + 1。</p>
<p><strong>插入</strong>：先执行一次失败的查找，把新结点挂在失败位置的空指针上；若值已存在则拒绝插入。</p>
<pre><code>Node* insert(Node *t, T x) {
    if (!t) return new Node(x);
    if (x &lt; t-&gt;data) t-&gt;left = insert(t-&gt;left, x);
    else if (x &gt; t-&gt;data) t-&gt;right = insert(t-&gt;right, x);
    return t;   // 相等不插入
}</code></pre>
<p>复杂度均为 O(h)，h 为树高：平衡时 O(log n)，退化成单链时 O(n)。</p>`,
      tip: "插入一定发生在叶结点位置（或空树），不会插入到内部；相同关键码不重复插入。"
    },
    {
      id: "k5-22",
      title: "BST 的删除：用前驱/后继替换",
      tags: ["BST", "删除", "易错"],
      body: `<p>先找到待删结点 p，分三种情况：</p>
<ol>
<li>p 是叶结点：直接删除；</li>
<li>p 只有一个孩子：用唯一的孩子替代 p；</li>
<li>p 有两个孩子：在左子树找中序最后一个结点（左子树最大值，即前驱）r；由于 r 没有右孩子，先用 r 的左子树替代 r，再用 r 替代 p。也可对称地用右子树最小值（后继）替换。</li>
</ol>
<p>教材另一种写法：若 p 有左子树，把 p 左子树根接到 p 的位置，再把 p 右子树接到左子树最右结点的右指针上。两种写法结果不同，但都保持 BST 性质；后者可能增加树高。</p>`,
      tip: "删除双孩子结点不是“随便找一个孩子顶替”，必须用中序前驱或后继，才能保持中序有序。"
    },
    {
      id: "k5-23",
      title: "BST 的平衡问题",
      tags: ["BST", "平衡", "复杂度"],
      body: `<p>同样的关键码集合，插入顺序不同会得到不同形态的 BST。</p>
<ul>
<li>输入 9,4,2,6,7,15,12,21：较平衡，查找 O(log n)；</li>
<li>输入 2,4,6,7,9,12,15,21：退化为单链，查找 O(n)。</li>
</ul>
<p>因此 BST 的操作代价取决于树高 h，最坏 O(n)。平衡二叉树（AVL、红黑树等）通过旋转把 h 控制在 O(log n)。</p>`,
      tip: "BST 的 O(log n) 只在“平衡”前提下成立；考试问复杂度时要说明最坏/平均。"
    },
    {
      id: "k5-24",
      title: "堆的定义与性质",
      tags: ["堆", "完全二叉树", "重点"],
      body: `<p>最小值堆是满足下列条件的关键码序列 {K<sub>0</sub>,…,K<sub>n−1</sub>}：</p>
<span class="formula">K<sub>i</sub> ≤ K<sub>2i+1</sub>，K<sub>i</sub> ≤ K<sub>2i+2</sub>（i=0…⌊n/2⌋−1）</span>
<p>最大值堆则把 ≤ 换成 ≥。</p>
<ul>
<li>堆是<strong>完全二叉树</strong>，可直接用数组存储，父子下标关系同性质 5；</li>
<li>堆是<strong>局部有序</strong>：只保证父与子的大小关系，兄弟之间无约束；</li>
<li>因此堆不唯一，也不能中序遍历得到有序序列；</li>
<li>堆顶是全局最小（或最大）值。</li>
</ul>`,
      tip: "堆只保证“顶”最优；除堆顶外，其余元素不是整体有序的。找第 k 小不能直接取数组第 k 个。"
    },
    {
      id: "k5-25",
      title: "堆的调整：向下筛选、向上筛选、建堆",
      tags: ["堆", "sift", "建堆", "复杂度"],
      body: `<p><strong>向下筛选（sift down）</strong>：把位置 i 的元素与较小（最小堆）的孩子交换，直到满足堆序或到叶。每次下降 1 层，O(log n)。</p>
<p><strong>建堆</strong>：从最后一个非叶结点 ⌊n/2⌋−1 开始，依次向前对每个结点 sift down。时间</p>
<span class="formula">Σ<sub>h≥0</sub> (n/2<sup>h+1</sup>)·2h = n·Σ h/2<sup>h</sup> = 2n = O(n)</span>
<p><strong>插入</strong>：放到数组末尾，向上筛选（与父母比较交换），O(log n)。</p>
<p><strong>删除堆顶</strong>：用最后一个元素替换堆顶，长度减 1，再对堆顶 sift down，O(log n)。</p>`,
      tip: "建堆从下往上、每个结点只向下沉，是 O(n)；若逐个插入建堆则是 O(n log n)，两者不要混。"
    },
    {
      id: "k5-26",
      title: "优先队列",
      tags: ["优先队列", "堆"],
      body: `<p>优先队列是带关键码的元素集合，支持查找、插入、删除，核心操作是快速取出最大/最小元素。</p>
<ul>
<li>最小优先队列：取最小；最大优先队列：取最大；</li>
<li>堆是优先队列最自然的实现：取顶 O(1)，插入/删除 O(log n)，建堆 O(n)；</li>
<li>应用：任务调度、事件模拟、Dijkstra/Prim 的选点、Huffman 合并、Top-K。</li>
</ul>`,
      tip: "优先队列不等于“排序队列”：它只保证能快速取到最值，其余元素无序。"
    },
    {
      id: "k5-27",
      title: "Huffman 树与带权外部路径长度 WPL",
      tags: ["Huffman", "WPL", "重点"],
      body: `<p>给每个外部结点（叶）赋权 w<sub>i</sub>，带权外部路径长度</p>
<span class="formula">WPL = Σ w<sub>i</sub>·l<sub>i</sub></span>
<p>其中 l<sub>i</sub> 为根到该叶的路径长度（边数）。WPL 最小的二叉树称 Huffman 树/最优二叉树。</p>
<p><strong>构造（贪心）</strong>：</p>
<ol>
<li>把所有权值放入集合；</li>
<li>每次取出最小的两个权值，合并为一个新结点，权为二者之和；</li>
<li>把新权放回集合；</li>
<li>重复直到只剩一个结点，即为根。</li>
</ol>
<p>Huffman 树是严格二叉树（每个内部结点恰有两个孩子），满足 n<sub>0</sub>=n<sub>2</sub>+1。权值越大，深度越浅。</p>`,
      tip: "WPL 只算叶结点（外部结点）的带权路径，不算内部结点；合并过程中所有新结点权值之和正好等于 WPL。"
    },
    {
      id: "k5-28",
      title: "Huffman 编码：前缀码与译码",
      tags: ["Huffman", "编码", "前缀码"],
      body: `<p>以字符频率为权构造 Huffman 树，左分支记 0、右分支记 1，根到叶的路径就是该字符的编码。</p>
<ul>
<li><strong>不等长</strong>：高频字符编码短，低频字符编码长；</li>
<li><strong>前缀性质</strong>：任一字符的编码都不是另一字符编码的前缀；</li>
<li>前缀性质保证译码无歧义：从根沿 0/1 下行，到达叶就译出一个字符，再回到根继续；</li>
<li>总编码长度 = WPL（频率为权时），因此 Huffman 编码使电文总长最短；</li>
<li>同一组权值可能构造出不同形态的 Huffman 树（左右交换、等权合并顺序不同），但 WPL 相同。</li>
</ul>`,
      tip: "编码必须从根到叶读；若把 0/1 分配反过来，得到另一套合法编码，长度不变。"
    },
    {
      id: "k5-29",
      title: "k 叉 Huffman 树与补零",
      tags: ["Huffman", "k 叉", "重点"],
      body: `<p>构造 k 叉 Huffman 树时，每次合并<strong>最小的 k 个</strong>权值。为使树成为“满 k 叉树”（每个内部结点恰有 k 个孩子），叶结点数 n 必须满足</p>
<span class="formula">(n−1) mod (k−1) = 0</span>
<p>否则先补 r 个权为 0 的虚拟叶结点，其中</p>
<span class="formula">r = (k−1) − ((n−1) mod (k−1))</span>
<p>补零不改变 WPL，只是让每次合并都能凑够 k 个。k=2 时条件恒成立，无需补零。</p>`,
      tip: "三叉 Huffman 且 n=5：(5−1) mod 2=0，不用补；若 n=4，则需补 1 个 0 权叶。"
    }
  ],
  questions: [
    {
      id: "q5-01",
      title: "补全遍历序列并画出二叉树",
      source: "第五章作业 · 第 1 题",
      kind: "作业",
      star: true,
      statement: `<p>一棵二叉树的先序、中序、后序序列各缺少部分元素：</p>
<ul>
<li>先序：<code>_ _ C D E _ G H I _ K</code></li>
<li>中序：<code>C B _ _ F A _ J K I G</code></li>
<li>后序：<code>_ E F D B _ J I H _ A</code></li>
</ul>
<p>请补全序列并画出该二叉树。</p>`,
      answer: `<p>由后序最后一个元素确定根为 <strong>A</strong>；中序中 A 左边 C B _ _ F、右边 _ J K I G。先序第二个是左子树根，应为 B；结合中序得左子树中序 C B E D F，故空位为 E、D。左子树先序 B C D E F，后序 C E F D B，符合 D 的左右孩子 E、F。</p>
<p>右子树：先序 G H I J K，中序 H J K I G，后序 K J I H G。G 为根，G 无右子树；H 是 G 的左孩子，H 无左孩子；I 是 H 的右孩子，I 的左孩子为 J，J 的右孩子为 K。</p>
<p><strong>补全结果</strong>：</p>
<ul>
<li>先序：<strong>A B C D E F G H I J K</strong></li>
<li>中序：<strong>C B E D F A H J K I G</strong></li>
<li>后序：<strong>C E F D B K J I H G A</strong></li>
</ul>
<pre><code>        A
       / \\
      B   G
     / \\  /
    C  D H
      / \\ \\
     E   F I
          /
         J
          \\
           K</code></pre>
<p>验证：先序 A B C D E F G H I J K；中序 C B E D F A H J K I G；后序 C E F D B K J I H G A，均与补全一致。</p>`,
      note: "先序的第一个是 A，后序的最后也是 A，两者必须一致；用这一点可以先锁定根，再逐层切分。"
    },
    {
      id: "q5-02",
      title: "证明叶结点在三种遍历中的相对位置相同",
      source: "第五章作业 · 第 2 题",
      kind: "作业",
      star: true,
      statement: `<p>证明：一棵二叉树的所有终端结点（叶结点），在前序、中序、后序序列中都按相同的相对位置出现。</p>`,
      answer: `<p><strong>证明</strong>：任取两片不同的叶结点 u、v，设 w 为它们的最近公共祖先（LCA）。</p>
<ol>
<li>因为 u、v 都是叶结点，它们不可能互为祖先，所以 u、v 一定分别位于 w 的两棵不同子树中：一个在左子树，一个在右子树。</li>
<li>前序、中序、后序都是深度优先遍历，且都遵循“左子树的所有结点先于右子树的所有结点”。因此若 u 在左、v 在右，则三种序列中 u 都出现在 v 之前；反之亦然。</li>
<li>于是任意两片叶子的相对次序在三种序列中都相同。</li>
<li>所有叶子两两相对次序一致，故整体从左到右的次序在三种序列中完全相同。</li>
</ol>
<p>结论得证。这个性质也说明：仅凭“叶子顺序不同”就可以判断两个序列不可能来自同一棵树。</p>`,
      note: "证明的关键是“叶子不可能是另一叶子的祖先”，因此 LCA 处一定一左一右；不要只对满二叉树举例。"
    },
    {
      id: "q5-03",
      title: "Huffman：199 个结点的叶子数、8 字母编码与等长编码比较",
      source: "第五章作业 · 第 3 题",
      kind: "作业",
      star: true,
      statement: `<p>（1）一棵 Huffman 树有 199 个结点，求叶结点个数。<br>（2）8 个字母频率为 0.07, 0.19, 0.02, 0.06, 0.32, 0.03, 0.21, 0.10，设计 Huffman 编码。<br>（3）与 0~7 的三位等长编码比较优缺点。</p>`,
      answer: `<p><strong>（1）</strong> Huffman 树是严格二叉树，n<sub>0</sub>=n<sub>2</sub>+1，且无度为 1 的结点，故</p>
<span class="formula">n = n<sub>0</sub>+n<sub>2</sub> = 2n<sub>0</sub>−1 = 199 ⇒ n<sub>0</sub>=100</span>
<p><strong>（2）</strong> 按权值合并（记 1~8 号频率为 0.07,0.19,0.02,0.06,0.32,0.03,0.21,0.10）：</p>
<ol>
<li>0.02+0.03=0.05（3,6）；</li>
<li>0.05+0.06=0.11（{3,6},4）；</li>
<li>0.07+0.10=0.17（1,8）；</li>
<li>0.11+0.17=0.28（{3,6,4},{1,8}）；</li>
<li>0.19+0.21=0.40（2,7）；</li>
<li>0.28+0.32=0.60（左大组,5）；</li>
<li>0.40+0.60=1.00（根）。</li>
</ol>
<p>左 0 右 1，得到编码：</p>
<table>
<tr><th>字母</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
<tr><td>编码</td><td>1010</td><td>00</td><td>10000</td><td>1001</td><td>11</td><td>10001</td><td>01</td><td>1011</td></tr>
</table>
<p>平均码长 = WPL = 0.07×4+0.19×2+0.02×5+0.06×4+0.32×2+0.03×5+0.21×2+0.10×4 = <strong>2.61</strong>。</p>
<p><strong>（3）比较</strong>：</p>
<ul>
<li>三位等长编码：每个字符固定 3 bit，平均码长 3；优点是定长、译码简单、可随机访问第 i 个字符；缺点是没有利用频率差异，总长度更大。</li>
<li>Huffman 编码：平均 2.61 bit，缩短约 13%；且满足前缀性质，可唯一译码；缺点是变长，必须沿树译码，不能直接按下标定位，且编码依赖频率分布，频率变化要重建树。</li>
</ul>`,
      note: "第（1）问也可用“叶子比内部结点多 1”：设叶子 L，内部 L−1，总数 2L−1=199。"
    },
    {
      id: "q5-04",
      title: "建最小堆、最大值的位置、建堆 O(n) 证明",
      source: "第五章作业 · 第 4 题",
      kind: "作业",
      star: true,
      statement: `<p>（1）对序列 (503, 87, 512, 61, 908, 170, 897, 275, 653, 462) 建最小堆，画出第一步和最终结果。<br>（2）最小堆中最大元素可能在什么位置？<br>（3）自底向上建堆，以比较为基本操作，证明最坏 T(n)&lt;2n，从而建堆为 O(n)。</p>`,
      answer: `<p><strong>（1）</strong> 初始完全二叉树（层序即数组）：</p>
<pre><code>          503
        /     \\
      87       512
     /  \\     /   \\
   61   908  170   897
   / \\  /
 275 653 462</code></pre>
<p>最后一个非叶结点下标 ⌊10/2⌋−1=4（值 908），与其子 462 交换；随后依次调整 i=3,2,1,0。关键步骤：i=2 时 512 与 170 交换；i=1 时 87 与 61 交换；i=0 时 503 下沉，经 61、87、275 三次交换到达下标 7。</p>
<p>最终最小堆数组：</p>
<span class="formula">[61, 87, 170, 275, 462, 512, 897, 503, 653, 908]</span>
<pre><code>          61
        /     \\
      87       170
     /  \\     /   \\
   275  462  512   897
   / \\  /
 503 653 908</code></pre>
<p><strong>（2）</strong> 最大元素一定在<strong>叶结点</strong>上。因为最小堆中任意内部结点都不大于它的孩子，若最大值在内部结点，则它的某个孩子不小于它，矛盾。叶结点下标范围为 ⌊n/2⌋…n−1；具体是哪个叶子不确定，任意叶子都可能。</p>
<p><strong>（3）</strong> 设结点高度为 h（叶 h=0）。高度 h 的结点向下筛选最多 h 层，每层最多 2 次比较（先比较两个孩子选出较小者，再与当前结点比较），故该结点代价 ≤2h。完全二叉树中高度 h 的结点数至多 n/2<sup>h+1</sup>，于是</p>
<span class="formula">T(n) ≤ Σ<sub>h≥0</sub> (n/2<sup>h+1</sup>)·2h = n·Σ<sub>h≥0</sub> h/2<sup>h</sup> = 2n</span>
<p>（利用 Σ h/2<sup>h</sup>=2。）由于各层结点数取整后一般严格小于上界，故 T(n)&lt;2n，建堆时间 O(n)。</p>`,
      note: "建堆的 O(n) 来自“大多数结点靠近底部、下沉距离很短”；逐个插入则每个都要上浮 O(log n)，总计 O(n log n)。"
    },
    {
      id: "q5-05",
      title: "构造最优三叉 Huffman 树（权 1~5）",
      source: "第五章作业 · 第 5 题",
      kind: "作业",
      star: true,
      statement: `<p>给定 n≥1 个非负权值和整数 k≥2，说明如何构造具有最小加权路径长度的 k 叉树。对权值集合 {1,2,3,4,5} 构造最优 3 叉树，并求最小加权路径长度。</p>`,
      answer: `<p><strong>构造方法</strong>：每次从森林中取权值最小的 k 棵树合并为一棵新树，新根权为 k 个权之和，放回森林；重复直到只剩一棵。为保证每个内部结点恰有 k 个孩子，需先检查</p>
<span class="formula">(n−1) mod (k−1) = 0</span>
<p>若不成立，补 r=(k−1)−((n−1) mod (k−1)) 个权为 0 的虚拟叶，再合并。</p>
<p><strong>本题</strong>：n=5，k=3，(5−1) mod 2=0，无需补零。</p>
<ol>
<li>取最小三个 1,2,3，合并为权 6 的内部结点；森林 {4,5,6}；</li>
<li>取 4,5,6，合并为根 15。</li>
</ol>
<pre><code>            15
          / | \\
         4  5  6
             / | \\
            1  2  3</code></pre>
<p>叶结点深度：4、5 为 1；1、2、3 为 2。故</p>
<span class="formula">WPL = 4×1 + 5×1 + (1+2+3)×2 = 4+5+12 = 21</span>
<p>最小加权路径长度为 <strong>21</strong>。</p>`,
      note: "若先合并 1,2,4 得 7，再合并 3,5,7，WPL=22，不是最优；每次必须取最小 k 个。"
    },
    {
      id: "q5-06",
      title: "课件思考：由中序 + 后序求前序（两例）",
      source: "第五章课件 · 思考题",
      kind: "课件练习",
      star: true,
      statement: `<p>（1）中序 {A,B,C,D,E,F,G}，后序 {B,D,C,A,F,G,E}，求前序。<br>（2）后序 {D,B,G,E,H,I,F,C,A}，中序 {D,B,A,E,G,C,H,F,I}，求前序。</p>`,
      answer: `<p><strong>（1）</strong> 后序最后 E 是根；中序以 E 分左右：左 {A,B,C,D}，右 {F,G}。</p>
<ul>
<li>左：后序 {B,D,C,A}，根 A；中序 A 在最左，故 A 无左子树，右子树中序 {B,C,D}；后序 {B,D,C} 根 C，C 左 B、右 D。</li>
<li>右：后序 {F,G}，根 G；中序 {F,G}，G 左 F。</li>
</ul>
<p>树为 E( A(_, C(B,D)) , G(F,_) )，前序：</p>
<span class="formula">E A C B D G F</span>
<p><strong>（2）</strong> 后序最后 A 是根；中序分左右：左 {D,B}，右 {E,G,C,H,F,I}。</p>
<ul>
<li>左：后序 {D,B}，根 B，左 D → B(D,_)。</li>
<li>右：后序 {G,E,H,I,F,C}，根 C；中序以 C 分：左 {E,G}，右 {H,F,I}。</li>
<li>C 左：后序 {G,E}，根 E，左 G → E(G,_)。</li>
<li>C 右：后序 {H,I,F}，根 F；中序 {H,F,I} → F(H,I)。</li>
</ul>
<p>前序：</p>
<span class="formula">A B D C E G F H I</span>`,
      note: "后序的最后一个一定是当前子树的根；中序负责划分左右子树的元素集合，两者配合即可递归重建。"
    },
    {
      id: "q5-07",
      title: "课件练习：前序+中序、中序+后序、前序+后序",
      source: "第五章课件 · 遍历性质",
      kind: "课件练习",
      statement: `<p>（1）前序 ABDGHCEFI，中序 GDHBAECIF，画出二叉树。<br>（2）中序 BDCEAFHG，后序 DECBHGFA，画出二叉树。<br>（3）前序 AB，后序 BA，能画出几棵不同的二叉树？说明前序+后序是否唯一。</p>`,
      answer: `<p><strong>（1）</strong> 根 A；中序左 GDHB、右 ECIF。左子树前序 BDGH，根 B；B 无右子树，左子树中序 GDH，前序 DGH → D 为根，左 G、右 H。右子树前序 CEFI，根 C；中序左 E、右 IF；右子树前序 FI，根 F，F 的左孩子 I。</p>
<pre><code>        A
       / \\
      B   C
     /   / \\
    D   E   F
   / \\     /
  G   H   I</code></pre>
<p><strong>（2）</strong> 根 A；中序左 BDCE、右 FHG。左子树后序 DECB，根 B；B 无左子树，右子树中序 DCE、后序 DEC → C 为根，左 D、右 E。右子树后序 HGF，根 F；F 无左子树，右子树中序 HG、后序 HG → G 为根，左 H。</p>
<pre><code>        A
       / \\
      B   F
       \\   \\
        C   G
       / \\  /
      D   E H</code></pre>
<p><strong>（3）</strong> 前序 AB 说明 A 是根、B 是 A 的孩子；后序 BA 无法区分 B 是左孩子还是右孩子，因此有 <strong>2</strong> 棵：A 的左孩子 B，或 A 的右孩子 B。所以前序+后序<strong>不能</strong>唯一确定二叉树。</p>`,
      note: "只有“一个孩子”的结点会造成左右歧义；若每个结点度都为 0 或 2，前序+后序才能唯一确定。"
    },
    {
      id: "q5-08",
      title: "课件思考：k 叉树有多少个空指针",
      source: "第五章课件 · 思考题",
      kind: "课件练习",
      statement: `<p>证明：具有 n（n≥1）个结点的 k 叉树中，有 n(k−1)+1 个指针是空的。</p>`,
      answer: `<p>每个结点有 k 个指针域，n 个结点共 nk 个指针域。树中除根外每个结点恰有一条入边，故非空指针（边）共有 n−1 个。于是空指针数为</p>
<span class="formula">nk − (n−1) = n(k−1)+1</span>
<p>k=2 时得 n+1，正是扩充二叉树中外部结点的个数；k=3、n=5 时为 11。</p>`,
      note: "这里的 n 是总结点数；若题目给的是叶子数，应先换算总结点数再套公式。"
    },
    {
      id: "q5-09",
      title: "课件示例：Huffman 编码与等长编码的长度对比",
      source: "第五章课件 · Huffman 编码",
      kind: "课件练习",
      star: true,
      statement: `<p>报文由 C、A、S、T 组成，出现次数分别为 2、7、4、5。分别用等长编码和 Huffman 编码，计算总编码长度并给出编码方案。</p>`,
      answer: `<p><strong>等长编码</strong>：4 个字符需 2 位，如 A:00, T:10, C:01, S:11。总长度</p>
<span class="formula">(2+7+4+5)×2 = 36</span>
<p><strong>Huffman 编码</strong>：权值 2,4,5,7。</p>
<ol>
<li>2+4=6（C,S）；</li>
<li>5+6=11（T, {C,S}）；</li>
<li>7+11=18（A, 其余）。</li>
</ol>
<p>左 0 右 1 可得 A:0，T:10，C:110，S:111。总长度</p>
<span class="formula">7×1 + 5×2 + (2+4)×3 = 7+10+18 = 35</span>
<p>Huffman 比等长编码少 1 位；频率越集中，优势越明显。该编码满足前缀性质，可唯一译码。</p>`,
      note: "等长编码位数是 ⌈log₂4⌉=2；Huffman 的平均码长 35/18≈1.94，接近熵。"
    },
    {
      id: "q5-10",
      title: "BST 的插入、查找与删除（含双孩子情况）",
      source: "第五章课件 · 二叉搜索树",
      kind: "课件练习",
      statement: `<p>（1）依次插入 9,4,2,6,7,15,12,21，画出 BST，并写出中序序列。<br>（2）分别删除结点 6（只有一个孩子）和结点 4（有两个孩子），说明删除过程与结果。</p>`,
      answer: `<p><strong>（1）</strong> 插入过程：9 为根；4 小于 9 → 左；2 小于 9、4 → 4 的左；6 小于 9、大于 4 → 4 的右；7 大于 4、小于 9、大于 6 → 6 的右；15 大于 9 → 右；12 小于 15、大于 9 → 15 的左；21 大于 15 → 15 的右。</p>
<pre><code>        9
       / \\
      4   15
     / \\  / \\
    2  6 12 21
        \\
         7</code></pre>
<p>中序：2, 4, 6, 7, 9, 12, 15, 21（有序）。</p>
<p><strong>（2）删除 6（单孩子）</strong>：6 只有右孩子 7，直接用 7 替代 6，得到</p>
<pre><code>        9
       / \\
      4   15
     / \\  / \\
    2  7 12 21</code></pre>
<p><strong>删除 4（双孩子）</strong>：4 的左子树为 {2}，右子树为 {6,7}。用中序前驱（左子树最大值）2 替代 4，再删除原 2 位置（2 是叶子，直接删）：</p>
<pre><code>        9
       / \\
      2   15
       \\  / \\
        6 12 21
         \\
          7</code></pre>
<p>也可用中序后继（右子树最小值）6 替代 4，结果不同但都满足 BST。</p>
<p>一般规则：双孩子结点用中序前驱或后继替换；单孩子结点用唯一孩子顶替；叶结点直接删除。</p>`,
      note: "判断“有几个孩子”要看 left/right 指针是否为空，而不是看结点在图中是否处于中间位置。"
    }
  ],
  cheats: [
    {
      title: "二叉树性质与下标公式",
      html: `<table>
<tr><th>项目</th><th>公式</th></tr>
<tr><td>第 i 层最多</td><td>2<sup>i</sup>（根 i=0）</td></tr>
<tr><td>深度 k 最多</td><td>2<sup>k+1</sup>−1</td></tr>
<tr><td>叶子与二度结点</td><td>n<sub>0</sub>=n<sub>2</sub>+1</td></tr>
<tr><td>完全二叉树深度</td><td>⌊log₂n⌋</td></tr>
<tr><td>父母（根 0）</td><td>⌊(i−1)/2⌋</td></tr>
<tr><td>左/右孩子</td><td>2i+1 / 2i+2（&lt;n 才存在）</td></tr>
<tr><td>第一个叶子</td><td>⌊n/2⌋</td></tr>
<tr><td>扩充树外部结点</td><td>n+1；E=I+2n</td></tr>
<tr><td>k 叉树空指针</td><td>n(k−1)+1</td></tr>
</table>`
    },
    {
      title: "遍历与重建速查",
      html: `<table>
<tr><th>遍历</th><th>次序</th><th>实现</th></tr>
<tr><td>前序</td><td>根 左 右</td><td>递归 / 栈（右先入）</td></tr>
<tr><td>中序</td><td>左 根 右</td><td>递归 / 栈（一路向左）</td></tr>
<tr><td>后序</td><td>左 右 根</td><td>递归 / 栈 + 标记</td></tr>
<tr><td>层序</td><td>逐层左到右</td><td>队列</td></tr>
</table>
<ul>
<li>前序+中序、后序+中序 → 唯一；前序+后序 → 不唯一。</li>
<li>前序第一个 / 后序最后一个 = 根；中序用来分左右。</li>
<li>叶结点在三种 DFS 序列中相对次序相同。</li>
<li>时间 O(n)；DFS 空间 O(h)，BFS 空间 O(宽度)。</li>
</ul>`
    },
    {
      title: "BST、堆与 Huffman 对照",
      html: `<table>
<tr><th></th><th>BST</th><th>堆</th><th>Huffman</th></tr>
<tr><td>形态</td><td>任意二叉树</td><td>完全二叉树</td><td>严格二叉树</td></tr>
<tr><td>有序性</td><td>中序全局有序</td><td>父子局部有序</td><td>按频率定深度</td></tr>
<tr><td>核心操作</td><td>查找/插入/删除 O(h)</td><td>取顶 O(1)，插删 O(log n)</td><td>合并最小两个/三个</td></tr>
<tr><td>关键公式</td><td>h 平衡 O(log n)，最坏 O(n)</td><td>建堆 O(n)</td><td>WPL=Σw<sub>i</sub>l<sub>i</sub>；k 叉补零</td></tr>
</table>
<ul>
<li>BST 删除双孩子：中序前驱/后继替换。</li>
<li>最小堆最大值在叶子（下标 ≥⌊n/2⌋）。</li>
<li>Huffman 高频短码，前缀性质保证唯一译码。</li>
</ul>`
    }
  ]
});
