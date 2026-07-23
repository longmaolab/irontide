# Iron Tide 推广作战手册

> 生成于 2026-07-24（周五）。所有渠道调研基于 2025–2026 的平台现状。
> **贯穿全文的两条硬约束**：① 所有账号由家长注册和发言，任何地方不出现孩子的真名、年龄、城市、学校、照片，只说 "my kid" 或 GitHub ID `VideoGameTips`；② 不编数字、不吹牛，联机功能一律标注 experimental 或不提。

---

## 这个目录里有什么

```
docs/promo/
├── README.md            ← 你在读的这份：总控 + 日历 + 优先级
├── channels/            8 份逐字可复制的渠道手册
│   ├── itch-io.md              itch.io 上架（零门槛，先做这个）
│   ├── crazygames.md           CrazyGames Basic Launch（玩家量最大）
│   ├── newgrounds.md           Newgrounds（即传即发，反馈文化强）
│   ├── reddit-posting-kit.md   r/WebGames · r/playmygame · r/IndieGaming
│   ├── threejs-ecosystem.md    r/threejs + three.js 官方论坛 Showcase
│   ├── show-hn.md              Hacker News Show HN
│   ├── product-hunt.md         Product Hunt
│   └── submit-once-kit.md      Free Game Planet / 两个 newsletter / YouTube Shorts

promo/                   （不进版本库，用 tools/ 重新生成）
├── assets/final/        成品物料（下方清单）
└── builds/              两个发行 zip（已 iframe 实测通过）
```

## 物料清单（已产出，可直接用）

| 文件 | 规格 | 用在哪 |
|---|---|---|
| `assets/final/01-menu.png` | 1600×900 | 所有渠道截图 1（英文主菜单 + 31 战区 + 沙盒地图） |
| `assets/final/02-combat-hud.png` | 1600×900 | 截图 2（追尾视角、五艘敌舰、命中播报、HUD 全貌） |
| `assets/final/03-broadside.png` | 1600×900 | 截图 3 / 主视觉（白天舷侧齐射） |
| `assets/final/04-armory.png` | 1600×900 | 截图 4（军械库分类面板 + 火力对比） |
| `assets/final/05-night.png` | 1600×900 | 截图 5（星空夜战，月光水面） |
| `assets/final/06-briefing.png` | 1600×900 | 截图 6（战区简报卡 OPERATION 1） |
| `assets/final/cover-itch-titled-630x500.png` | 630×500 | itch.io 带标题封面（推荐用这版） |
| `assets/final/cover-square-800x800.png` | 800×800 | 方形位（部分平台要方图） |
| `assets/final/cover-social-1280x720.png` | 1280×720 | 社交分享大图 |
| `assets/final/thumb-titled-240x240.png` | 240×240 | Product Hunt 缩略图 |
| `assets/final/preview.gif` | 600px 宽 7 秒 | Reddit / Discord / README 动图 |
| `assets/final/iron-tide-hero-45s.mp4` | 1600×900 约 48 秒 | itch.io / PH / YouTube 主视频 |
| `assets/final/iron-tide-clip-20s.mp4` | 1600×900 20 秒 | Reddit / Discord 原生上传（短的更容易看完） |
| `assets/final/iron-tide-short-vertical.mp4` | 608×1080 22 秒无音轨 | YouTube Shorts / TikTok（无音轨方便套热门原声） |
| `builds/irontide-itch.zip` | 0.4 MB | itch.io（保留联机入口，去掉 service worker） |
| `builds/irontide-portal-singleplayer.zip` | 0.4 MB | CrazyGames / Newgrounds（额外隐藏联机入口） |

**实测加载性能**（可直接写进渠道文案）：总传输 **435 KB**；桌面 0.52 秒出菜单、再 1.08 秒进入战斗；模拟 3G 手机 3.27 秒出菜单。CrazyGames 的硬上限是初始 50 MB、Poki 的目标是 8 MB——我们有极大余量，"点开就能玩"是实测不是话术。重跑：`node tools/measure-first-visit.js`。

**hero 视频的镜头顺序**：舰桥第一人称推进（0–9.5s）→ 追尾视角对轰（9.5–18.5s）→ 环绕运镜（18.5–32.5s）→ 黎明光线（32.5–40.5s）→ 军械库面板（40.5–44.5s）。要剪短版就从环绕段截。

**重新生成物料**（游戏更新后）：

