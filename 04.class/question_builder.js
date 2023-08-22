class QuestionBuilder {
  constructor() {
    this.question = [
      {
        type: "select",
        name: "memo",
        choices: [],
        message: "",
        footer() {},
        result() {},
      },
    ];
  }

  async buildQuestion() {
    throw new Error("Implement me");
  }
}

export class QuestionForShowBuilder extends QuestionBuilder {
  constructor(question) {
    super(question);
  }

  async buildChoice(value, firstLine) {
    const obj = {
      name: firstLine,
      value: value.content,
    };
    return obj;
  }

  async buildQuestion(choices) {
    try {
      this.question[0].message = "Choose a note you want to see:";
      this.question[0].choices = choices;
      this.question[0].footer = function () {
        return "\n" + this.focused.value;
      };
      this.question[0].result = function () {
        return this.focused.value;
      };
      const question = this.question;
      return question;
    } catch (error) {
      console.log(error);
    }
  }
}

export class QuestionForDeleteBuilder extends QuestionBuilder {
  constructor(question) {
    super(question);
  }

  async buildChoice(value, firstLine) {
    const obj = {
      name: value.content,
      message: firstLine,
      value: value.id,
    };
    return obj;
  }

  async buildQuestion(choices) {
    try {
      this.question[0].message = "Choose a note you want to delete:";
      this.question[0].choices = choices;
      this.question[0].footer = function () {
        return "\n" + this.focused.name;
      };
      this.question[0].result = function () {
        return this.focused.value;
      };
      const question = this.question;
      return question;
    } catch (error) {
      console.log(error);
    }
  }
}
