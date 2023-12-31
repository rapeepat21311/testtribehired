// Answer One
function calculateClockAngles(time) {
  const timeParts = time.split(":");

  if (timeParts.length !== 2) {
    throw new Error("Invalid time format. Please use 'hh:mm' format.");
  }

  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;

  let angleDifference = Math.abs(hourAngle - minuteAngle);
  if (angleDifference > 180) {
    angleDifference = 360 - angleDifference;
  }

  return angleDifference;
}

console.log(calculateClockAngles("9:12"));

// Answer Two
function removeCommonWordInStringArr(strings) {
  if (strings.length === 0) {
    return [""];
  }

  const length = strings[0].length;
  let longestCommonSubstring = "";
  let longestLength = 0;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j <= length; j++) {
      const substring = strings[0].substring(i, j);
      let isCommon = true;

      for (let k = 1; k < strings.length; k++) {
        if (!strings[k].includes(substring)) {
          isCommon = false;
          break;
        }
      }

      if (isCommon && substring.length > longestLength) {
        longestCommonSubstring = substring;
        longestLength = substring.length;
      }
    }
  }

  return strings.map((str) =>
    str.replace(longestCommonSubstring, "").toUpperCase()
  );
}

console.log(
  removeCommonWordInStringArr(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"])
);

// Answer Three
function QuickesPath(board) {
  const allPath = [];
  let max = 1000;
  let sum = 1;
  let quickPath = [];

  for (let loop = 0; loop <= max; loop++) {
    let dice = Math.floor(Math.random() * 6) + 1;

    quickPath.push(dice);
    sum += dice;

    board.ladders.forEach((num) => {
      if (sum === num[0]) {
        sum = num[1];
      }
    });
    board.snakes.forEach((num) => {
      if (sum === num[0]) {
        sum = num[1];
      }
    });
    // console.log(sum);
    if (sum === 100) {
      break;
    } else if (sum > 100) {
      // console.log("sum > 100", sum);
      sum = 1;
      continue;
    } else {
      continue;
    }
  }
  const shorttestPathLength = ShortestPath(board).length;
  console.log(shorttestPathLength);
  if (quickPath.length !== shorttestPathLength) {
    return QuickesPath(board);
  }

  return quickPath;
}

function ShortestPath(board) {
  const visited = new Set();
  const queue = [[1, []]];

  while (queue.length > 0) {
    const [currentPosition, currentPath] = queue.shift();
    if (currentPosition === 100) {
      return currentPath;
    }

    if (visited.has(currentPosition)) {
      continue;
    }

    visited.add(currentPosition);

    for (let dice = 1; dice <= 6; dice++) {
      const nextPosition = currentPosition + dice;
      const ladder = board.ladders.find(
        ([start, end]) => start === nextPosition
      );
      const snake = board.snakes.find(([head, tail]) => head === nextPosition);
      const newPath = [...currentPath, dice];

      if (ladder) {
        queue.push([ladder[1], newPath]);
      } else if (snake) {
        queue.push([snake[1], newPath]);
      } else {
        queue.push([nextPosition, newPath]);
      }
    }
  }

  return [];
}

console.log(
  "randomPath :",
  QuickesPath({
    ladders: [
      [44, 99],
      [60, 88],
    ],
    snakes: [
      [87, 54],
      [91, 48],
      [96, 66],
    ],
  })
);
