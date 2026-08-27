#!/bin/bash
# ============================================================
# 自动部署到 GitHub Pages · 每晚 23:30 由 LaunchAgent 触发
# 步骤：① 检查最新文件 ② 提交并推送到 GitHub ③ 验证线上刷新
# 日志：~/Library/Logs/yz-github-deploy.log
# ============================================================
set -u
PROJ="/Users/a111/Documents/personalweb"
LOG="$HOME/Library/Logs/yz-github-deploy.log"
BRANCH="main"
SITE="https://yuzekai1213-pixel.github.io/"

log(){ echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }
notify(){ osascript -e "display notification \"$1\" with title \"GitHub 部署\"" >/dev/null 2>&1 & }

log "===== 开始自动部署 ====="
cd "$PROJ" || { log "错误：项目目录不存在"; exit 1; }

# ---------- ① 检查最新（最后修改过）的文件状态 ----------
{
  log "--- 待提交（本地较新）---"
  git status --short
  log "--- 最近一次提交 ---"
  git log --oneline -3
} >> "$LOG" 2>&1

# ---------- ② 提交并推送到 GitHub ----------
CHANGED=$(git status --porcelain | wc -l | tr -d ' ')
if [ "$CHANGED" -eq 0 ]; then
  log "无变更，跳过提交。"
else
  git add -A
  git commit -q -m "自动部署：更新网站内容与排版 $(date '+%Y-%m-%d %H:%M')" || log "提交失败"
  log "推送中 -> branch: main"
  if git push origin "$BRANCH" 2>&1 | tee -a "$LOG"; then
    log "推送成功 ✔"
  else
    log "推送失败 ✘"; notify "GitHub 推送失败"; exit 1
  fi
fi

# ---------- ③ 刷新并验证外部链接读取最新版 ----------
log "等待 Pages 重建（约 30s）..."
sleep 30
CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 20 "$SITE")
log "线上站点 $SITE 状态码 $CODE"
if [ "$CODE" = "200" ]; then
  log "部署完成 ✔ 外部访问已是最新"
  notify "部署完成 ✔ 网站已更新"
else
  log "线上未返回 200（$CODE），可能仍在构建"
  notify "已推送，线上仍构建中"
fi
log "===== 结束 ==="
