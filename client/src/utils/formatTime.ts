import moment from "moment";

export const formatLastTime = (datetime: string | Date) =>
  moment(datetime).startOf("second").fromNow();
