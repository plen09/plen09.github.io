window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch7",
  num: "07",
  title: "图",
  subtitle: "存储 · 遍历 · 拓扑排序 · 最短路 · 最小生成树 · 关键路径",
  pdf: "assets/slide/第7章图.pdf",
  intro: "图是比树更一般的非线性结构：顶点之间可以有任意多条路径，也可以不连通。本章沿着“如何存（邻接矩阵/邻接表/十字链表）→ 如何走（DFS/BFS）→ 如何排队（拓扑排序）→ 如何求最优（Dijkstra/Floyd/Prim/Kruskal）→ 如何算工期（AOE 关键路径）”这条主线展开。图的算法题几乎都要先画表、再模拟，手算时务必把 dist、入度、并查集或候选边数组写出来。",
  links: [],
  knowledge: [
    {
      id: "k7-01",
      title: "图的定义与分类",
      tags: ["图", "定义", "完全图"],
      body: `<p>图 <code>G=(V,E)</code>：V 是有限的顶点集合，E 是边集合，边是顶点的偶对（无向边用圆括号，有向边用尖括号）。|V|、|E| 分别表示顶点数和边数。</p>
<ul>
<li><strong>无向图</strong>：偶对无序；<strong>有向图</strong>：偶对有序，边也称弧；</li>
<li><strong>稀疏图 / 密集图</strong>：边数相对少 / 多，没有绝对阈值；</li>
<li><strong>完全图</strong>：包含所有可能的边。n 个顶点的无向完全图有 <code>n(n−1)/2</code> 条边；有向完全图有 <code>n(n−1)</code> 条弧；</li>
<li><strong>标号图</strong>：顶点带标号；<strong>带权图 / 网络</strong>：边带权值。</li>
</ul>
<p>本章约定：不考虑顶点到自身的边（自环），也不允许一条边重复出现。</p>`,
      tip: "完全图边数：无向“除以 2”，有向“不除”。n=6 时分别是 15 和 30，这是选择题的高频数字。"
    },
    {
      id: "k7-02",
      title: "顶点的度与握手定理",
      tags: ["度", "握手定理", "易错"],
      body: `<p><strong>度</strong>：与该顶点相关联的边数。有向图中分为</p>
<ul>
<li><strong>入度</strong>：以该顶点为终点的边数；</li>
<li><strong>出度</strong>：以该顶点为始点的边数；</li>
<li>出度为 0 的顶点称为终端结点（叶子）。</li>
</ul>
<p>若图有 n 个顶点、e 条边，d<sub>i</sub> 为顶点 V<sub>i</sub> 的度，则</p>
<p class="formula">Σ<sub>i=1..n</sub> d<sub>i</sub> = 2e</p>
<p>因为每条无向边给两个端点各贡献 1 度。有向图中每条弧给起点贡献 1 出度、终点贡献 1 入度，所以</p>
<p class="formula">Σ 出度 = Σ 入度 = e</p>`,
      tip: "由握手定理可推出：任何图中奇度顶点的个数必为偶数。自环若计入，会给该顶点贡献 2 度；本章不讨论自环。"
    },
    {
      id: "k7-03",
      title: "子图、路径与回路",
      tags: ["子图", "路径", "回路", "DAG"],
      body: `<ul>
<li><strong>子图</strong>：G'=(V',E')，V'⊆V，E'⊆E，且 E' 中每条边的两个端点都在 V' 中；</li>
<li><strong>路径</strong>：顶点序列 V<sub>p</sub>, V<sub>i1</sub>, …, V<sub>q</sub>，相邻顶点间的边都在 E 中；</li>
<li><strong>简单路径</strong>：除起点和终点可以相同外，其余顶点都不重复；</li>
<li><strong>路径长度</strong>：路径上边的条数（带权图另有“权值之和”）；</li>
<li><strong>回路 / 环</strong>：路径上某个顶点与自身连接；<strong>简单回路</strong>：首尾相同且其余顶点不重复的简单路径；</li>
<li><strong>无环图</strong>：不含回路；有向无环图记作 <strong>DAG</strong>。</li>
</ul>`,
      tip: "“简单路径”限制的是中间顶点不重复，不要求起点终点不同；简单回路则是起点=终点且中间不重复。"
    },
    {
      id: "k7-04",
      title: "连通性、连通分量与强连通",
      tags: ["连通", "连通分量", "强连通", "自由树"],
      body: `<ul>
<li><strong>有根图</strong>：有向图中存在一个顶点 V<sub>0</sub>，从它有路径到达其余所有顶点，V<sub>0</sub> 称为根；</li>
<li><strong>连通</strong>：无向图中 V<sub>i</sub> 到 V<sub>j</sub> 有路径；任意两点都连通则图连通；</li>
<li><strong>连通分量</strong>：无向图的极大连通子图；</li>
<li><strong>强连通</strong>：有向图中任意两个不同顶点 V<sub>i</sub>、V<sub>j</sub> 之间既有 V<sub>i</sub>→V<sub>j</sub> 的路径，也有 V<sub>j</sub>→V<sub>i</sub> 的路径；</li>
<li><strong>强连通分量</strong>：有向图的极大强连通子图；</li>
<li><strong>网络</strong>：带权的连通图；</li>
<li><strong>自由树</strong>：不带简单回路的连通无向图，恰有 |V|−1 条边。</li>
</ul>`,
      tip: "无向图谈“连通/连通分量”，有向图谈“强连通/强连通分量”。连通 + 无环 ⇔ 有 |V|−1 条边，三者中任意两个可推出第三个（无向图）。"
    },
    {
      id: "k7-05",
      title: "图的抽象数据类型",
      tags: ["ADT", "接口"],
      body: `<p>图的 ADT 把“顶点集合、边集合、访问标记”封装起来，典型操作有：</p>
<ul>
<li><code>VerticesNum()</code>、<code>EdgesNum()</code>：顶点数、边数；</li>
<li><code>FirstEdge(v)</code>、<code>NextEdge(e)</code>：枚举与顶点 v 关联的边；</li>
<li><code>setEdge(from,to,w)</code>、<code>delEdge(from,to)</code>：增删边；</li>
<li><code>IsEdge(e)</code>、<code>FromVertex(e)</code>、<code>ToVertex(e)</code>、<code>Weight(e)</code>：边的基本信息。</li>
</ul>
<p>边的基类通常含 <code>from</code>、<code>to</code>、<code>weight</code> 三个字段，并重载 <code>&lt;</code>、<code>&gt;</code> 以便按权值比较。图基类中维护 <code>Mark[]</code>（UNVISITED / VISITED）和 <code>indegree[]</code>（入度）数组。</p>
<p>课件实现中 <code>isEdge</code> 的判断条件是 <code>weight&gt;0 &amp;&amp; weight&lt;INFINITY &amp;&amp; to&gt;=0</code>，即用 0 表示“无边”，因此边权按正数处理。</p>`,
      tip: "邻接矩阵和邻接表都继承同一个 Graph 基类，只实现 FirstEdge/NextEdge/setEdge/delEdge 等虚函数，算法层不必关心底层存储——这是“同一 ADT、多种实现”的典型。"
    },
    {
      id: "k7-06",
      title: "邻接矩阵",
      tags: ["存储", "邻接矩阵", "复杂度"],
      body: `<p>用 n×n 矩阵 A 表示顶点间的相邻关系：</p>
<p class="formula">A[i][j] = 1（或权值 w），若 (V<sub>i</sub>,V<sub>j</sub>) 是边；否则为 0（或 ∞）</p>
<ul>
<li>空间代价 <code>O(n²)</code>，只与顶点数有关，与边数无关；</li>
<li><strong>无向图</strong>：矩阵对称；第 i 行（或第 i 列）中 1 的个数 = 顶点 i 的度；整个矩阵 1 的个数的一半 = 边数；</li>
<li><strong>有向图</strong>：矩阵不一定对称；第 i 行 1 的个数 = 出度；第 i 列 1 的个数 = 入度；1 的总数 = 弧数；</li>
<li>带权图把 1 换成权值，无边处用 0 或 ∞；</li>
<li>判断两点是否相邻、取边权都是 <code>O(1)</code>；</li>
<li>适合稠密图；稀疏图会浪费大量空间。</li>
</ul>
<p>稀疏因子 <code>δ = t/(m×n)</code>（t 为非零元个数），课件把 δ&lt;0.05 视为稀疏矩阵。</p>`,
      tip: "无向图矩阵对称，有向图不一定；这是判断题常考点。矩阵的“行和/列和”在有向图里分别对应出度/入度，别记反。"
    },
    {
      id: "k7-07",
      title: "邻接表",
      tags: ["存储", "邻接表", "复杂度"],
      body: `<p>顶点表有 n 个结点，每个含 <code>data</code> 和指向边表的 <code>firstarc</code>；边表每个表目含邻接点序号 <code>adjvex</code>、权值 <code>weight</code> 和 <code>nextarc</code>。</p>
<ul>
<li>无向图：每条边在两个顶点的边表里各出现一次，需 <code>n+2e</code> 个存储单元；</li>
<li>有向图：若只存出边表（或只存入边表），需 <code>n+e</code> 个存储单元；</li>
<li>边表表目通常按邻接点编号从小到大排列；</li>
<li>求某顶点的所有邻接点很方便；求有向图入度需要入边表或额外的 <code>indegree[]</code> 数组；</li>
<li>判断两点是否相邻最坏要扫一个边表，代价 <code>O(degree)</code>；</li>
<li>适合稀疏图，e 很小时节省大量空间。</li>
</ul>
<p>有向图可以同时建立<strong>出边表</strong>和<strong>入边表</strong>；只保存其中一个也能完成遍历，但求入度/出度的方便程度不同。</p>`,
      tip: "空间公式：无向 n+2e，有向 n+e。若题目说“邻接表”而未特别说明，通常指有向图的出边表。"
    },
    {
      id: "k7-08",
      title: "十字链表",
      tags: ["存储", "十字链表", "有向图"],
      body: `<p>十字链表把邻接表和逆邻接表合在一起，专用于有向图。</p>
<ul>
<li><strong>顶点结点</strong>：<code>data</code>、<code>firstinarc</code>（第一条以该顶点为终点的弧）、<code>firstoutarc</code>（第一条以该顶点为起点的弧）；</li>
<li><strong>弧结点</strong>：<code>fromvex</code>、<code>tovex</code>、<code>info</code>（权值）、<code>fromnextarc</code>（同起点的下一条弧）、<code>tonextarc</code>（同终点的下一条弧）。</li>
</ul>
<p>每条弧只存一个结点，却同时挂在“行链”（同起点）和“列链”（同终点）上，所以既能快速找入边，也能快速找出边。空间代价 <code>O(n+e)</code>。</p>`,
      tip: "十字链表的两组指针分别对应邻接矩阵的“行”和“列”，名字也由此而来；无向图一般不用它。"
    },
    {
      id: "k7-09",
      title: "图周游与访问标记",
      tags: ["遍历", "visited", "连通分量"],
      body: `<p><strong>图周游</strong>：给定图 G 和起点 V<sub>0</sub>，从 V<sub>0</sub> 出发系统地访问图中所有顶点，每个顶点恰好访问一次。</p>
<p>图与树不同，周游时必须解决两个问题：</p>
<ul>
<li><strong>非连通图</strong>：从一个顶点出发可能到不了所有顶点；</li>
<li><strong>存在回路</strong>：可能反复绕圈，陷入死循环。</li>
</ul>
<p>解决办法是给每个顶点设置标志位：初始 <code>UNVISITED</code>，访问后置 <code>VISITED</code>。完整周游需要在外层扫描所有顶点，对每个未访问顶点调用一次 DFS/BFS：</p>
<pre><code>for (i = 0; i &lt; n; i++) Mark[i] = UNVISITED;
for (i = 0; i &lt; n; i++)
    if (Mark[i] == UNVISITED)
        do_traverse(G, i);</code></pre>
<p>每调用一次得到一个连通分量（有向图是可达分量）的生成树；所有生成树组成<strong>周游森林</strong>。</p>`,
      tip: "遍历前必须重置 Mark；非连通图只调用一次 DFS/BFS 会漏掉其他分量，这是写代码和手算都容易犯的错。"
    },
    {
      id: "k7-10",
      title: "深度优先搜索（DFS）",
      tags: ["DFS", "遍历", "复杂度"],
      body: `<p>基本思想：访问 V<sub>0</sub> 并标记；递归地访问 V<sub>0</sub> 的每个未访问邻接点；回溯；若还有未访问顶点，另选源点继续。</p>
<pre><code>void DFS(Graph&amp; G, int V) {
    Visit(G, V);
    G.Mark[V] = VISITED;
    for (Edge e = G.FirstEdge(V); G.IsEdge(e); e = G.NextEdge(e))
        if (G.Mark[G.ToVertex(e)] == UNVISITED)
            DFS(G, G.ToVertex(e));
}</code></pre>
<ul>
<li>递归深度最坏为 |V|，空间 <code>O(|V|)</code>；</li>
<li>邻接表：有向图 <code>Θ(|V|+|E|)</code>，无向图 <code>Θ(|V|+2|E|)=Θ(|V|+|E|)</code>；</li>
<li>邻接矩阵：处理所有边需 <code>Θ(|V|²)</code>，总代价 <code>Θ(|V|²)</code>；</li>
<li>DFS 得到的树称<strong>深度优先搜索树</strong>，非连通时得到森林。</li>
</ul>`,
      tip: "DFS 的时间复杂度取决于存储结构，不是固定的 O(V+E)：矩阵实现是 O(V²)。遍历序列也不唯一，取决于邻接点的枚举次序。"
    },
    {
      id: "k7-11",
      title: "广度优先搜索（BFS）",
      tags: ["BFS", "队列", "最短路径"],
      body: `<p>基本思想：访问 V<sub>0</sub>；依次访问 V<sub>0</sub> 的所有未访问邻接点；再依次访问这些邻接点的未访问邻接点；像水波一样逐层扩展。</p>
<pre><code>void BFS(Graph&amp; G, int V) {
    queue&lt;int&gt; Q;
    G.Mark[V] = VISITED;
    Visit(G, V); Q.push(V);
    while (!Q.empty()) {
        int u = Q.front(); Q.pop();
        for (Edge e = G.FirstEdge(u); G.IsEdge(e); e = G.NextEdge(e)) {
            int w = G.ToVertex(e);
            if (G.Mark[w] == UNVISITED) {
                G.Mark[w] = VISITED;   // 入队时就标记
                Visit(G, w); Q.push(w);
            }
        }
    }
}</code></pre>
<ul>
<li>用队列实现，空间 <code>O(|V|)</code>；</li>
<li>时间复杂度与 DFS 相同：邻接表 <code>O(|V|+|E|)</code>，邻接矩阵 <code>O(|V|²)</code>；</li>
<li>BFS 按“边数”分层，在<strong>无权图（或所有边权相等）</strong>中，BFS 第一次到达某顶点时的路径就是最短路径；</li>
<li>BFS 树 / BFS 森林记录每个顶点由谁首次发现。</li>
</ul>`,
      tip: "BFS 必须在入队时标记，否则同一顶点可能被多个前驱重复入队。带权图不能用 BFS 求最短路，要用 Dijkstra。"
    },
    {
      id: "k7-12",
      title: "拓扑排序的概念与性质",
      tags: ["拓扑排序", "DAG", "先决条件"],
      body: `<p><strong>拓扑排序</strong>：把有向无环图 G 的所有顶点排成一个线性序列，使得对任意弧 &lt;u,v&gt;，u 在线性序列中都出现在 v 之前。</p>
<ul>
<li>用 DAG 表示先决条件：边 &lt;u,v&gt; 表示“u 必须先于 v 完成”；</li>
<li>把顶点按拓扑次序排成一行，所有有向边都从左指向右；</li>
<li><strong>拓扑序列通常不唯一</strong>：多个入度为 0 的顶点可以有不同的选择次序；</li>
<li><strong>有环时不存在拓扑序列</strong>；反过来，能完成拓扑排序就说明图是 DAG。</li>
</ul>
<p>典型应用：课程先修关系、编译依赖、工程活动的先后顺序、奖金分配等。</p>`,
      tip: "“拓扑序列唯一”是错误说法；只有当每一步入度为 0 的顶点都唯一时，序列才唯一。"
    },
    {
      id: "k7-13",
      title: "基于入度的拓扑排序（BFS 式）",
      tags: ["拓扑排序", "入度", "队列", "判环"],
      body: `<p>步骤：</p>
<ol>
<li>统计每个顶点的入度；</li>
<li>把所有入度为 0 的顶点入队；</li>
<li>出队一个顶点并输出，把它的所有出边终点的入度减 1；</li>
<li>若某终点入度变为 0，则入队；</li>
<li>重复直到队列为空。</li>
</ol>
<p>若输出的顶点数小于 |V|，说明剩下的顶点都有前驱，图中存在环。</p>
<ul>
<li>邻接表 + 入度数组：<code>Θ(2|V|+|E|)=Θ(|V|+|E|)</code>；</li>
<li>邻接矩阵：每轮找入度为 0 的顶点要扫 <code>Θ(|V|²)</code>，共 |V| 轮，总代价 <code>Θ(|V|³)</code>（课件结论）。</li>
</ul>`,
      tip: "用邻接表时不要把“找入度为 0”写成每轮扫描整个矩阵；维护 indegree 数组并只减后继，才是 O(V+E)。"
    },
    {
      id: "k7-14",
      title: "基于 DFS 的拓扑排序与三色判环",
      tags: ["拓扑排序", "DFS", "判环", "三色"],
      body: `<p>对图做 DFS，在顶点<strong>所有后代都访问完</strong>之后把它记入结果；全部 DFS 结束后，把结果<strong>逆序输出</strong>，即得拓扑序列。</p>
<pre><code>void Do_topsort(Graph&amp; G, int V, int* result, int&amp; tag) {
    G.Mark[V] = VISITED;
    for (Edge e = G.FirstEdge(V); G.IsEdge(e); e = G.NextEdge(e))
        if (G.Mark[G.ToVertex(e)] == UNVISITED)
            Do_topsort(G, G.ToVertex(e), result, tag);
    result[tag++] = V;          // 后序位置记录
}</code></pre>
<p>普通 DFS 只有“未访问/已访问”两态，<strong>不能判断环</strong>：遇到已访问结点时无法区分它是“当前递归栈上的祖先”还是“已经完成的兄弟分支”。</p>
<p>三色法：0=未访问，1=访问中（在当前递归栈上），2=已完成。DFS 时若遇到颜色 1 的邻接点，就存在环；若遇到颜色 2 则安全跳过。</p>`,
      tip: "DFS 拓扑排序的结果是“完成时间的逆序”。判环必须区分“访问中”和“已完成”，这是两态 DFS 做不到的。"
    },
    {
      id: "k7-15",
      title: "最短路径问题的分类",
      tags: ["最短路径", "Dijkstra", "Floyd"],
      body: `<p>带权图的最短路径：两点间<strong>各边权值之和</strong>最小的路径。路径长度不是边数（除非边权都为 1）。</p>
<ul>
<li><strong>单源最短路径</strong>：给定源点 s，求 s 到其余各顶点的最短路径；代表算法 Dijkstra（贪心）；</li>
<li><strong>每对顶点间的最短路径</strong>：求任意 V<sub>i</sub> 到 V<sub>j</sub> 的最短路径；代表算法 Floyd（动态规划）；</li>
<li>广度优先搜索本质上是<strong>单位权重图</strong>的最短路径搜索；</li>
<li>Dijkstra 要求边权非负；Floyd 可以处理负权边，但不能有负权回路。</li>
</ul>
<p>典型应用：导航路径、管线铺设、网络路由。</p>`,
      tip: "看到“边权非负”优先 Dijkstra；看到“所有点对”优先 Floyd；看到“无权图最短路”优先 BFS。"
    },
    {
      id: "k7-16",
      title: "Dijkstra 算法的思想与实现",
      tags: ["Dijkstra", "贪心", "松弛"],
      body: `<p>把顶点分成两组：U = 已确定最短路径的顶点，V−U = 尚未确定。按路径长度递增的次序，每次从 V−U 中选距离源点最近的顶点加入 U，并用它<strong>松弛</strong>其余顶点。</p>
<ul>
<li>初始化：<code>dist[s]=0</code>，其余为 ∞；<code>pre[s]=s</code>；</li>
<li>选点：在 V−U 中选 <code>dist</code> 最小的顶点 u；</li>
<li>松弛：对 u 的每条出边 (u,v,w)，若 <code>dist[v] &gt; dist[u]+w</code>，则更新 <code>dist[v]</code> 和 <code>pre[v]=u</code>；</li>
<li>把 u 标记为已确定，重复直到没有可加入的顶点。</li>
</ul>
<p>正确性依赖边权非负：一旦某顶点被选出，它的 dist 不会再被更短的路径改小。若存在负权边，已经“确定”的顶点可能之后被更短路径推翻，算法失效。</p>
<p>复杂度：数组扫描实现 <code>Θ(|V|²+|E|)=Θ(|V|²)</code>；最小堆实现（允许重复入堆）<code>Θ((|V|+|E|)log|E|)</code>。</p>`,
      tip: "Dijkstra 的 dist 是“源点到该点的距离”；Prim 的 key 是“该点到已选树集合的距离”，两者形式相似但含义不同。"
    },
    {
      id: "k7-17",
      title: "Dijkstra 手算模板（课件例）",
      tags: ["Dijkstra", "例题", "路径还原"],
      body: `<p>课件 p91–p99 的带权有向图以 v0 为源点，最终</p>
<pre><code>dist = { {0,0}, {45,3}, {10,0}, {25,2}, {45,0}, {MAX,-1} }
        长度 前驱  长度 前驱  ...</code></pre>
<p>含义：v0→v1 长 45，前驱 v3；v0→v2 长 10，前驱 v0；v0→v3 长 25，前驱 v2；v0→v4 长 45，前驱 v0；v5 不可达（MAX）。</p>
<p>路径还原：从终点沿 <code>pre</code> 反向走。例如 v1：pre[1]=3 → pre[3]=2 → pre[2]=0，得到 <strong>v0→v2→v3→v1</strong>，长度 45。</p>
<p>手算时建议画一张表：每一轮写“已选集合 U、各点当前 dist、pre、本轮选中的顶点”。</p>`,
      tip: "pre 数组保存的是“最短路径上该点的前一个顶点”，不是下一跳。还原时从终点倒推，最后反转。"
    },
    {
      id: "k7-18",
      title: "Floyd 算法与动态规划递推",
      tags: ["Floyd", "动态规划", "多源最短路"],
      body: `<p>Floyd 求每对顶点间的最短路径。设 <code>adj(k)[i][j]</code> 表示从 V<sub>i</sub> 到 V<sub>j</sub>、中间顶点编号不大于 k 的最短路径长度，则</p>
<p class="formula">adj(k)[i][j] = min( adj(k−1)[i][j], adj(k−1)[i][k] + adj(k−1)[k][j] )</p>
<ul>
<li>初值 <code>adj(0)</code> 就是邻接矩阵（无边为 ∞，自己到自己为 0）；</li>
<li>k 从 0 到 n−1 依次迭代，<code>adj(n−1)</code> 即最终结果；</li>
<li>用 <code>path[i][j]</code> 记录 i→j 最短路径上 j 的前驱（或下一跳）以还原路径；</li>
<li>三重循环，时间 <code>O(n³)</code>，空间 <code>O(n²)</code>；</li>
<li>适合稠密图；允许负权边，但不能有负权回路。</li>
</ul>
<p>也可对每个顶点跑一次 Dijkstra，复杂度同为 <code>O(n³)</code>（数组实现），但 Floyd 代码更短、常数更小，且不要求边权非负。</p>`,
      tip: "Floyd 的最外层循环必须是中间点 k；写成 i/j 在外层会得到错误结果。空间可以原地更新，因为第 k 轮中第 k 行/列不会改变。"
    },
    {
      id: "k7-19",
      title: "最小支撑树（MST）的定义",
      tags: ["MST", "生成树", "网络"],
      body: `<p>对<strong>带权的连通无向图</strong> G，最小支撑树（Minimum-cost Spanning Tree，MST）是包含 G 的全部顶点和部分边的一棵树，满足：</p>
<ul>
<li>保证所有顶点连通；</li>
<li>边的权值总和最小。</li>
</ul>
<p>n 个顶点的生成树恰有 <strong>n−1 条边</strong>。MST 的边权和唯一，但当存在相同权值的边时，MST 的形态可能不唯一。</p>
<p>代表算法：Prim（从一个顶点逐步扩张）和 Kruskal（按边权从小到大选边）。</p>`,
      tip: "MST 只对连通无向图有定义；非连通图只能求“最小生成森林”。MST 不唯一 ≠ 最小权值不唯一。"
    },
    {
      id: "k7-20",
      title: "Prim 算法",
      tags: ["Prim", "MST", "贪心"],
      body: `<p>从任意顶点开始，把它加入 MST 集合 U；每次在“一个端点在 U、另一个端点不在 U”的边中选权最小的一条，把该边和另一个端点加入 U；重复直到所有顶点都在 U 中。</p>
<ul>
<li>维护候选边数组 <code>mst[]</code>：记录每个未加入顶点到 U 的最小边；</li>
<li>每加入一个顶点，就用它的出边更新候选边；</li>
<li>数组实现 <code>O(|V|²)</code>；最小堆实现 <code>O(|E|log|V|)</code>；</li>
<li>与 Dijkstra 同为贪心，但 Prim 选“离已选树集合最近”的点，Dijkstra 选“离源点最近”的点；</li>
<li>正确性可用交换论证：若某条最小跨边 e 不在某棵 MST 中，把 e 加入会形成回路，回路中必有一条跨边 e' 权值不小于 e，用 e 换掉 e' 不会增大总权。</li>
</ul>`,
      tip: "Prim 适合稠密图（O(V²)），Kruskal 适合稀疏图（O(E log E)）。手算时每轮写“U、候选边、选中的边”。"
    },
    {
      id: "k7-21",
      title: "Kruskal 算法",
      tags: ["Kruskal", "MST", "并查集"],
      body: `<p>把所有边按权值从小到大排序；依次扫描每条边，若它的两个端点属于<strong>不同</strong>的连通分量，就选入 MST 并合并两个分量；若属于同一分量则跳过（否则成环）；选够 n−1 条边即停止。</p>
<ul>
<li>用并查集维护连通分量：<code>Different(u,v)</code> 判断是否同一集合，<code>Union(u,v)</code> 合并；</li>
<li>排序 <code>O(|E|log|E|)</code>，并查集近似常数，总代价 <code>O(|E|log|E|)</code>；</li>
<li>适合稀疏图；</li>
<li>若扫描完所有边仍不足 n−1 条，说明原图不连通，不存在生成树；</li>
<li>相同权值的边可能产生不同的 MST，但总权值相同。</li>
</ul>`,
      tip: "Kruskal 判断“是否成环”只需并查集，不需要真的建图；这是它与 Prim 最大的实现差异。"
    },
    {
      id: "k7-22",
      title: "AOE 网与关键路径",
      tags: ["AOE", "关键路径", "工程工期"],
      body: `<p>在带权有向图中，用<strong>顶点表示事件</strong>、<strong>有向边表示活动</strong>、边权表示活动持续时间，这样的图称为<strong>边活动网</strong>（Activity On Edge network，AOE 网）。</p>
<ul>
<li>顶点所表示的事件：它的所有入边活动都已完成，出边活动可以开始；</li>
<li>有些活动可以并行，所以整个工程的最短完成时间 = 从开始顶点到完成顶点的<strong>最长路径</strong>长度；</li>
<li>这条最长路径称为<strong>关键路径</strong>，关键路径上的活动称为<strong>关键活动</strong>；</li>
<li>关键路径可能不止一条；关键活动延期会导致整个工程延期；</li>
<li>课件示例中关键路径 v0→v1→v4→v7→v8，长度为 18。</li>
</ul>`,
      tip: "关键路径求的是“最长”，不是最短；AOE 网必须是 DAG。若图中有环，工程无法开工。"
    },
    {
      id: "k7-23",
      title: "关键路径的四个时间量",
      tags: ["AOE", "ee", "le", "关键活动"],
      body: `<p>对事件 v<sub>j</sub> 和活动 a<sub>k</sub>=&lt;v<sub>i</sub>,v<sub>j</sub>&gt;：</p>
<ul>
<li><strong>事件最早发生时间</strong> <code>ee(j) = max{ ee(i) + w(i,j) }</code>，对所有入边取最大；<code>ee(源)=0</code>；</li>
<li><strong>事件最迟发生时间</strong> <code>le(i) = min{ le(j) − w(i,j) }</code>，对所有出边取最小；<code>le(汇)=ee(汇)</code>；</li>
<li><strong>活动最早开始时间</strong> <code>e(k) = ee(i)</code>；</li>
<li><strong>活动最晚开始时间</strong> <code>l(k) = le(j) − w(i,j)</code>；</li>
<li><strong>时间余量</strong> <code>l(k)−e(k)</code>；余量为 0 的活动就是关键活动。</li>
</ul>
<p>计算顺序：按拓扑序正向求 ee；按逆拓扑序反向求 le；再逐条边算 e、l。总时间 <code>O(n+e)</code>。</p>`,
      tip: "ee/le 是事件的量，e/l 是活动的量；最迟时间从汇点倒推，汇点 le=ee。关键活动满足 e=l，不是 ee=le。"
    },
    {
      id: "k7-24",
      title: "图论常见易错结论",
      tags: ["易错", "判断题", "总结"],
      body: `<ul>
<li>“有 n−1 条边的无向图是树”<strong>错</strong>：还必须连通（或等价地无环）；</li>
<li>“有向图的邻接矩阵一定对称”<strong>错</strong>：只有无向图才一定对称；</li>
<li>“DFS/BFS 序列唯一”<strong>错</strong>：取决于邻接点的枚举次序；</li>
<li>“拓扑序列唯一”<strong>错</strong>：多个零入度顶点时有多种选择；</li>
<li>“有环图有拓扑序列”<strong>错</strong>：有环则无拓扑序列；</li>
<li>“Dijkstra 能处理负权边”<strong>错</strong>：负权可能推翻已确定的最短路径；</li>
<li>“Floyd 不能有负权边”<strong>错</strong>：可以有负权边，但不能有负权回路；</li>
<li>“MST 唯一”<strong>错</strong>：相同权值可能有多棵 MST，但最小总权值唯一；</li>
<li>“DFS 拓扑排序本身能判环”<strong>错</strong>：需要三色标记或改用入度法；</li>
<li>“BFS 能求带权图最短路”<strong>错</strong>：只在无权/等权图中成立；</li>
<li>“邻接矩阵空间与边数有关”<strong>错</strong>：固定 O(n²)，与 e 无关。</li>
</ul>`,
      tip: "判断题里出现“一定、唯一、任何、都”时先找反例；出现“必须、只能”时想算法前提条件。"
    },
    {
      id: "k7-25",
      title: "图的建模与应用",
      tags: ["建模", "应用", "拓扑排序"],
      body: `<p>图算法的价值在于把实际问题抽象成“顶点 + 边”：</p>
<ul>
<li><strong>课程先修</strong>：课程是顶点，先修关系是有向边；拓扑排序给出可行学习顺序；</li>
<li><strong>奖金分配</strong>：若员工 a 的奖金应高于 b，连边 a→b；按拓扑层次从 100 开始递增，环存在则无解；</li>
<li><strong>公路造价</strong>：城市是顶点，公路是带权边；求 MST 使总造价最小；</li>
<li><strong>导航/管线</strong>：求两点间权值和最小的路径，用 Dijkstra/Floyd；</li>
<li><strong>工程调度</strong>：活动是边、事件是顶点；AOE 关键路径决定最短工期；</li>
<li><strong>编译/操作系统</strong>：模块依赖、资源分配用 DAG 与拓扑排序描述。</li>
</ul>`,
      tip: "建模题先问三件事：顶点是什么？边是什么？边权/方向是什么？这决定了该用遍历、拓扑、最短路还是 MST。"
    }
  ],
  questions: [
    {
      id: "q7-01",
      title: "完全图、度数与自由树的基本计算",
      source: "第七章课件 · 基本概念",
      kind: "课件练习",
      star: 2,
      statement: `<p>回答下列问题，并说明理由：</p>
<ol>
<li>6 个顶点的无向完全图有多少条边？有向完全图有多少条弧？</li>
<li>一个无向图有 6 个顶点、9 条边，所有顶点的度数之和是多少？</li>
<li>“有 n−1 条边的无向图一定是树”这句话对吗？</li>
<li>有向图的邻接矩阵一定是对称矩阵吗？</li>
</ol>`,
      answer: `<ol>
<li>无向完全图：<code>n(n−1)/2 = 6×5/2 = 15</code> 条边；有向完全图：<code>n(n−1) = 30</code> 条弧。</li>
<li>由握手定理 <code>Σd = 2e = 18</code>。</li>
<li><strong>不对</strong>。n−1 条边只是树的一个必要条件；还必须连通（等价地，无环）。反例：4 个顶点、3 条边构成一个三角形，另有一个孤立顶点——边数为 3=n−1，但图不连通，不是树。</li>
<li><strong>不一定</strong>。无向图的邻接矩阵一定对称；有向图只有在任意 &lt;i,j&gt; 与 &lt;j,i&gt; 同时存在时才对称，一般情况下不对称。</li>
</ol>`,
      note: "自由树的三个等价刻画（无向图）：连通 + 无环；连通 + n−1 条边；无环 + n−1 条边。任取两个可推出第三个。"
    },
    {
      id: "q7-02",
      title: "邻接矩阵与邻接表的空间和度数",
      source: "第七章课件 · 存储结构",
      kind: "课件练习",
      star: 2,
      statement: `<p>一个有 5 个顶点、7 条弧的有向图：</p>
<ol>
<li>用邻接矩阵存储需要多少个矩阵元素？与边数有关吗？</li>
<li>用邻接表（只存出边表）需要多少个存储单元？</li>
<li>所有顶点的出度之和、入度之和分别是多少？</li>
<li>在邻接矩阵中如何快速求顶点 i 的出度和入度？在邻接表中求入度方便吗？</li>
<li>若改为 5 个顶点、7 条边的无向图，邻接表需要多少单元？</li>
</ol>`,
      answer: `<ol>
<li><code>5×5=25</code> 个元素；邻接矩阵空间固定为 <code>O(n²)</code>，与边数无关。</li>
<li>有向图只存出边表：<code>n+e = 5+7 = 12</code> 个单元（5 个顶点结点 + 7 个边表目）。</li>
<li>每条弧贡献 1 个出度和 1 个入度，所以两者都等于弧数 7。</li>
<li>矩阵第 i 行非零元个数 = 出度，第 i 列非零元个数 = 入度，都是 <code>O(n)</code> 扫描；邻接表求出度只需扫自己的边表，求入度则要扫描所有顶点的边表（除非另建入边表或维护 <code>indegree[]</code>），不方便。</li>
<li>无向图邻接表：<code>n+2e = 5+14 = 19</code> 个单元。</li>
</ol>`,
      note: "邻接矩阵适合稠密图、需要 O(1) 判断相邻；邻接表适合稀疏图、需要快速枚举邻接点。十字链表空间也是 O(n+e)，但能同时快速找出边和入边。"
    },
    {
      id: "q7-03",
      title: "DFS 与 BFS 序列为什么不同",
      source: "第七章课件 · 图周游",
      kind: "课件练习",
      star: 2,
      statement: `<p>对课件 p47/p51 的同一个有向图，从顶点 a 出发，课件给出的序列是：</p>
<ul>
<li>深度优先搜索：<code>a, b, c, f, d, e, g</code></li>
<li>广度优先搜索：<code>a, b, d, e, f, c, g</code></li>
</ul>
<p>回答：</p>
<ol>
<li>为什么两个序列不同？分别使用了什么辅助结构？</li>
<li>若把某个顶点的邻接表次序调换，DFS/BFS 序列是否一定改变？</li>
<li>如果图不连通，只调用一次 DFS(a) 能访问所有顶点吗？应该怎么改？</li>
</ol>`,
      answer: `<ol>
<li>DFS 沿一条路走到底再回溯，使用<strong>递归/栈</strong>；BFS 按层扩展，使用<strong>队列</strong>。两者访问顶点的时机不同，所以序列不同。</li>
<li>不一定“一定改变”，但<strong>可能改变</strong>：序列由算法和邻接点的枚举次序共同决定。若调换次序后第一个未访问邻接点没变，序列可能不变；只要某个分支的首次选择改变，后续序列就会改变。因此 DFS/BFS 序列不唯一。</li>
<li>不能。非连通图从 a 出发只能访问 a 所在连通分量；需要在外层扫描所有顶点，对每个仍为 UNVISITED 的顶点再次调用 DFS/BFS，得到多棵周游树（森林）。</li>
</ol>`,
      note: "BFS 第一次访问某顶点时的路径是“边数最少”的路径；DFS 没有这个性质。两者时间复杂度相同，但空间和访问顺序不同。"
    },
    {
      id: "q7-04",
      title: "设计算法判断无向图是否是一棵树",
      source: "第七章课件 · 练习",
      kind: "课件练习",
      star: 3,
      statement: `<p>设计一个算法判断无向图 G 是否是一棵树：若是返回 true，否则返回 false。给出思路、关键判断和复杂度。</p>`,
      answer: `<p><strong>判定条件</strong>：无向图 G 是树 ⇔ G 连通且无回路 ⇔ G 连通且有 n−1 条边 ⇔ G 有 n−1 条边且无回路。</p>
<p><strong>DFS 做法</strong>：</p>
<ol>
<li>从任一顶点出发 DFS，用 <code>visited[]</code> 标记；统计访问到的顶点数 <code>countV</code>；</li>
<li>统计遍历过的边数 <code>countE</code>。无向图每条边会被两个方向各扫一次，可只在 <code>from &lt; to</code> 时计数，保证每条边只算一次；</li>
<li>DFS 过程中若遇到已访问且不是当前结点父结点的邻接点，说明存在回路，可立即返回 false；</li>
<li>DFS 结束后检查 <code>countV == n</code> 且 <code>countE == n−1</code>。</li>
</ol>
<pre><code>bool isTree(Graph&amp; G) {
    int n = G.VerticesNum();
    init visited[0..n-1] = false;
    int countV = 0, countE = 0;
    if (!dfsCheck(G, 0, -1, visited, countV, countE)) return false;
    return countV == n &amp;&amp; countE == n - 1;
}</code></pre>
<p>其中 <code>dfsCheck</code> 访问结点时 <code>countV++</code>，对每条满足 <code>from &lt; to</code> 的边 <code>countE++</code>；若遇到已访问的非父结点则返回 false。</p>
<p><strong>复杂度</strong>：邻接表 <code>O(n+e)</code>，邻接矩阵 <code>O(n²)</code>。也可以用并查集：若边数 ≠ n−1 直接 false；否则逐条边合并，若某条边两端已同属一个集合则有环，返回 false；最后检查只有一个连通分量。</p>`,
      note: "n=1、e=0 的图也是树，算法应返回 true；空图（n=0）按定义通常不算树，需要看题目约定。"
    },
    {
      id: "q7-05",
      title: "课程先修关系的拓扑排序",
      source: "第七章课件 · 拓扑排序",
      kind: "课件练习",
      star: 2,
      statement: `<p>课程及先修关系如下（C1 无先修；C2 需 C1；C3 需 C1、C2；C4 需 C2、C3；C5 需 C2；C6 需 C4、C5；C7 需 C4、C9；C8 需 C1；C9 需 C8）：</p>
<ol>
<li>给出两个不同的拓扑序列，并验证它们都满足所有先修关系；</li>
<li>该图是否存在拓扑序列？为什么？</li>
<li>分别写出邻接矩阵和邻接表实现拓扑排序的时间复杂度。</li>
</ol>`,
      answer: `<ol>
<li>课件给出的两个序列：
<ul>
<li><code>C1 C2 C3 C4 C5 C6 C8 C9 C7</code></li>
<li><code>C1 C8 C9 C2 C5 C3 C4 C7 C6</code></li>
</ul>
验证第二个：C2 在 C2 的先修 C1 之后；C3 在 C1、C2 之后；C4 在 C2、C3 之后；C5 在 C2 之后；C6 在 C4、C5 之后；C7 在 C4、C9 之后；C9 在 C8 之后。全部满足。</li>
<li>存在。该先修关系可以画成有向无环图（DAG），没有循环依赖；按“入度为 0 就输出、删除其出边”的算法可以输出全部 9 个顶点。</li>
<li>邻接矩阵：每轮找入度为 0 的顶点要扫 <code>Θ(|V|²)</code>，共 |V| 轮，总 <code>Θ(|V|³)</code>；邻接表 + 入度数组：<code>Θ(|V|+|E|)</code>。</li>
</ol>`,
      note: "拓扑序列不唯一，但“是否存在”只取决于有没有环。若算法输出顶点数少于 n，剩下的顶点构成环（或依赖环），即可判定无解。"
    },
    {
      id: "q7-06",
      title: "用三色标记检测有向环",
      source: "第七章课件 · 思考题",
      kind: "课件练习",
      star: 3,
      statement: `<p>普通 DFS 拓扑排序为什么不能判断有向图中是否存在环？请给出一种能判环的 DFS 算法，并说明复杂度。</p>`,
      answer: `<p><strong>原因</strong>：普通 DFS 只有“未访问/已访问”两种状态。遇到已访问结点时，无法区分它是“当前递归栈上的祖先”（说明有环）还是“另一个分支已经完成的结点”（说明无环，只是交叉边/前向边）。</p>
<p><strong>三色标记</strong>：</p>
<ul>
<li>0 = 未访问（白）；</li>
<li>1 = 访问中（灰，正在当前递归栈上）；</li>
<li>2 = 已完成（黑，所有后代都处理完）。</li>
</ul>
<pre><code>bool dfs(Graph&amp; G, int u) {
    color[u] = 1;
    for (Edge e = G.FirstEdge(u); G.IsEdge(e); e = G.NextEdge(e)) {
        int v = G.ToVertex(e);
        if (color[v] == 1) return false;      // 遇到栈上的祖先 → 有环
        if (color[v] == 0 &amp;&amp; !dfs(G, v)) return false;
    }
    color[u] = 2;
    return true;
}</code></pre>
<p>对每个未访问顶点调用一次；只要有一次返回 false，就存在环。若需要拓扑序列，可在 <code>color[u]=2</code> 时把 u 追加到结果，最后反转。</p>
<p><strong>复杂度</strong>：邻接表 <code>O(|V|+|E|)</code>，邻接矩阵 <code>O(|V|²)</code>。也可用入度法：拓扑排序结束后若输出顶点数小于 |V|，则有环。</p>`,
      note: "三色法与 DFS 拓扑排序可以合并：后序记录 + 灰色回边判环，一遍 DFS 同时得到拓扑序和环检测结果。"
    },
    {
      id: "q7-07",
      title: "Dijkstra 手算：dist、pre 与路径还原",
      source: "第七章课件 · p91–p99",
      kind: "课件练习",
      star: 3,
      statement: `<p>带权有向图有顶点 v0…v5，边为：v0→v1(50)、v0→v2(10)、v0→v4(45)、v2→v3(15)、v3→v1(20)、v3→v4(60)。以 v0 为源点执行 Dijkstra 算法。</p>
<ol>
<li>写出每一轮被加入已确定集合的顶点；</li>
<li>给出最终的 <code>dist</code> 与 <code>pre</code> 数组；</li>
<li>还原 v0→v1 的最短路径及长度；</li>
<li>v5 的距离是多少？说明原因。</li>
</ol>`,
      answer: `<p>初始化：<code>dist = [0,50,10,∞,45,∞]</code>，<code>pre = [0,0,0,−1,0,−1]</code>。</p>
<ol>
<li>选 v2（10）→ 松弛 v3：<code>10+15=25 &lt; ∞</code>，<code>dist[3]=25, pre[3]=2</code>；<br>
选 v3（25）→ 松弛 v1：<code>25+20=45 &lt; 50</code>，<code>dist[1]=45, pre[1]=3</code>；松弛 v4：<code>25+60=85 &gt; 45</code>，不变；<br>
选 v1（45）→ 无更短出边；<br>
选 v4（45）→ 无更短出边；<br>
v5 不可达，结束。</li>
<li>最终：<code>dist = [0,45,10,25,45,∞]</code>，<code>pre = [0,3,0,2,0,−1]</code>，即课件写法 <code>{{0,0},{45,3},{10,0},{25,2},{45,0},{MAX,−1}}</code>。</li>
<li>从 v1 倒推：<code>pre[1]=3 → pre[3]=2 → pre[2]=0</code>，路径 <strong>v0→v2→v3→v1</strong>，长度 45。</li>
<li>v5 的 dist 为 ∞（MAX）。图中没有从 v0 可达 v5 的路径，算法结束时 v5 仍未加入集合。</li>
</ol>`,
      note: "Dijkstra 的 dist 一旦确定就不会再改（非负权前提）。若存在负权边，v3 加入后可能通过负边把 v1 改得更小，算法就不能提前确定 v3。"
    },
    {
      id: "q7-08",
      title: "Floyd 递推与路径还原",
      source: "第七章课件 · Floyd 算法",
      kind: "课件练习",
      star: 3,
      statement: `<p>仍使用上一题的 6 顶点带权有向图，用 Floyd 算法求所有点对的最短路径。</p>
<ol>
<li>写出 Floyd 的动态规划递推式，并说明 <code>adj(k)[i][j]</code> 的含义；</li>
<li>Floyd 求出 v0→v1 的最短路径长度和路径；</li>
<li>Floyd 的时间、空间复杂度各是多少？适合什么图？</li>
<li>Floyd 能否处理负权边？负权回路呢？</li>
</ol>`,
      answer: `<ol>
<li><code>adj(k)[i][j]</code> 表示从 V<sub>i</sub> 到 V<sub>j</sub>、中间顶点编号不超过 k 的最短路径长度。递推：
<p class="formula">adj(k)[i][j] = min( adj(k−1)[i][j], adj(k−1)[i][k] + adj(k−1)[k][j] )</p>
初值 <code>adj(0)</code> 为邻接矩阵；k 从 0 到 n−1 迭代，<code>adj(n−1)</code> 为最终结果。</li>
<li><code>adj[0][1]=45</code>；由 <code>nextvex[0][1]=2</code>、<code>nextvex[2][1]=3</code>、<code>nextvex[3][1]=1</code>，路径为 <strong>v0→v2→v3→v1</strong>，长度 45。</li>
<li>时间 <code>O(n³)</code>（三重循环），空间 <code>O(n²)</code>；适合稠密图。对稀疏图反复跑 Dijkstra 可能更合适。</li>
<li>可以处理负权边，因为每轮都尝试所有中间点；但<strong>不能有负权回路</strong>，否则最短路径不存在（可以无限绕圈变小）。</li>
</ol>`,
      note: "Floyd 的三重循环中，中间点 k 必须在最外层；否则 <code>adj(k−1)[i][k]</code> 的语义会被破坏，结果错误。"
    },
    {
      id: "q7-09",
      title: "Prim 算法构造最小生成树",
      source: "第七章课件 · Prim 例",
      kind: "课件练习",
      star: 4,
      statement: `<p>带权无向图有 6 个顶点 v0…v5，边及权值为：</p>
<p><code>(v0,v1,10) (v0,v4,19) (v0,v5,21) (v1,v2,5) (v1,v3,6) (v1,v5,11) (v2,v3,6) (v3,v4,18) (v3,v5,14) (v4,v5,33)</code></p>
<p>从 v0 开始用 Prim 算法构造 MST：写出每轮加入的顶点和边、候选数组的变化，以及最终总权值。</p>`,
      answer: `<p>初始 U={v0}，候选边：<code>(v0,v1)10, (v0,v4)19, (v0,v5)21</code>。</p>
<ol>
<li>选最小边 (v0,v1)10，加入 v1。U={v0,v1}。用 v1 的边更新：<code>v2←5</code>（原 ∞）、<code>v3←6</code>（原 ∞）、<code>v5←11</code>（原 21）；v4 的 19 不变。候选：<code>5,6,19,11</code>。</li>
<li>选 (v1,v2)5，加入 v2。U={v0,v1,v2}。v2 的边 (v2,v3)6 不更小，无更新。</li>
<li>选 (v1,v3)6，加入 v3。U 加入 v3。用 v3 更新 v4：<code>18 &lt; 19</code>，改为 18；v5 的 14 &gt; 11，不变。</li>
<li>选 (v1,v5)11，加入 v5。U 加入 v5。v5 到 v4 的 33 &gt; 18，不变。</li>
<li>选 (v3,v4)18，加入 v4。U 包含全部 6 个顶点。</li>
</ol>
<p>MST 边：<code>(v0,v1)10, (v1,v2)5, (v1,v3)6, (v1,v5)11, (v3,v4)18</code>；总权值 <strong>50</strong>。</p>
<p>加入顺序：v0 → v1 → v2 → v3 → v5 → v4。</p>`,
      note: "第 1 轮后 v4 的候选值是 19，直到 v3 加入才降为 18。手算时每轮都要比较“新顶点到各未选点的边”与旧候选值，不能只看新边。"
    },
    {
      id: "q7-10",
      title: "Kruskal 算法与等价类合并",
      source: "第七章课件 · Kruskal 例",
      kind: "课件练习",
      star: 4,
      statement: `<p>对上一题的图使用 Kruskal 算法。边按权值递增排列为：</p>
<p><code>(v1,v2,5), (v1,v3,6), (v2,v3,6), (v0,v1,10), (v1,v5,11), (v3,v5,14), (v3,v4,18), (v0,v4,19), (v0,v5,21), (v4,v5,33)</code></p>
<ol>
<li>依次判断每条边，写出“选入/舍去”及理由；</li>
<li>最终 MST 的边和总权值；</li>
<li>说明为什么相同权值的边可能导致不同的 MST，但总权值不变。</li>
</ol>`,
      answer: `<ol>
<li>
<ul>
<li>(v1,v2)5：v1、v2 属不同分量 → 选入，合并 {v1,v2}；</li>
<li>(v1,v3)6：v3 属另一分量 → 选入，合并 {v1,v2,v3}；</li>
<li>(v2,v3)6：v2、v3 已在同一分量 → <strong>舍去</strong>（会成环）；</li>
<li>(v0,v1)10：不同分量 → 选入，合并 {v0,v1,v2,v3}；</li>
<li>(v1,v5)11：不同分量 → 选入，合并 v5；</li>
<li>(v3,v5)14：v3、v5 已在同一分量 → <strong>舍去</strong>；</li>
<li>(v3,v4)18：不同分量 → 选入，合并 v4；此时已有 5=n−1 条边，停止。</li>
</ul>
</li>
<li>MST 边：<code>(v1,v2)5, (v1,v3)6, (v0,v1)10, (v1,v5)11, (v3,v4)18</code>；总权值 <strong>50</strong>。</li>
<li>(v1,v3) 与 (v2,v3) 权值都为 6。若排序时先处理 (v2,v3)，则会选 (v1,v2)、(v2,v3)，而舍去 (v1,v3)，得到另一棵 MST：<code>(v1,v2)5, (v2,v3)6, (v0,v1)10, (v1,v5)11, (v3,v4)18</code>，总权值仍为 50。选择次序不同只改变形态，不改变最小总权值。</li>
</ol>`,
      note: "Kruskal 的“舍去”条件是两个端点已经属于同一连通分量；用并查集 Find 判断即可，不需要真的检查回路。"
    },
    {
      id: "q7-11",
      title: "AOE 关键路径计算（补充算例）",
      source: "第七章课件 · AOE 关键路径（补充算例）",
      kind: "补充",
      star: 4,
      statement: `<p>某 AOE 网有事件 v0…v5，活动及持续时间：</p>
<p><code>v0→v1(3), v0→v2(2), v1→v3(2), v2→v3(4), v1→v4(3), v3→v5(2), v4→v5(1)</code></p>
<ol>
<li>求各事件的 <code>ee</code> 和 <code>le</code>；</li>
<li>求各活动的 <code>e</code>、<code>l</code> 和时间余量；</li>
<li>指出关键活动和关键路径，并给出工程最短工期。</li>
</ol>`,
      answer: `<p><strong>1. 事件时间</strong>（正向拓扑求 ee，反向求 le）：</p>
<table>
<tr><th>事件</th><th>v0</th><th>v1</th><th>v2</th><th>v3</th><th>v4</th><th>v5</th></tr>
<tr><td>ee</td><td>0</td><td>3</td><td>2</td><td>6</td><td>6</td><td>8</td></tr>
<tr><td>le</td><td>0</td><td>4</td><td>2</td><td>6</td><td>7</td><td>8</td></tr>
</table>
<p>计算要点：<code>ee(3)=max(3+2, 2+4)=6</code>，<code>ee(4)=3+3=6</code>，<code>ee(5)=max(6+2,6+1)=8</code>；<code>le(5)=8</code>，<code>le(4)=8−1=7</code>，<code>le(3)=8−2=6</code>，<code>le(2)=6−4=2</code>，<code>le(1)=min(6−2,7−3)=4</code>，<code>le(0)=min(4−3,2−2)=0</code>。</p>
<p><strong>2. 活动时间</strong>：</p>
<table>
<tr><th>活动</th><th>e</th><th>l</th><th>l−e</th><th>关键？</th></tr>
<tr><td>v0→v1 (3)</td><td>0</td><td>1</td><td>1</td><td>否</td></tr>
<tr><td>v0→v2 (2)</td><td>0</td><td>0</td><td>0</td><td><strong>是</strong></td></tr>
<tr><td>v1→v3 (2)</td><td>3</td><td>4</td><td>1</td><td>否</td></tr>
<tr><td>v2→v3 (4)</td><td>2</td><td>2</td><td>0</td><td><strong>是</strong></td></tr>
<tr><td>v1→v4 (3)</td><td>3</td><td>4</td><td>1</td><td>否</td></tr>
<tr><td>v3→v5 (2)</td><td>6</td><td>6</td><td>0</td><td><strong>是</strong></td></tr>
<tr><td>v4→v5 (1)</td><td>6</td><td>7</td><td>1</td><td>否</td></tr>
</table>
<p><strong>3.</strong> 关键活动为 v0→v2、v2→v3、v3→v5，关键路径为 <strong>v0→v2→v3→v5</strong>，工程最短工期为 <strong>8</strong>。</p>`,
      note: "关键路径是“最长路径”，所以 ee 取 max、le 取 min。余量为 0 的活动不能延期；余量大于 0 的活动可以在余量范围内延后而不影响总工期。"
    },
    {
      id: "q7-12",
      title: "图论判断题快速自测",
      source: "第七章课件 · 易错结论（补充）",
      kind: "补充",
      star: 2,
      statement: `<p>判断下列说法是否正确，并简要说明理由：</p>
<ol>
<li>有向图的邻接矩阵一定是对称矩阵。</li>
<li>无向图的邻接表需要 n+2e 个存储单元。</li>
<li>一个 DAG 的拓扑序列是唯一的。</li>
<li>有环的有向图一定不存在拓扑序列。</li>
<li>Dijkstra 算法可以正确处理负权边。</li>
<li>Floyd 算法允许负权边，但不允许负权回路。</li>
<li>最小生成树一定唯一。</li>
<li>普通 DFS 拓扑排序本身可以判断图中是否有环。</li>
<li>BFS 可以在无权图中求最短路径。</li>
<li>有 n−1 条边的无向图一定是树。</li>
</ol>`,
      answer: `<ol>
<li><strong>错</strong>。只有无向图的邻接矩阵一定对称。</li>
<li><strong>对</strong>。n 个顶点结点 + 2e 个边表目（每条无向边存两次）。</li>
<li><strong>错</strong>。同时有多个入度为 0 的顶点时，选择次序不同会得到不同序列。</li>
<li><strong>对</strong>。环上的顶点互相依赖，无法排成满足所有边的线性序列。</li>
<li><strong>错</strong>。负权边可能使已“确定”的顶点之后出现更短路径，破坏贪心正确性。</li>
<li><strong>对</strong>。负权回路会让最短路径无限减小，没有有限解。</li>
<li><strong>错</strong>。存在相同权值的边时可能有多棵 MST；但最小总权值唯一。</li>
<li><strong>错</strong>。普通 DFS 只有两态，不能区分“当前栈上的祖先”和“已完成的结点”，需要三色标记或入度法。</li>
<li><strong>对</strong>。所有边权相等（或都为 1）时，BFS 第一次到达即最短（边数最少）。</li>
<li><strong>错</strong>。还需连通（或等价地无环）；反例：三角形 + 孤立顶点。</li>
</ol>`,
      note: "这十句话覆盖了本章最常见的判断题陷阱，考前可以直接背“错因”。"
    }
  ],
  cheats: [
    {
      title: "图的基本公式与存储结构",
      html: `<table>
<tr><th>结构</th><th>空间</th><th>适合</th><th>度 / 特点</th></tr>
<tr><td>邻接矩阵</td><td>O(n²)，与 e 无关</td><td>稠密图</td><td>无向：对称，行和=度；有向：行=出度，列=入度；判相邻 O(1)</td></tr>
<tr><td>邻接表</td><td>无向 n+2e；有向 n+e</td><td>稀疏图</td><td>出度易求；入度需入边表/indegree；判相邻 O(degree)</td></tr>
<tr><td>十字链表</td><td>O(n+e)</td><td>有向图</td><td>同时有 firstin/firstout，入边出边都快</td></tr>
</table>
<ul>
<li>无向完全图边数 n(n−1)/2；有向完全图弧数 n(n−1)。</li>
<li>握手定理：Σd=2e；有向图 Σ出度=Σ入度=e。</li>
<li>自由树：连通 + 无环 + n−1 条边（三者任取两个可推第三个）。</li>
<li>邻接矩阵 0 表示无边，带权图用 0/∞ 区分；课件 <code>isEdge</code> 要求 weight&gt;0。</li>
</ul>`
    },
    {
      title: "遍历与拓扑排序",
      html: `<table>
<tr><th>算法</th><th>辅助结构</th><th>顺序特征</th><th>复杂度（表/矩阵）</th><th>判环</th></tr>
<tr><td>DFS</td><td>递归/栈</td><td>一路到底再回溯；前序/后序</td><td>O(V+E) / O(V²)</td><td>三色标记（灰回边）</td></tr>
<tr><td>BFS</td><td>队列</td><td>逐层扩展；无权最短路</td><td>O(V+E) / O(V²)</td><td>—</td></tr>
<tr><td>拓扑（入度）</td><td>入度数组 + 队列</td><td>零入度出队，删出边</td><td>O(V+E) / O(V³)</td><td>输出数 &lt; V 则有环</td></tr>
<tr><td>拓扑（DFS）</td><td>递归栈 + 结果数组</td><td>后序记录，最后逆序</td><td>O(V+E)</td><td>本身不能，需三色</td></tr>
</table>
<ul>
<li>遍历序列不唯一，取决于邻接点次序；非连通图需外层循环。</li>
<li>DFS 拓扑 = 完成时间的逆序；BFS 拓扑 = 入度为零的顺序。</li>
<li>BFS 入队时就要标记，避免重复入队。</li>
</ul>`
    },
    {
      title: "最短路、MST 与关键路径",
      html: `<table>
<tr><th>算法</th><th>目标</th><th>思想</th><th>复杂度</th><th>适用 / 限制</th></tr>
<tr><td>Dijkstra</td><td>单源最短路</td><td>贪心 + 松弛</td><td>O(V²)；堆 O((V+E)logE)</td><td>边权非负；稠密图可用数组</td></tr>
<tr><td>Floyd</td><td>所有点对最短路</td><td>动态规划插点</td><td>O(V³)，空间 O(V²)</td><td>稠密图；可负权，不可负权回路</td></tr>
<tr><td>Prim</td><td>MST</td><td>从一点扩张，选跨边最小</td><td>O(V²)；堆 O(E logV)</td><td>连通无向图；稠密图</td></tr>
<tr><td>Kruskal</td><td>MST</td><td>按权排序 + 并查集</td><td>O(E logE)</td><td>连通无向图；稀疏图</td></tr>
<tr><td>AOE</td><td>关键路径</td><td>拓扑正/反向求 ee/le</td><td>O(V+E)</td><td>DAG；最长路径</td></tr>
</table>
<ul>
<li>Floyd 递推：<code>D[i][j]=min(D[i][j], D[i][k]+D[k][j])</code>，k 在最外层。</li>
<li>关键路径：<code>ee(j)=max(ee(i)+w)</code>，<code>le(i)=min(le(j)−w)</code>，<code>e=ee(i)</code>，<code>l=le(j)−w</code>，<code>e=l</code> 即关键活动。</li>
<li>MST 形态可能不唯一，总权值唯一；关键路径也可能不止一条。</li>
<li>BFS 只解决无权/等权最短路；Dijkstra 不能有负权边。</li>
</ul>`
    }
  ]
});
