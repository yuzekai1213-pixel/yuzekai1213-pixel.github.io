# 余泽锴 YU ZEKAI · 品牌与设计规范（AGENTS.md）

> 本文档供 AI Agent 与协作者使用：任何为余泽锴生成内容（网站、社交媒体、海报、封面、文案）的任务，**必须遵循本规范**，保证跨媒介风格一致。
> 最后更新：2026-08 · 与网站 shared.css / readability.css 同步。

---

## 1. 品牌基础

| 项 | 规范 |
|---|---|
| 中文名 | 余泽锴 |
| 英文名 | YU ZEKAI（全大写，字间距拉开使用） |
| 身份 | 雕塑家 / 艺术家 · Sculptor / Artist |
| 教育 | 广州美术学院 实验雕塑 2020–2025（BFA）；RCA / UCL / UAL 三校 MFA 录取 |
| 常驻 | 广州 / 佛山（英文 Guangzhou / Foshan） |
| 联系 | 525147849@qq.com · 176 8825 6407（显示格式带空格，拨号用 17688256407） |
| 社交 | 哔哩哔哩 https://space.bilibili.com/256215655 · 小红书 https://www.xiaohongshu.com/user/profile/60f426e2000000002002fa6b · GitHub https://github.com/yuzekai1213-pixel |

**口号（Slogan，双语固定，勿改写）：**
- 中：`以田野为方法，把在地的记忆与现场，塑成可触摸的雕塑。`
- 英：`Fieldwork as method — turning local memory and lived sites into tangible sculpture.`

**作品名写法**：中文用《回溯间隙》《缝隙之间 2》《沉》；英文用引号 "Tracing the Gap" "Between Gaps 2" "Sunken"。作品名英译一经使用不得更换。

---

## 2. 字体规范

### 2.1 字体族（按用途）
| 用途 | 字体栈 |
|---|---|
| 中文正文/标题（衬线，艺术感） | `"Noto Serif SC","Songti SC","STSong","Source Han Serif SC","SimSun",serif` |
| UI 层：导航/按钮/小标签（无衬线） | `-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif` |
| 开屏英文名（DIN 风格） | `"DIN Alternate","DIN Condensed","Oswald",sans-serif` |
| 开屏中文名（仿宋） | `"STFangsong","FangSong","仿宋","Noto Serif SC",serif` |

**规则**：正文永远衬线；凡是"界面小字"（导航、按钮、标签、水印）永远无衬线。两者不得混用。

### 2.2 字号（网站实际值，流式 clamp）
- Hero 主标题：`clamp(44px, 9vw, 104px)`；Hero 副题 `.cn`：`clamp(20px, 3.6vw, 36px)`
- 区块标题 H2：`clamp(28px, 4.6vw, 42px)`
- 卡片标题 H3：16–27px；正文段落：13–16.5px（readability.css 定义，随视口流动）
- 小标签/meta：10–12.5px

### 2.3 字距（关键差异）
- **中文**：宽字距。标题 .06–.14em，标签 .2–.46em
- **英文**：必须放松到 .015–.08em（正文 .015em，标题 .02–.03em，按钮 .12em）。**禁止把中文宽字距直接套在英文段落上**
- 行高：中文正文 1.8–2.05；英文 1.75；英文长段限宽 66ch

### 2.4 用户字号档位
导航 A 按钮：A（100%）→ A+（112%，`--fscale:1.12`）→ A++（125%，`--fscale:1.25`），localStorage 键 `yz-fs`。

### 2.5 已确认字体库（用户筛选结果 · 2026-08，字体试衣间 fonts.html 勾选）
| 字体 | 角色 | 获取 | 用途 |
|---|---|---|---|
| **思源宋体 Heavy**（Noto Serif SC 900） | 主力标题/封面 | 已在网站字体栈，OFL | 网站标题、封面中文主字、正文强调 |
| **演示春风楷**（Chunfeng Kai） | 艺术点睛字 | keyfont.cn，免费商用 | 海报大字、开屏中文名、社媒封面标题 |

