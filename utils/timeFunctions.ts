import moment from "moment";

export const getMinuteStringFromMiliseconds = (
  miliseconds: number | undefined
) => {
  if (!miliseconds) return "00:00";
  const seconds = Math.trunc((miliseconds % 60000) / 1000);
  const secondsString =
    seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  const durationString =
    Math.trunc(moment.duration(miliseconds).asMinutes()).toString() +
    ":" +
    secondsString;

  return durationString;
};
