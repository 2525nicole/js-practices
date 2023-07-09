import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));
const base_date = dayjs()
  .year(argv["y"] == null ? dayjs().format("YYYY") : argv["y"])
  .month(argv["m"] == null ? dayjs().format("M") - 1 : Number(argv["m"]) - 1);
const first_date = base_date.startOf("month");
const last_date = base_date.endOf("month");
const year_and_month = base_date.format("M月 YYYY");
const day_of_week = "日 月 火 水 木 金 土";

console.log(year_and_month.padStart(13));
console.log(day_of_week);

for (let date = first_date; date < last_date; date = date.add(1, "day")) {
  let blank_number;
  if (date === first_date) {
    blank_number = Number(date.format("d")) * 3 + 2;
  } else {
    blank_number = 2;
  }
  process.stdout.write(String(date.date()).padStart(blank_number) + " ");
  if (date.format("d") === "6") {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");
