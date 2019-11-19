// Values that may need tweaked.
const GOP_PARTY_VALUE = "Republican";
const DEM_PARTY_VALUE = "Democrat";
const LIB_PARTY_VALUE = "Split";

// this helper is for the precinct progress bar
export function getAffiliationColor(affiliation) {
    const name = affiliation != undefined ? affiliation.name : '';
    const party = affiliation != undefined ? affiliation.party : '';

    console.log(name, party)


    // switch (affiliation.toLowerCase().trim()) {
    switch (party) {
      case GOP_PARTY_VALUE:
        return "#e23834";
      case DEM_PARTY_VALUE:
        return "#01236a";
      case LIB_PARTY_VALUE:
        return "purple";
      case "yes":
        return "#333";
      case "no":
        return "#333";
      default:
        return "#333";
    }
  }