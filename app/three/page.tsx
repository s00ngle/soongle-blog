"use client";

import PageContainer from "@/components/PageContainer";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function InteractiveThreeJS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // 큐브 색상 상태 추가
  const [cubeColor, setCubeColor] = useState("#60A3E2");

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f3f4);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    const resizeCanvas = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { clientWidth, clientHeight } = containerRef.current;

      // 캔버스 크기 조정
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 조명 추가 (밝기 향상)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // 기존보다 밝게 설정
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 80, 100);
    pointLight.position.set(2, 2, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 3, 3);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1);
    scene.add(hemisphereLight);

    // 회전하는 큐브 생성
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: cubeColor });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cubeRef.current = cube;
    cube.rotation.set(0.4, 0.6, 0.2); // 초기 회전 각도를 설정

    camera.position.z = 4;

    // 마우스 이벤트 핸들러
    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isDraggingRef.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !cubeRef.current) return;

      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;

      cubeRef.current.rotation.y += deltaX * 0.005;
      cubeRef.current.rotation.x += deltaY * 0.005;

      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // 이벤트 리스너 등록
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 모바일 기기 기울기 감지 이벤트
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!cubeRef.current) return;

      // 기기의 기울기 값 받아오기 (alpha, beta, gamma)
      const { alpha, beta, gamma } = event;

      if (alpha !== null && beta !== null && gamma !== null) {
        // Y축 기울기를 X축 회전으로 적용
        cubeRef.current.rotation.x = beta * (Math.PI / 180);
        // X축 기울기를 Y축 회전으로 적용
        cubeRef.current.rotation.y = gamma * (Math.PI / 180);
      }
    };

    // Safari에서 권한 요청 처리
    const requestPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (
            DeviceOrientationEvent as any
          ).requestPermission();
          if (permission === "granted") {
            window.addEventListener(
              "deviceorientation",
              handleOrientation,
              true
            );
          } else {
            console.log("Permission denied");
          }
        } catch (err) {
          console.error("Permission request failed", err);
        }
      } else {
        // Safari 13.3 이상이 아니거나, 다른 브라우저에서는 권한 요청을 따로 할 필요 없음
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    };

    requestPermission();

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("deviceorientation", handleOrientation);
      renderer.dispose();
    };
  }, [cubeColor]);

  // 색상 변경 핸들러
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setCubeColor(newColor);
    if (cubeRef.current) {
      (cubeRef.current.material as THREE.MeshStandardMaterial).color.set(
        newColor
      );
    }
  };

  return (
    <PageContainer>
      <h1 className="font-bold text-2xl">Interactive Three.JS</h1>
      <div className="flex items-center gap-4 my-4">
        <label className="font-semibold">큐브 색상:</label>
        <input
          type="color"
          value={cubeColor}
          onChange={handleColorChange}
          className="w-10 h-10 cursor-pointer border-2 border-gray-300 rounded-lg"
        />
      </div>
      <div ref={containerRef} className="w-full h-full border border-blue-500">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </PageContainer>
  );
}
