window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch6",
  num: "06",
  title: "树",
  subtitle: "森林转换 · 遍历 · 并查集 · 顺序存储 · K 叉树",
  pdf: "assets/slide/第6章树.pdf",
  intro: "一般树与二叉树的桥梁是“左孩子—右兄弟”表示：左指针指向第一个孩子，右指针指向下一个兄弟。掌握这层对应，树的遍历、森林转换、顺序存储都能统一到二叉树上。本章另外两块重点是并查集（按规模合并 + 路径压缩）和四种顺序存储编码（右链先根、双标记先根、度数后根、双标记层次）。",
  links: [
    { label: "第六章作业", href: "assets/hw/第六章作业.pdf" }
  ],
  knowledge: [
    {
      id: "k6-01",
      title: "树的递归定义与逻辑结构",
      tags: ["树", "定义"],
      body: `<p>树是 n（n≥1）个结点的有限集合 T：有一个根结点；除根外其余结点被分成 m（m≥0）个<strong>互不相交</strong>的集合 T<sub>1</sub>…T<sub>m</sub>，每个集合又是一棵树，称为根的子树。</p>
<p>等价的关系定义：结点集合 K 上定义关系 N，满足</p>
<ul>
<li>有且仅有一个结点 k<sub>0</sub> 无前驱（根）；</li>
<li>除根外每个结点有且仅有一个前驱；</li>
<li>从根到任一结点存在一条路径。</li>
</ul>
<p>树的定义是递归的；树中不存在回路。</p>`,
      tip: "树与图的区别：树有唯一根、每个非根结点唯一前驱、无环；n 个结点的树恰有 n−1 条边。"
    },
    {
      id: "k6-02",
      title: "树的基本术语",
      tags: ["术语"],
      body: `<ul>
<li><strong>结点的度</strong>：结点拥有的子树个数；<strong>树的度</strong>：所有结点度的最大值；</li>
<li><strong>叶结点</strong>：度为 0；<strong>分支结点</strong>：度大于 0；</li>
<li><strong>子女/双亲/兄弟</strong>：直接后继/前驱/同父母结点；</li>
<li><strong>层次</strong>：根为第 1 层（作业约定）或第 0 层（部分教材），孩子层数 = 父母 +1；</li>
<li><strong>树的深度/高度</strong>：结点的最大层次；</li>
<li><strong>祖先/子孙</strong>：沿父母链向上/向下可达；</li>
<li><strong>有序树</strong>：孩子的左右次序有定义；<strong>无序树</strong>：不区分次序；</li>
<li><strong>森林</strong>：零棵或多棵互不相交的树的集合。</li>
</ul>`,
      tip: "做题先确认“根是第 0 层还是第 1 层”；作业第六章第 1 题明确根在第 1 层，高度为 4。"
    },
    {
      id: "k6-03",
      title: "度为 2 的有序树不是二叉树",
      tags: ["有序树", "二叉树", "易错"],
      body: `<p>度为 2 的有序树：每个结点最多两个孩子，且孩子有左右次序。看起来像二叉树，但<strong>不是</strong>。</p>
<p>原因：有序树中若删除第一个孩子，第二个孩子会自然顶替成为“第一个孩子”；而二叉树中左孩子缺失时，右孩子仍然固定在右位置，不会变成左孩子。只有<strong>严格区分左右孩子</strong>的度为 2 有序树才是二叉树。</p>
<p>另一差异：二叉树可以为空；一般树的定义要求 n≥1（非空）。</p>`,
      tip: "“最多两个孩子 + 有序”还不够；关键在空位置是否保留。二叉树有五种形态，一般树没有“只有右孩子”的独立形态。"
    },
    {
      id: "k6-04",
      title: "森林与树的互相转化",
      tags: ["森林", "定义"],
      body: `<p>森林是零棵或多棵互不相交的树的集合。树中每个结点的子树集合本身就是一个森林；给森林加一个虚拟根，就变成一棵树。</p>
<ul>
<li>删除树的根，其子树构成森林；</li>
<li>森林加一个根，把各棵树的根作为它的孩子，得到一棵树；</li>
<li>森林通常按有序集合处理，树之间的次序有意义。</li>
</ul>`,
      tip: "森林的“有序”指各棵树的先后次序；转换为二叉树后，这个次序体现在根结点的右链上。"
    },
    {
      id: "k6-05",
      title: "树/森林 → 二叉树：左孩子—右兄弟",
      tags: ["转换", "LCRS", "重点"],
      body: `<p>任何森林都可以用一棵二叉树<strong>唯一</strong>表示，任何二叉树也唯一对应一个森林。</p>
<p>对应规则：</p>
<ul>
<li>结点的<strong>左孩子</strong> = 它在原树中的<strong>第一个孩子</strong>；</li>
<li>结点的<strong>右孩子</strong> = 它在原树中的<strong>下一个兄弟</strong>；</li>
<li>森林 F=(T<sub>1</sub>,…,T<sub>n</sub>) 对应二叉树的根是 T<sub>1</sub> 的根，其右子树对应 (T<sub>2</sub>,…,T<sub>n</sub>)。</li>
</ul>
<p><strong>手工转换三步</strong>：① 在所有相邻兄弟之间加连线；② 对每个结点，除最左孩子外，抹去它与其余孩子的连线；③ 以根为轴顺时针旋转 45°。</p>
<p>单棵树转换后，二叉树根结点的<strong>右子树一定为空</strong>；森林转换后，根的右链依次是 T<sub>2</sub>、T<sub>3</sub>… 的根。</p>`,
      tip: "记法：“左是长子，右是兄弟”。转换后一个结点最多只有左、右两个指针，但信息没有丢失。"
    },
    {
      id: "k6-06",
      title: "二叉树 → 树/森林",
      tags: ["转换", "还原"],
      body: `<p>逆转换三步：</p>
<ol>
<li><strong>加线</strong>：若 p 是父结点的左孩子，则把 p 的右孩子、右孩子的右孩子……整条右链上的所有结点都与 p 的双亲连线；</li>
<li><strong>抹线</strong>：抹掉原二叉树中双亲与右孩子之间的连线；</li>
<li><strong>调整</strong>：按层次排布，形成树。</li>
</ol>
<p>若二叉树根有右子树，说明对应的是森林：先沿根的石链把所有右孩子连线抹掉，得到若干孤立二叉树，再分别还原成树。</p>`,
      tip: "还原时“右链上的结点都是兄弟”，把它们都接到同一个父结点下；不要只处理直接右孩子。"
    },
    {
      id: "k6-07",
      title: "树的 ADT：LeftMostChild 与 RightSibling",
      tags: ["ADT", "接口"],
      body: `<p>树结点通常提供：</p>
<ul>
<li><code>Value()</code> / <code>setValue()</code>：取值/改值；</li>
<li><code>LeftMostChild()</code>：第一个孩子；</li>
<li><code>RightSibling()</code>：下一个兄弟；</li>
<li><code>isLeaf()</code>：是否叶结点；</li>
<li><code>InsertFirst()</code> / <code>InsertNext()</code>：插入为第一个孩子/右兄弟。</li>
</ul>
<p>树 ADT 还提供 <code>getRoot</code>、<code>Parent</code>、<code>PrevSibling</code>、<code>DeleteSubTree</code> 以及三种遍历。只靠 LeftMostChild + RightSibling 就能遍历整棵树。</p>`,
      tip: "树的“找父结点”没有直接指针，通常要用 BFS/DFS 记录上一层；这正是三叉链表或父指针表示法的用武之地。"
    },
    {
      id: "k6-08",
      title: "树的遍历：先根、后根、层次",
      tags: ["遍历", "重点"],
      body: `<p>树的深度优先遍历只有两种（没有中根）：</p>
<ul>
<li><strong>先根</strong>：访问根 → 从左到右先根遍历各子树；</li>
<li><strong>后根</strong>：从左到右后根遍历各子树 → 访问根；</li>
<li><strong>层次</strong>：从上到下、同层从左到右，用队列实现。</li>
</ul>
<p>先根序列中，子树的结点连续出现；后根序列中，根在最后。</p>
<pre><code>void rootFirst(Node *t) {
    while (t) {
        visit(t);
        rootFirst(t-&gt;leftChild);
        t = t-&gt;rightSibling;
    }
}</code></pre>`,
      tip: "树没有中根遍历：一个结点可能有多个孩子，无法定义“左-根-右”的二分位置。"
    },
    {
      id: "k6-09",
      title: "树遍历与二叉树遍历的对应",
      tags: ["遍历", "对应", "重点"],
      body: `<p>把树/森林按“左孩子—右兄弟”转成二叉树后：</p>
<ul>
<li>树的<strong>先根</strong>遍历 = 对应二叉树的<strong>前序</strong>遍历；</li>
<li>树的<strong>后根</strong>遍历 = 对应二叉树的<strong>中序</strong>遍历；</li>
<li>森林的先根/后根同理。</li>
</ul>
<p>因此：树的先根 + 后根 <strong>可以唯一确定</strong>一棵树——它们分别对应二叉树的前序 + 中序，而二叉树的前序 + 中序唯一确定二叉树，再逆转换即得原树。</p>
<p>树的后根序列 = 二叉树中序序列，所以后根序列中根总在子树之后，不能直接当二叉树后序使用。</p>`,
      tip: "这是第六章最常用的“翻译”：遇到树的遍历题，先转成二叉树，再套第五章的结论。"
    },
    {
      id: "k6-10",
      title: "树的链式存储：孩子表、指针数组、左孩子右兄弟",
      tags: ["存储", "链式"],
      body: `<ul>
<li><strong>子结点表</strong>：每个结点存一个孩子链表。查孩子个数、取值容易，找兄弟困难；合并树只需把根接到孩子表。</li>
<li><strong>动态结点指针数组</strong>：结点存变长数组/指针表，直接索引第 i 个孩子；空位造成浪费。</li>
<li><strong>静态“左孩子/右兄弟”</strong>：结点数组，每个结点存 value、parent、leftChild、rightSibling 下标。空间固定，合并树只需改指针。</li>
<li><strong>动态“左孩子/右兄弟”二叉链表</strong>：本质是把树转成二叉树，pChild 指第一个孩子，pSibling 指下一个兄弟。最常用。</li>
</ul>`,
      tip: "“左孩子/右兄弟”既是存储结构，也是树→二叉树的逻辑转换；两种视角是同一件事。"
    },
    {
      id: "k6-11",
      title: "父指针表示法",
      tags: ["存储", "父指针"],
      body: `<p>每个结点只保存一个指向父结点的指针（或数组下标），所有结点放在一个数组里。</p>
<ul>
<li>找父结点 O(1)；找根 O(h)，沿父链向上；</li>
<li>判断两个结点是否同属一棵树：比较它们的根；</li>
<li>找兄弟、孩子困难，需要扫描整个结构；</li>
<li>不记录孩子次序，适合无序树；</li>
<li>是并查集的存储基础。</li>
</ul>`,
      tip: "父指针表示法“向上容易、向下困难”；需要频繁找孩子时应改用左孩子/右兄弟。"
    },
    {
      id: "k6-12",
      title: "并查集：等价类与基本操作",
      tags: ["并查集", "等价类", "重点"],
      body: `<p>并查集维护若干个<strong>不相交</strong>的集合，每个集合用一棵树表示，树根代表集合。</p>
<ul>
<li><strong>Find(x)</strong>：沿父指针找到 x 所在树的根；</li>
<li><strong>Different(x,y)</strong>：Find(x) ≠ Find(y) 则不在同一集合；</li>
<li><strong>Union(x,y)</strong>：把两个根合并，一个根指向另一个根。</li>
</ul>
<p>等价关系需满足自反、对称、传递；并查集正是求解等价类问题的工具：初始每个元素独立成树，遇到等价对就合并。</p>
<pre><code>int find(int x) {
    while (parent[x] != x) x = parent[x];
    return x;
}
void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx != ry) parent[ry] = rx;
}</code></pre>`,
      tip: "根结点的 parent 可以指向自己，也可以设为 −1；题目会明确约定，读题时先确认。"
    },
    {
      id: "k6-13",
      title: "重量权衡合并：高度 O(log N)",
      tags: ["并查集", "按规模合并", "证明"],
      body: `<p><strong>规则</strong>：合并时把结点较少（规模较小）的树根挂到结点较多（规模较大）的树根下；规模相同按题目约定（如 y 挂到 x）。</p>
<p><strong>高度 O(log N) 证明</strong>：一个结点的深度只在它所在树被挂到另一棵树时增加 1。由于总是小树挂到大树，合并后新树规模至少是原来小树规模的 2 倍。从一个结点开始，规模最多翻倍 ⌊log₂N⌋ 次就达到 N，因此任何结点的深度不超过 log₂N，树高 O(log N)。</p>
<p>Find/Union 的最坏时间 O(log N)。</p>`,
      tip: "证明的关键是“每次深度 +1，所在集合大小至少翻倍”；不要只说“大树吸收小树所以平衡”。"
    },
    {
      id: "k6-14",
      title: "路径压缩：接近 O(1) 的 Find",
      tags: ["并查集", "路径压缩", "复杂度"],
      body: `<p>Find(x) 时，把 x 到根路径上的每个结点的父指针都直接改为指向根，使树变得极浅。</p>
<pre><code>int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);
    return parent[x];
}</code></pre>
<p>同时使用“按规模合并 + 路径压缩”时，单次 Find/Union 的均摊复杂度为</p>
<span class="formula">O(α(n))</span>
<p>其中 α 是反 Ackermann 函数，增长极慢，实际可视为小于 5 的常数；空间 O(n)。</p>`,
      tip: "路径压缩只改变被查找路径上的结点，不会自动压缩整棵树；手算 parent 数组时只改实际走过的路径。"
    },
    {
      id: "k6-15",
      title: "顺序存储 1：带右链的先根次序",
      tags: ["顺序存储", "先根", "rlink"],
      body: `<p>结点按<strong>先根次序</strong>连续存放，每个结点存 info、rlink（指向下一个兄弟）、ltag（1 位左标记）。</p>
<ul>
<li>ltag=0：有孩子，且左孩子就是序列中的<strong>下一个结点</strong>；</li>
<li>ltag=1：无孩子（叶），左孩子为空；</li>
<li>rlink：指向下一个兄弟；没有兄弟则为空（−1）。</li>
</ul>
<p>用 ltag 代替 llink，节省一个指针：因为先根序列中，结点的第一个孩子一定紧跟其后，位置可由“下一个下标”推知。</p>`,
      tip: "读取时先看 ltag 判断有没有孩子，再看 rlink 跳到兄弟；二者都不需要显式的左指针。"
    },
    {
      id: "k6-16",
      title: "顺序存储 2：带双标记位的先根次序",
      tags: ["顺序存储", "双标记", "栈"],
      body: `<p>进一步省掉 rlink，每个结点只存 info、ltag、rtag：</p>
<ul>
<li>ltag=0 有孩子，1 无孩子；</li>
<li>rtag=0 有下一个兄弟，1 无兄弟；</li>
<li>有兄弟（rtag=0）的结点与无孩子（ltag=1）的结点<strong>一一对应</strong>，可用栈配对：扫描到 rtag=0 就入栈；扫描到 ltag=1 就出栈一个结点，把它的 rlink 设为下一个待读结点。</li>
</ul>
<p>口诀：“有兄弟就入栈，无孩子就出栈”。由排列次序 + 两个标记位即可还原整棵森林。</p>`,
      tip: "这里的栈不是遍历用的栈，而是用来“配对兄弟指针”的；入栈的是将来要补 rlink 的结点。"
    },
    {
      id: "k6-17",
      title: "顺序存储 3：带度数的后根次序",
      tags: ["顺序存储", "后根", "度数"],
      body: `<p>结点按<strong>后根次序</strong>存放，每个结点存 info 与 degree（度数），不存任何指针。</p>
<p><strong>还原规则</strong>：从左到右扫描；</p>
<ul>
<li>度为 0 的结点是叶子，作为一棵子树入栈；</li>
<li>遇到度为 k 的结点，从栈中弹出最近的 k 个子树根，作为它的 k 个孩子（注意弹出顺序与左右次序相反），再把该结点入栈；</li>
<li>扫描结束，栈中剩下的是森林各棵树的根。</li>
</ul>
<p>因为后根序列中，一个结点的所有子树结点都紧挨在它之前，所以“最近弹出的 k 个”正是它的孩子。</p>`,
      tip: "弹栈得到的是从右到左的孩子；若题目要求保持从左到右，需要把弹出的 k 个逆序再接。"
    },
    {
      id: "k6-18",
      title: "顺序存储 4：带双标记的层次次序",
      tags: ["顺序存储", "层次", "队列"],
      body: `<p>结点按<strong>层次次序</strong>存放，每个结点存 info、ltag（有无孩子）、rtag（有无下一个兄弟）。</p>
<ul>
<li>ltag=0 表示有孩子；rtag=0 表示有右兄弟；</li>
<li>有孩子（ltag=0）的结点入队列；</li>
<li>当遇到 rtag=1（无兄弟）时，出队一个结点 x，并把 x 的左孩子指向序列中的下一个结点。</li>
</ul>
<p>口诀：“有孩子就入队列，无右兄弟就出队列”。队列记录的是“还欠一个左孩子指针”的结点。</p>`,
      tip: "与双标记先根用栈相对：层次次序的配对结构是队列，因为下一层的第一个孩子要在本层结束后才出现。"
    },
    {
      id: "k6-19",
      title: "K 叉树的定义与数组公式",
      tags: ["K 叉树", "公式"],
      body: `<p>K 叉树中每个结点有 K 个<strong>有序</strong>子结点位置（可以为空）。满 K 叉树：每个内部结点恰有 K 个孩子；完全 K 叉树：除最后一层外全满，最后一层从左到右连续。</p>
<p>按层序从 0 编号，结点 n 的：</p>
<ul>
<li>父结点：<span class="formula">⌊(n−1)/K⌋</span>（n&gt;0）；</li>
<li>第 i 个孩子：<span class="formula">K·n + i</span>（i=1…K）；</li>
<li>第 i 个孩子存在当且仅当 <span class="formula">K·n+i &lt; N</span>；</li>
<li>右兄弟存在当且仅当 <span class="formula">n mod K ≠ 0 且 n+1 &lt; N</span>，右兄弟为 n+1。</li>
</ul>
<p>满 K 叉树若有 I 个内部结点，则总结点 N=KI+1，叶结点 L=(K−1)I+1。</p>`,
      tip: "K 叉树与一般树不同：空的孩子位置也要占位，所以数组公式成立；一般树没有固定 K，不能套。"
    },
    {
      id: "k6-20",
      title: "完全 K 叉树的结点数范围",
      tags: ["K 叉树", "完全", "范围"],
      body: `<p>高度为 H（根在第 0 层，最深结点在第 H 层）、共 N 个结点的完全 K 叉树：</p>
<ul>
<li>最少：前 H 层全满，第 H 层至少 1 个结点<br>
<span class="formula">N<sub>min</sub> = (K<sup>H</sup>−1)/(K−1) + 1</span></li>
<li>最多：H 层全满<br>
<span class="formula">N<sub>max</sub> = (K<sup>H+1</sup>−1)/(K−1)</span></li>
</ul>
<p>因此 N 的范围是 [N<sub>min</sub>, N<sub>max</sub>]。K=2 时退化为 [2<sup>H</sup>, 2<sup>H+1</sup>−1]。</p>`,
      tip: "H=0 时 N_min=N_max=1；用这个边界检查公式是否写对。"
    },
    {
      id: "k6-21",
      title: "一般树的叶结点公式",
      tags: ["树", "叶结点", "公式"],
      body: `<p>若树中有 n<sub>i</sub> 个度为 i 的结点（i=1…m），叶结点数为</p>
<span class="formula">n<sub>0</sub> = 1 + Σ<sub>i=2</sub><sup>m</sup> (i−1)·n<sub>i</sub></span>
<p>即 n<sub>0</sub> = n<sub>2</sub> + 2n<sub>3</sub> + 3n<sub>4</sub> + … + (m−1)n<sub>m</sub> + 1。</p>
<p><strong>推导</strong>：总结点 N=Σn<sub>i</sub>；边数 N−1=Σ i·n<sub>i</sub>。两式相减得 n<sub>0</sub>=1+Σ(i−1)n<sub>i</sub>。它也等于“所有结点的分支数 +1”。</p>
<p>二叉树 m=2 时退化为 n<sub>0</sub>=n<sub>2</sub>+1。</p>`,
      tip: "这个公式是二叉树 n0=n2+1 的推广；证明方法完全相同：结点数 = 边数 + 1。"
    },
    {
      id: "k6-22",
      title: "树的前序字符串表示",
      tags: ["序列化", "前序", "解析"],
      body: `<p>用先根次序输出树的结点，空孩子/无兄弟用 −1 标记，可把树序列化成一串整数。例如</p>
<pre><code>A B C D -1 E -1 -1 F -1 -1 G -1</code></pre>
<p>解析规则：读一个值；若不是 −1，建结点，递归解析其第一个孩子，再递归解析其下一个兄弟；遇到 −1 返回空。</p>
<p>该串对应的树为：A 的孩子是 B、G；B 的孩子是 C、F；C 的孩子是 D、E。先根序列 A B C D E F G。</p>`,
      tip: "这里的 −1 同时表示“无孩子”和“无兄弟”，解析时按左孩子/右兄弟两个递归分别消费。"
    },
    {
      id: "k6-23",
      title: "常考结论汇总",
      tags: ["结论", "易错"],
      body: `<ul>
<li>n 个结点的树有 n−1 条边；每个非根结点唯一前驱。</li>
<li>单棵树转二叉树，根的右子树为空；森林转二叉树，根的右链是各棵树根。</li>
<li>森林 F=(T<sub>1</sub>,T<sub>2</sub>,T<sub>3</sub>)，结点数 M<sub>1</sub>,M<sub>2</sub>,M<sub>3</sub>，则对应二叉树根结点右子树的结点数为 M<sub>2</sub>+M<sub>3</sub>。</li>
<li>结点最少的树是 1 个结点；结点最少的二叉树是空树（0 个结点）。</li>
<li>树的先根 = 二叉树前序；树的后根 = 二叉树中序；因此树的先根+后根可唯一还原树。</li>
<li>二叉树先序+后序不能唯一还原；树先根+后根可以，因为后根对应中序。</li>
<li>树的层次遍历不同于对应二叉树的层序遍历，不能直接套用。</li>
</ul>`,
      tip: "“树”和“二叉树”的空树定义不同：树要求 n≥1，二叉树允许 n=0；这是选择题的常见陷阱。"
    }
  ],
  questions: [
    {
      id: "q6-01",
      title: "有序树的表示、高度、左孩子—右兄弟转换",
      source: "第六章作业 · 第 1 题",
      kind: "作业",
      star: true,
      statement: `<p>有序树 T 的父子关系（同一行孩子从左到右）：</p>
<pre><code>R -&gt; A, B, C
A -&gt; D, E
B -&gt; F
C -&gt; I, J
E -&gt; G, H
J -&gt; K</code></pre>
<p>（1）写出缩进表示与括号表示。<br>（2）求树高（根在第 1 层），写出递归求高的伪代码。<br>（3）用“长子—右兄弟”转成二叉树，写出每个非空左孩子/右孩子关系及先序序列。</p>`,
      answer: `<p><strong>（1）表示法</strong></p>
<pre><code>R
├─ A
│  ├─ D
│  └─ E
│     ├─ G
│     └─ H
├─ B
│  └─ F
└─ C
   ├─ I
   └─ J
      └─ K</code></pre>
<p>括号表示：</p>
<span class="formula">R(A(D,E(G,H)), B(F), C(I,J(K)))</span>
<p><strong>（2）高度</strong>：R 第 1 层，A/B/C 第 2 层，D/E/F/I/J 第 3 层，G/H/K 第 4 层，故高度 <strong>4</strong>。</p>
<pre><code>int height(Node *x) {
    if (!x) return 0;
    int mx = 0;
    for (Node *c = x-&gt;firstChild; c; c = c-&gt;nextSibling)
        mx = max(mx, height(c));
    return mx + 1;
}</code></pre>
<p><strong>（3）转换</strong>：左孩子 = 第一个孩子；右孩子 = 下一个兄弟。</p>
<table>
<tr><th>结点</th><th>左孩子</th><th>右孩子</th></tr>
<tr><td>R</td><td>A</td><td>—</td></tr>
<tr><td>A</td><td>D</td><td>B</td></tr>
<tr><td>B</td><td>F</td><td>C</td></tr>
<tr><td>C</td><td>I</td><td>—</td></tr>
<tr><td>D</td><td>—</td><td>E</td></tr>
<tr><td>E</td><td>G</td><td>—</td></tr>
<tr><td>F</td><td>—</td><td>—</td></tr>
<tr><td>G</td><td>—</td><td>H</td></tr>
<tr><td>H</td><td>—</td><td>—</td></tr>
<tr><td>I</td><td>—</td><td>J</td></tr>
<tr><td>J</td><td>K</td><td>—</td></tr>
<tr><td>K</td><td>—</td><td>—</td></tr>
</table>
<p>二叉树先序（= 树的先根）：</p>
<span class="formula">R A D E G H B F C I J K</span>`,
      note: "转换时不要漏掉 A→B、B→C、D→E、G→H、I→J 这些“兄弟变右孩子”的边。"
    },
    {
      id: "q6-02",
      title: "完全 K 叉树的结点范围、父结点、孩子与右兄弟",
      source: "第六章作业 · 第 2 题",
      kind: "作业",
      star: true,
      statement: `<p>高度为 H 的完全 K 叉树，根在第 0 层，最深结点在第 H 层，共 N 个结点，按层序从 0 连续编号，K≥2。</p>
<p>（1）N 的取值范围。<br>（2）编号 n 的非根结点的父结点编号。<br>（3）编号 n 的第 i 个孩子编号（i=1…K），何时存在？<br>（4）编号 n 的非根结点何时有右兄弟？编号是多少？</p>`,
      answer: `<p><strong>（1）</strong> 前 H 层全满共 (K<sup>H</sup>−1)/(K−1) 个结点，第 H 层至少 1 个；最多 H 层全满：</p>
<span class="formula">N<sub>min</sub> = (K<sup>H</sup>−1)/(K−1) + 1，N<sub>max</sub> = (K<sup>H+1</sup>−1)/(K−1)</span>
<p><strong>（2）</strong> 父结点：</p>
<span class="formula">⌊(n−1)/K⌋</span>
<p><strong>（3）</strong> 第 i 个孩子：</p>
<span class="formula">K·n + i，i=1,2,…,K</span>
<p>当且仅当 <code>K·n+i &lt; N</code> 时该孩子存在。</p>
<p><strong>（4）</strong> 非根结点 n 有右兄弟，当且仅当它不是父结点的第 K 个孩子，即</p>
<span class="formula">n mod K ≠ 0 且 n+1 &lt; N</span>
<p>此时右兄弟编号为 n+1。</p>`,
      note: "右兄弟条件里 n+1<N 不能漏：n 可能是最后一个结点，或下一层尚未开始；若 n mod K=0，它是第 K 个孩子，没有右兄弟。"
    },
    {
      id: "q6-03",
      title: "并查集：按规模合并 + 路径压缩的 parent 数组",
      source: "第六章作业 · 第 3 题",
      kind: "作业",
      star: true,
      statement: `<p>初始 12 个元素 0~11 各自独立。union(x,y)：先对 x、y 做带路径压缩的 find，再把规模较小的树根挂到规模较大的根下；规模相同时把 y 的根挂到 x 的根下；根的 parent 为自身。</p>
<p>依次执行：union(0,1), union(2,3), union(4,5), union(6,7), union(0,2), union(4,6), union(8,9), union(10,11), union(8,10), find(3), union(6,8), union(3,5), find(1), find(11)。</p>
<p>（1）写出最终 parent[0..11]（只压缩实际走过的路径）。<br>（2）证明按规模合并时树高为 O(log N)。</p>`,
      answer: `<p><strong>（1）逐步模拟</strong></p>
<table>
<tr><th>操作</th><th>结果（只列变化）</th></tr>
<tr><td>union(0,1)</td><td>parent[1]=0，size[0]=2</td></tr>
<tr><td>union(2,3)</td><td>parent[3]=2，size[2]=2</td></tr>
<tr><td>union(4,5)</td><td>parent[5]=4，size[4]=2</td></tr>
<tr><td>union(6,7)</td><td>parent[7]=6，size[6]=2</td></tr>
<tr><td>union(0,2)</td><td>规模相同 → parent[2]=0，size[0]=4</td></tr>
<tr><td>union(4,6)</td><td>规模相同 → parent[6]=4，size[4]=4</td></tr>
<tr><td>union(8,9)</td><td>parent[9]=8，size[8]=2</td></tr>
<tr><td>union(10,11)</td><td>parent[11]=10，size[10]=2</td></tr>
<tr><td>union(8,10)</td><td>规模相同 → parent[10]=8，size[8]=4</td></tr>
<tr><td>find(3)</td><td>路径 3→2→0，压缩 parent[3]=0</td></tr>
<tr><td>union(6,8)</td><td>find(6)=4（size4），find(8)=8（size4）；相同 → y 根 8 挂到 x 根 4：parent[8]=4，size[4]=8</td></tr>
<tr><td>union(3,5)</td><td>find(3)=0（size4），find(5)=4（size8）；0 挂到 4：parent[0]=4，size[4]=12</td></tr>
<tr><td>find(1)</td><td>路径 1→0→4，压缩 parent[1]=4</td></tr>
<tr><td>find(11)</td><td>路径 11→10→8→4，压缩 parent[11]=4，parent[10]=4</td></tr>
</table>
<p>最终：</p>
<span class="formula">parent = [4, 4, 0, 0, 4, 4, 4, 6, 4, 8, 4, 4]</span>
<p>其中 4 是根（parent[4]=4）；9 的父结点仍是 8，因为从未有 find 经过 9；7 的父结点仍是 6。</p>
<p><strong>（2）高度证明</strong>：一个结点的深度只在它所在树被挂到另一棵树时增加 1。按规模合并时，小树的根挂到大树根下，合并后新树的规模至少是小树规模的 2 倍。某结点初始所在集合大小为 1，每增加一层深度，集合大小至少翻倍；集合大小最多为 N，所以深度最多 ⌊log₂N⌋。故树高 O(log N)，Find/Union 最坏 O(log N)。</p>`,
      note: "易错点：union(6,8) 时 x 的根是 4（不是 6），两棵树规模相同，应把 8 挂到 4 下。手算时先写 find 的结果再比较 size。"
    },
    {
      id: "q6-04",
      title: "一般树的叶结点数公式",
      source: "第六章课件 · 练习",
      kind: "课件练习",
      statement: `<p>若一棵树有 n<sub>1</sub> 个度为 1 的结点、n<sub>2</sub> 个度为 2 的结点、……、n<sub>m</sub> 个度为 m 的结点，求叶结点数 n<sub>0</sub>，并写出推导过程。</p>`,
      answer: `<p>设总结点数为 N，则</p>
<span class="formula">N = n<sub>0</sub> + n<sub>1</sub> + n<sub>2</sub> + … + n<sub>m</sub></span>
<p>树中边数为 N−1，另一方面边由各结点发出，故</p>
<span class="formula">N − 1 = n<sub>1</sub> + 2n<sub>2</sub> + 3n<sub>3</sub> + … + m·n<sub>m</sub></span>
<p>两式相减：</p>
<span class="formula">n<sub>0</sub> = 1 + (n<sub>2</sub> + 2n<sub>3</sub> + … + (m−1)n<sub>m</sub>)</span>
<p>即 n<sub>0</sub> = 1 + Σ<sub>i=2</sub><sup>m</sup>(i−1)n<sub>i</sub>。它也等于所有结点的分支总数加 1。m=2 时即二叉树的 n<sub>0</sub>=n<sub>2</sub>+1。</p>`,
      note: "推导只用了“结点数 = 边数 + 1”和“边数 = Σ 度”，这是所有树结点计数题的通用套路。"
    },
    {
      id: "q6-05",
      title: "课件选择题：树与二叉树的概念辨析",
      source: "第六章课件 · 练习",
      kind: "课件练习",
      statement: `<p>（1）结点 A 有 3 个兄弟（不含 A），B 是 A 的父结点，则 B 的度是（ ）。<br>（2）高度为 h 的二叉树只有度为 0 和 2 的结点，结点数至少为（ ）。<br>（3）树最适合表示（ ）。<br>（4）后序 dabec、中序 debac，前序是（ ）。<br>（5）叶结点在三种遍历中的相对次序（ ）。<br>（6）先序与后序正好相反的二叉树一定是（ ）。<br>（7）中序中 n 在 m 前的条件是（ ）。</p>`,
      answer: `<p><strong>（1）B</strong>。A 有 3 个兄弟，加上 A 共 4 个孩子，B 的度为 4。</p>
<p><strong>（2）B（2h−1）</strong>。根必须有 2 个孩子；为使结点最少，每一层只让一条分支继续分叉，形成“每层增加 2 个结点”的形态，共 2h−1 个。</p>
<p><strong>（3）C</strong>。树适合表示元素之间具有分支层次关系的数据；有序/无序数据用线性结构更合适。</p>
<p><strong>（4）D（cedba）</strong>。后序最后 c 为根；中序 debac 中 c 在最右，故 c 无右子树，左子树中序 deba、后序 dabe。左子树根 e；e 左 d、右子树中序 ba、后序 ab → b 为根，a 为 b 的右孩子。树为 c(e(d, b(_,a)), _)，前序 c e d b a。</p>
<p><strong>（5）A</strong>。所有叶子在三种 DFS 序列中都按从左到右的次序出现，相对次序不变。</p>
<p><strong>（6）B</strong>。先序与后序相反等价于每个结点至多一个孩子，即整棵树是一条单链，高度 = 结点数 −1；左链、右链或左右混合的单链都满足，所以 C、D 只是充分条件，不必要。</p>
<p><strong>（7）C</strong>。中序遍历先左子树、再根、再右子树；n 在 m 之前，说明 n 位于 m 的左方（左子树或更左的分支），不是祖先/子孙关系。</p>`,
      note: "第（6）题容易误选 C 或 D；关键是“只有右孩子”只是单链的一种，左链同样使先序与后序相反。"
    },
    {
      id: "q6-06",
      title: "课件选择题：编号、根右侧、森林与最少结点",
      source: "第六章课件 · 练习",
      kind: "课件练习",
      statement: `<p>（1）非空二叉树中序序列中，根结点的右边是（ ）。<br>（2）按某种次序编号 1…n，任意结点 v 的编号等于其左子树最小编号减一，右子树最小编号等于左子树最大编号加一，这是按（ ）编号。<br>（3）森林 F 有三棵树，结点数 M<sub>1</sub>、M<sub>2</sub>、M<sub>3</sub>，对应二叉树根结点右子树的结点数是（ ）。<br>（4）结点最少的树是____，结点最少的二叉树是____。<br>（5）已知边集 {&lt;A,B&gt;,&lt;A,C&gt;,&lt;B,D&gt;,&lt;B,E&gt;,&lt;B,F&gt;,&lt;C,G&gt;,&lt;C,H&gt;,&lt;E,I&gt;,&lt;E,J&gt;}，求 D 的父结点、E 的层数、B 的度数、后根序列。</p>`,
      answer: `<p><strong>（1）A</strong>。中序为“左-根-右”，根右边恰好是右子树的所有结点。</p>
<p><strong>（2）B（前序）</strong>。前序编号先根、再整个左子树、再整个右子树；根的编号紧挨在左子树之前，左子树编号连续，右子树最小编号紧随左子树最大编号。</p>
<p><strong>（3）D（M<sub>2</sub>+M<sub>3</sub>）</strong>。森林转二叉树后，T<sub>1</sub> 的根为二叉树根；其右链依次是 T<sub>2</sub>、T<sub>3</sub> 的根，故右子树含 M<sub>2</sub>+M<sub>3</sub> 个结点。</p>
<p><strong>（4）</strong> 结点最少的树是 <strong>1 个结点</strong>（树要求非空）；结点最少的二叉树是 <strong>空树（0 个结点）</strong>。</p>
<p><strong>（5）</strong> 由边集：A 是根；B 的孩子 D、E、F；C 的孩子 G、H；E 的孩子 I、J。</p>
<ul>
<li>D 的父结点：<strong>B</strong>；</li>
<li>按根为第 1 层，E 在第 <strong>3</strong> 层（A 第 1 层，B 第 2 层）；若按根为第 0 层则为第 2 层；</li>
<li>B 的度：<strong>3</strong>（D、E、F）；</li>
<li>后根序列：D, I, J, E, F, B, G, H, C, A。</li>
</ul>`,
      note: "第（5）问的层数取决于题目约定；第六章作业采用“根为第 1 层”，按此 E 为第 3 层。答题时可注明约定。"
    },
    {
      id: "q6-07",
      title: "树的先根 + 后根能否唯一确定一棵树",
      source: "第六章课件 · 思考题",
      kind: "课件练习",
      star: true,
      statement: `<p>已知一棵树的先根遍历结果与后根遍历结果，能否唯一确定这棵树？若正确请证明，否则举例说明。</p>`,
      answer: `<p><strong>能唯一确定。</strong></p>
<p><strong>证明</strong>：设树 X 按“左孩子—右兄弟”转换为二叉树 X'。由遍历对应关系：</p>
<ul>
<li>X 的先根序列 = X' 的前序序列；</li>
<li>X 的后根序列 = X' 的中序序列。</li>
</ul>
<p>若树 X、Y 的先根序列相同、后根序列也相同，则二叉树 X'、Y' 的前序序列相同、中序序列也相同。而“前序 + 中序”可以唯一确定一棵二叉树，故 X'=Y'。二叉树的森林还原是唯一的，所以 X=Y。</p>
<p>因此树的先根 + 后根可以唯一确定树（这与二叉树“前序 + 后序不唯一”并不矛盾，因为树的后根对应的是二叉树的中序，而不是后序）。</p>`,
      note: "关键是把“树的后根”翻译成“二叉树的中序”，不要直接套用二叉树前序+后序的结论。"
    },
    {
      id: "q6-08",
      title: "带右链的先根次序表示还原森林",
      source: "第六章课件 · 顺序存储",
      kind: "课件练习",
      star: true,
      statement: `<p>已知按先根次序存储的结点表（下标 0~9）：</p>
<table>
<tr><th>下标</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
<tr><td>info</td><td>C</td><td>E</td><td>J</td><td>K</td><td>L</td><td>F</td><td>G</td><td>D</td><td>X</td><td>I</td></tr>
<tr><td>ltag</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>rlink</td><td>7</td><td>5</td><td>3</td><td>4</td><td>−1</td><td>6</td><td>−1</td><td>−1</td><td>9</td><td>−1</td></tr>
</table>
<p>还原对应的森林。</p>`,
      answer: `<p><strong>规则</strong>：ltag=0 表示有孩子，其左孩子是序列中的下一个结点；ltag=1 表示叶。rlink 指向下一个兄弟，−1 表示无兄弟。</p>
<ul>
<li>C（0）有孩子 → 左孩子 E（1）；rlink=7 → 下一个兄弟 D（7）。</li>
<li>E（1）有孩子 → 左孩子 J（2）；rlink=5 → 兄弟 F（5）。</li>
<li>J（2）无孩子，rlink=3 → 兄弟 K；K（3）→ 兄弟 L（4）；L（4）无兄弟。</li>
<li>F（5）无孩子，rlink=6 → 兄弟 G（6）；G 无兄弟。</li>
<li>D（7）有孩子 → 左孩子 X（8）；无兄弟。</li>
<li>X（8）无孩子，rlink=9 → 兄弟 I（9）；I 无兄弟。</li>
</ul>
<p>森林由两棵树组成：</p>
<pre><code>树1: C
     ├─ E
     │  ├─ J
     │  ├─ K
     │  └─ L
     ├─ F
     └─ G

树2: D
     ├─ X
     └─ I</code></pre>
<p>对应括号表示：C(E(J,K,L),F,G)，D(X,I)。先根序列为 C E J K L F G D X I，与表中 info 顺序一致。</p>`,
      note: "C 的 rlink=7 说明 D 是 C 的兄弟，因此这是森林而不是单棵树；若题目说单棵树，则 C 应是根且没有兄弟。"
    },
    {
      id: "q6-09",
      title: "树的前序字符串表示与解析",
      source: "第六章课件 · 序列化",
      kind: "课件练习",
      statement: `<p>已知树的前序字符串表示为 <code>A B C D -1 E -1 -1 F -1 -1 G -1</code>，其中 −1 表示空孩子/空兄弟。还原这棵树，并写出其先根遍历序列。</p>`,
      answer: `<p><strong>解析</strong>：按“值、第一个孩子、下一个兄弟”递归读取。</p>
<ol>
<li>A 的第一个孩子是 B；</li>
<li>B 的第一个孩子是 C；C 的第一个孩子是 D；D 无孩子（−1），下一个兄弟是 E；E 无孩子（−1），无兄弟（−1）；</li>
<li>C 的下一个兄弟是 F；F 无孩子、无兄弟；</li>
<li>B 的下一个兄弟是 G；G 无孩子、无兄弟；</li>
<li>A 无下一个兄弟，结束。</li>
</ol>
<p>树结构：</p>
<pre><code>A
├─ B
│  ├─ C
│  │  ├─ D
│  │  └─ E
│  └─ F
└─ G</code></pre>
<p>括号表示：A(B(C(D,E),F),G)；先根序列：<strong>A B C D E F G</strong>。</p>`,
      note: "字符串中的每个 −1 都要被消费：第一个 −1 表示无孩子，第二个表示无兄弟；递归时两种空都要处理。"
    }
  ],
  cheats: [
    {
      title: "树 ↔ 二叉树与遍历对应",
      html: `<table>
<tr><th>树/森林</th><th>二叉树（左孩子—右兄弟）</th></tr>
<tr><td>第一个孩子</td><td>左孩子</td></tr>
<tr><td>下一个兄弟</td><td>右孩子</td></tr>
<tr><td>先根遍历</td><td>前序遍历</td></tr>
<tr><td>后根遍历</td><td>中序遍历</td></tr>
<tr><td>层次遍历</td><td>不等同于二叉树层序</td></tr>
</table>
<ul>
<li>单棵树 → 二叉树：根的右子树为空。</li>
<li>森林 T1,T2,T3 → 二叉树：根右链是 T2、T3 的根；右子树结点数 M2+M3。</li>
<li>树先根 + 后根唯一；二叉树前序 + 后序不唯一。</li>
</ul>`
    },
    {
      title: "并查集与父指针",
      html: `<table>
<tr><th>操作</th><th>实现</th><th>复杂度</th></tr>
<tr><td>Find</td><td>沿 parent 到根；可路径压缩</td><td>O(α(n))</td></tr>
<tr><td>Different</td><td>Find(x) != Find(y)</td><td>O(α(n))</td></tr>
<tr><td>Union</td><td>小规模根挂到大规模根</td><td>O(α(n))</td></tr>
<tr><td>树高</td><td>按规模合并</td><td>O(log N)</td></tr>
</table>
<ul>
<li>路径压缩只改实际查找路径上的结点。</li>
<li>按规模合并：每次深度 +1，集合大小至少翻倍。</li>
<li>等价关系：自反、对称、传递。</li>
</ul>`
    },
    {
      title: "顺序存储与 K 叉树公式",
      html: `<table>
<tr><th>表示法</th><th>次序</th><th>辅助结构</th></tr>
<tr><td>带右链先根</td><td>先根</td><td>rlink + ltag</td></tr>
<tr><td>双标记先根</td><td>先根</td><td>栈：有兄弟入、无孩子出</td></tr>
<tr><td>带度数后根</td><td>后根</td><td>栈：叶入、k 度弹出 k 个</td></tr>
<tr><td>双标记层次</td><td>层次</td><td>队列：有孩子入、无兄弟出</td></tr>
</table>
<ul>
<li>完全 K 叉树高度 H：N<sub>min</sub>=(K<sup>H</sup>−1)/(K−1)+1；N<sub>max</sub>=(K<sup>H+1</sup>−1)/(K−1)。</li>
<li>父 ⌊(n−1)/K⌋；第 i 个孩子 Kn+i（&lt;N）。</li>
<li>右兄弟：n mod K≠0 且 n+1&lt;N。</li>
<li>一般树 n<sub>0</sub>=1+Σ(i−1)n<sub>i</sub>；K 叉树空指针 N(K−1)+1。</li>
</ul>`
    }
  ]
});
