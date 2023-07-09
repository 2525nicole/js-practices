import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));
const baseDate = dayjs()
  .year(argv.y == null ? dayjs().format("YYYY") : argv.y)
  .month(argv.m == null ? dayjs().format("M") - 1 : Number(argv.m) - 1);
const firstDate = baseDate.startOf("month");
const lastDate = baseDate.endOf("month");
const yearAndMonth = baseDate.format("M月 YYYY");
const dayOfWeek = "日 月 火 水 木 金 土";

console.log(yearAndMonth.padStart(13));
console.log(dayOfWeek);

for (let date = firstDate; date < lastDate; date = date.add(1, "day")) {
  let blankNumber;
  if (date === firstDate) {
    blankNumber = Number(date.format("d")) * 3 + 2;
  } else {
    blankNumber = 2;
  }
  process.stdout.write(String(date.date()).padStart(blankNumber) + " ");
  if (date.format("d") === "6") {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");
