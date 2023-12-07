// import { LocaleConfig } from "react-native-calendars";
import dayjs from "dayjs";
import updateLocal from "dayjs/plugin/updateLocale";

// dayjs.extend(updateLocal)


const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const shortMonths = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Noc",
  "Dic",
];

const weekdays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const shortWeekdays = ["Dom", "Lun", "Mar", "Miér", "Juev", "Vier", "Sáb"];

// dayjs.locale("es", {
//   months: months,
//   monthsShort: shortMonths,
//   weekdays: weekdays,
//   weekdaysShort: shortWeekdays,
//   ordinal: n => `${n}°`,
// })

// LocaleConfig.locales["es"] = {
//   monthNames: months,
//   monthNamesShort: shortMonths,
//   dayNames: weekdays,
//   dayNamesShort: shortWeekdays,
//   today: "Hoy",
// };

// const calendarSetup = (language: string) => {
//   LocaleConfig.defaultLocale = language;
// };

// export { calendarSetup };
