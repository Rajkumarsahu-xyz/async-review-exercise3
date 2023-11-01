const express = require("express");
const app = express();
const port = 3001;

const dirStructure = [
  {
    name: "file1",
    isDir: false,
  },
  {
    name: "dir1",
    isDir: true,
    files: [
      {
        name: "file2",
        isDir: false,
      },
      {
        name: "file3",
        isDir: false,
      },
      {
        name: "file4",
        isDir: false,
      },
    ],
  },
  {
    name: "dir2",
    isDir: true,
    files: [
      {
        name: "file5",
        isDir: false,
      },
      {
        name: "file6",
        isDir: false,
      },
      {
        name: "file7",
        isDir: false,
      },
    ],
  },
  {
    name: "file8",
    isDir: false,
  },
  {
    name: "file9",
    isDir: false,
  },
];

app.get("/", (req, res) => {
  const items = dirStructure.map((item) => ({
    name: item.name,
    isDir: item.isDir,
  }));
  res.json({ items });
});

app.get("/:dir", (req, res) => {
  const { dir } = req.params;
  const item = dirStructure.filter((item) => item.name === dir);
  // console.log(item[0].files);

  res.json({
    name: item[0].name,
    isDir: item[0].isDir,
    files: item[0].files
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
