export function getDateDifference(startDate: Date, endDate: Date) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  const february =
    (endYear % 4 === 0 && endYear % 100 !== 0) || endYear % 400 === 0 ? 29 : 28;
  const daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const startDateNotPassedInEndYear =
    endMonth < startMonth || (endMonth === startMonth && endDay < startDay);
  const years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

  const months =
    (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

  const days =
    startDay <= endDay
      ? endDay - startDay
      : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;
  return {
    years: years,
    months: months,
    days: days,
  };
}
