import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
dayjs.locale(ja);

const argv = minimist(process.argv.slice(2));
let baseDate = dayjs();
if (argv.y != null) baseDate = baseDate.set("year", argv.y);
if (argv.m != null) baseDate = baseDate.set("month", argv.m - 1);
const firstDate = baseDate.startOf("month");
const lastDate = baseDate.endOf("month");
const yearAndMonth = baseDate.format("MMM YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";
let calcOutputStartPosition = (date) => {
  return date.get("d") * 3 + 2;
};

console.log(yearAndMonth.padStart(13));
console.log(dayOfWeek);

for (let date = firstDate; date < lastDate; date = date.add(1, "day")) {
  if (date === firstDate) {
    process.stdout.write(
      String(date.date()).padStart(calcOutputStartPosition(date)) + " "
    );
  } else {
    const numberOfDigit = 2;
    process.stdout.write(String(date.date()).padStart(numberOfDigit) + " ");
  }
  if (date.get("d") === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");
