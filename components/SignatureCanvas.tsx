"use client";

import React, { useRef, useState, useEffect, MouseEvent } from "react";

const SignatureCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Convert mouse event coordinates to canvas-relative coordinates
  const getCanvasCoordinates = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const position = getCanvasCoordinates(event);
    setLastPosition(position);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context || !lastPosition) return;

    const currentPosition = getCanvasCoordinates(event);
    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(currentPosition.x, currentPosition.y);
    context.stroke();
    setLastPosition(currentPosition);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = 2;
        context.lineCap = "round";
        context.strokeStyle = "#000000";
      }
    }
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="w-4 h-4 text-[#3396f4]">🖋</span>
        <span>서명</span>
      </div>
      <div className="inline-block border rounded-md p-2 bg-white">
        <canvas
          ref={canvasRef}
          className="border rounded cursor-crosshair touch-none"
          width={250}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          aria-label="서명 캔버스"
        />
        <button
          type="button"
          onClick={clearCanvas}
          className="mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-4 py-2"
        >
          서명 지우기
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
