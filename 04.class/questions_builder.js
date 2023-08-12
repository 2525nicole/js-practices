export class QuestionsBuilder {
  constructor(memoElement, options) {
    this.memoElement = memoElement;
    this.options = options;
  }

  async buildQuestions() {
    try {
      const options = this.options;
      const message = await this.#determineMessage(this.options);
      const questions = [
        {
          type: "select",
          name: "memo",
          message: message,
          choices: this.memoElement,
          footer() {
            if (options.r) {
              return "\n" + this.focused.value;
            } else if (options.d) {
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

  async #determineMessage(options) {
    try {
      if (options.r) {
        return "Choose a note youwant to see:";
      } else if (options.d) {
        return "Choose a note you want to delete:";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
