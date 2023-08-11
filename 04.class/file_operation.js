import * as fs from "node:fs/promises";
import { access, constants } from "node:fs";

export class FileOperation {
  constructor(destinationFile) {
    this.destinationFile = destinationFile;
  }

  set writeTarget(content) {
    this._writeTarget = content;
  }

  async checkExistence() {
    access(this.destinationFile, constants.F_OK, (error) => {
      if (error) {
        this.writeTarget = '{ "memos": [] }';
        this.write();
      }
    });
  }

  async read() {
    try {
      let content = await fs.readFile(this.destinationFile, "utf8");
      content = JSON.parse(content);
      return content;
    } catch (error) {
      console.log(error);
    }
  }

  write() {
    try {
      this._writeTarget = JSON.stringify(this._writeTarget);
      fs.writeFile(this.destinationFile, this._writeTarget, "utf8");
    } catch (error) {
      console.log(error);
    }
  }
}
