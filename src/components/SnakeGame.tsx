import './SnakeGame.css'
import React, { useEffect, useState } from 'react';

const SnakeGame = () => {
  const [gridSize] = useState(20); // Size of the game grid
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); // Initial position of the snake

  const generateFoodPosition = () => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return { x, y };
  };


  const [food, setFood] = useState(generateFoodPosition()); // Initial position of the food
  const [direction, setDirection] = useState('RIGHT'); // Initial direction of the snake
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200); // Adjust the snake's speed as needed

    return () => {
      clearInterval(interval);
    };
  }, [snake]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "ArrowUp" && direction !== 'DOWN') {
      setDirection('UP');
    } else if (event.code === "ArrowDown" && direction !== 'UP') {
      setDirection('DOWN');
    } else if (event.code === "ArrowLeft" && direction !== 'RIGHT') {
      setDirection('LEFT');
    } else if (event.code === "ArrowRight" && direction !== 'LEFT') {
      setDirection('RIGHT');
    }
  };

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFoodPosition());
    setDirection('RIGHT');
    setGameOver(false);
  };

 
  const moveSnake = () => {
    if (gameOver) {
      return;
    }

    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y = (head.y - 1 + gridSize) % gridSize;
        break;
      case 'DOWN':
        head.y = (head.y + 1) % gridSize;
        break;
      case 'LEFT':
        head.x = (head.x - 1 + gridSize) % gridSize;
        break;
      case 'RIGHT':
        head.x = (head.x + 1) % gridSize;
        break;
      default:
        break;
    }
    debugger

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFoodPosition());
    } else {
      newSnake.pop(); // Remove the tail segment
    }
    setSnake(newSnake);
  };

  const checkCollision = (head:any) => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      {gameOver ? (
        <div className="game-over">
          <p>Game Over</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div className="game-grid">
          {...snake.map((segment, index) => (
            <div
              key={index}
              className="grid-cell snake"
              style={{
                gridColumn: segment.x + 1,
                gridRow: segment.y + 1
              }}
            ></div>
          ))}
          <div
            className="grid-cell food"
            style={{
              gridColumn: food.x + 1,
              gridRow: food.y + 1
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
