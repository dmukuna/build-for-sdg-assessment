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
    periodType, timeToElapse, reportedCases, totalHospitalBeds, region
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  const days = calcDays(periodType, timeToElapse);
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsImpact = currentlyInfectedImpact * (2 ** Math.trunc(days / 3));
  const infectionsSevere = currentlyInfectedSevere * (2 ** Math.trunc(days / 3));
  const severeCasesByRequestedTimeImpact = Math.trunc(0.15 * infectionsImpact);
  const severeCasesByRequestedTimeSevere = Math.trunc(0.15 * infectionsSevere);
  const availableBeds = 0.35 * totalHospitalBeds;
  const availableBedsImpact = Math.trunc(availableBeds - severeCasesByRequestedTimeImpact);
  const availableBedsSevere = Math.trunc(availableBeds - severeCasesByRequestedTimeSevere);
  const icuCaseImpact = Math.trunc(0.05 * infectionsImpact);
  const icuCaseSevere = Math.trunc(0.05 * infectionsSevere);
  const ventCaseImpact = Math.trunc(0.02 * infectionsImpact);
  const ventCaseSevere = Math.trunc(0.02 * infectionsSevere);
  const incomeImpact = infectionsImpact * avgDailyIncomeInUSD * avgDailyIncomePopulation;
  const incomeSevere = infectionsSevere * avgDailyIncomeInUSD * avgDailyIncomePopulation;
  const dollarsImpact = Math.trunc(incomeImpact / days);
  const dollarsSevere = Math.trunc(incomeSevere / days);

  const output = {
    data,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionsImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact,
      hospitalBedsByRequestedTime: availableBedsImpact,
      casesForICUByRequestedTime: icuCaseImpact,
      casesForVentilatorsByRequestedTime: ventCaseImpact,
      dollarsInFlight: dollarsImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsSevere,
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
