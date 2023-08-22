import { useEffect, useState } from "react";
import {
  generateRandomPosition,
  isSnakeSelfCollide,
  setRandomItemPosition,
} from "../../utils/helpers";
import {
  GameOver,
  ScoreBoard,
  Food,
  SnakePart,
  Obstacle,
  BoardBorder,
  GameButton,
  GameOverHighScore,
  GameTopMenu,
  GameMenuButtons,
} from "./Game.styles";
import { DIRECTION, GamePosition } from "../../types";
import { Highscore } from "../Highscore";

const GAME_SPEED = 200;
const BOARD_WIDTH = 1700;
const BOARD_HEIGHT = 800;

const defaultStartPosition = { x: 18, y: 8 };

const defaultObstaclePosition = { x: 5, y: 4 };

export const Game = () => {
  const [direction, setDirection] = useState<DIRECTION>(DIRECTION.UP);
  const [snakeParts, setSnakeParts] = useState<GamePosition[]>([
    defaultStartPosition,
  ]);
  const [food, setFood] = useState<GamePosition>(generateRandomPosition());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHighscore, setShowHighscore] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !gamePaused) {
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
  }, [direction, snakeParts, gameOver, score, gamePaused]);

  useEffect(() => {
    if (!gamePaused) {
      checkCollision();
      snakeParts.forEach((part) => {
        if (direction === DIRECTION.UP && part.y < 1) {
          part.y = Math.floor(BOARD_HEIGHT / 50) - 1;
        } else if (
          direction === DIRECTION.DOWN &&
          (part.y + 2) * 50 > BOARD_HEIGHT
        ) {
          part.y = -1;
        } else if (
          direction === DIRECTION.RIGHT &&
          (part.x + 2) * 50 > BOARD_WIDTH
        ) {
          part.x = 0;
        } else if (direction === DIRECTION.LEFT && part.x < 1) {
          part.x = Math.floor(BOARD_WIDTH / 50) - 1;
        }
      });
    }
  }, [snakeParts]);

  const onResetGame = () => {
    setDirection(DIRECTION.UP);
    setSnakeParts([defaultStartPosition]);
    setFood(generateRandomPosition());
    setScore(0);
    setGameOver(false);
    setShowHighscore(false);
  };

  const onShowHighscore = () => {
    setShowHighscore(!showHighscore);
  }

  const onResumeGame = () => {
    setGamePaused(false);
  }

  const onPauseGame = () => {
    setGamePaused(true);
  }

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
      case "Escape":
        setGamePaused(!gamePaused);
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
    <div tabIndex={0} onKeyDown={keyDownHandler}>
      <GameTopMenu width={BOARD_WIDTH}>
        <ScoreBoard>{`SCORE: ${score}`}</ScoreBoard>
        <GameMenuButtons>
          <GameButton onClick={onPauseGame}>Pause</GameButton>
        </GameMenuButtons>
      </GameTopMenu>
      <BoardBorder width={BOARD_WIDTH} height={BOARD_HEIGHT}>
        {gamePaused && (
          <GameOver>
            PAUSED
            <GameButton onClick={onResumeGame}>Resume</GameButton>
          </GameOver>
        )}
        {gameOver && !showHighscore && (
          <GameOver>
            GAME OVER!
            <GameButton onClick={onResetGame}>Restart</GameButton>
            <GameButton onClick={onShowHighscore}>Highscore</GameButton>
          </GameOver>
        )}
        {showHighscore && (
          <GameOverHighScore>
            <Highscore />
            <GameButton onClick={onResetGame}>Restart</GameButton>
          </GameOverHighScore>
        )}
        <>
          <Food $left={food.x} $top={food.y} />
          <Obstacle
            $left={defaultObstaclePosition.x}
            $top={defaultObstaclePosition.y}
          />
          {snakeParts.map((part, index) => (
            <SnakePart part={part} key={index} />
          ))}
        </>
      </BoardBorder>
    </div>
  );
};
