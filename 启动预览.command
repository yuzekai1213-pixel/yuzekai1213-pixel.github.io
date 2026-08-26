#!/bin/bash
# 双击启动本地预览服务器 · 个人网站
# 浏览器访问 http://localhost:8923
cd "$(dirname "$0")"
PORT=8923

# 若端口已被占用则先释放（仅结束 http.server 进程）
if lsof -ti:$PORT >/dev/null 2>&1; then
  kill $(lsof -ti:$PORT) 2>/dev/null
  sleep 0.5
fi

echo "✅ 预览服务已启动：http://localhost:$PORT"
echo "   主页   http://localhost:$PORT/index.html"
echo "   作品集 http://localhost:$PORT/works.html"
echo "   简历   http://localhost:$PORT/resume.html"
echo ""
echo "关闭本窗口即停止服务。"

# 打开浏览器
open "http://localhost:$PORT/index.html"

python3 -m http.server $PORT
