import minimist from "minimist";
const options = minimist(process.argv.slice(2));
import { MemoProcessing } from "./memo_processing.js";

class MemoApp {
  constructor(destinationFile) {
    this.destinationFile = destinationFile;
  }

  exec() {
    try {
      const memo_processing = new MemoProcessing(this.destinationFile);
      const validOptionsCount = 2;

      if (Object.keys(options).length > validOptionsCount) {
        console.log("一度で指定可能なオプションは一つです。");
      } else if (options.l) {
        memo_processing.displayFirsLine();
      } else if (options.r || options.d) {
        memo_processing.displayOrDeleteMemos();
      } else if (Object.keys(options).length === validOptionsCount) {
        console.log("入力されたオプションは無効です。");
      } else {
        memo_processing.addNewMemo();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const memoApp = new MemoApp("./memos.json");
memoApp.exec();
