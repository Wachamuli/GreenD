export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

export const timeFormatter = (time: string): string => {
  let formattedTime = "";
  let hours = time.slice(0, 2) as unknown as number;
  let minutes = time.slice(3, 5) as unknown as number;

  if (hours > 12) {
    hours -= 12;
    formattedTime = "0" + hours + ":" + minutes + " PM";
  } else {
    formattedTime = hours + ":" + minutes + " AM";
  }

  return formattedTime;
};

export const requestStatusFormatter = (status: number) => {
  switch (status) {
    case 1:
      return "En proceso de cotización..."
    case 2:
      return "En espera de pago..."
    case 3:
      return "En proceso de ejecución..."
  }
}
