import styled from "styled-components";

export const Food = styled.div<{ $left: number; $top: number }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ff0000;
  border: 2px solid #333;
  position: absolute;
  margin: 2px;
  left: ${(props: { $left: number }) => props.$left * 50}px;
  top: ${(props: { $top: number }) => props.$top * 50}px;
`;

export const Obstacle = styled.div<{ $left: number; $top: number }>`
  width: 50px;
  height: 50px;
  background: #918129;
  border: 2px solid #333;
  position: absolute;
  margin: 2px;
  z-index: 2;
  left: ${(props: { $left: number }) => props.$left * 50}px;
  top: ${(props: { $top: number }) => props.$top * 50}px;
`;

export const SnakePart = styled.div<{ part: { x: number; y: number } }>`
  position: absolute;
  top: ${(props) => props.part.y * 50}px;
  left: ${(props) => props.part.x * 50}px;
  width: 50px;
  height: 50px;
  background: #0CFF00;
  border: 2px solid #333;
  z-index: 1;
`;

export const BoardBorder = styled.div<{ width: number, height: number }>`
    position: absolute;
    top: 100px;
    left: 100px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 2px solid red;
`
export const ScoreBoard = styled.div`
  
  font-weight: 500;
  font-size: 30px;
  color: yellow;
`;

export const GameOver = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 70px;
  color: white;
  position: relative;
  top: 30%;
  align-items: center;
  z-index: 9999;
  border: 2px solid gray;
  padding: 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin-left: 30rem;
  margin-right: 30rem;
  box-shadow: 4px 4px 4px;
`;

export const GameOverHighScore = styled(GameOver)`
  font-weight: 500;
  font-size: 30px;
  color: white;
  position: relative;
  top: 10%;
 
`;

export const GameOverWrapper = styled.div`
  display:flex;
  flex-direction: row;
  padding: 20px;
`;

export const ResetGameButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameButton = styled.button`
  padding: 8px;
  border: 2px solid gray;
  border-radius: 4px;
  font-size: 20px;
  width: fit-content;
`;

export const GameTopMenu = styled.div<{ width: number}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 50px;
  left: 100px;
  width: ${(props) => props.width}px;
`;

export const GameMenuButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;