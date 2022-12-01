import * as shell from "shelljs";

async function createDirs(){
    await shell.mkdir("dist");
    await shell.mkdir("dist/services/");
    shell.cp("-R", "src/services/fonts/", "dist/services/");
    shell.cp("-R", "src/services/tarots/", "dist/services/");
}

createDirs();
