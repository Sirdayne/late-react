//подтягивает локализацию из google таблиц и записывает в папку src/game/assets/l10n

const csv = require("csv-parser");
const https = require("https");
const fs = require("fs");
const path = require("path");
const findPackagePath = require("@apis-games-front/find-package-path");

console.log(`\x1b[0;0;m  GAME:\x1b[34;42m${process.env.GAME}\x1b[0;0m`)

const ID = process.env.ID;
const gamePath = findPackagePath(process.env.GAME);
if (!gamePath) {
  throw new Error("не нашел путь к игре с именем " + process.env.GAME);
}

const OUTPUT = path.join(gamePath, "public", "assets", "l10n");

if (!fs.existsSync(OUTPUT)) {
  fs.mkdirSync(OUTPUT);
}

if (ID) {
  const URL = `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?tqx=out:csv`;
  const results = [];

  https.get(URL, (res) => {
    res
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        //очищает директорию
        const clearFolderSync = (p, remove = false) => {
          if (fs.existsSync(p)) {
            fs.readdirSync(p).forEach((file) => {
              const curPath = path.join(p, file);
              if (fs.statSync(curPath).isDirectory()) {
                clearFolderSync(curPath, true);
              } else {
                fs.unlinkSync(curPath);
              }
            });
            if (remove) {
              fs.rmdirSync(p);
            }
          }
        };

        clearFolderSync(OUTPUT);

        Object.keys(results[0])
          .filter((key) => key.length === 2)
          .forEach((local) => {
            const resultObj = {};
            results.forEach((obj) => {
              obj.key.split(".").reduce((accum, key) => {
                if (!accum[key]) {
                  accum[key] = /^[A-Z_0-9]+$/.test(key) ? obj[local] : {};
                }
                return accum[key];
              }, resultObj);
            });
            // console.log(`add locale:${local}`);
            console.log(`\x1b[0;0;m add locale:\x1b[34;42m${local}\x1b[0;0m`)

            fs.writeFileSync(
              path.join(OUTPUT, local + ".json"),
              JSON.stringify(resultObj, null, 4).replace(/\\\\n/g, "\\n")
            );
          });
      });
  });
} else {
  console.error("ID is required");
}
