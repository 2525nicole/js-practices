import * as readline from "node:readline/promises";
import crypto from "node:crypto";
import enquirer from "enquirer";
const { prompt } = enquirer;
import { FileOperation } from "./file_operation.js";
import { QuestionsBuilder } from "./questions_builder.js";

export class MemoProcessing {
  constructor(destinationFile, options) {
    this.destinationFile = destinationFile;
    this.options = options;
  }

  async addNewMemo() {
    try {
      const file = new FileOperation(this.destinationFile);
      file.checkExistence();

      let lines = [];
      const newMemoContent = [];
      const rl = readline.createInterface(process.stdin);
      rl.on("line", (line) => {
        lines.push(line);
      });
      rl.on("close", () => {
        lines = lines.join("\n");
        newMemoContent.push(lines);
        const memoId = crypto.randomUUID();
        const newMemoObj = { id: memoId, content: newMemoContent[0] };
        this.#saveMemos(newMemoObj, file);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async #saveMemos(newMemoObj, file) {
    try {
      const allMemos = await this.#readAllMemos();
      allMemos.memos.push(newMemoObj);
      file.writeTarget = allMemos;
      file.write();
    } catch (error) {
      console.log(error);
    }
  }

  async displayFirsLine() {
    try {
      const firstLines = await this.#generateProcessingMemoElements(
        this.options
      );
      for (const value of firstLines) {
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async displayOrDeleteMemos() {
    try {
      const processingMemoElements = await this.#generateProcessingMemoElements(
        this.options
      );
      let questions = new QuestionsBuilder(
        processingMemoElements,
        this.options
      );
      questions = await questions.buildQuestions();
      const answer = await prompt(questions);
      if (this.options.r) {
        console.log(answer.memo);
      } else if (this.options.d) {
        this.#deleteMemo(answer.memo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #generateProcessingMemoElements(options) {
    try {
      const processingMemoElements = [];
      const allMemos = await this.#readAllMemos();
      allMemos.memos.forEach(function (value) {
        const firstLine =
          value.content.substring(0, value.content.indexOf("\n")) ||
          value.content;
        if (options.l) {
          processingMemoElements.push(firstLine);
        } else if (options.r) {
          const obj = {
            name: firstLine,
            value: value.content,
          };
          processingMemoElements.push(obj);
        } else if (options.d) {
          const obj = {
            name: value.content,
            message: firstLine,
            value: value.id,
          };
          processingMemoElements.push(obj);
        }
      });
      return processingMemoElements;
    } catch (error) {
      console.log(error);
    }
  }

  async #deleteMemo(deleteTarget) {
    const file = new FileOperation(this.destinationFile);
    try {
      const allMemos = await this.#readAllMemos();
      const afterDeleteMemos = allMemos.memos.filter(function (memo) {
        return memo.id !== deleteTarget;
      });
      const obj = { memos: [] };
      obj.memos = afterDeleteMemos;
      file.writeTarget = obj;
      file.write();
      console.log("メモを削除しました。");
    } catch (error) {
      console.log(error);
    }
  }

  async #readAllMemos() {
    try {
      const file = new FileOperation(this.destinationFile);
      const allMemos = await file.read();
      return allMemos;
    } catch (error) {
      console.log(error);
    }
  }
}
