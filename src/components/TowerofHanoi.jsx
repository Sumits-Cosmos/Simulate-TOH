import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Disc = ({ disc, isTop }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "DISC",
    item: { disc },
    canDrag: () => isTop, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`h-6 ${
        ["bg-red-500", "bg-blue-500", "bg-green-500"][(disc - 1) % 3]
      } rounded text-center text-white`}
      style={{
        width: `${disc * 20}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isTop ? "grab" : "not-allowed",
      }}
    >
      {disc}
    </div>
  );
};

const Tower = ({ tower, towerIndex, moveDisc }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "DISC",
    canDrop: (item) => {
      const topDisc = tower[tower.length - 1];
      return !topDisc || item.disc < topDisc; 
    },
    drop: (item) => moveDisc(item.disc, towerIndex),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`w-24 h-64 bg-gray-700 flex flex-col-reverse items-center rounded-md ${
        isOver && canDrop ? "bg-gray-600" : ""
      }`}
    >
      {tower.map((disc, index) => (
        <Disc
          key={disc}
          disc={disc}
          isTop={index === tower.length - 1}
        />
      ))}
    </div>
  );
};

const TowerOfHanoi = ({ numDiscs, onComplete }) => {
  const [towers, setTowers] = useState([]);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    setTowers([
      Array.from({ length: numDiscs }, (_, i) => numDiscs - i),
      [],
      [],
    ]);
    setMoveCount(0); 
  }, [numDiscs]);

  const moveDisc = (disc, targetTowerIndex) => {
    const sourceTowerIndex = towers.findIndex((tower) =>
      tower.includes(disc)
    );

    if (sourceTowerIndex === -1) return;

    const source = [...towers[sourceTowerIndex]];
    const target = [...towers[targetTowerIndex]];

 
    source.pop();
    target.push(disc);

    const updatedTowers = [...towers];
    updatedTowers[sourceTowerIndex] = source;
    updatedTowers[targetTowerIndex] = target;

    setTowers(updatedTowers);
    setMoveCount(moveCount + 1);

  
    if (updatedTowers[2].length === numDiscs) {
      const optimalMoves = Math.pow(2, numDiscs) - 1;
      onComplete(moveCount + 1 === optimalMoves);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center items-end gap-6">
        {towers.map((tower, index) => (
          <Tower
            key={index}
            tower={tower}
            towerIndex={index}
            moveDisc={moveDisc}
          />
        ))}
      </div>
      <p className="mt-4">Moves: {moveCount}</p>
    </DndProvider>
  );
};

export default TowerOfHanoi;
