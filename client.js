const fetch = require("node-fetch");

async function fetchRootDirectory() {
  const res1 = await fetch(`http://localhost:3001/`);
  const data1 = await res1.json();

  console.log(data1);
  return data1;
}

let allItems = [];
async function fetchAllFilesInsideDir(data1) {
  let allPromises = [];
  for (let i = 0; i < data1.items.length; i++) {
    const res = fetch(`http://localhost:3001/${data1.items[i].name}`);
    allPromises.push(res);
  }

  const temp = await Promise.all(allPromises);
  for (let i = 0; i < temp.length; i++) {
    const data = await temp[i].json();
    allItems.push(data);
  }
  // console.log(allItems);
  let allFilesNamesInsideDir = [];
  allItems.forEach((item) => {
    if (item.isDir === true) {
      for (let i = 0; i < item.files.length; i++) {
        allFilesNamesInsideDir.push(item.files[i].name);
      }
    }
  });

  console.log(allFilesNamesInsideDir);
  return allFilesNamesInsideDir;
}

async function printAllFiles(allFilesNamesInsideDir) {
  allItems.forEach((item) => {
    if (item.isDir === false) {
      console.log(item.name);
    }
  });

  allFilesNamesInsideDir.forEach((files) => {
    console.log(files);
  });
}

async function main() {
  const data1 = await fetchRootDirectory();

  const allFilesNamesInsideDir = await fetchAllFilesInsideDir(data1);

  await printAllFiles(allFilesNamesInsideDir, allItems);
}

main();
