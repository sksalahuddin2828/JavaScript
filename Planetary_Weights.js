const MERCURY_GRAVITY = 0.376;
const VENUS_GRAVITY = 0.889;
const MARS_GRAVITY = 0.378;
const JUPITER_GRAVITY = 2.36;
const SATURN_GRAVITY = 1.081;
const URANUS_GRAVITY = 0.815;
const NEPTUNE_GRAVITY = 1.14;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isValidPlanet(planet) {
  const validPlanets = [
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];
  return validPlanets.includes(planet);
}

function calculatePlanetWeight(earthWeight, planet) {
  switch (planet) {
    case "Mercury":
      return earthWeight * MERCURY_GRAVITY;
    case "Venus":
      return earthWeight * VENUS_GRAVITY;
    case "Mars":
      return earthWeight * MARS_GRAVITY;
    case "Jupiter":
      return earthWeight * JUPITER_GRAVITY;
    case "Saturn":
      return earthWeight * SATURN_GRAVITY;
    case "Uranus":
      return earthWeight * URANUS_GRAVITY;
    case "Neptune":
      return earthWeight * NEPTUNE_GRAVITY;
    default:
      return 0;
  }
}

function main() {
  const earthWeight = parseFloat(prompt("Enter a weight on Earth:"));
  let planet = prompt("Enter a planet:");
  planet = capitalize(planet);

  while (!isValidPlanet(planet)) {
    if (planet === "Earth") {
      alert("Please select a planet other than Earth.");
    } else {
      alert(`Error: ${planet} is not a planet.`);
    }
    planet = prompt("Enter a planet:");
    planet = capitalize(planet);
  }

  const planetWeight = calculatePlanetWeight(earthWeight, planet);
  const roundedWeight = planetWeight.toFixed(2);

  alert(`The equivalent weight on ${planet}: ${roundedWeight}`);
}

main();
