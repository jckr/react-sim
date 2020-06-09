const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (!fs.existsSync('./screenshots')) {
    fs.mkdirSync('./screenshots');
  }
  if (!fs.existsSync('./src/images/thumbnails')) {
    fs.mkdirSync('./src/images/thumbnails');
  }
  if (!fs.existsSync('./src/images/gifs')) {
    fs.mkdirSync('./src/images/gifs');
  }
  const examples = {
    activators: { max: 30 },
    automata: { min: 35, max: 65 },
    boids: { max: 200 },
    'chaos-game': { max: 5000 },
    dice: {},
    epidemic: { min: 1, max: 100 },
    fibonacci: { max: 15 },
    'game-of-life': {},
    maze: { max: 250 },
    percolation: { max: 30 },
    segregation: {},
    'simple-model': { max: 100 },
    snake: {},
  };

  const example = process.argv[2];
  if (example === undefined) {
    Object.keys(examples).forEach(processExample);
  } else {
    processExample(example);
  }

  async function createGif(example) {
    console.log(`creating gif for ${example}...`);
    process.chdir(`./screenshots/${example}`);
    const files = fs.readdirSync('.');
    const firstImage = files.find(f => f.endsWith('png'));
    const commands = [
      `convert ${firstImage} palette.gif`,
      `convert -dither none -remap palette.gif *.png ${example}-uncompressed.gif`,
      `gifsicle --optimize=3 --delay=2 --resize 150x150 < ${example}-uncompressed.gif > ${example}.gif`,
      `cp ${example}-uncompressed.gif ../../src/images/gifs/${example}.gif`,
      `cp ${firstImage} ../../src/images/thumbnails/${example}.png`,
    ];
    await exec(commands.join(' && '));
    process.chdir(`../..`);
    console.log('done');
    return true;
  }

  async function processExample(example) {
    console.log(`Now processing ${example}.`);
    if (!fs.existsSync(`./screenshots/${example}`)) {
      fs.mkdirSync(`./screenshots/${example}`);
      exec(`rm ./screenshots/${example}/*.*`);
    }

    await page.goto(`http://localhost:8000/fullsize?${example}`, {
      waitUntil: 'domcontentloaded',
    });
    const { min = 0, max = 50 } = examples[example];

    async function handleConsole(msg) {
      const arg = msg.args();
      const arg0 = arg[0] || {};
      const remoteObject = arg0['_remoteObject'] || {};
      const value = remoteObject.value;
      if (!isNaN(Number(value))) {
        console.log(value);
        const index = String(value).padStart(4, '0');
        if (value >= min) {
          await page.screenshot({
            path: `./screenshots/${example}/${index}.png`,
            type: 'png',
            clip: { x: 0, y: 0, width: 332, height: 332 },
          });
        }
        if (value >= max) {
          page.removeListener('console', handleConsole);
          createGif(example);
        }
      }
    }

    page.on('console', handleConsole);
  }
})();
