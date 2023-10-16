export const Condominium = [
  {
    condominiumId: 1,
    condominiumName: "La Arboleda",
    condominiumBankName: "Banco de Reservas",
    condominiumAccountNumber: "789456416",
    condominiumQuantity: 30,
    condominiumNcf: "54454545454",
    c_type: "Casa",
    condominiumNumber: 7,
    condominiumRegistrationDate: new Date("2023-10-16")
  }
];

export const Users = [
  {
    userId: 1,
    userName: "Jose Manuel",
    userLastname: "Richiez Rijo",
    userEmail: "josemrr27@gmial.com",
    userCellphone: "809-878-5349",
    userRegistrationDate: new Date("2023-10-16"),
    userRnc: "64987231",
    userActive: true,
    userAddress: "C. 30 de Marzo N. 17",
    userTelephone: "809-554-0000",
    card: null,
    pet: null,
    pets_quantity: 0,
    married: true,
    hasVehicle: true,
    vehicleQuantity: 1,
    condominiumId: 1
  }
];

export const Services = [
  {
    serviceId: 1,
    serviceName: "Plomería",
    serviceDescription: "Trabajo sobre cañerías, baños y piscinas",
    serviceRegistrationDate: new Date("2021-01-16")
  },
  {
    serviceId: 2,
    serviceName: "Jardinería",
    serviceDescription: "Servicio dedicado al mantenimiento de patios, frentes y arreglos florales para jardines", 
    serviceRegistrationDate: new Date("2022-12-05")
  },
  {
    serviceId: 3,
    serviceName: "",
    serviceDescription: "Servicio dedicado al mantenimiento de patios, frentes y arreglos florales para jardines", 
    serviceRegistrationDate: new Date("2023-07-22")
  }
]