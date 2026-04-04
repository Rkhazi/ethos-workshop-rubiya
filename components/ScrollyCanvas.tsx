"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 144;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Map scroll progress (0 to 1) to an index (0 to FRAME_COUNT - 1)
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits, e.g. 000.png, 035.png
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/${paddedIndex}.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Draw first image once loaded
          if (canvasRef.current) {
             drawToCanvas(canvasRef.current, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Update canvas when frame index changes
  useMotionValueEvent(currentIndex, "change", (latest) => {
    const frameIndex = Math.floor(latest);
    if (images[frameIndex] && canvasRef.current) {
      drawToCanvas(canvasRef.current, images[frameIndex]);
    }
  });

  // Keep canvas size responsive
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && images.length > 0) {
        const frameIndex = Math.floor(currentIndex.get());
        drawToCanvas(canvasRef.current, images[frameIndex]);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, currentIndex]);

  // Helper to draw an image 'cover' style to canvas
  const drawToCanvas = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas dimensions match device pixels for crispness
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = canvas.width / 2 - w / 2;
    const y = canvas.height / 2 - h / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
  };

  return (
    <div className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
