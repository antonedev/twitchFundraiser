var bar = document.getElementById("progress-bar");
var span = document.getElementById("span");

var source = new EventSource("/meter");

var percent = 0;
var textPercent = "0%";

console.log("meter.js loaded");

source.onopen = console.log;
source.onmessage = (e) => {
  bar.classList.remove("shine");
  void bar.offsetWidth;
  const funds = JSON.parse(e.data);
  console.log(funds);
  const percentDecimal = funds.total ? funds.total / funds.target : 0;
  percent = percentDecimal * 100;
  textPercent = `${percent.toFixed(0)}%`;
  if (percent > 100) percent = 100;
  if (percent >= 100) bar.classList.add("glow");
  if (percent < 7) percent = 7;
  bar.classList.add("shine");
  console.log(textPercent);
  span.setAttribute("style", `width:${percent.toFixed(2)}%`);
  span.innerText = `$${parseFloat(funds.total).toFixed(2)}`;
};
source.onerror = console.error;
