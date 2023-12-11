/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (isNaN(number) || number <= 0)
      throw new Error("number is invalid to divide");
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expr) {
    const validator = /[^+-/*()\d ]/g;
    if (validator.test(expr)) {
      throw new Error(
        `Invalid expression. It found ${expr.match(validator)} in expression.`
      );
    }

    // removing spaces using regular expression
    const space_remover = /[-+/*().\d]/g;
    expr = expr.match(space_remover).join("");

    const operators = [];
    const operands = [];

    const isOperatorStackEmpty = () => operators.length === 0;

    const prec = (op) => {
      if (op === "*" || op === "/") return 2;
      else if (op === "+" || op === "-") return 1;
      else return -1;
    };

    const doOperation = (op, firstOperand, secOperand) => {
      this.clear();
      this.add(firstOperand);
      switch (op) {
        case "-":
          this.subtract(secOperand);
          break;

        case "+":
          this.add(secOperand);
          break;

        case "*":
          this.multiply(secOperand);
          break;

        case "/":
          this.divide(secOperand);
          break;

        default:
          throw new Error(`Invalid opreator ${op}`);
      }
    };

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      console.log(ch);

      // if number
      if (!isNaN(ch)) {
        let number = ch;
        i++;
        while (!isNaN(expr[i]) || expr[i] === ".") {
          number += expr[i];
          i++;
        }
        operands.push(Number(number));
        i--;
      }

      // else if operator or bracket
      else {
        // if open bracket '('
        // then push it to opretors stacks and continue loop
        if (ch === "(") {
          operators.push(ch);
        }

        // else if close bracket ')'
        else if (ch === ")") {
          if (operators.at(-1) === "(")
            throw new Error("no expression inside the brackets");
          while (operators.at(-1) !== "(") {
            // 1. do operations of higher prec operator by poping the operator from stack and poping out two operands from the operands stack.
            const secOperand = operands.pop();
            const firstOperand = operands.pop();
            doOperation(operators.pop(), firstOperand, secOperand);

            // 2. push the result to operands stack.
            operands.push(this.getResult());
          }
          operators.pop();
          continue;
        }

        // else if operator stack is not empty then check prec of top of operators stack
        else {
          console.log(" " + ch);
          while (
            !isOperatorStackEmpty() &&
            prec(ch) <= prec(operators.at(-1))
          ) {
            // 1. do operations of higher prec operator by poping the operator from stack and poping out two operands from the operands stack.
            const secOperand = operands.pop();
            const firstOperand = operands.pop();
            doOperation(operators.pop(), firstOperand, secOperand);

            // 2. push the result to operands stack.
            operands.push(this.getResult());
          }
          operators.push(ch);
        }
      }
    }

    // remaining operation
    while (!isOperatorStackEmpty()) {
      const secOperand = operands.pop();
      const firstOperand = operands.pop();
      doOperation(operators.pop(), firstOperand, secOperand);
      operands.push(this.getResult());
    }
  }
}

module.exports = Calculator;
