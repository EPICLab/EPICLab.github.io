var DateTime = luxon.DateTime;

function timeSince(isoTime) {
  var timestamp = DateTime.fromISO(isoTime);
  var now = DateTime.local();
  var delta = now.diff(timestamp, ['months', 'days', 'hours']).toObject();

  if (delta.months > 0) return `Last updated ${delta.months} months ago`;
  if (delta.days > 0) return `Last updated ${delta.days} days ago`;
  if (delta.hours > 0) return `Last updated ${Math.floor(delta.hours)} hours ago`;
  return `Last updated now`;
}