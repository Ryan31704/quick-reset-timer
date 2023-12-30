let startTime = 0;
let now = 0;
let countDownDate = 0;

document.getElementById("reset-button").onclick = function()
{
  now = new Date().getTime();
  //grabs from text box on start
  startTime = Number(document.getElementById("text-box").value);
  //changes text on page
  document.getElementById("clock-text").innerHTML = startTime;
  //calculates date to count to
  countDownDate = new Date().getTime() + (1000 * startTime) + 1000
  countDown();
}

function countDown()
{
  setInterval(() => {
    now = new Date().getTime();
    timeleft = countDownDate - now;
    let seconds = Math.floor(timeleft / 1000);
    document.getElementById("clock-text").innerHTML = seconds;
    console.log(seconds);
    if(timeleft < 0)
    {
      clearInterval();
      document.getElementById("clock-text").innerHTML = 0;
    }
}, 1000);
}