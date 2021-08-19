import { promises as fs } from "fs";
import * as path from "path";
import { Dirent } from "fs";
import NodeResolve from "@esbuild-plugins/node-resolve";
import { build } from "esbuild";

type FileTreeNode = {
  filepath: string;
  file: Dirent;
};

const srcPath = "src";

const recursivelyBuildFileTree = async (filepath = srcPath): Promise<FileTreeNode[]> => {
  const fpath = filepath !== srcPath ? path.join(srcPath, filepath) : filepath;
  const dir = await fs.readdir(fpath, {
    withFileTypes: true,
  });

  let files = [];
  for (const file of dir) {
    if (file.isDirectory()) {
      files = files.concat(await recursivelyBuildFileTree(file.name));
    } else {
      files.push({ filepath: fpath, file });
    }
  }

  return files;
};

const endsWith = ["spec.ts"];
const excluded = ["jestSetup.ts"];

const outExcluded = (f: FileTreeNode) =>
  !endsWith.map((ew) => f.file.name.endsWith(ew)).some(Boolean) && !excluded.includes(f.file.name);

const exec = async () => {
  const filesArr = await recursivelyBuildFileTree();
  const cleanFiles = filesArr.filter(outExcluded);
  const entryPoints = cleanFiles.map((f) => path.join(f.filepath, f.file.name));

  build({
    entryPoints,
    outdir: "esbuild",
    platform: "node",
    target: "es6",
    format: "cjs",
    sourcemap: "external",
    plugins: [
      NodeResolve({
        extensions: [".ts"],
        onResolved: (resolved) => {
          if (resolved.includes("node_modules")) {
            return {
              external: true,
            };
          }
          return resolved;
        },
      }),
    ],
  });
};

exec();
