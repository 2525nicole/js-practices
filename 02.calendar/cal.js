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
const yearMonthDisplayPosition = 13;
const dayOfWeek = "日 月 火 水 木 金 土";
console.log(yearAndMonth.padStart(yearMonthDisplayPosition));
console.log(dayOfWeek);

const firstDate = baseDate.startOf("month");
const lastDate = baseDate.endOf("month");
const calcFirstDayDisplayPosition = (date) => date.day() * 3 + 2;
for (
  let date = firstDate;
  date.isSameOrBefore(lastDate);
  date = date.add(1, "day")
) {
  if (date === firstDate) {
    process.stdout.write(
      String(date.date()).padStart(calcFirstDayDisplayPosition(date)) + " "
    );
  } else {
    const numberOfDigit = 2;
    process.stdout.write(String(date.date()).padStart(numberOfDigit) + " ");
  }
  if (date.get("d") === 6 || date.isSame(lastDate, "day")) {
    process.stdout.write("\n");
  }
}
