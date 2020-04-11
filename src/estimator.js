const calcDays = (periodType, elapsedTime) => {
  let days;
  if (periodType === 'days') {
    days = elapsedTime;
  } else if (periodType === 'weeks') {
    days = elapsedTime * 7;
  } else {
    days = elapsedTime * 30;
  }
  return days;
};

const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;

  const days = calcDays(periodType, timeToElapse);
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * (2 ** Math.trunc(days / 3));
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** Math.trunc(days / 3));
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
  };

  return output;
};

export default covid19ImpactEstimator;
