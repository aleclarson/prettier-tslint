import { readFileSync, writeFileSync } from "fs";
import runTsLint from "./run-tslint";
import runPrettier from "./run-prettier";
import createIgnorer from "./create-ignorer";

const fix = (filePath, isIgnored = createIgnorer()) => {
  if (isIgnored(filePath)) {
    return null;
  }

  const oldContent = readFileSync(filePath, "utf8");
  const prettierCheck = runPrettier(filePath, true);
  const tslintCheck = runTsLint(filePath, true);
  if (prettierCheck && tslintCheck) {
    return true;
  }

  writeFileSync(filePath, oldContent);
  return false;
};

export default fix;
