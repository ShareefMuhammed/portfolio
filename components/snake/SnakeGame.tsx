"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const GRID_SIZE = 20;
const SPEED_AUTO_MS = 90;
const SPEED_MANUAL_MS = 120;
const MAX_SNAKE_LENGTH = 10;

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
interface Point {
  x: number;
  y: number;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<"AUTO" | "MANUAL">("AUTO");

  // Snake grid coordinates: index 0 is head
  const snakeRef = useRef<Point[]>([{ x: 8, y: 10 }]);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Point>({ x: 16, y: 12 });
  const gridRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });
  const obstaclesRef = useRef<boolean[][]>([]);
  const isDeadRef = useRef<boolean>(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // PRNG seed for deterministic organic randomness
  const rngSeedRef = useRef<number>(0.5);
  const getRandom = useCallback(() => {
    rngSeedRef.current = (rngSeedRef.current * 9301 + 49297) % 233280;
    return rngSeedRef.current / 233280;
  }, []);

  // Compute next grid cell with screen torus wrapping
  const getNextCell = useCallback((cell: Point, dir: Direction): Point => {
    const { cols, rows } = gridRef.current;
    if (cols === 0 || rows === 0) return cell;

    switch (dir) {
      case "UP":
        return { x: cell.x, y: (cell.y - 1 + rows) % rows };
      case "DOWN":
        return { x: cell.x, y: (cell.y + 1) % rows };
      case "LEFT":
        return { x: (cell.x - 1 + cols) % cols, y: cell.y };
      case "RIGHT":
        return { x: (cell.x + 1) % cols, y: cell.y };
    }
  }, []);

  // Collision checking with self, boundaries, and obstacles
  const isColliding = useCallback((cell: Point): boolean => {
    const { cols, rows } = gridRef.current;
    if (cell.x < 0 || cell.x >= cols || cell.y < 0 || cell.y >= rows) {
      return true;
    }

    // Check self-collision
    const snake = snakeRef.current;
    for (let i = 0; i < snake.length - 1; i++) {
      if (cell.x === snake[i].x && cell.y === snake[i].y) {
        return true;
      }
    }

    // Check obstacle map
    return Boolean(obstaclesRef.current[cell.y]?.[cell.x]);
  }, []);

  // BFS check to ensure moving into a cell doesn't lead to a dead-end trap
  const hasFreeSpace = useCallback(
    (start: Point, minCells = 8): boolean => {
      const queue: Point[] = [start];
      const visited = new Set<string>();
      visited.add(`${start.x},${start.y}`);
      let count = 0;

      while (queue.length > 0) {
        const curr = queue.shift()!;
        count++;
        if (count >= minCells) return true;

        const directions: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
        for (const dir of directions) {
          const neighbor = getNextCell(curr, dir);
          const key = `${neighbor.x},${neighbor.y}`;
          if (!visited.has(key) && !isColliding(neighbor)) {
            visited.add(key);
            queue.push(neighbor);
          }
        }
      }
      return false;
    },
    [getNextCell, isColliding]
  );

  // Scan obstacles on the page (cards, buttons, nav) so the snake pathfinds around them
  const scanObstacles = useCallback(() => {
    const { cols, rows } = gridRef.current;
    if (cols === 0 || rows === 0) return;

    const obstacleMap: boolean[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(false)
    );

    // Find cards, nav bar, and content boxes
    const contentElements = document.querySelectorAll(
      "nav, header, [role='navigation'], .bg-surface, article, [data-obstacle='true']"
    );

    // Explicitly mark top header / nav zone (0 to 120px) as obstacle so food never spawns around nav
    const navBarRows = Math.min(rows, 6);
    for (let y = 0; y < navBarRows; y++) {
      for (let x = 0; x < cols; x++) {
        obstacleMap[y][x] = true;
      }
    }

    contentElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const startX = Math.max(0, Math.floor(rect.left / GRID_SIZE));
      const endX = Math.min(cols, Math.ceil(rect.right / GRID_SIZE));
      const startY = Math.max(0, Math.floor(rect.top / GRID_SIZE));
      const endY = Math.min(rows, Math.ceil(rect.bottom / GRID_SIZE));

      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          if (y >= 0 && y < rows && x >= 0 && x < cols) {
            obstacleMap[y][x] = true;
          }
        }
      }
    });

    obstaclesRef.current = obstacleMap;
  }, []);

  // Autonomous AI decision making: pick best direction towards food
  const chooseAutoDirection = useCallback((): Direction => {
    const head = snakeRef.current[0];
    const food = foodRef.current;
    const { cols, rows } = gridRef.current;
    const allDirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];

    // Filter valid non-colliding directions that have free space
    const safeDirs = allDirs.filter((dir) => {
      const nextCell = getNextCell(head, dir);
      return !isColliding(nextCell) && hasFreeSpace(nextCell, 6);
    });

    if (safeDirs.length === 0) {
      return directionRef.current;
    }

    // Sort by shortest Manhattan distance to food with torus wrap consideration
    safeDirs.sort((a, b) => {
      const cellA = getNextCell(head, a);
      const cellB = getNextCell(head, b);

      const dxA = Math.abs(cellA.x - food.x);
      const dyA = Math.abs(cellA.y - food.y);
      const distA = Math.min(dxA, cols - dxA) + Math.min(dyA, rows - dyA);

      const dxB = Math.abs(cellB.x - food.x);
      const dyB = Math.abs(cellB.y - food.y);
      const distB = Math.min(dxB, cols - dxB) + Math.min(dyB, rows - dyB);

      return distA - distB;
    });

    // 10% organic randomness if multiple safe paths exist
    if (safeDirs.length > 1 && getRandom() < 0.12) {
      const randIdx = Math.floor(getRandom() * safeDirs.length);
      return safeDirs[randIdx];
    }

    return safeDirs[0];
  }, [getNextCell, isColliding, hasFreeSpace, getRandom]);

  // Spawn new reachable food location
  const spawnFood = useCallback(() => {
    const { cols, rows } = gridRef.current;
    if (cols === 0 || rows === 0) return;

    const minSafeY = Math.min(rows - 1, 6); // Strictly below nav bar
    const availableRows = Math.max(1, rows - minSafeY);

    let attempts = 0;
    while (attempts < 100) {
      attempts++;
      const randX = Math.floor(getRandom() * cols);
      const randY = minSafeY + Math.floor(getRandom() * availableRows);
      const candidate = { x: randX, y: randY };

      if (!isColliding(candidate)) {
        foodRef.current = candidate;
        return;
      }
    }

    // Fallback
    foodRef.current = {
      x: Math.floor(cols / 2),
      y: Math.max(minSafeY, Math.floor(rows / 2)),
    };
  }, [getRandom, isColliding]);

  // Main game loop & rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gridRef.current = {
        cols: Math.floor(canvas.width / GRID_SIZE),
        rows: Math.floor(canvas.height / GRID_SIZE),
      };
      scanObstacles();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scanObstacles, { passive: true });

    // Initial food spawn
    spawnFood();

    const intervalId = setInterval(
      () => {
        if (isDeadRef.current) return;

        if (mode === "AUTO") {
          nextDirectionRef.current = chooseAutoDirection();
        }
        directionRef.current = nextDirectionRef.current;

        const head = snakeRef.current[0];
        const nextHead = getNextCell(head, directionRef.current);

        // Collision handling
        if (isColliding(nextHead)) {
          if (mode === "MANUAL") {
            isDeadRef.current = true;
            setTimeout(() => {
              snakeRef.current = [{ x: 8, y: 8 }];
              directionRef.current = "RIGHT";
              nextDirectionRef.current = "RIGHT";
              isDeadRef.current = false;
              setMode("AUTO");
            }, 1500);
          } else {
            // In AUTO mode, respawn at starting position
            snakeRef.current = [{ x: 8, y: 8 }];
            directionRef.current = "RIGHT";
            nextDirectionRef.current = "RIGHT";
          }
          return;
        }

        // Check if food eaten
        const food = foodRef.current;
        const ateFood = nextHead.x === food.x && nextHead.y === food.y;

        let nextSnake: Point[];

        if (ateFood) {
          // REQUIREMENT: Maximum snake length 10; when reached, restart at 1
          if (snakeRef.current.length >= MAX_SNAKE_LENGTH) {
            nextSnake = [nextHead]; // Restart at length 1!
          } else {
            nextSnake = [nextHead, ...snakeRef.current]; // Grow by 1
          }
          spawnFood();
        } else {
          nextSnake = [nextHead, ...snakeRef.current.slice(0, -1)];
        }

        snakeRef.current = nextSnake;

        // Draw canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Food
        const currentFood = foodRef.current;
        ctx.fillStyle = "#CD5C5C"; // Coral food token
        ctx.fillRect(
          currentFood.x * GRID_SIZE + 1,
          currentFood.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );
        // Food outline
        ctx.strokeStyle = "#2A2A2A";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          currentFood.x * GRID_SIZE + 1,
          currentFood.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );

        // Draw Snake
        nextSnake.forEach((segment, index) => {
          const px = segment.x * GRID_SIZE + 1;
          const py = segment.y * GRID_SIZE + 1;
          const size = GRID_SIZE - 2;

          if (index === 0) {
            // Head
            ctx.fillStyle = "#556B2F"; // Olive/snake head
            ctx.beginPath();
            ctx.roundRect(px, py, size, size, 5);
            ctx.fill();
            ctx.strokeStyle = "#2A2A2A";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Draw Eyes facing movement direction
            ctx.fillStyle = "white";
            const eyeSize = 4;
            const pupilSize = 2;
            let eye1X = px + 3;
            let eye1Y = py + 3;
            let eye2X = px + size - 3 - eyeSize;
            let eye2Y = py + 3;

            const dir = directionRef.current;
            if (dir === "UP") {
              eye1Y = py + 3;
              eye2Y = py + 3;
            } else if (dir === "DOWN") {
              eye1Y = py + size - 3 - eyeSize;
              eye2Y = py + size - 3 - eyeSize;
            } else if (dir === "LEFT") {
              eye1X = px + 3;
              eye2X = px + 3;
              eye1Y = py + 3;
              eye2Y = py + size - 3 - eyeSize;
            } else if (dir === "RIGHT") {
              eye1X = px + size - 3 - eyeSize;
              eye2X = px + size - 3 - eyeSize;
              eye1Y = py + 3;
              eye2Y = py + size - 3 - eyeSize;
            }

            ctx.fillRect(eye1X, eye1Y, eyeSize, eyeSize);
            ctx.fillRect(eye2X, eye2Y, eyeSize, eyeSize);

            ctx.fillStyle = "#1A1A1A";
            ctx.fillRect(eye1X + 1, eye1Y + 1, pupilSize, pupilSize);
            ctx.fillRect(eye2X + 1, eye2Y + 1, pupilSize, pupilSize);
          } else {
            // Body segment
            ctx.fillStyle = "#A5AC88"; // Snake token body color
            ctx.beginPath();
            ctx.roundRect(px, py, size, size, 3);
            ctx.fill();
            ctx.strokeStyle = "#2A2A2A";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      },
      mode === "AUTO" ? SPEED_AUTO_MS : SPEED_MANUAL_MS
    );

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scanObstacles);
    };
  }, [
    mode,
    chooseAutoDirection,
    getNextCell,
    isColliding,
    spawnFood,
    scanObstacles,
  ]);

  // Keyboard controls (WASD & Arrows) for interactive play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        w: "UP",
        W: "UP",
        ArrowUp: "UP",
        s: "DOWN",
        S: "DOWN",
        ArrowDown: "DOWN",
        a: "LEFT",
        A: "LEFT",
        ArrowLeft: "LEFT",
        d: "RIGHT",
        D: "RIGHT",
        ArrowRight: "RIGHT",
      };

      const requestedDir = keyMap[e.key];
      if (requestedDir) {
        // Prevent default scrolling on arrow keys during play
        if (e.key.startsWith("Arrow")) {
          e.preventDefault();
        }

        const currentDir = directionRef.current;
        // Prevent 180-degree self-reversal
        const isOpposite =
          (requestedDir === "UP" && currentDir === "DOWN") ||
          (requestedDir === "DOWN" && currentDir === "UP") ||
          (requestedDir === "LEFT" && currentDir === "RIGHT") ||
          (requestedDir === "RIGHT" && currentDir === "LEFT");

        if (!isOpposite) {
          nextDirectionRef.current = requestedDir;
          setMode("MANUAL");

          // Auto-revert to AUTO mode after 5 seconds of inactivity
          if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
          manualTimeoutRef.current = setTimeout(() => {
            setMode("AUTO");
          }, 5000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-60 transition-opacity duration-300"
      />
    </div>
  );
}
