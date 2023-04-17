const moveArr = [
  [2, 1],
  [2, -1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [1, -2],
  [-1, -2],
];

function isValid(elem) {
  return elem < 0 || elem > 15;
}

function getMoveGraph() {
  const moveGraph = new Map();
  const queue = [[0, 0]];
  while (queue[0]) {
    const allMoves = [];
    moveArr.forEach((move) => {
      const newX = queue[0][0] + move[0];
      const newY = queue[0][1] + move[1];
      if (![newX, newY].some(isValid)) {
        allMoves.push([newX, newY]);
        if (!moveGraph.has(`[${newX},${newY}]`)) {
          queue.push([newX, newY]);
          moveGraph.set(JSON.stringify([newX, newY]), []);
        }
      }
    });
    moveGraph.set(JSON.stringify(queue[0]), allMoves);
    queue.shift();
  }
  return moveGraph;
}

const graph = getMoveGraph();

function knightMove(startPos, endPos) {
  if (startPos[0] === endPos[0] && startPos[1] === endPos[1]) return endPos;
  const paths = [[startPos]];
  const visited = [JSON.stringify(startPos)];

  while (paths[0]) {
    const currentPath = paths.shift();
    const connection = graph.get(
      JSON.stringify(currentPath[currentPath.length - 1])
    );

    for (const elem of connection) {
      if (!visited.includes(JSON.stringify(elem))) {
        if (elem[0] === endPos[0] && elem[1] === endPos[1]) {
          return currentPath.concat([elem]);
        }
        visited.push(JSON.stringify(elem));
        paths.push(currentPath.concat([elem]));
      }
    }
  }
  return undefined;
}
