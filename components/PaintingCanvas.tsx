"use client";

import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

type Tool = "pen" | "eraser";

const PaintingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [activeTool, setActiveTool] = useState<Tool>("pen");
  const [eraseSize, setEraseSize] = useState(20);
  const eraserCursorRef = useRef<HTMLDivElement | null>(null);

  // 색상 옵션
  const colorOptions = [
    "#000000", // 검정
    "#FF0000", // 빨강
    "#0000FF", // 파랑
    "#008000", // 초록
    "#800080", // 보라
    "#FFA500", // 주황
  ];

  // 선 굵기 옵션
  const lineWidthOptions = [1, 2, 4, 6];

  // 지우개 크기 옵션
  const eraserSizeOptions = [10, 20, 30, 40];

  // Convert event coordinates to canvas-relative coordinates
  const getCanvasCoordinates = (event: ReactMouseEvent | ReactTouchEvent) => {
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

  const startDrawing = (event: ReactMouseEvent | ReactTouchEvent) => {
    setIsDrawing(true);
    const position = getCanvasCoordinates(event);
    setLastPosition(position);

    // 지우개 도구인 경우 첫 클릭 시 바로 지우기
    if (activeTool === "eraser") {
      erase(position);
    }
  };

  const draw = (event: ReactMouseEvent | ReactTouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context || !lastPosition) return;

    const currentPosition = getCanvasCoordinates(event);

    if (activeTool === "pen") {
      // 펜 도구로 그리기
      context.beginPath();
      context.moveTo(lastPosition.x, lastPosition.y);
      context.lineTo(currentPosition.x, currentPosition.y);
      context.stroke();
    } else if (activeTool === "eraser") {
      // 지우개로 지우기
      erase(currentPosition);
    }

    setLastPosition(currentPosition);
  };

  const erase = (position: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context || !lastPosition) return;

    context.save();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(position.x, position.y, eraseSize / 2, 0, Math.PI * 2);
    context.fill();
    context.restore();
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

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스 내용을 이미지 URL로 변환
    const dataURL = canvas.toDataURL("image/png");

    // 다운로드 링크 생성
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `my-drawing-${new Date().toISOString().slice(0, 10)}.png`;

    // 가상 클릭 이벤트 발생
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleColorChange = (color: string) => {
    setStrokeColor(color);
    setActiveTool("pen");
  };

  const handleLineWidthChange = (width: number) => {
    setLineWidth(width);
    setActiveTool("pen");
  };

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool);
  };

  const handleEraserSizeChange = (size: number) => {
    setEraseSize(size);
  };

  // 마우스 이동 시 지우개 커서 위치 업데이트
  const updateEraserCursor = (event: globalThis.MouseEvent) => {
    if (activeTool !== "eraser" || !eraserCursorRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
      eraserCursorRef.current.style.display = "block";
      eraserCursorRef.current.style.left = `${x}px`;
      eraserCursorRef.current.style.top = `${y}px`;
      eraserCursorRef.current.style.width = `${eraseSize}px`;
      eraserCursorRef.current.style.height = `${eraseSize}px`;
    } else {
      eraserCursorRef.current.style.display = "none";
    }
  };

  const hideEraserCursor = () => {
    if (eraserCursorRef.current) {
      eraserCursorRef.current.style.display = "none";
    }
  };

  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(250);

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasWidth(window.innerWidth * 0.9); // 화면의 90% 너비로 설정
      // 가로:세로 16:9 비율로 설정
      setCanvasHeight((window.innerWidth * 0.9 * 9) / 16);
    };

    updateCanvasSize(); // 초기 크기 설정
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // 캔버스에 그리기 설정 업데이트
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.lineWidth = lineWidth;
        context.lineCap = "round";
        context.strokeStyle = strokeColor;
      }
    }
  }, [strokeColor, lineWidth]);

  // 캔버스에 마우스 이벤트 리스너 등록
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const mouseMove = (e: globalThis.MouseEvent) => updateEraserCursor(e);

      canvas.addEventListener("mousemove", mouseMove);
      canvas.addEventListener("mouseleave", hideEraserCursor);

      return () => {
        canvas.removeEventListener("mousemove", mouseMove);
        canvas.removeEventListener("mouseleave", hideEraserCursor);
      };
    }
  }, [activeTool, eraseSize]);

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="border rounded-md p-4 bg-white">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border rounded touch-none w-full"
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            aria-label="서명 캔버스"
          />
          <div
            ref={eraserCursorRef}
            className="absolute rounded-full border-2 border-gray-500 bg-white opacity-50 pointer-events-none"
            style={{
              display: "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* 도구 선택 영역 */}
        <div className="mt-4 mb-2">
          <p className="text-sm mb-2 font-medium">도구 선택:</p>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                activeTool === "pen" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleToolChange("pen")}
            >
              펜
            </button>
            <button
              className={`px-3 py-1 rounded ${
                activeTool === "eraser"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleToolChange("eraser")}
            >
              지우개
            </button>
          </div>
        </div>

        {/* 펜 설정 영역 */}
        {activeTool === "pen" && (
          <>
            <div className="mt-3 mb-3">
              <p className="text-sm mb-2 font-medium">색상 선택:</p>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      strokeColor === color
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    aria-label={`${color} 색상 선택`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm mb-2 font-medium">선 굵기:</p>
              <div className="flex space-x-2">
                {lineWidthOptions.map((width) => (
                  <button
                    key={width}
                    className={`w-8 h-8 flex items-center justify-center border rounded ${
                      lineWidth === width ? "bg-gray-200" : "bg-white"
                    }`}
                    onClick={() => handleLineWidthChange(width)}
                    aria-label={`${width}px 선 굵기 선택`}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: `${width}px`,
                        backgroundColor: "black",
                        borderRadius: "2px",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 지우개 설정 영역 */}
        {activeTool === "eraser" && (
          <div className="mt-3 mb-3">
            <p className="text-sm mb-2 font-medium">지우개 크기:</p>
            <div className="flex space-x-2">
              {eraserSizeOptions.map((size) => (
                <button
                  key={size}
                  className={`w-8 h-8 flex items-center justify-center border rounded ${
                    eraseSize === size ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleEraserSizeChange(size)}
                  aria-label={`${size}px 지우개 크기 선택`}
                >
                  <div
                    style={{
                      width: `${size / 2}px`,
                      height: `${size / 2}px`,
                      backgroundColor: "gray",
                      borderRadius: "50%",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-2 space-x-3">
          <button
            type="button"
            onClick={clearCanvas}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-6 py-2"
          >
            모두 지우기
          </button>
          <button
            type="button"
            onClick={saveCanvas}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-6 py-2"
          >
            그림 저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaintingCanvas;
