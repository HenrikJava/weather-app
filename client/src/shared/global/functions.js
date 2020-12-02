export const calcTime = (offset, sunTime) => {
  let timeNow;
  if (sunTime) {
    timeNow = new Date(sunTime * 1000);
  } else timeNow = new Date();
  const localComparingToUTC =
    timeNow.getTime() + timeNow.getTimezoneOffset() * 60000;
  return new Date(localComparingToUTC + 1000 * offset);
};