**使用规则**：
- 春风楷只做标题/点睛，**禁止用于正文段落**
- 正文一律按 §2.1 衬线栈执行
- 春风楷接入网站需自托管并子集化（`pyftsubset` 转 woff2，只保留用到的字符，控制体积）
- 其余候选字体（霞鹜文楷/得意黑/Barlow Condensed 等）见 fonts.html 备选池，未启用

---

## 3. 配色规范

### 3.1 双主题色板（CSS 变量，来自 shared.css）
| 变量 | 深色（默认夜间） | 浅色（默认日间） | 用途 |
|---|---|---|---|
| `--bg` | `#0d0c0a` | `#f2eee6` | 页面底色 |
| `--bg2` | `#16130f` | `#ebe5d9` | 次级底色 |
| `--card` | `#1b1712` | `#f8f5ef` | 卡片底 |
| `--ink` | `#f1eadd` | `#22201a` | 主文字（米白/墨黑） |
| `--ink2` | `#b9ab93` | `#48402f` | 次级文字 |
| `--ink3` | `#8a7c64` | `#6f6551` | 弱文字/标注 |
| `--accent` | `#d9a441` | `#96691a` | **品牌金**（主强调） |
| `--accent2` | `#ecc77f` | `#7a5410` | 亮金（链接/hover） |
| `--accent-dim` | `rgba(217,164,65,.12)` | `rgba(150,105,26,.12)` | 金色底光 |

辅助色（点缀用，勿大面积）：`--bronze #b08a55`、`--clay #b06a4a`。

### 3.2 主题机制
- 默认按时间：09:00–18:30 浅色，其余深色；用户切换后存 localStorage（`yz-theme`）
- **社交媒体封面/海报默认用深色主题**（金 + 暖黑最有辨识度）

### 3.3 用色纪律
- 金色只做强调：下划线 rule、数字、hover、标签底——**不超过画面 10%**
- 禁止引入品牌色板之外的高饱和色（无蓝/紫/绿）
- 分割线：`rgba(241,234,221,.12)`（深）/ `rgba(40,34,24,.16)`（浅）

---

## 4. 视觉语言

| 元素 | 规范 |
|---|---|
| 圆角 | 卡片 16px（`--radius`）；按钮/标签胶囊 20–40px |
| 点线签名 | 标题下 rule：`repeating-linear-gradient(90deg, accent 0 6px, transparent 6px 11px)`，高 2px，宽 60px |
| 毛玻璃相框 | `--glass-pad: clamp(8px,1.4vw,15px)`、blur 18px saturate 1.35、金调渐变底 |
| 水印 | 图片上必须带 `© 余泽锴 YU ZEKAI`（10px 无衬线，半透明胶囊底） |
| 动效缓动 | `--ease: cubic-bezier(.22,.9,.28,1)`；入场编排 0.1s–0.9s 递进 |
| 标志性动效 | ① 名字逐字升起 ② 简介右滑入 ③ 标签从上掉落（过冲 bezier(.3,1.5,.42,1)）④ 卡片 scale(.94)+fade 入场 |
| 动效纪律 | `prefers-reduced-motion` 必须降级；同一屏只允许一个主角动画 |

---

## 5. 文案规范（反 AI 腔，中英通用）

### 5.1 写作原则
1. **事实优先**：年份、尺寸、材质、分数、地名直接写，不形容
2. **短句**：一句一个信息；中文段落 ≤3 行，英文 ≤2 行
3. **具体名词** > 抽象概念：写"船、水、网、劳作的节奏"，不写"在地的呼吸感"
4. 作品自述结构：**是什么（材质/尺寸/形式）→ 怎么做的 → 一个核心想法收尾**

### 5.2 禁用词表（出现即改写）
`开启新的旅程`、`构成闭环`、`赋能`、`从 0 到 1`、`探索…的交汇`、`让X成为可被触摸的Y`（口号除外）、`理论与实践的互证`、`身份的回声`、`在更广阔的语境中`、`at once X and Y`、`opening a new chapter`、`testament to`、`tapestry`

