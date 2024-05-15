import React from "react";
import { BarTask } from "../../types/bar-task";

type ArrowProps = {
  taskFrom: BarTask;
  taskTo: BarTask;
  rowHeight: number;
  taskHeight: number;
  arrowIndent: number;
  rtl: boolean; 
  relationship: 'FS' | 'SS' | 'FF'
};
export const Arrow: React.FC<ArrowProps> = ({
  taskFrom,
  taskTo,
  rowHeight,
  taskHeight,
  arrowIndent,
  rtl,  
  relationship
}) => {
  let path: string;
  let trianglePoints: string;
  if (rtl) {
    [path, trianglePoints] = drownPathAndTriangleRTL(
      taskFrom,
      taskTo,
      rowHeight,
      taskHeight,
      arrowIndent
    );
  } else {
    [path, trianglePoints] = drownPathAndTriangle(
      taskFrom,
      taskTo,
      rowHeight,
      taskHeight,
      arrowIndent,
      relationship
    );
  }

  return (
    <g className="arrow">
      <path strokeWidth="1.5" d={path} fill="none" />
      <polygon points={trianglePoints} />
    </g>
  );
};

const drownPathAndTriangle = (
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number,
  relationship: 'FS' | 'SS' | 'FF'
) => {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskToEndPositionFF = taskTo.x2;
  const taskFromStartPosition = taskFrom.x1;
  const taskFromEndPosition = taskFrom.x2;
  const taskToStartPosition = taskTo.x1;
  let path, trianglePoints;

  switch (relationship) {
    case 'FS':
      path = `M ${taskFromEndPosition} ${taskFrom.y + taskHeight / 2} 
              h ${arrowIndent} 
              v ${(indexCompare * rowHeight) / 2} 
              H ${taskToStartPosition - arrowIndent}
              V ${taskToEndPosition} 
              h ${arrowIndent}`;
      trianglePoints = `${taskToStartPosition},${taskToEndPosition} 
                        ${taskToStartPosition - 5},${taskToEndPosition - 5} 
                        ${taskToStartPosition - 5},${taskToEndPosition + 5}`;
      break;
    case 'SS':
      path = `M ${taskFromStartPosition} ${taskFrom.y + taskHeight / 2} 
              h ${-arrowIndent} 
              v ${(indexCompare * rowHeight / 2)} 
              H ${taskToStartPosition - arrowIndent}
              V ${taskToEndPosition} 
              h ${arrowIndent}`;
      trianglePoints = `${taskToStartPosition},${taskToEndPosition} 
                        ${taskToStartPosition - 5},${taskToEndPosition - 5} 
                        ${taskToStartPosition - 5},${taskToEndPosition + 5}`;
      break;
    case 'FF':
      path = `M ${taskFromEndPosition} ${taskFrom.y + taskHeight / 2} 
              h ${arrowIndent} 
              v ${(indexCompare * rowHeight) / 2} 
              H ${taskToEndPositionFF + arrowIndent}
              V ${taskToEndPosition} 
              h ${-arrowIndent}`;
      trianglePoints = `${taskToEndPositionFF},${taskToEndPosition} 
                        ${taskToEndPositionFF + 5},${taskToEndPosition - 5} 
                        ${taskToEndPositionFF + 5},${taskToEndPosition + 5}`;
      break;
  }

  return [path, trianglePoints];
};

const drownPathAndTriangleRTL = (
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) => {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x2 ? "" : `H ${taskTo.x2 + arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x2
      ? -arrowIndent
      : taskTo.x2 - taskFrom.x1 + arrowIndent;

  const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h ${-arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

  const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5}`;
  return [path, trianglePoints];
};
