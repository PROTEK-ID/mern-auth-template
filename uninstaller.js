const { execSync } = require("child_process");
const devDependencies = require("./server/build/package.json").devDependencies;
for (const [packageName, version] of Object.entries(devDependencies)) {
  console.log(`Uninstalling ${packageName}@${version}...`);
  try {
    uninstall(packageName, version).then((isSuccess) => console.log(isSuccess));
  } catch (error) {
    break;
  }
}

function uninstall(package, version) {
  return new Promise((resolve, reject) => {
    try {
      const stdout = execSync(
        `npm uninstall -D ${package} --prefix server/build`,
        { encoding: "utf8" }
      );
      resolve(stdout);
    } catch (error) {
      reject(error);
    }
  });
}
