let startTime = 0;
let now = 0;
let countDownDate = 0;
let endSound = new Audio("end.mp3")
let countDownSound = new Audio("countdown.mp3")
let timeleft = 0

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
  let counting = setInterval(() => {
    now = new Date().getTime();
    timeleft = countDownDate - now;
    let seconds = Math.floor(timeleft / 1000);
    document.getElementById("clock-text").innerHTML = seconds;
    // console.log(seconds);
    if(seconds <= 3 && seconds > 2)
      countDownSound.play();
    if(timeleft < 1000)
      endSound.play();
    if(timeleft < 0)
    {
      document.getElementById("clock-text").innerHTML = 0;
      clearInterval(counting);
    }
}, 1000);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}
