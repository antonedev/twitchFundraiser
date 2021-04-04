var viewport = document.getElementById("viewport");
var alert = document.getElementById("alert");
var chime = document.getElementById("chime");
var source = new EventSource("/alert");

console.log("alert.js loaded");

source.onopen = console.log;
source.onmessage = (e) => {
  viewport.classList.remove("fade-out");
  viewport.classList.add("fade-in");
  void viewport.offsetWidth;

  const newDonation = JSON.parse(e.data);
  const prettyText = formatText(newDonation);
  setText(prettyText);
  chime.play();
  setTimeout(() => {
    viewport.classList.remove("fade-in");
    void viewport.offsetWidth;
    viewport.classList.add("fade-out");
  }, 3500);
};
source.onerror = console.error;

function formatText(dono) {
  let string = `${dono.name} donated ${dono.amount}!`;
  return string;
}

function setText(text) {
  const stringArr = text.split("");
  let html = "<h1>";
  stringArr.forEach((char) => {
    let line = `<span>${char}</span>`;
    if (char === " ") line = "<span class='space'></span>";
    html += line;
  });
  html += "</h1>";
  alert.innerHTML = html;
}
