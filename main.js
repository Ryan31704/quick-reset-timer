let startTime = 0;

document.getElementById("start-button").onclick = function()
{
  startTime = Number(document.getElementById("text-box").value);
  document.getElementById("clock-text").innerHTML = startTime;
  console.log(startTime);
}