let startTime = 0;
let currTime = 0;

document.getElementById("start-button").onclick = function()
{
  startTime = Number(document.getElementById("text-box").value);
  document.getElementById("clock-text").innerHTML = startTime;
  currTime = startTime;
  console.log(startTime);
}