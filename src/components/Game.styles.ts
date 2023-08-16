import styled from "styled-components";

export const Food = styled.div<{ $left: number; $top: number }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ff0000;
  border: 2px solid #333;
  position: fixed;
  margin: 2px;
  left: ${(props: { $left: number }) => props.$left * 50}px;
  top: ${(props: { $top: number }) => props.$top * 50}px;
`;

export const Obstacle = styled.div<{ $left: number; $top: number }>`
  width: 50px;
  height: 50px;
  background: #918129;
  border: 2px solid #333;
  position: fixed;
  margin: 2px;
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
`;

export const ScoreBoard = styled.div`
  position: absolute;
  top: 50px;
  left: 100px;
  font-weight: 500;
  font-size: 30px;
  color: yellow;
`;

export const GameOver = styled.div`
  font-weight: 600;
  font-size: 70px;
  color: red;
  top: 50%;
  left: 50%;
`;