```bash
cd repo && npm install
node tools/capture-screenshots.js      # 6 张规范截图 → promo/assets/final/
node tools/render-covers.js            # 4 张带标题封面（尺寸已按平台要求）
node tools/capture-hero-video.js       # 录制运镜脚本化的 hero 视频
node tools/cut-video-variants.js       # 切出全片/20 秒/竖版/GIF 四个规格
node tools/build-portal.js             # 生成 itch.io / 门户两个发行 zip
node tools/verify-portal-build.js      # 在 iframe 里实测两个 zip（10 项检查）
node tools/verify-og-tags.js           # 改过 <head> 之后跑，确认链接预览卡没坏
node tools/measure-first-visit.js      # 冷缓存实测三档设备的首屏耗时
```

整条链路从空目录跑通过，没有任何手工挑图的中间步骤。

`verify-portal-build.js` 会把两个 zip 解压到本地 HTTP 服务、**放进 iframe 里**跑 10 项检查（能开战、31 战区在、地形模块在、泛光在、配乐在、无 service worker、联机入口按预期显示/隐藏、无 console 报错）。上架前必跑，全绿再提交。

---

## 优先级：每分力气换到的真实玩家

**第一梯队（真正带玩家）**：CrazyGames（月访问约 7800 万、明确非独占、有 QA 门槛）> itch.io（零门槛、jam 文化、鼓励值高）> Newgrounds（即传即发、反馈最直接）。
**Poki 跳过**——默认 5 年 web 独占，与开源 + 自托管冲突。

**第二梯队（社区，带真实反馈）**：r/WebGames、r/playmygame、r/threejs + three.js 官方论坛 Showcase（这是 threejs.org 首页精选的正式入口）、一次 Show HN。

**第三梯队（一次提交长期有效）**：Free Game Planet、Web Game Dev newsletter（CrazyGames 和 Poki 赞助，被收录等于在门户编辑面前露脸）、Gamedev.js Weekly。

**Product Hunt**：值得做一次，但**不是玩家渠道**。2025 年起编辑精选制，只有约 10% 被 featured，受众是创业者不是玩家。放在最后，当作"一天的鼓励事件 + 一条永久高权重外链"。

---

## 四周日历（从 2026-07-24 周五算起）

| 时间 | 动作 | 手册 |
|---|---|---|
| **7/24 周五（今天）** | GitHub topics + homepage（**已完成**）；README 改版（**已完成**）；链接预览卡 OG 标签（**已完成**） | — |
| **7/25 周六** | itch.io 上架（草稿 → 实测 → 公开）；同日发首篇 devlog | `itch-io.md` |
| **7/26 周日** | Newgrounds 上传；Free Game Planet + 两个 newsletter 各投一封 | `newgrounds.md` `submit-once-kit.md` |
| **7/27 周一** | **开始养 Reddit 账号**（r/WebGames 要求 7 天号龄 + 10 comment karma）：每天认真评论 2–3 个别人的游戏 | `reddit-posting-kit.md` §1 |
| **7/28 周二** | CrazyGames 提交 Basic Launch（提交前跑一次 `verify-portal-build.js`） | `crazygames.md` |
| **7/29 周三** | three.js 官方论坛 Showcase 发帖（有审核延迟，早发早排队） | `threejs-ecosystem.md` |
| **8/1 周六** | r/threejs 发帖（原生上传视频，技术钩子开头） | `threejs-ecosystem.md` |
| **8/3 周一** | r/WebGames 发帖（此时号龄已够）；当天全程回评论 | `reddit-posting-kit.md` |
| **8/6 周四** | r/playmygame 发帖（求反馈框架，当天也给别人反馈） | `reddit-posting-kit.md` |
| **8/11 周二** | **Show HN**（美东上午发；前置：VPS 压测 + 首条评论准备好） | `show-hn.md` |
| **8/17 周一** | r/IndieGaming（距上次自推超过两周，规则允许） | `reddit-posting-kit.md` |
| **8/23 周日** | **Product Hunt**（周日排名门槛最低；太平洋时间 00:01 上线 = 北京时间 15:01） | `product-hunt.md` |
| **持续** | YouTube Shorts 每周一支（无人脸无童声，纯游戏画面） | `submit-once-kit.md` |
| **记到日历** | 2027 年 1 月 Coolest Projects 开放报名（18 岁以下全球作品展，收现成项目） | 见下 |

**为什么不同一天全发**：同样内容同时出现在多个平台首页会被识别成营销活动，招来版主删帖。而且服务器扛不住叠加流量。

---

## 发链接时带上来源标记

除 itch.io / CrazyGames（它们托管自己那份 zip，不走我们域名）外，其余渠道贴链接一律用带参数的地址：

```
https://game.boobank.com/irontide/?from=reddit-webgames
https://game.boobank.com/irontide/?from=hn
https://game.boobank.com/irontide/?from=ph
https://game.boobank.com/irontide/?from=threejs-forum
```

游戏不读这个参数，但 Caddy 访问日志会记下来——这样每个渠道到底带来多少人，一条命令就能分开看，不需要任何第三方统计。统计命令见 [`docs/ANALYTICS.md`](../ANALYTICS.md) 的"推广期怎么看效果"。

