export interface Point {
  x: number;
  y: number;
}

export type Direction = "up" | "down" | "left" | "right";

/**
 * Pure collision detection function between snake head and food point.
 * Checks Euclidean distance between head center and food center against a threshold.
 */
export function checkCollision(
  headPos: Point,
  foodPos: Point,
  threshold = 24
): boolean {
  const dx = headPos.x - foodPos.x;
  const dy = headPos.y - foodPos.y;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
}

/**
 * Computes a loop of patrol waypoints scaled to the current viewport dimensions.
 * Avoids the top navigation area (top 80px) and keeps safe margins.
 */
export function calculatePatrolPath(width: number, height: number): Point[] {
  // Safe boundaries
  const top = Math.max(90, Math.min(130, height * 0.15));
  const bottom = Math.max(top + 100, height - 60);
  const left = Math.max(30, width * 0.05);
  const right = Math.max(left + 100, width - 30);
  const midX = width * 0.5;
  const midY = (top + bottom) * 0.5;

  return [
    { x: left, y: top },
    { x: midX, y: top + 40 },
    { x: right, y: top },
    { x: right, y: midY },
    { x: right - 40, y: bottom },
    { x: midX, y: bottom - 30 },
    { x: left, y: bottom },
    { x: left + 40, y: midY },
  ];
}

/**
 * Calculates the next position and movement direction towards a target waypoint.
 */
export function getNextPosition(
  currentPos: Point,
  targetWaypoint: Point,
  speedPxPerSec: number,
  deltaTimeSec: number
): {
  nextPos: Point;
  arrived: boolean;
  direction: Direction;
} {
  const dx = targetWaypoint.x - currentPos.x;
  const dy = targetWaypoint.y - currentPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Determine dominant movement direction for eye orientation
  let direction: Direction = "right";
  if (Math.abs(dx) >= Math.abs(dy)) {
    direction = dx >= 0 ? "right" : "left";
  } else {
    direction = dy >= 0 ? "down" : "up";
  }

  const stepDistance = speedPxPerSec * deltaTimeSec;

  if (distance <= stepDistance || distance < 1) {
    return {
      nextPos: { ...targetWaypoint },
      arrived: true,
      direction,
    };
  }

  const ratio = stepDistance / distance;
  return {
    nextPos: {
      x: currentPos.x + dx * ratio,
      y: currentPos.y + dy * ratio,
    },
    arrived: false,
    direction,
  };
}
