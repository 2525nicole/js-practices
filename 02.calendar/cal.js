import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
dayjs.locale(ja);
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
dayjs.extend(isSameOrBefore);

const argv = minimist(process.argv.slice(2));
let baseDate = dayjs();
if (argv.y) baseDate = baseDate.set("year", argv.y);
if (argv.m) baseDate = baseDate.set("month", argv.m - 1);

const yearAndMonth = baseDate.format("MMM YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";
console.log(yearAndMonth.padStart(13));
console.log(dayOfWeek);

const firstDate = baseDate.startOf("month");
const lastDate = baseDate.endOf("month");

process.stdout.write(" ".padStart(firstDate.day() * 3));

for (
  let date = firstDate;
  date.isSameOrBefore(lastDate);
  date = date.add(1, "day")
) {
  process.stdout.write(String(date.date()).padStart(2) + " ");
  if (date.get("d") === 6 || date.isSame(lastDate, "day")) {
    process.stdout.write("\n");
  }
}
