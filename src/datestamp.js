module.exports = function datestamp(date = new Date()){
  if (!(date instanceof Date) || isNaN(date)) {
    throw new TypeError("Invalid date: must be a valid Date object")
  }

  const yyyy = date.getUTCFullYear();
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, 0);
  const dd = (date.getUTCDate()).toString().padStart(2, 0);

  return `${yyyy}-${mm}-${dd}`;
}