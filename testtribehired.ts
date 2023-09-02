// Answer One
function calculateClockAngles(time: string): number {
  const timeParts = time.split(":");

  if (timeParts.length !== 2) {
    throw new Error("Invalid time format. Please use 'hh:mm' format.");
  }

  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  //   console.log(hourAngle, minuteAngle);
  let angleDifference = Math.abs(hourAngle - minuteAngle);
  if (angleDifference > 180) {
    angleDifference = 360 - angleDifference;
  }

  return angleDifference;
}

console.log(calculateClockAngles("9:12"));

// Answer Two
function removeCommonWordInStringArr(strings: string[]): string[] {
  if (strings.length === 0) {
    return [""];
  }

  const length = strings[0].length;
  let longestCommonSubstring = "";
  let longestLength = 0;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j <= length; j++) {
      const substring = strings[0].substring(i, j);
      // console.log({
      //   substring: substring,
      //   i: i,
      //   j: j,
      //   stingLength: strings.length,
      //   //   isCommon: isCommon,
      // });
      let isCommon = true;

      for (let k = 1; k < strings.length; k++) {
        if (!strings[k].includes(substring)) {
          isCommon = false;
          break;
        }
      }

      if (isCommon && substring.length > longestLength) {
        //   console.log({ "117": substring });
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
function findShortestPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  const visited: Set<number> = new Set();
  const queue: [number, number[]][] = [[1, []]];

  while (queue.length > 0) {
    let [currentPosition, currentPath] = queue.shift()!;
    if (currentPosition === 100) {
      return currentPath;
    }

    if (visited.has(currentPosition)) {
      // console.log(visited.has(currentPosition));
      continue;
    }

    visited.add(currentPosition);
    // console.log(visited)
    for (let dice = 1; dice <= 6; dice++) {
      const nextPosition = currentPosition + dice;
      if (currentPosition > 100) {
        console.log("ss");
        return [];
      }
      const ladder = board.ladders.find(
        ([start, end]) => start === nextPosition
      );
      const snake = board.snakes.find(([head, tail]) => head === nextPosition);
      const newPath = [...currentPath, dice];
      // console.log("SRRRR");
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

function QuickesPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  let max: number = 100;
  let quickPath: number[] = [];
  let sum: number = 1;

  while (sum !== 100) {
    const dice = Math.floor(Math.random() * 6) + 1;

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
    if (sum > 100) {
    }
    if (sum === 100) {
      if (quickPath.length <= findShortestPath(board).length) {
        return quickPath;
      } else {
        sum = 1;
        quickPath = [];
      }
    } else if (sum > 100) {
      // console.log({ quickPath: quickPath, sum: sum });
      sum -= dice;
      quickPath.push(dice);
      if (quickPath.length <= findShortestPath(board).length) {
        return quickPath;
      } else {
        sum = 1;
        quickPath = [];
      }
      // console.log({ quickPath1: quickPath, sum1: sum });
    }
  }
  return [];
}

console.log(
  "quickerPath :",
  QuickesPath({
    ladders: [
      [11, 32],
      [29, 41],
      [59, 88],
    ],
    snakes: [
      [97, 7],
      [83, 2],
      [65, 99],
    ],
  })
);
