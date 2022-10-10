import _ from 'lodash';

const pixelOffsets = {
  medals: [5, 131],
  mysticgate: [65, 112],
  numbers: {
    score: [155, 116, 10],
    lvl: [525, 20, 3],
    lvlold: [482, 16, 3], // This has changed position recently(!!)
    lvloldfrozen: [500, 16, 3], // ...
    hp: [485, 43, 9],
    hpmulti: [576, 43, 5],
    hpbar: [485, 36, 9],
    hpmultibar: [576, 36, 5],
    atk: [515, 68, 6],
    atkold: [515, 67, 6],
    def: [515, 92, 6],
    defold: [515, 91, 6],
    expmulti: [576, 117, 5],
    stonesused: [20, 116, 4],
  },
};

const pixelOffsetsNew = {
  usedString: [9, 143],
  medals: [104, 136],
  mysticgate: [65, 97],
  numbers: {
    score: [155, 101, 10],
    lvl: [525, 20, 3],
    hp: [485, 43, 9],
    hpmulti: [576, 43, 5],
    hpbar: [485, 36, 9],
    hpmultibar: [576, 36, 5],
    atk: [515, 68, 6],
    def: [515, 92, 6],
    expmulti: [576, 117, 5],
    stonesused: [55, 138, 4],
  },
};

const magicPixelOffsets = {
  medal: [4, 6],
  mysticgate: [[6, 9], [13, 6]],
  digit: [[7, 0], [2, 1], [7, 7], [7, 13], [6, 3], [4, 5]],
  usedString: [[0, 0], [8, 8], [12, 3], [23, 4], [26, 1]],
};

const medalMagicPixels = {
  bronze: [207, 139, 99],
  silver: [227, 227, 227],
  gold: [245, 211, 52],
  platinum: [245, 245, 244],
  diamond: [166, 199, 219],
  moon: [6, 6, 6],
};

const charMagicPixels = {
  0: [false, true, false, false, false, false],
  1: [false, false, false, true, true, false],
  2: [true, false, true, true, false, true],
  3: [true, false, true, true, true, true],
  4: [true, false, false, true, false, true],
  5: [true, false, false, false, true, false],
  6: [false, false, false, false, true, false],
  7: [true, false, true, false, true, false],
  8: [false, true, false, false, true, true],
  9: [false, true, false, false, false, true],
};

const mysticGateMagixPixels = [[255, 165, 133], [142, 255, 102]];

function getPixelAt(imgData, x, y, width) {
  const offset = (y * width + x) * 4;
  return [imgData.data[offset], imgData.data[offset + 1], imgData.data[offset + 2]];
}

function pixelIsClose(pixel, target, threshold = 50) {
  /* Do sum of squares approximation */
  const diff = (pixel[0] - target[0]) * (pixel[0] - target[0]) + (pixel[1] - target[1]) * (pixel[1] - target[1]) + (pixel[2] - target[2]) * (pixel[2] - target[2]);
  return diff <= threshold;
}

function parseMedal(ctx, xoff, yoff) {
  const imgData = ctx.getImageData(xoff, yoff, 16, 16);
  const magicPixel = getPixelAt(imgData, magicPixelOffsets.medal[0], magicPixelOffsets.medal[1], 16);
  let parsedMedal = null;
  _.each(medalMagicPixels, (target, medal) => { if (pixelIsClose(magicPixel, target)) parsedMedal = medal; });
  return parsedMedal;
}

function parseMedals(ctx) {
  const offsets = pixelOffsets.medals;
  const medals = [];
  let medal;
  for (let j = 0; j < 2; j += 1) {
    for (let i = 0; i < 20; i += 1) {
      medal = parseMedal(ctx, offsets[0] + 16 * i, offsets[1] + 16 * j);
      if (medal) medals.push(medal);
    }
  }
  return _.countBy(medals);
}

function parseGate(ctx, xOff, yOff) {
  const imgData = ctx.getImageData(xOff, yOff, 20, 20);
  const magicPixel1 = getPixelAt(imgData, magicPixelOffsets.mysticgate[0][0], magicPixelOffsets.mysticgate[0][1], 20);
  const magicPixel2 = getPixelAt(imgData, magicPixelOffsets.mysticgate[1][0], magicPixelOffsets.mysticgate[1][1], 20);
  return pixelIsClose(magicPixel1, mysticGateMagixPixels[0]) && pixelIsClose(magicPixel2, mysticGateMagixPixels[1]);
}

