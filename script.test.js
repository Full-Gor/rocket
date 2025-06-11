const { expect } = require("@jest/globals");

document.body.innerHTML = `
  <div id="score">0</div>
  <button id="clicker">Click me!</button>
`;

test("Le score augmente après un clic", () => {
  let score = 0;
  const button = document.getElementById("clicker");

  button.addEventListener("click", () => {
    score++;
    document.getElementById("score").innerText = score;
  });

  button.click();
  expect(document.getElementById("score").innerText).toBe("1");
});
