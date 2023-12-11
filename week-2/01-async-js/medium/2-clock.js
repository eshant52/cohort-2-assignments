// hh:mm:ss am and pm or 24hr

function counter(fn) {
  let count = 0;
  setInterval(() => {
    console.log(fn({hour12: false}))
    console.log(fn({ hour12: true }));
    count++;
  }, 1000);
}

function showTime(format) {
  const time = new Date();
  return time.toLocaleTimeString([], format)
}

counter(showTime);