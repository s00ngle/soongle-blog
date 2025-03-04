"use client";

import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";

const SignatureCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Convert event coordinates to canvas-relative coordinates
  const getCanvasCoordinates = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in event) {
      const touch = event.touches[0]; // First touch event
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    setIsDrawing(true);
    const position = getCanvasCoordinates(event);
    setLastPosition(position);
  };

  const draw = (event: MouseEvent | TouchEvent) => {
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
    <div className="mt-4 flex justify-center">
      <div className="inline-block border rounded-md p-2 bg-white">
        <canvas
          ref={canvasRef}
          className="border rounded-sm cursor-crosshair touch-none"
          width={250}
          height={150}
          // Mouse Events
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          // Touch Events
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          aria-label="서명 캔버스"
        />
        <button
          type="button"
          onClick={clearCanvas}
          className="mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm px-4 py-2"
        >
          서명 지우기
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
