# 发帖前的隐私闸门（所有渠道的前置条件）

> **这一页没做完，任何渠道都不要发。**
> 推广的本质是把陌生人引向这两个仓库和这个站点。引流之前，先确认它们不会泄露孩子的身份。
> 下面每一条都是 2026-07-24 实际检查出来的结果，不是假想风险。

---

## 已经修掉的（本次改动，需随 PR 部署上线）

### 1. 游戏源码里的孩子真名 —— 已修，等部署

`index.html` 里有四处中文注释带着孩子的名字，**这些注释此刻正公开在线上站点上**，任何人按 Ctrl+U 查看源码就能看到，两个发行 zip 里也有：

```
// Andy 新增的其他舰船
// 传奇旗舰(Andy 新增)
// Andy 新增的飞机与无人机
// Andy 新增的传奇旗舰(真实历史名舰,用通行中文舰名)
```

已全部改成「上游新增…」。`server/README.md` 的示例 JSON 里也有一处 `"name": "Andy"`，已改成 `"Captain"`。

**这条只有部署之后才真正生效**——合并 PR 并执行部署命令，然后自己验证一次：

```bash
curl -s https://game.boobank.com/irontide/ | grep -c Andy
```

必须返回 `0`。

---

## 还没修的（需要你决定怎么处理）

### 2. git 提交历史里的真名 + 私人邮箱 —— **最高优先级**

两个仓库的提交作者信息里都有：

```
Andy Li <zianandyli@gmail.com>
```

用一条命令就能看到：

```bash
git log --format='%an <%ae>' | sort -u
```

**为什么这条最要紧**：所有渠道的文案在被人质疑"真的是小孩做的吗"时，标准回答都是"仓库的提交历史是公开的，你可以自己看"。也就是说，我们会**主动把最怀疑的那批人引向恰好泄露真名和邮箱的地方**。GitHub 的公开 API 让任何人都能一次性拉走全部提交作者信息，不需要 clone。

**三个选项，选一个**：

**选项 A：改写历史（最彻底，但会改变所有 commit 哈希）**

```bash
pip install git-filter-repo
cd /path/to/repo
git filter-repo --mailmap <(echo "VideoGameTips <videogametips@users.noreply.github.com> Andy Li <zianandyli@gmail.com>")
git push --force origin main
```

代价：所有 commit 哈希变化，任何已有的 fork/clone 会对不上。对这两个仓库来说影响很小（fork 只有我们自己，孩子的仓库也没有外部协作者）。**孩子的仓库需要他自己操作或授权。**

**选项 B：只改 GitHub 显示（快，但历史里的原始数据还在）**

在两个仓库根目录加一个 `.mailmap` 文件：

```
VideoGameTips <videogametips@users.noreply.github.com> <zianandyli@gmail.com>
```

`git log` 和 GitHub 网页会显示映射后的名字，但**原始提交对象里的真名邮箱依然存在**，`git log --format=%ae --no-mailmap` 还能读出来。这是遮挡，不是删除。

**选项 C：接受现状**

如果家里觉得一个名字和邮箱不算敏感（很多开源项目的未成年作者就是这么做的），那也是一个正当选择——但**必须相应改掉文案**：删掉所有"你可以去看提交历史"这类邀请，别主动把人往那里引。

> 我的建议是 **A**。这两个仓库都还没有外部依赖，现在改成本最低；等有了 star 和 fork 再改就难了。

**在做出选择并执行之前，不要开始任何渠道的发帖。**

### 3. GitHub 账号资料自查

打开 https://github.com/VideoGameTips 和 https://github.com/longmaolab，检查：

- [ ] Settings → Public profile 的 **Name / Bio / Company / Location** 里没有真名、年龄、城市、学校
- [ ] 头像不是真人照片
- [ ] 其他公开仓库、Star 列表、Gist 里没有带出身份信息（学校作业、带姓名的文档等）
- [ ] Settings → Emails 勾上 **Keep my email addresses private** 和 **Block command line pushes that expose my email**（防止以后再泄露）

### 4. 域名 WHOIS

```bash
whois boobank.com | grep -i "registrant\|admin\|email\|phone" | head
```

确认注册商的隐私保护是开着的。推广会把 `game.boobank.com` 推到很多人面前，其中有人会顺手查 WHOIS。

### 5. 发行包再确认

部署并重新生成 zip 之后：

```bash
cd promo/builds && unzip -p irontide-itch.zip index.html | grep -c Andy
unzip -p irontide-portal-singleplayer.zip index.html | grep -c Andy
```

两条都必须是 `0`。上传到 itch.io / CrazyGames / Newgrounds 的包是会被永久保存的，传上去再想撤回就晚了。

---

## 发帖时的持续纪律

- 所有平台账号由**家长**注册、家长发言。孩子不注册 Reddit / HN / Discord / Product Hunt（这些平台本身也要求 13+ 或成年）。
- 提到孩子只用 **"my kid"** 或 GitHub ID **VideoGameTips**。不写具体年龄——"我 11 岁的儿子"比"我家孩子"更容易传播，但也把一个精确的身份坐标永久留在了公网上。
- 不发孩子的照片、录音、视频出镜。游戏画面录屏 + 家长旁白（或纯无人声）是安全的做法。
- 陌生人私信问"孩子多大""在哪上学""能不能加个联系方式"——**一律不回**，不管对方看起来多友善。
- 评论区由家长先看一遍再转述给孩子。这既是情绪保护，也能在有人开始打探身份时第一时间发现。