function parseChar(ctx, xoff, yoff) {
  const imgData = ctx.getImageData(xoff, yoff, 10, 14);
  const matches = [];
  let magicPixel;
  _.each(magicPixelOffsets.digit, (coords) => {
    magicPixel = getPixelAt(imgData, coords[0], coords[1], 10);
    matches.push(pixelIsClose(magicPixel, [6, 6, 6]));
  });
  let parsedChar = '';
  _.each(charMagicPixels, (target, char) => { if (matches.every((value, index) => value === target[index])) parsedChar = char; });
  return parsedChar;
}

function parseNumber(ctx, xoff, yoff, length = 1) {
  let parsed = '';
  for (let i = 0; i < length; i += 1) {
    parsed += parseChar(ctx, xoff + 10 * i, yoff);
  }
  if (parsed) return parseInt(parsed, 10);
  return null;
}

function parseMedalsNew(ctx) {
  const offsets = pixelOffsetsNew.medals;
  const medals = {};
  let medal;
  let medalCount;
  for (let i = 0; i < 8; i += 1) {
    medal = parseMedal(ctx, offsets[0] + 30 * i, offsets[1]);
    if (medal) {
      medalCount = parseNumber(ctx, offsets[0] + 30 * i + 6, offsets[1] + 1, 2);
      medals[medal] = medalCount;
    }
  }

  return medals;
}

function loadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        resolve(reader.result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

function calcSourceRect(image) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  /* This is a lot of pure guesswork, try to find the window as best as we can */
  const scale = Math.floor(width / 640);
  const xoff = Math.floor(width - scale * 640) / 2;
  /* Asume border is same thickness also at the bottom */
  const yoff = height - (xoff + scale * 480);
  /* ToDo try to locate window in case of a snipping tool grab that's offcenter */
  return [xoff, yoff, 640 * scale, 480 * scale];
}

function drawOntoCanvas(rawFile, ctx) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = async () => {
      try {
        ctx.drawImage(image, ...calcSourceRect(image), 0, 0, 640, 480);
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    image.src = rawFile;
  });
}

function checkScoreLayoutVersion(ctx) {
  const imgData = ctx.getImageData(pixelOffsetsNew.usedString[0], pixelOffsetsNew.usedString[1], 28, 8);

  const matches = [];
  let magicPixel;
  _.each(magicPixelOffsets.usedString, (coords) => {
    magicPixel = getPixelAt(imgData, coords[0], coords[1], 10);
    matches.push(pixelIsClose(magicPixel, [6, 6, 6]));
  });
  const layoutVersion = matches.every((value) => value) ? 'new' : 'old';

  return layoutVersion;
}

export async function parseScreenshot(file) {
  const rawFile = await loadFile(file);

  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;

  const context = canvas.getContext('2d');
  await drawOntoCanvas(rawFile, context);

  const layoutVersion = checkScoreLayoutVersion(context);
  let medals;
  let mysticgate;
  let numbers;

  if (layoutVersion === 'new') {
    medals = parseMedalsNew(context);
    numbers = _.cloneDeep(pixelOffsetsNew).numbers;
    _.each(pixelOffsetsNew.numbers, (value, key) => { numbers[key] = parseNumber(context, ...value); });
    mysticgate = parseGate(context, pixelOffsetsNew.mysticgate[0], pixelOffsetsNew.mysticgate[1]);
  } else {
    medals = parseMedals(context);
    numbers = _.cloneDeep(pixelOffsets).numbers;
    _.each(pixelOffsets.numbers, (value, key) => { numbers[key] = parseNumber(context, ...value); });
    mysticgate = parseGate(context, pixelOffsets.mysticgate[0], pixelOffsets.mysticgate[1]);
    numbers.lvl = numbers.lvl || numbers.lvlold || numbers.lvloldfrozen;
    numbers.atk = Math.max(numbers.atk, numbers.atkold); // some numbers match in both offsets, but the correct one is almost guaranteed to be larger
    numbers.def = Math.max(numbers.def, numbers.defold);
  }

  const ret = {
    medals,
    score: numbers.score || 0,
    lvl: numbers.lvl || 1,
    atk: numbers.atk,
    def: numbers.def,
    hp: Math.max(numbers.hp, numbers.hpbar) || 0, // some numbers match in both offsets, but the correct one is almost guaranteed to be larger
    stonesused: numbers.stonesused || 0,
    hpMulti: Math.max(numbers.hpmulti, numbers.hpmultibar) || 100,
    expMulti: numbers.expmulti || 100,
    mysticgate,
  };
  return ret;
}

const IMGUR_CLIENT = '67e21e819d6df7c';

export async function uploadScreenshot(file) {
  if (!file) return null;
  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('type', 'file');
  const payload = {
    method: 'post',
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT}`,
    },
    body: formdata,
  };
  try {
    const imgurResponse = await fetch('https://api.imgur.com/3/image/', payload);
    return JSON.parse(await imgurResponse.text()).data.link;
  } catch (e) {
    console.error(e);
  }
  return null;
}
