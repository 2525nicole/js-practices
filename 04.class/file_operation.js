import * as fs from "node:fs/promises";
import { access, constants } from "node:fs/promises";

export class FileOperation {
  constructor(destinationFile) {
    this.destinationFile = destinationFile;
  }

  set writeTarget(content) {
    this._writeTarget = content;
  }

  async checkExistence() {
    try {
      await access(this.destinationFile, constants.F_OK);
    } catch (error) {
      this._writeTarget = { memos: [] };
      await this.write();
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

  async write() {
    try {
      this._writeTarget = JSON.stringify(this._writeTarget);
      await fs.writeFile(this.destinationFile, this._writeTarget, "utf8");
    } catch (error) {
      console.log(error);
    }
  }
}