### 5.3 数字与格式
- 分数：中文 `85 分`；英文 `85/100`
- 尺寸：`约 350 × 300 cm` / `approx. 350 × 300 cm`（× 用乘号，空格两侧）
- 日期区间：`2024.06–07`、`2020.10–2023.09`（用 – en dash）
- 绩点：`绩点 4.40` / `GPA 4.40`
- 校名英文缩写：RCA / UCL / UAL / GAFA（首次出现给全称）

### 5.4 关键译名对照（固定）
| 中文 | 英文 |
|---|---|
| 《回溯间隙》 | "Tracing the Gap" |
| 《缝隙之间 2》 | "Between Gaps 2" |
| 《东方造型与自我身份》 | "Eastern Form and Self-Identity" |
| 红海疍家渔民在地实验 | Site-Specific Experiment with the Tankas of Honghai Village |
| 《浮沉》 | "Floating-Sinking" |
| 《文人松》 | "Literati Pine" |
| 《富含冒犯》 | "Rich in Offence" |
| 《如何追逐速度》（动态雕塑） | "How to Chase Speed" |
| 疍家 | Tanka |
| 南海大地艺术节 | Nanhai Land Art Festival |
| 草叶集艺术空间 | Caoyeji Art Space |
| 筑梦空间 | Zhumeng Space |
| 《骨肉皮》 | "Bone, Flesh, Skin" |
| 《夹角空间的想象》 | "Imagining the Angle" |
| 《痕迹如河》 | "Traces Like a River" |
| 《缝隙系列》 | "Gaps Series" |

---

## 6. 社交媒体发布规范

### 6.1 封面图
- **比例**：小红书/公众号封面 3:4 或 1:1；微博/B 站横封 16:9
- **底图**：从网站 `assets/**/*-disp.jpg`（1400px）选，禁止直接用原图（>1MB）
- **构图**：作品图占 70%+，深色底 `#0d0c0a` 或作品原场景；金色 `#d9a441` 只用于一条点线 rule + 标题
- **必含元素**：作品名《》（中）+ 年份；右下角 `© 余泽锴 YU ZEKAI` 水印
- **字体**：标题用宋体系（Noto Serif SC Bold / 思源宋体 Heavy）；英文/数字用 DIN Condensed 或系统无衬线

### 6.2 文案模板
```
【作品】《名称》· 媒介 · 年份
【一句话】作品最核心的一个想法（≤30字，从 about/concept 提炼）
【事实】尺寸 / 材质 / 成绩或展览（如有）
【标签】#雕塑 #在地艺术 #作品集 #余泽锴 + 当期主题标签
```
英文版同构：`"Name" · medium · year` → one idea → facts → hashtags（#sculpture #sitepecificart #portfolio）。

### 6.3 发布一致性检查清单
- [ ] 口号原文引用，未改写
- [ ] 作品英译名与本规范 §5.4 一致
- [ ] 分数/尺寸/日期格式符合 §5.3
- [ ] 封面用深色主题 + 金色点缀，无规范外颜色
- [ ] 有水印 © 余泽锴 YU ZEKAI
- [ ] 文案无 §5.2 禁用词

---

## 7. 网站技术规范（维护用）

- **文件结构**：三页（index/works/resume）+ `shared.css`/`shared.js`（公共）+ `readability.css`（可读性层，最后加载）+ `tools/optimize_images.sh`
- **图片三档制**：`-thumb.jpg`（480px，缩略图）、`-disp.jpg`（1400px，展示/封面）、原图（仅灯箱）。新增图片必须跑 `bash tools/optimize_images.sh` 并按 `t:/s:/o:` 三引用写入 works.html
- **双语机制**：数据字段 `{zh,en}` + `tt()`；静态节点 `data-i18n` + I18N 字典；`html[lang="en"]` 触发英文排版（readability.css）
- **上线前**：全局替换 `YOUR_DOMAIN`（index/works/resume/robots.txt/sitemap.xml 共 5 文件）
- **改 shared.css/js 后**：三页引用的 `?v=NN` 版本号 +1，防缓存
- **本地预览**：双击 `启动预览.command` 或 `python3 -m http.server 8923`
