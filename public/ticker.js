var viewport = document.getElementById("viewport");
var ticker = document.getElementById("ticker");
var source = new EventSource("/ticker");

console.log("ticker.js loaded");

source.onopen = console.log;
source.onmessage = (e) => {
  ticker.classList.add("fade-out");
  ticker.classList.remove("marquee");
  void ticker.offsetWidth;

  const recentDonations = JSON.parse(e.data);
  console.log("recent donations:", recentDonations);
  const prettyText = formatText(recentDonations);
  const duration = prettyText.length / 2;
  setText(prettyText);
  setTimeout(() => {
    ticker.style["animation-duration"] = `${duration}s`;
    ticker.classList.add("marquee");
    ticker.classList.remove("fade-out");
  }, 4100);
};
source.onerror = console.error;

function formatText(recentDonations) {
  let wholeString = "Recent Donors  --  ";
  if (recentDonations.length === 0) wholeString = "";

  recentDonations.forEach((donation) => {
    let string = `${donation.name}  --  `;
    wholeString += string;
  });
  wholeString += "Type #donate in chat for more information!";
  return wholeString;
}

function setText(text) {
  ticker.innerText = text;
}
