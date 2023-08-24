import * as fs from "node:fs/promises";
import { access, constants } from "node:fs/promises";

export class FileOperation {
  constructor(destinationFile) {
    this.destinationFile = destinationFile;
  }

  async checkExistence() {
    try {
      await access(this.destinationFile, constants.F_OK);
    } catch (error) {
      await this.write({ memos: [] });
    }
  }

  async read() {
    try {
      await this.checkExistence();
      let content = await fs.readFile(this.destinationFile, "utf8");
      content = JSON.parse(content);
      return content;
    } catch (error) {
      console.log(error);
    }
  }

  async write(writeTarget) {
    try {
      writeTarget = JSON.stringify(writeTarget);
      await fs.writeFile(this.destinationFile, writeTarget);
    } catch (error) {
      console.log(error);
    }
  }
}
