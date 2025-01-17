import * as readline from "node:readline/promises";
import crypto from "node:crypto";
import enquirer from "enquirer";
const { prompt } = enquirer;
import { FileOperation } from "./file_operation.js";
import {
  QuestionForShowBuilder,
  QuestionForDeleteBuilder,
} from "./question_builder.js";

export class MemoProcessing {
  constructor(destinationFile, options) {
    this.destinationFile = destinationFile;
    this.options = options;
  }

  async addNewMemo() {
    try {
      const file = new FileOperation(this.destinationFile);

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
      file.write(allMemos);
    } catch (error) {
      console.log(error);
    }
  }

  async displayFirstLines() {
    const processingMemoElements = [];
    try {
      const allMemos = await this.#readAllMemos();
      await allMemos.memos.forEach(async (value) => {
        const firstLine = await this.#generateFirstLine(value);
        processingMemoElements.push(firstLine);
      });

      if (processingMemoElements.length === 0) {
        console.log("メモの登録はありません");
        return;
      } else {
        for (const value of processingMemoElements) {
          console.log(value);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async displayMemos() {
    try {
      const choices = [];
      const allMemos = await this.#readAllMemos();
      let question = new QuestionForShowBuilder(allMemos.memos);
      await allMemos.memos.forEach(async (value) => {
        const firstLine = await this.#generateFirstLine(value);
        let choice = await question.buildChoice(value, firstLine);
        choices.push(choice);
        return choices;
      });

      if (allMemos.memos.length === 0) {
        console.log("メモの登録はありません");
        return;
      }
      question = await question.buildQuestion(choices);
      const answer = await prompt(question);
      console.log(answer.memo);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMemo() {
    try {
      const choices = [];
      const allMemos = await this.#readAllMemos();
      let question = new QuestionForDeleteBuilder(allMemos.memos);

      await allMemos.memos.forEach(async (value) => {
        const firstLine = await this.#generateFirstLine(value);
        let choice = await question.buildChoice(value, firstLine);
        choices.push(choice);
        return choices;
      });

      if (allMemos.memos.length === 0) {
        console.log("メモの登録はありません");
        return;
      }
      question = await question.buildQuestion(choices);
      const answer = await prompt(question);
      this.#executeDeletion(answer.memo);
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

  async #generateFirstLine(memo) {
    const firstLine =
      memo.content.substring(0, memo.content.indexOf("\n")) || memo.content;
    return firstLine;
  }

  async #executeDeletion(deleteTarget) {
    const file = new FileOperation(this.destinationFile);
    try {
      const allMemos = await this.#readAllMemos();
      const afterDeleteMemos = allMemos.memos.filter(function (memo) {
        return memo.id !== deleteTarget;
      });
      const obj = { memos: [] };
      obj.memos = afterDeleteMemos;
      file.write(obj);
      console.log("メモを削除しました。");
    } catch (error) {
      console.log(error);
    }
  }
}
