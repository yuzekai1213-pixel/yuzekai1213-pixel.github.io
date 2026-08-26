#!/bin/bash
# ============================================================
# optimize_images.sh · 批量生成网页用压缩图变体
#   原图 assets/X/Y.jpg
#     → X/Y-thumb.jpg  最长边 480px（缩略图/卡片模糊底）
#     → X/Y-disp.jpg   最长边 1600px（展示/封面/画廊主图）
#   原图仅保留给灯箱放大使用。重复运行自动跳过已生成文件。
# 用法: bash tools/optimize_images.sh
# ============================================================
set -u
cd "$(dirname "$0")/.."

count=0; skipped=0; fail=0
while IFS= read -r f; do
  case "$f" in
    *-thumb.jpg|*-disp.jpg) continue ;;   # 跳过已生成的变体
  esac
  base="${f%.*}"
  if [ ! -f "$base-thumb.jpg" ]; then
    if sips -s format jpeg -s formatOptions 72 -Z 480 "$f" --out "$base-thumb.jpg" >/dev/null 2>&1; then
      count=$((count+1))
    else
      echo "FAIL thumb: $f"; fail=$((fail+1))
    fi
  else
    skipped=$((skipped+1))
  fi
  if [ ! -f "$base-disp.jpg" ]; then
    if sips -s format jpeg -s formatOptions 62 -Z 1400 "$f" --out "$base-disp.jpg" >/dev/null 2>&1; then
      count=$((count+1))
    else
      echo "FAIL disp: $f"; fail=$((fail+1))
    fi
  else
    skipped=$((skipped+1))
  fi
done < <(find assets -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \))

echo "完成：新生成 $count 个文件，跳过 $skipped 个，失败 $fail 个"
