import { parseISO, formatDistanceToNow } from "date-fns";

function TimeAgo({ timestamp }: { timestamp: string }) {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);

    const timePeriod = formatDistanceToNow(date, { includeSeconds: true });
    timeAgo = `${timePeriod} ago`;
  }
  // console.log("timeAgo", timeAgo);
  return <span title={timestamp}> {timeAgo}</span>;
}
export default TimeAgo;
