import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const colors = [
  "#22c55e",
  "#10b981",
  "#06d6a0",
  "#ffd23f",
  "#ff9770",
  "#f72585",
];

export default function Confetti({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete?: () => void;
}) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    // Create confetti pieces
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 150; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: Math.random() * 8 + 3,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    setPieces(newPieces);

    // Animation loop
    const animate = () => {
      setPieces((currentPieces) => {
        if (currentPieces.length === 0) return currentPieces;

        const updatedPieces = currentPieces
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.velocityX,
            y: piece.y + piece.velocityY,
            rotation: piece.rotation + piece.rotationSpeed,
            velocityY: piece.velocityY + 0.5, // gravity
          }))
          .filter((piece) => piece.y < window.innerHeight + 50);

        if (updatedPieces.length === 0 && onComplete) {
          onComplete();
        }

        return updatedPieces;
      });
    };

    const interval = setInterval(animate, 16); // ~60fps

    return () => clearInterval(interval);
  }, [active, onComplete]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
        />
      ))}
    </div>
  );
}
