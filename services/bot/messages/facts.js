const factArray = [
  "Pets In Need was founded as Northern California’s first no-kill shelter in 1965.",
  "The Redwood City location, PIN's first brick and mortar building, focuses on intake from our partner shelters in CA to rescue animals that are at risk of being put down.",
  "The city of Palo Alto selected Pets In Need for the operating contract of it's shelter in 2019. The shelter serves Palo Alto, Los Altos and Los Altos Hills as part of the contract but also rescues animals from partner shelters around Northern California.",
  "As an organization, Pets In Need focuses on helping the most vulnerable populations at shelters: underage kittens and large dogs.",
  "PIN works with partner shelters to help them with the medical and behavioral cases that they do not have the resources for.",
  "The Save Our Kittens program was started to help underage kittens in shelters as they require many resources, including foster homes.",
  "Last year Pets In Need saved over 700 kittens and we hope to save more kittens this year!",
  "The Save Our Kttens program specializes in caring for neonatal kittens that need to be bottle fed around-the-clock.",
  "Kittens (under 3 weeks of age) require bottle feeding every 3-5 hours depending on age.",
  "Pets In Need relies on donations to supply foster homes with kitten milk, high-quality food, toys, and litter.",
  "Cause for Big Paws started in May 2019 to focus on rescuing dogs that are most at-risk for being put down.",
  "Cause for Big Paws started was started because large dogs are typically put down first because they need more resources than a small dog.",
  "PIN has rescued more than 445 large-breed dogs since the start of the Cause for Big Paws program, and we hope to rescue even more this year.",
  "We have some large dogs in need of fur-ever hopes please see our website for more details on adoptable dogs.",
  "The PIN Foster program has grown to over 1,700 families and counting!",
  "Since the pandemic we have utilized foster homes for: medical cases that need specialized care and treatment, behavioral cases that need training and support, and underage animals that need round-the-clock care that cannot be offered in the shelter.",
  "The Camp PIN Pals Summer session is held in person and includes: educational activities, crafts, games, and interaction with our animals!",
  "PIN Pal Virtual Reading Club is a partnership with teachers to bring pets into the virtual classroom!",
  "The PIN Pal Virtual Reading Club was started to give students a chance to practice their reading skills by reading to an adoptable animal!",
  "Last Friday of the month is Mutts and a Movie where kids are invited to our education center for pizza, animal interactions and games.",
];
let index = -1;
const indexOfLastElement = factArray.length - 1;

module.exports = () => {
  if (index < indexOfLastElement) {
    index++;
  } else {
    index = 0;
  }
  return "Did you know: " + factArray[index] + " Visit https://petsinneed.org to learn more.";
};
