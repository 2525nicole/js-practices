import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
dayjs.locale(ja);
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
dayjs.extend(isSameOrBefore);

const argv = minimist(process.argv.slice(2));
let baseDate = dayjs();
if (argv.y != null) baseDate = baseDate.set("year", argv.y);
if (argv.m != null) baseDate = baseDate.set("month", argv.m - 1);
const firstDate = baseDate.startOf("month");
const lastDate = baseDate.endOf("month");
const yearMonthDisplayPosition = 13;
const yearAndMonth = baseDate.format("MMM YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";
let calcFirstdayDisplayPosition = (date) => {
  return date.get("d") * 3 + 2;
};

console.log(yearAndMonth.padStart(yearMonthDisplayPosition));
console.log(dayOfWeek);

for (
  let date = firstDate;
  date.isSameOrBefore(lastDate);
  date = date.add(1, "day")
) {
  if (date === firstDate) {
    process.stdout.write(
      String(date.date()).padStart(calcFirstdayDisplayPosition(date)) + " "
    );
  } else {
    const numberOfDigit = 2;
    process.stdout.write(String(date.date()).padStart(numberOfDigit) + " ");
  }
  if (date.get("d") === 6 || date.isSame(lastDate, "day")) {
    process.stdout.write("\n");
  }
}
