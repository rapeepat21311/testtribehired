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
function QuickesPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  const allPath: number[][] = [];
  let sum: number = 1;
  let quickPath: number[] = [];

  for (; sum <= 100; ) {
    let tao = Math.floor(Math.random() * 6) + 1;

    quickPath.push(tao);
    sum += tao;

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
    if (sum >= 100) {
      break;
    }
  }

  if (quickPath.length > 5) {
    return QuickesPath(board);
  }
  {
    return quickPath;
  }
}

function ShortestPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  const visited: Set<number> = new Set();
  const queue: [number, number[]][] = [[1, []]];

  while (queue.length > 0) {
    const [currentPosition, currentPath] = queue.shift()!;
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
  "Shortest Path:",
  ShortestPath({
    ladders: [
      [3, 39],
      [14, 35],
      [31, 70],
      [44, 65],
      [47, 86],
      [63, 83],
      [71, 93],
    ],
    snakes: [
      [21, 4],
      [30, 8],
      [55, 38],
      [79, 42],
      [87, 54],
      [91, 48],
      [96, 66],
    ],
  })
);

console.log(
  "randomPath :",
  QuickesPath({
    ladders: [
      [3, 39],
      [14, 35],
      [31, 70],
      [44, 65],
      [47, 86],
      [63, 83],
      [71, 93],
    ],
    snakes: [
      [21, 4],
      [30, 8],
      [55, 38],
      [79, 42],
      [87, 54],
      [91, 48],
      [96, 66],
    ],
  })
);
