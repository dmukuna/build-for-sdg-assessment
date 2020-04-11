const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, totalHospitalBeds
  } = data;

  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * (2 ** 9);
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** 9);
  const severeCasesByRequestedTimeImpact = Math.trunc(0.15 * infectionsByRequestedTimeImpact);
  const severeCasesByRequestedTimeSevere = Math.trunc(0.15 * infectionsByRequestedTimeSevere);
  const availableBeds = Math.trunc(0.35 * totalHospitalBeds);
  const availableBedsImpact = availableBeds - severeCasesByRequestedTimeImpact;
  const availableBedsSevere = availableBeds - severeCasesByRequestedTimeSevere;
  const icuCaseImpact = Math.trunc(0.05 * infectionsByRequestedTimeImpact);
  const icuCaseSevere = Math.trunc(0.05 * infectionsByRequestedTimeSevere);
  const ventCaseImpact = Math.trunc(0.02 * infectionsByRequestedTimeImpact);
  const ventCaseSevere = Math.trunc(0.02 * infectionsByRequestedTimeSevere);
  const dollarsImpact = Math.trunc((infectionsByRequestedTimeImpact * 0.65 * 1.5) / 30);
  const dollarsSevere = Math.trunc((infectionsByRequestedTimeSevere * 0.65 * 1.5) / 30);

  const output = {
    data,
    estimate: {
      impact: {
        currentlyInfected: currentlyInfectedImpact,
        infectionsByRequestedTime: infectionsByRequestedTimeImpact,
        severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
        hospitalBedsByRequestedTime: availableBedsImpact,
        casesForICUByRequestedTime: icuCaseImpact,
        casesForVentilatorsByRequestedTime: ventCaseImpact,
        dollarsInFlight: dollarsImpact
      },
      severeImpact: {
        currentlyInfected: currentlyInfectedSevere,
        infectionsByRequestedTime: infectionsByRequestedTimeSevere,
        severeCasesByRequestedTime: severeCasesByRequestedTimeSevere,
        hospitalBedsByRequestedTime: availableBedsSevere,
        casesForICUByRequestedTime: icuCaseSevere,
        casesForVentilatorsByRequestedTime: ventCaseSevere,
        dollarsInFlight: dollarsSevere
      }
    }
  };

  return output;
};

export default covid19ImpactEstimator;
