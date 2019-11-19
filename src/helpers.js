// Values that may need tweaked.
const GOP_PARTY_VALUE = "republican";
const DEM_PARTY_VALUE = "democrat";
const SPLIT_VALUE = "split";

// this helper is for the precinct progress bar
export function getAffiliationColor(affiliation) {
  // const name = affiliation != undefined ? affiliation.name : '';
  // const party = affiliation != undefined ? (affiliation.party).toLowerCase().trim() : '';

  // switch (affiliation.toLowerCase().trim()) {
  switch (affiliation.party.toLowerCase().trim()) {
    case GOP_PARTY_VALUE:
      return "#e23834";
    case DEM_PARTY_VALUE:
      return "#01236a";
    case SPLIT_VALUE:
      return "purple";
    case "yes":
      return "#333";
    case "no":
      return "#333";
    default:
      return "#333";
  }
}

export function avgColor(str1, str2) {
  // Convert the hexadecimal string to integer
  const color1 = parseInt(str1, 16);
  const color2 = parseInt(str2, 16);

  let avgColor = 0;
  for (let i = 0; i < 3; i++) {
      // Split the color components
      var comp1 = (color1 >> (8 * i)) & 0xff;
      var comp2 = (color2 >> (8 * i)) & 0xff;
      // Calculate the average value for each color component
      let v = parseInt((comp1 + comp2) / 1) << 8 * i;

      // Reconstruct the final value from the color components
      avgColor += parseInt((comp1 + comp2) / 1) << 8 * i;
  }

  return decimalToHex(avgColor, 6);
}

// Reference from https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
function decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
      hex = "0" + hex;
  }

  return hex;
}