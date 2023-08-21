class QuestionsBuilder {
  constructor(memoElement) {
    this.memoElement = memoElement;
    this.questions = [
      {
        type: "select",
        name: "memo",
        choices: this.memoElement,
        message: "",
        footer() {},
        result() {},
      },
    ];
  }

  async buildQuestions() {
    try {
      const questions = this.questions;
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
}

export class QuestionsForShowBuilder extends QuestionsBuilder {
  constructor(questions) {
    super(questions);
  }

  async buildQuestions() {
    try {
      this.questions[0].message = "Choose a note you want to see:";
      this.questions[0].footer = function () {
        return "\n" + this.focused.value;
      };
      this.questions[0].result = function () {
        return this.focused.value;
      };
      const questions = this.questions;
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
}

export class QuestionsForDeleteBuilder extends QuestionsBuilder {
  constructor(questions) {
    super(questions);
  }

  async buildQuestions() {
    try {
      this.questions[0].message = "Choose a note you want to delete:";
      this.questions[0].footer = function () {
        return "\n" + this.focused.name;
      };
      this.questions[0].result = function () {
        return this.focused.value;
      };
      const questions = this.questions;
      return questions;
    } catch (error) {
      console.log(error);
    }
  }
}