**顺带一个排障技巧**：有人反馈"手机上没有虚拟摇杆"时，让他开 `?touch=1` 强制打开触屏控制（`?touch=0` 强制关闭）——一次就能分清是触屏检测的问题还是别的问题。

## 上线前必做的三件事

1. **压测**：Show HN 上首页 = 几小时内几万次访问。提前确认 Vultr VPS + Cloudflare tunnel 扛得住，建议给 `/irontide/*` 的静态资源加 Cloudflare cache-everything 规则。
2. **隐私体检**：两个仓库的 commit 历史、README、GitHub profile 里如果有真名/邮箱/地理位置痕迹，在游戏被人关注之前清理掉。`boobank.com` 的 WHOIS 确认开了隐私保护。
3. **给 Andy 的预期管理**：先说清楚"中位数结果很小"——itch.io 中位数游戏一辈子只有约 600 次游玩，Reddit 帖子拿几个赞是常态。**陌生人认真玩过之后写的每一条评论，才是这件事的奖励。** 尖锐评论由家长先过滤再转述。

---

## "孩子做的"这个故事怎么讲

这是双刃剑，2018 年 "Show HN: 我 12 岁女儿写的游戏" 拿了 341 分，但 2025–2026 年同类帖子普遍只有个位数分，还会被追问"是不是 AI 写的"。

**统一口径**（所有渠道一致）：

- **标题只放游戏**，不放孩子。孩子的故事放在正文末尾或首条评论里。
- **分工讲清楚**：孩子（GitHub: VideoGameTips）独立设计并写了游戏主体——玩法、31 关战役、舰机坦步系统；家长维护打磨版 fork（修 bug、补全中英双语、新手引导、成就、性能），过程中用了 AI 辅助代码审查。
- **开源就是证明**：两个仓库的 commit 历史都是公开的，质疑者自己会去看。不用争辩，给链接就行。
- **不打悲情牌、不打神童牌**。就说"这是我家孩子做的，我们觉得挺好玩，免费的，你要不要试试"。

---

## 少儿展示渠道（鼓励价值最高，但要等窗口）

| 渠道 | 状态 | 下一个窗口 |
|---|---|---|
| **Coolest Projects Online**（树莓派基金会） | 2026 届已于 5/27 截止 | **2027 年 1 月开放报名**，收现成项目，18 岁以下，13 岁以下由家长代报，人人有证书和个性化反馈 |
| **Hack Club** | 需 13 岁以上**本人**参与，家长不能代 | Stardance 计划到 2026-09-30；Daydream/Campfire 城市 jam 不定期 |
| **GitHub Game Off** | 只收比赛期间新做的游戏，Iron Tide 本体不能参赛 | 每年 11 月，可用同一账号做小新作导流 |
| **js13kGames** | 技术上不可能（13KB 上限，three.js 就超了） | — |

---

## 暂时不做的：GitHub awesome 清单

`michelpereira/awesome-open-source-games` 的 contributing 明确写着 **"项目需存在 30 天以上且仓库至少 40 stars"**。Iron Tide 目前 0 star，现在提 PR 一定被拒，还会在维护者那里留下印象分。**等 star 到 40 再提**——itch.io 和 Reddit 的流量会自然带来 star。
老牌的 `leereilly/games` 已归档，不再接收；`sjfricke/awesome-webgl` 只收库和文章，没有游戏分区。

真正在起作用的 GitHub 发现渠道是 **topics 页面**（已配好 10 个），以及 itch.io 的 "made with three.js" 浏览页（上架后自动进）。

## 已经完成的动作

- ✅ GitHub 仓库加了 10 个 topics（`threejs` `threejs-game` `browser-game` `webgl` `html5-game` `naval-combat` `game` `javascript-game` `open-source-game` `pwa`）+ homepage 指向试玩地址
- ✅ README 改版：顶部一键试玩 CTA、英文一句话说明、5 张截图 + 动图、准确的内容量数字
- ✅ 给 `index.html` 补了 Open Graph / Twitter Card 标签 + 1200×675 预览图：以前把链接发到 Reddit、Discord、微信、Slack 都只显示一条光秃秃的网址，现在会出大图卡片。**这是所有渠道共用的基础设施**，先修它收益最高。改动同时按仓库约定 bump 了 service worker 版本（v2 → v3），老用户才能拿到新版。
- ✅ 6 张宣传截图 + 3 种规格封面 + 动图 + 48 秒 hero 视频
- ✅ 两个发行 zip，iframe 内 10 项检查全绿
- ✅ 4 个可重复运行的物料生产脚本进了仓库 `tools/`
