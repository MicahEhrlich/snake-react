import { useEffect, useState } from "react";
import {
  generateRandomPosition,
  isSnakeSelfCollide,
  setRandomItemPosition,
} from "../utils/helpers";
import { GameOver, ScoreBoard, Food, SnakePart, Obstacle } from "./Game.styles";

const GAME_SPEED = 200;

const defaultStartPosition = { x: 18, y: 8 };

const defaultObstaclePosition = { x: 5, y: 4 };

type GamePosition = {
  x: number;
  y: number;
};

const enum DIRECTION {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export const Game = () => {
  const [direction, setDirection] = useState<DIRECTION>(DIRECTION.UP);
  const [snakeParts, setSnakeParts] = useState<GamePosition[]>([
    defaultStartPosition,
  ]);
  const [food, setFood] = useState<GamePosition>(generateRandomPosition());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        const head = { ...snakeParts[0] };
        switch (direction) {
          default:
          case DIRECTION.UP:
            head.y--;
            break;
          case DIRECTION.DOWN:
            head.y++;
            break;
          case DIRECTION.LEFT:
            head.x--;
            break;
          case DIRECTION.RIGHT:
            head.x++;
            break;
        }
        const updatedSnake = [head, ...snakeParts.slice(0, -1)];
        setSnakeParts(updatedSnake);
      }
    }, Math.max(GAME_SPEED - score / 2, 30));
    return () => {
      clearInterval(interval);
    };
  }, [direction, snakeParts, gameOver, score]);

  useEffect(() => {
    checkCollision();
    snakeParts.forEach((part) => {
      if (direction === DIRECTION.UP && part.y < 3) {
        part.y = Math.floor(window.innerHeight / 50) - 3;
      } else if (
        direction === DIRECTION.DOWN &&
        (part.y + 3) * 50 > window.innerHeight
      ) {
        part.y = 2;
      } else if (
        direction === DIRECTION.RIGHT &&
        (part.x + 4) * 50 > window.innerWidth
      ) {
        part.x = 2;
      } else if (direction === DIRECTION.LEFT && part.x < 3) {
        part.x = Math.floor(window.innerWidth / 50) - 3;
      }
    });
  }, [snakeParts]);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "ArrowUp":
        direction !== DIRECTION.DOWN && setDirection(DIRECTION.UP);
        break;
      case "ArrowDown":
        direction !== DIRECTION.UP && setDirection(DIRECTION.DOWN);
        break;
      case "ArrowLeft":
        direction !== DIRECTION.RIGHT && setDirection(DIRECTION.LEFT);
        break;
      case "ArrowRight":
        direction !== DIRECTION.LEFT && setDirection(DIRECTION.RIGHT);
        break;
    }
  };

  const checkCollision = () => {
    if (
      (snakeParts[0].x === defaultObstaclePosition.x &&
        snakeParts[0].y === defaultObstaclePosition.y) ||
      isSnakeSelfCollide(snakeParts)
    ) {
      setGameOver(true);
    } else if (snakeParts[0].x === food.x && snakeParts[0].y === food.y) {
      setScore((score) => score + 10);
      const head = { ...snakeParts[0] };
      switch (direction) {
        case DIRECTION.UP:
          head.y--;
          break;
        case DIRECTION.DOWN:
          head.y++;
          break;
        case DIRECTION.LEFT:
          head.x--;
          break;
        case DIRECTION.RIGHT:
          head.x++;
          break;
        default:
          break;
      }
      setSnakeParts([...snakeParts, { x: head.x, y: head.y }]);
      const newFoodPosition = setRandomItemPosition(snakeParts);
      setFood(newFoodPosition);
    }
  };
  return (
    <>
      {gameOver && <GameOver>GAME OVER!</GameOver>}
      <ScoreBoard>{`SCORE: ${score}`}</ScoreBoard>
      <div tabIndex={0} onKeyDown={keyDownHandler}>
        <Food $left={food.x} $top={food.y} />
        <Obstacle
          $left={defaultObstaclePosition.x}
          $top={defaultObstaclePosition.y}
        />
        {snakeParts.map((part, index) => (
          <SnakePart part={part} key={index} />
        ))}
      </div>
    </>
  );
};
