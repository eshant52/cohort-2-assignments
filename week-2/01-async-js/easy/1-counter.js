module.exports = function counter() {
  let count = 0;
  setInterval(() => {
    console.log(count);
    count++;
  }, 1000);
}

counter();
