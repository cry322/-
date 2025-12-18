import { useEffect, useRef } from "react";

// 定义组件的 props 类型
export interface RadarChartProps {
  data?: number[];      // 可选，归一化数据 [0,1]
  labels?: string[];    // 可选，维度标签
  width?: number;       // Canvas 宽度
  height?: number;      // Canvas 高度
}

export function RadarChart({
  data = [0.4, 1, 0.8, 1, 0.6],           // 默认数据（你的“民主的历史与现实”）
  labels = ["任务量", "听课", "难度", "收获", "给分"],
  width = 240,
  height = 240,
}: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d"); //ctx 是 Canvas 2D 渲染上下文（Context）的简称，全称通常是 context，开发者习惯缩写为 ctx。


    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const sides = data.length; // 动态根据 data 长度决定边数

    if (sides === 0) return;

    // Draw background polygons
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let level = 1; level <= 5; level++) {
      ctx.beginPath();
      const levelRadius = (radius / 5) * level;

      for (let i = 0; i <= sides; i++) {
        const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw lines from center
    ctx.strokeStyle = "#d1d5db";
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
    ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
    ctx.lineWidth = 2;

    for (let i = 0; i <= sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const value = data[i % data.length];
      const clampedValue = Math.max(0, Math.min(1, value)); // 安全限制
      const r = radius * clampedValue;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = "rgba(99, 102, 241, 1)";
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const value = Math.max(0, Math.min(1, data[i]));
      const r = radius * value;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = "#4b5563";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const labelRadius = radius + 20;

    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);

      ctx.fillText(labels[i] ?? "", x, y);
    }
  }, [data, labels]); // 当 data 或 labels 变化时重绘

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="max-w-full"
      />
    </div>
  );
}