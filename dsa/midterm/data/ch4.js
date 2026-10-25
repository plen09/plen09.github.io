window.CONTENT = window.CONTENT || [];
window.CONTENT.push({
  id: "ch4",
  num: "04",
  title: "字符串",
  subtitle: "存储 · 朴素匹配 · KMP · next 数组",
  pdf: "assets/slide/第4章字符串.pdf",
  intro: "本章重点是模式匹配：朴素算法每次失配都回溯目标串指针，最坏 O(mn)；KMP 用 next 数组记住模式串自身的最长相等前后缀，目标串指针只前进不后退，做到 O(n+m)。作业四题分别是最小覆盖子串（滑动窗口）、KMP 求全部匹配、用 next 求最短周期、单次扫描级联删除。",
  links: [
    { label: "第四章作业", href: "assets/hw/第四章作业.pdf" }
  ],
  knowledge: [
    {
      id: "k4-01",
      title: "串的定义：空串与空格串",
      tags: ["字符串", "定义"],
      body: `<p>字符串是由零个或多个字符顺序排列组成的<strong>有限序列</strong>，简称“串”。串中字符个数称为串长。</p>
<ul>
<li><strong>空串</strong>：长度为零的串，记作 <code>""</code>；</li>
<li><strong>空格串</strong>：由一个或多个空格组成，如 <code>" "</code>，长度不为零；</li>
<li>字符串常量一般用双引号括起，如 <code>"SUNDAY"</code>、<code>"123"</code>；</li>
<li>串是线性表，但操作以“子串”为单位，长度动态变化。</li>
</ul>`,
      tip: "空串 ≠ 空格串：空串长度 0，空格串长度至少 1；判空不能靠“看起来有没有内容”。"
    },
    {
      id: "k4-02",
      title: "字符集与字符编码",
      tags: ["编码", "ASCII", "Unicode"],
      body: `<p>字符是组成串的基本单位，取值依赖字符集 Σ。常见字符集：</p>
<ul>
<li>二进制字符集 {0,1}；DNA 字符集 {A,C,G,T}；英文字符集 {26 个字母、标点}；</li>
<li><strong>ASCII</strong>：单字节（8 bit），对 128 个符号编码；</li>
<li><strong>GB2312</strong>：国标汉字编码，两个字节；</li>
<li><strong>Unicode</strong>：通用文字符号编码标准，覆盖多语言。</li>
</ul>
<p>C/C++ 的 <code>char</code> 是单字节类型，因此一个 char 只能直接容纳 ASCII 字符。</p>`,
      tip: "ASCII 中 '\0' 的编码为 0，是 C 字符串的结束标志；数字字符 '0'…'9' 编码连续。"
    },
    {
      id: "k4-03",
      title: "字典序与字符偏序",
      tags: ["比较", "字典序"],
      body: `<p>字符编码表通常遵循<strong>偏序编码规则</strong>：字符按自然含义可比较次序，大多数情况下就是字典序。</p>
<ul>
<li>从前往后逐字符比较编码；</li>
<li>第一个不同字符的编码决定大小；</li>
<li>若一个串是另一个串的前缀，则短串更小；</li>
<li>如 <code>"monday" &lt; "sunday"</code>，因为 'm' &lt; 's'；</li>
<li>中文可能有“笔画序”等特殊规则。</li>
</ul>
<p><code>strcmp(s1, s2)</code> 返回正数、0、负数表示 s1 大于、等于、小于 s2。</p>`,
      tip: "字典序不是比长度；前缀关系下短串更小，例如 “ab” &lt; “aba”。"
    },
    {
      id: "k4-04",
      title: "子串、真子串与子串计数",
      tags: ["子串", "计数", "重点"],
      body: `<p>若存在 i（0≤i≤n−m）使 s2 的每个字符依次等于 s1 从 i 开始的字符，则 s2 是 s1 的<strong>子串</strong>。</p>
<ul>
<li>任意串都是自身的子串；空串是任意串的子串；</li>
<li><strong>真子串</strong>：非空且不等于自身的子串；</li>
<li>长度为 n 的串，非空子串数为 <span class="formula">n(n+1)/2</span>；</li>
<li>加上空串共 <span class="formula">n(n+1)/2 + 1</span>；</li>
<li>真子串数（非空且非自身）为 <span class="formula">n(n+1)/2 − 1</span>。</li>
</ul>
<p>例：s="software"，n=8，非空子串 36 个，全部子串 37 个，真子串 35 个；不同<strong>内容</strong>的子串可能更少，题目问“子串数目”通常按位置计数。</p>`,
      tip: "按起始位置 i 与长度 len 计数：Σ(n−len+1)=n(n+1)/2；先明确题目是否把空串/自身算进去。"
    },
    {
      id: "k4-05",
      title: "字符串 ADT 与动态长度",
      tags: ["ADT", "String 类"],
      body: `<p>字符串的复杂性主要来自长度动态变化。ADT 通常包含：</p>
<ul>
<li>构造/析构、清空；</li>
<li>求长度、判空；</li>
<li>追加字符、连接串、拷贝、插入；</li>
<li>查找字符/子串、提取子串、替换、删除。</li>
</ul>
<p>C 风格字符串用固定长度 <code>char S[M]</code>，长度受限；C++ 的 <code>String</code> 类用动态字符数组（<code>char *str</code> + <code>int size</code>），按需分配，支持变长。</p>`,
      tip: "String 类不适合用链表实现：串操作大量依赖随机访问与连续比较，链表会带来巨大常数开销。"
    },
    {
      id: "k4-06",
      title: "C 风格字符串：'\0' 与容量 M−1",
      tags: ["C 字符串", "存储"],
      body: `<p>C 字符串用 <code>char S[M]</code> 存储，以 <code>'\0'</code>（ASCII 0，NULL）作为结束标记。</p>
<ul>
<li>长度为 M 的数组最多容纳 M−1 个字符，最后一个位置留给 '\0'；</li>
<li>求串长要扫描到 '\0'，O(n)；</li>
<li>拷贝必须逐字符复制，不能直接赋值指针（那只是让两个指针指向同一块内存）；</li>
<li>所有操作都要保证目标空间足够，否则越界；</li>
<li><code>strlen</code> 不计 '\0'。</li>
</ul>
<pre><code>char s1[7] = "value.";   // 6 个字符 + '\0'
char s2[9];
for (int i = 0; i &lt;= strlen(s1); i++) s2[i] = s1[i];</code></pre>`,
      tip: "分配空间时永远记得 +1 给 '\0'；strcpy 不会检查目标容量。"
    },
    {
      id: "k4-07",
      title: "标准字符串函数及其实现",
      tags: ["库函数", "实现"],
      body: `<table>
<tr><th>函数</th><th>作用</th><th>返回</th></tr>
<tr><td><code>strlen(s)</code></td><td>求串长</td><td>字符个数（不含 '\0'）</td></tr>
<tr><td><code>strcpy(s1,s2)</code></td><td>把 s2 复制到 s1</td><td>s1 的指针</td></tr>
<tr><td><code>strcat(s1,s2)</code></td><td>把 s2 接到 s1 尾部</td><td>s1 的指针</td></tr>
<tr><td><code>strcmp(s1,s2)</code></td><td>字典序比较</td><td>&gt;0 / 0 / &lt;0</td></tr>
<tr><td><code>strchr(s,c)</code></td><td>从左找字符 c</td><td>首次出现位置的指针，失败 NULL</td></tr>
<tr><td><code>strrchr(s,c)</code></td><td>从右找字符 c</td><td>最后一次出现位置的指针，失败 NULL</td></tr>
</table>
<p>strcmp 的典型实现：逐字符比较，遇到不同立即返回；若一个串先结束，则短串更小；全部相同返回 0。strchr 找不到时返回空指针，而不是 '\0' 字符。</p>`,
      tip: "strcmp 的返回值只保证符号，不保证是 ±1；不要写 if (strcmp(a,b) == 1)。"
    },
    {
      id: "k4-08",
      title: "String 类的构造、赋值与深拷贝",
      tags: ["String 类", "深拷贝", "易错"],
      body: `<p>String 类内部用 <code>char *str</code> 指向动态数组，<code>size</code> 记录长度。</p>
<pre><code>String::String(char *s) {
    size = strlen(s);
    str = new char[size + 1];
    strcpy(str, s);
}
String String::operator=(String &amp;s) {
    if (size != s.size) {
        delete [] str;
        str = new char[s.size + 1];
        size = s.size;
    }
    strcpy(str, s.str);
    return *this;
}</code></pre>
<ul>
<li>构造时按实际长度 +1 分配，并把 '\0' 一起复制；</li>
<li>赋值时若长度不同，先释放旧空间再重新分配；</li>
<li>必须实现<strong>深拷贝</strong>：复制字符内容，而不是只复制指针；</li>
<li>自赋值（s=s）要保证不先释放自己的数据。</li>
</ul>`,
      tip: "默认的浅拷贝会让两个对象共用一块内存，析构时重复 delete 导致崩溃；这是 String 类最经典的考点。"
    },
    {
      id: "k4-09",
      title: "拼接与取子串的实现细节",
      tags: ["String 类", "子串"],
      body: `<p><strong>拼接</strong> <code>operator+</code>：新串长度为两串长度之和，分配 <code>len+1</code>，先 strcpy 再 strcat。</p>
<p><strong>取子串</strong> <code>substr(index, count)</code>：</p>
<ul>
<li>若 index ≥ size，返回空串（注意不是 index ≥ size−1）；</li>
<li>令 left = size − index；若 count &gt; left，则 count = left；</li>
<li>分配 count+1，逐字符复制，末尾补 '\0'；</li>
<li>时间复杂度 O(count)，与子串长度成正比。</li>
</ul>`,
      tip: "取子串的两个边界：起点越界返回空串；长度超过剩余部分要截断，不能越界读。"
    },
    {
      id: "k4-10",
      title: "朴素模式匹配与复杂度",
      tags: ["模式匹配", "暴力", "复杂度"],
      body: `<p>目标串 T 长度 n，模式串 P 长度 m（m≤n）。从 T 的每个位置 i=0…n−m 起，逐字符与 P 比较；失配则 i 右移一位，j 回到 0。</p>
<pre><code>for (int i = 0; i &lt;= n - m; i++) {
    int j = 0;
    while (j &lt; m &amp;&amp; T[i + j] == P[j]) j++;
    if (j == m) return i;
}
return -1;</code></pre>
<ul>
<li>最好情况：第一个位置就匹配，O(m)；</li>
<li>最坏情况：T=a<sup>n</sup>，P=a<sup>m−1</sup>b，每个起点都比较 m 次，共 m(n−m+1) 次，O(mn)；</li>
<li>空间 O(1)。</li>
</ul>`,
      tip: "朴素算法慢在“目标串指针回退”：每趟失配后 i 只加 1，已经把前面比较过的信息全部丢弃。"
    },
    {
      id: "k4-11",
      title: "KMP 的核心：最长相等前后缀",
      tags: ["KMP", "前后缀", "重点"],
      body: `<p>匹配到 P 的第 i 个字符失配时，前面 <code>P[0…i−1]</code> 已经与 T 的对应段相等。KMP 不移动 T 的指针，而是把 P 右滑，使 P 的某个<strong>前缀</strong>对齐这段已匹配文本的<strong>后缀</strong>。</p>
<p>能对齐的最大长度 k 满足：</p>
<span class="formula">P[0…k−1] = P[i−k…i−1]</span>
<p>即 <code>P[0…i−1]</code> 的<strong>最长相等真前缀与真后缀</strong>的长度。这个 k 只取决于模式串本身，与目标串无关，可以预处理保存，就是 next 数组。</p>
<ul>
<li>next[i]：P[0…i−1] 的最长相等前后缀长度；</li>
<li>约定 next[0] = −1，next[1] = 0；</li>
<li>失配时令 j = next[j]，继续比较 P[j] 与 T[i]；</li>
<li>j = −1 时表示 P 已滑过当前 T[i]，i 前进一位，j 归 0。</li>
</ul>`,
      tip: "next 描述的是“模式串自己和自己”的匹配，不要去看目标串；先写对 next，KMP 就只是照表跳转。"
    },
    {
      id: "k4-12",
      title: "next 数组的递推与代码",
      tags: ["next", "递推", "代码"],
      body: `<p>设已知 next[i]=k，即 <code>P[0…k−1]=P[i−k…i−1]</code>：</p>
<ul>
<li>若 <code>P[i]==P[k]</code>，则 next[i+1]=k+1；</li>
<li>若不等，令 k=next[k] 继续回退（把前缀再缩短），直到相等或 k=−1；</li>
<li>k=−1 时 next[i+1]=0。</li>
</ul>
<pre><code>void getNext(const string &amp;P, vector&lt;int&gt; &amp;nxt) {
    int m = P.size();
    nxt.assign(m + 1, 0);
    nxt[0] = -1;
    int i = 0, j = -1;
    while (i &lt; m) {
        if (j == -1 || P[i] == P[j]) nxt[++i] = ++j;
        else j = nxt[j];
    }
}</code></pre>
<p>该循环中 i 只增不减，j 的回退总次数不超过 j 的增加次数，故求 next 为 O(m)。</p>`,
      tip: "手算时对每个 i 列出 P[0…i−1] 的所有前缀，从长到短找与后缀相等的最长者；不要漏掉 0。"
    },
    {
      id: "k4-13",
      title: "next* 优化：跳过必然失配的位置",
      tags: ["next*", "优化"],
      body: `<p>若 <code>P[i] == P[next[i]]</code>，那么用 next[i] 回退后仍会与同一个 T 字符失配，这次回退是无效的。优化规则：</p>
<span class="formula">next*[i] = next*[next[i]]，若 P[i]==P[next[i]]；否则 next*[i]=next[i]</span>
<p>例：P="abcdaabcab"</p>
<table>
<tr><th>i</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
<tr><td>P[i]</td><td>a</td><td>b</td><td>c</td><td>d</td><td>a</td><td>a</td><td>b</td><td>c</td><td>a</td><td>b</td></tr>
<tr><td>next</td><td>−1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>2</td><td>3</td><td>1</td></tr>
<tr><td>next*</td><td>−1</td><td>0</td><td>0</td><td>0</td><td>−1</td><td>1</td><td>0</td><td>0</td><td>3</td><td>0</td></tr>
</table>
<p>例如 i=6：next[6]=1，P[6]='b'=P[1]，故 next*[6]=next*[1]=0。</p>`,
      tip: "next* 只改变回退目标，不改变匹配逻辑；考试若没要求优化，写 next 即可，但要能解释 next* 的含义。"
    },
    {
      id: "k4-14",
      title: "KMP 匹配过程与 O(n+m) 证明",
      tags: ["KMP", "复杂度", "重点"],
      body: `<pre><code>int KMP(const string &amp;T, const string &amp;P) {
    int n = T.size(), m = P.size();
    vector&lt;int&gt; nxt;
    getNext(P, nxt);
    int i = 0, j = 0;
    while (i &lt; n &amp;&amp; j &lt; m) {
        if (j == -1 || T[i] == P[j]) { i++; j++; }
        else j = nxt[j];
    }
    return (j == m) ? i - m : -1;
}</code></pre>
<p><strong>为什么 O(n+m)</strong>：i 只增不减，最多增加 n 次；j 每次成功匹配加 1，而每次 <code>j=nxt[j]</code> 至少让 j 减 1。j 的总增加量不超过 n+m，因此回退总次数也受 O(n+m) 限制。求 next 为 O(m)，匹配为 O(n)，合计 O(n+m)。</p>
<p><strong>求全部出现位置</strong>：匹配成功后记录 i−m，再令 j=nxt[m] 继续，即可找到重叠匹配。</p>`,
      tip: "匹配成功后的 j 不能置 0，否则会漏掉重叠匹配（如 P=“abab” 在 “ababab” 中应返回 0 和 2）。"
    },
    {
      id: "k4-15",
      title: "用 next 求最短周期",
      tags: ["周期", "next", "重点"],
      body: `<p>对长度为 n 的串 S，设 <code>next[n]</code> 为整个串的最长相等真前后缀长度，令</p>
<span class="formula">p = n − next[n]</span>
<p>则：</p>
<ul>
<li>若 <code>n % p == 0</code>，p 就是最短周期（S 由长度 p 的块重复 n/p 次构成）；</li>
<li>否则 S 不存在完整的重复周期，最短周期记为 n（即 S 本身）。</li>
</ul>
<p>例："abcabcabc"：next[9]=6，p=3，9%3=0 → 周期 3；"abcab"：next[5]=2，p=3，5%3≠0 → 周期 5；"aaaa"：next[4]=3，p=1 → 周期 1。</p>
<p>直观理解：最长相等前后缀“重叠”的部分说明串在自我重复；n−next[n] 就是一次重复的位移量。</p>`,
      tip: "next[n] 是长度 n+1 的数组的最后一项（整个串的 border），不要错用 next[n−1]。"
    },
    {
      id: "k4-16",
      title: "字符串常用技巧：就地逆序与连接等式",
      tags: ["技巧", "逆序"],
      body: `<p><strong>就地逆序</strong>：双指针从两端向中间交换，O(n) 时间、O(1) 空间。也可利用异或交换：<code>a^=b; b^=a; a^=b;</code>（要求 a、b 不是同一地址）。</p>
<p><strong>S1+S2 = S2+S1 的条件</strong>（+ 为连接）：</p>
<ul>
<li>S1 或 S2 至少一个为空；</li>
<li>S1 == S2；</li>
<li>更一般地，S1 与 S2 都是同一个串 X 的若干次重复，即 S1=X<sup>a</sup>，S2=X<sup>b</sup>。</li>
</ul>
<p>前两条是第三条的特例（X 取 S1 或 S2）。</p>`,
      tip: "判断 S2 是否为 S1 的循环移位，可用“S1+S1 中是否包含 S2”这一技巧，本质也是连接等式。"
    }
  ],
  questions: [
    {
      id: "q4-01",
      title: "最小覆盖子串（滑动窗口 O(n+m)）",
      source: "第四章作业 · 第 1 题",
      kind: "作业",
      star: true,
      statement: `<p>给定字符串 S（长度 n）和 T（长度 m），返回 S 中能覆盖 T 所有字符（每种字符出现次数不少于 T 中对应次数）的最短子串及其起始下标；不存在返回 ("", −1)；T 为空返回 ("", 0)。例：S="ADOBECODEBANC"，T="ABC" → ("BANC", 9)。要求 O(n+m) 时间、O(|Σ|) 空间。</p>`,
      answer: `<p><strong>思路</strong>：滑动窗口 + 欠账计数。用 <code>c[x]</code> 表示窗口还“欠”字符 x 多少个，<code>bad</code> 表示还欠多少种字符。</p>
<ul>
<li>先统计 T：<code>c[x]++</code>；某字符从 0 变正时 bad++；</li>
<li>右指针 j 扩张：若 <code>c[S[j]] == 1</code>，说明这是最后一个欠的该字符，bad−−；然后 c[x]−−；</li>
<li>当 bad==0，窗口已覆盖 T：更新最短答案；然后左指针 i 收缩，移出 y 前若 <code>c[y]==0</code>（原本刚好满足），移出后就会欠，bad++；c[y]++；</li>
<li>全程 i、j 各只前进，O(n+m)。</li>
</ul>
<pre><code>pair&lt;string,int&gt; minCover(const string &amp;S, const string &amp;T) {
    if (T.empty()) return {"", 0};
    int c[256] = {}, bad = 0;
    for (unsigned char x : T) {
        if (c[x] == 0) bad++;
        c[x]++;
    }
    int i = 0, st = -1, n = S.size(), len = n + 1;
    for (int j = 0; j &lt; n; j++) {
        unsigned char x = S[j];
        if (c[x] == 1) bad--;
        c[x]--;
        while (bad == 0) {
            if (j - i + 1 &lt; len) { len = j - i + 1; st = i; }
            unsigned char y = S[i++];
            if (c[y] == 0) bad++;
            c[y]++;
        }
    }
    if (st == -1) return {"", -1};
    return {S.substr(st, len), st};
}</code></pre>
<p>S="ADOBECODEBANC"、T="ABC" 时，最优窗口是下标 9 起的 "BANC"。</p>`,
      note: "bad 的维护是核心：c[x]==1 时再进一个就满足，bad−−；出窗口前 c[y]==0 说明本来刚好满足，移出后 bad++。"
    },
    {
      id: "q4-02",
      title: "KMP 求模式串所有出现位置（允许重叠）",
      source: "第四章作业 · 第 2 题",
      kind: "作业",
      star: true,
      statement: `<p>给定模式串 P（长度 m）和文本串 T（长度 n），返回 P 在 T 中所有出现位置的起始下标（从 0 开始，允许重叠）。P 为空返回空列表。例：P="abab"，T="ababab" → [0, 2]。要求 O(n+m) 时间，除结果外的额外空间 O(m)。</p>`,
      answer: `<p><strong>思路</strong>：先求 next 数组，再用 KMP 匹配。每匹配成功一次，记录起点 i−m，然后令 <code>j = nxt[m]</code> 继续寻找重叠匹配。</p>
<pre><code>vector&lt;int&gt; allIndices(const string &amp;P, const string &amp;T) {
    vector&lt;int&gt; ans;
    int m = P.size(), n = T.size();
    if (m == 0) return ans;
    vector&lt;int&gt; nxt(m + 1);
    nxt[0] = -1;
    for (int i = 0, j = -1; i &lt; m; ) {
        if (j == -1 || P[i] == P[j]) nxt[++i] = ++j;
        else j = nxt[j];
    }
    for (int i = 0, j = 0; i &lt; n; ) {
        if (j == -1 || T[i] == P[j]) {
            i++; j++;
            if (j == m) {
                ans.push_back(i - m);
                j = nxt[j];
            }
        } else j = nxt[j];
    }
    return ans;
}</code></pre>
<p>P="abab"、T="ababab"：在下标 0 匹配后 j=nxt[4]=2，从已匹配的后缀 "ab" 继续，紧接着在下标 2 再次匹配，输出 [0,2]。</p>`,
      note: "两个易错点：m==0 要提前返回；匹配成功后用 nxt[m] 而不是 0，才能包含重叠出现。"
    },
    {
      id: "q4-03",
      title: "利用 next 数组求字符串最短周期",
      source: "第四章作业 · 第 3 题",
      kind: "作业",
      star: true,
      statement: `<p>给定字符串 S（长度 n），利用 KMP 的 next 数组求最短周期。若 S 由长度 p&lt;n 的子串重复多次构成，则 p 为周期；否则最短周期记为 n。S 为空返回 0。例："abcabcabc"→3，"abcab"→5，"aaaa"→1。要求 O(n) 时间、O(n) 空间。</p>`,
      answer: `<p><strong>思路</strong>：求长度 n+1 的 next 数组（next[n] 表示整个串的最长相等真前后缀长度），令 <code>l = n − next[n]</code>。</p>
<ul>
<li>若 n % l == 0，则 l 是最短周期（重复 n/l 次）；</li>
<li>否则不存在完整周期，返回 n。</li>
</ul>
<pre><code>int shortestPeriod(const string &amp;S) {
    int n = S.size();
    if (n == 0) return 0;
    vector&lt;int&gt; nxt(n + 1);
    nxt[0] = -1;
    for (int i = 0, j = -1; i &lt; n; ) {
        if (j == -1 || S[i] == S[j]) nxt[++i] = ++j;
        else j = nxt[j];
    }
    int l = n - nxt[n];
    return (n % l == 0) ? l : n;
}</code></pre>
<p>三个例子：<br>
"abcabcabc"：next[9]=6，l=3，9%3=0 → 3；<br>
"abcab"：next[5]=2，l=3，5%3≠0 → 5；<br>
"aaaa"：next[4]=3，l=1，4%1=0 → 1。</p>`,
      note: "注意 next[n] 的下标是 n（数组长度 n+1），它对应“整个串”的 border；用 next[n−1] 会得到错误周期。"
    },
    {
      id: "q4-04",
      title: "单次扫描原地级联删除 b 与 ac",
      source: "第四章作业 · 第 4 题",
      kind: "作业",
      star: true,
      statement: `<p>字符串 S 以字符数组存储，可就地修改。一次从左到右扫描，O(1) 额外空间，删除所有 'b'，并级联删除所有子串 "ac"（删除后新相邻的 a、c 也要继续删）。把保留字符移到左端并返回新长度。例："acbac"→""，"ababac"→"aa"，"aaccac"→""。给出思路、伪代码与复杂度。</p>`,
      answer: `<p><strong>思路</strong>：把待匹配的 'a' 看成栈中的“欠一个 c”。用写指针 w 原地压缩结果，<code>ca</code> 记录当前尚未被 c 抵消的 a 的个数。</p>
<ul>
<li>遇 'b'：直接跳过；</li>
<li>遇 'a'：<code>ca++</code>（不立即写出，先留着等 c）；</li>
<li>遇 'c'：若 ca&gt;0，说明可以与最近的一个 a 组成 "ac" 删掉，<code>ca--</code>；否则把 c 写到 w；</li>
<li>遇其他字符：它是“屏障”，先把积压的 ca 个 a 写出，再写该字符，ca 清 0；</li>
<li>扫描结束，把剩余 ca 个 a 写出。</li>
</ul>
<pre><code>int deleteBandAC(string &amp;S) {
    int n = S.size(), ca = 0, w = 0;
    for (int i = 0; i &lt; n; i++) {
        char ch = S[i];
        if (ch == 'b') continue;
        else if (ch == 'a') ca++;
        else if (ch == 'c') {
            if (ca) ca--;
            else S[w++] = 'c';
        } else {
            while (ca--) S[w++] = 'a';
            S[w++] = ch;
            ca = 0;
        }
    }
    while (ca--) S[w++] = 'a';
    return w;
}</code></pre>
<p><strong>验证</strong>："acbac"：a 欠 1，c 抵消 → 欠 0；b 跳过；a 欠 1，c 抵消 → 空串。"ababac"：a 欠 1，b 跳过，a 欠 2，b 跳过，a 欠 3，c 抵消 1 → 最后写出 2 个 a，得 "aa"。"aaccac"：a2→c 后 1→c 后 0→a1→c 后 0，空串。</p>
<p><strong>复杂度</strong>：每个字符只处理一次，写出也最多一次，时间 O(n)，额外空间 O(1)。</p>`,
      note: "关键洞察：删除 ac 等价于“c 抵消它左边最近的未被抵消的 a”；b 完全透明；其他字符会阻断跨过它的抵消。"
    },
    {
      id: "q4-05",
      title: "课件练习：\"software\" 的子串与真子串数",
      source: "第四章课件 · 思考题",
      kind: "课件练习",
      statement: `<p>若字符串 s="software"，其子串（真子串）的数目为多少？说明计数方法。</p>`,
      answer: `<p>n=8。按长度 len 统计：长度 len 的子串有 n−len+1 个，故非空子串数</p>
<span class="formula">Σ<sub>len=1</sub><sup>8</sup>(9−len) = 8+7+…+1 = 36</span>
<p>加上空串，子串总数为 <strong>37</strong>；真子串要求非空且不等于自身，故为 36−1=<strong>35</strong>。</p>
<p>答案：子串 37 个，真子串 35 个（按位置计数，不按内容去重）。</p>`,
      note: "若题目按“不同内容”计数，结果会小于 37，因为 “software” 中虽无重复字符，但空串/自身等规则不同；考试默认按位置计数。"
    },
    {
      id: "q4-06",
      title: "课件练习：手算 next 与 next*",
      source: "第四章课件 · 计算示例 / Exercise",
      kind: "课件练习",
      star: true,
      statement: `<p>（1）求 P="abcdaabcab" 的 next 与 next*。<br>（2）求 P="abcabaabcbc" 的 next。<br>（3）求 P="abababab" 的 next。</p>`,
      answer: `<p><strong>（1）P="abcdaabcab"</strong>：next[0]=−1；对每个 i 找 P[0…i−1] 的最长相等真前后缀。</p>
<table>
<tr><th>i</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
<tr><td>P[i]</td><td>a</td><td>b</td><td>c</td><td>d</td><td>a</td><td>a</td><td>b</td><td>c</td><td>a</td><td>b</td></tr>
<tr><td>next</td><td>−1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>2</td><td>3</td><td>1</td></tr>
<tr><td>next*</td><td>−1</td><td>0</td><td>0</td><td>0</td><td>−1</td><td>1</td><td>0</td><td>0</td><td>3</td><td>0</td></tr>
</table>
<p>next* 的规则：若 P[i]==P[next[i]]，则 next*[i]=next*[next[i]]，否则等于 next[i]。如 i=4：P[4]='a'=P[0]，故 next*[4]=next*[0]=−1；i=6：P[6]='b'=P[1]，next*[6]=next*[1]=0。</p>
<p><strong>（2）P="abcabaabcbc"</strong>：</p>
<table>
<tr><th>i</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
<tr><td>P[i]</td><td>a</td><td>b</td><td>c</td><td>a</td><td>b</td><td>a</td><td>a</td><td>b</td><td>c</td><td>b</td><td>c</td></tr>
<tr><td>next</td><td>−1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>2</td><td>1</td><td>1</td><td>2</td><td>3</td><td>0</td></tr>
</table>
<p><strong>（3）P="abababab"</strong>：每增加一组 "ab"，border 长度加 2：</p>
<span class="formula">next = [−1, 0, 0, 1, 2, 3, 4, 5, 6]</span>
<p>（i=8 是整个串的 next[8]=6，若数组只取到下标 7，则最后一项是 5。）</p>`,
      note: "手算 next 的检查方法：next[i] 一定小于 i，且 P[0…next[i]−1] 与 P[i−next[i]…i−1] 逐字符相等。"
    },
    {
      id: "q4-07",
      title: "课件练习：KMP 匹配 t=\"ababbaaaba\"，p=\"aab\"",
      source: "第四章课件 · 练习",
      kind: "课件练习",
      star: true,
      statement: `<p>对 t="ababbaaaba"，p="aab" 进行 KMP 匹配，画出匹配过程，给出所有匹配位置。</p>`,
      answer: `<p><strong>先求 next</strong>：next[0]=−1，next[1]=0，next[2]=1（"aa" 的 border 为 "a"）。即 <code>next=[−1,0,1]</code>；完整串 "aab" 的 border 为 0，故 next[3]=0。</p>
<p><strong>匹配过程</strong>（i 指向 t，j 指向 p）：</p>
<table>
<tr><th>步骤</th><th>i</th><th>j</th><th>比较</th><th>动作</th></tr>
<tr><td>1</td><td>0</td><td>0</td><td>t[0]=a = p[0]</td><td>i=1, j=1</td></tr>
<tr><td>2</td><td>1</td><td>1</td><td>t[1]=b ≠ p[1]=a</td><td>j=next[1]=0</td></tr>
<tr><td>3</td><td>1</td><td>0</td><td>b ≠ a</td><td>j=next[0]=−1 → i=2, j=0</td></tr>
<tr><td>4</td><td>2</td><td>0</td><td>a = a</td><td>i=3, j=1</td></tr>
<tr><td>5</td><td>3</td><td>1</td><td>b ≠ a</td><td>j=0</td></tr>
<tr><td>6</td><td>3</td><td>0</td><td>b ≠ a</td><td>j=−1 → i=4, j=0</td></tr>
<tr><td>7</td><td>4</td><td>0</td><td>b ≠ a</td><td>j=−1 → i=5, j=0</td></tr>
<tr><td>8</td><td>5</td><td>0</td><td>a = a</td><td>i=6, j=1</td></tr>
<tr><td>9</td><td>6</td><td>1</td><td>a = a</td><td>i=7, j=2</td></tr>
<tr><td>10</td><td>7</td><td>2</td><td>a ≠ b</td><td>j=next[2]=1</td></tr>
<tr><td>11</td><td>7</td><td>1</td><td>a = a</td><td>i=8, j=2</td></tr>
<tr><td>12</td><td>8</td><td>2</td><td>b = b</td><td>j=3=m，匹配成功</td></tr>
</table>
<p>匹配成功时 i=9，起点 i−m=9−3=<strong>6</strong>。之后 j=next[3]=0，i=9 继续，最终无更多匹配。</p>
<p>t 的下标 6、7、8 正是 "aab"：t="ababba<strong>aab</strong>a"。答案：唯一匹配位置 <strong>6</strong>。</p>`,
      note: "注意第 10 步：j=2 失配后跳到 next[2]=1，而不是回到 0，因为已匹配的后缀 “a” 可以复用为前缀。"
    },
    {
      id: "q4-08",
      title: "课件练习：就地逆序与 S1+S2=S2+S1 的条件",
      source: "第四章课件 · 练习",
      kind: "课件练习",
      statement: `<p>（1）设计算法实现字符串逆序存储，要求不另设串存储空间。<br>（2）设 S1、S2 为串，给出使 S1+S2=S2+S1 成立的所有可能条件（+ 为连接）。</p>`,
      answer: `<p><strong>（1）双指针交换</strong></p>
<pre><code>void reverse(char *s) {
    int i = 0, j = strlen(s) - 1;
    while (i &lt; j) {
        char t = s[i];
        s[i++] = s[j];
        s[j--] = t;
    }
}</code></pre>
<p>时间 O(n)，额外空间 O(1)。也可用异或交换：<code>s[i]^=s[j]; s[j]^=s[i]; s[i]^=s[j];</code>，但 i、j 不能指向同一位置。</p>
<p><strong>（2）条件</strong>：设 + 为连接，则 S1+S2=S2+S1 当且仅当</p>
<ul>
<li>S1 为空或 S2 为空；或</li>
<li>S1 == S2；或</li>
<li>更一般地，S1 与 S2 都是某个串 X 的整数次重复：S1=X<sup>a</sup>，S2=X<sup>b</sup>（a,b≥0）。</li>
</ul>
<p>例如 X="ab" 时，S1="abab"、S2="ab" 满足 "ababab"="ababab"。前两条是第三条的特例。</p>`,
      note: "判断两串是否互为循环移位，可用 (S1+S1).find(S2) != npos，前提是 |S1|==|S2|。"
    },
    {
      id: "q4-09",
      title: "朴素匹配的最坏情况分析",
      source: "第四章课件 · 性能分析",
      kind: "课件练习",
      statement: `<p>目标串 T=a<sup>n</sup>，模式串 P=a<sup>m−1</sup>b（m≤n）。朴素匹配要做多少次字符比较？为什么 KMP 在此例中更优？</p>`,
      answer: `<p>P 在每一个起点都会先匹配 m−1 个 'a'，再在最后一个字符 b 处失配，因此每趟比较 m 次。起点共有 n−m+1 个，总比较次数</p>
<span class="formula">m·(n−m+1) = O(mn)</span>
<p>当 m≈n/2 时达到 Θ(n²)。</p>
<p><strong>KMP</strong>：此例中 P 的 next 数组除 next[1]=0 外，next[i]=i−1（因为前缀全是 a）。每次在 b 处失配后，j 跳到 next[m−1]=m−2，仍然只需再比较一次就能确认失配，且 i 不回退；总比较次数 O(n+m)。</p>
<p>本质差异：朴素算法丢弃了“前面 m−1 个字符全是 a”这一信息，KMP 用 next 把它保留下来。</p>`,
      note: "最坏情况的关键是“大量部分匹配后失配”；若模式串首字符很少出现，朴素算法平均表现其实不差。"
    }
  ],
  cheats: [
    {
      title: "KMP 与 next 速查",
      html: `<table>
<tr><th>项目</th><th>内容</th></tr>
<tr><td>next[i]</td><td>P[0…i−1] 的最长相等真前后缀长度</td></tr>
<tr><td>约定</td><td>next[0]=−1，next[1]=0</td></tr>
<tr><td>失配</td><td>j = next[j]，i 不动</td></tr>
<tr><td>j=−1</td><td>i++，j=0</td></tr>
<tr><td>匹配成功</td><td>返回 i−m；继续找重叠则 j=next[m]</td></tr>
<tr><td>复杂度</td><td>求 next O(m)，匹配 O(n)，总 O(n+m)</td></tr>
<tr><td>最短周期</td><td>p=n−next[n]；n%p==0 则 p，否则 n</td></tr>
<tr><td>next*</td><td>P[i]==P[next[i]] 时取 next*[next[i]]</td></tr>
</table>`
    },
    {
      title: "字符串函数与复杂度",
      html: `<table>
<tr><th>操作</th><th>复杂度</th><th>备注</th></tr>
<tr><td>strlen</td><td>O(n)</td><td>扫描到 '\0'</td></tr>
<tr><td>strcpy / strcat</td><td>O(n+m)</td><td>不检查容量</td></tr>
<tr><td>strcmp</td><td>O(min(n,m))</td><td>返回符号，不是 ±1</td></tr>
<tr><td>strchr / strrchr</td><td>O(n)</td><td>失败返回 NULL</td></tr>
<tr><td>取子串 substr</td><td>O(len)</td><td>index≥size 返回空串</td></tr>
<tr><td>朴素匹配</td><td>O(mn) 最坏</td><td>最好 O(m)</td></tr>
<tr><td>KMP</td><td>O(n+m)</td><td>空间 O(m)</td></tr>
</table>`
    },
    {
      title: "字符串算法模板清单",
      html: `<ul>
<li><strong>最小覆盖子串</strong>：need 计数 + bad 欠账；右扩左缩，O(n)。</li>
<li><strong>全部匹配</strong>：KMP 成功后 j=next[m]，保留重叠。</li>
<li><strong>最短周期</strong>：next[n] 与 n−next[n]，整除才有周期。</li>
<li><strong>级联删除 ac</strong>：ca 计欠账，c 抵消，b 跳过，其他字符冲账。</li>
<li><strong>就地逆序</strong>：双指针交换，O(1) 空间。</li>
<li><strong>循环移位判断</strong>：(S1+S1).find(S2)。</li>
<li><strong>子串计数</strong>：非空 n(n+1)/2；含空 +1；真子串 −1。</li>
</ul>`
    }
  ]
});
