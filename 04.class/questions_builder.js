// import minimist from "minimist";
// const options = minimist(process.argv.slice(2));

export class QuestionsBuilder {
  constructor(memoElement, options) {
    this.memoElement = memoElement;
    this.options = options;
  }

  async #buildMessage() {
    try {
      // if (options.r) {
      if (this.options.r) {
        const message = "Choose a note youwant to see:";
        return message;
        // } else if (options.d) {
      } else if (this.options.d) {
        const message = "Choose a note you want to delete:";
        return message;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async buildQuestions() {
    try {
      const message = await this.#buildMessage();
      const questions = [
        {
          type: "select",
          name: "memo",
          message: message,
          choices: this.memoElement,
          footer() {
            // if (options.r) {
            if (this.options.r) {
              return "\n" + this.focused.value;
              // } else if (options.d) {
            } else if (this.options.d) {
              return "\n" + this.focused.name;
            }
          },
          result() {
            return this.focused.value;
          },
        },
      ];
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
}
