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
    condominiumRegistrationDate: new Date("2023-10-16"),
  },
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
    condominiumId: 1,
  },
];

export const Services = [
  {
    serviceId: 1,
    serviceName: "Plomería",
    serviceDescription: "Trabajo sobre cañerías, baños y piscinas.",
    serviceFullDescription:
      "Instalación, reparación y mantenimiento de sistemas de tuberías y accesorios que transportan agua potable, aguas residuales y gas natural.",
    serviceDetails: [
      "Instalación de sistemas de tuberías",
      "Reparación y mantenimiento",
      "Inspección y diagnóstico",
      "Instalación de aparatos y sistemas",
      "Trabajo en sistemas de gas",
    ],
    serviceRegistrationDate: new Date("2021-01-16"),
    serviceImage: require("../assets/placeholders/plumber.webp"),
  },
  {
    serviceId: 2,
    serviceName: "Jardinería",
    serviceDescription: "Mantenimiento de patios y frentes.",
    serviceFullDescription:
      "Implicación en el cuidado y mantenimiento de los espacios verdes, jardines y paisajes al aire libre.",
    serviceDetails: [
      "Diseño y planificación de paisajes",
      "Plantación y cuidado de plantas",
      "Poda y mantenimiento de plantas",
      "Instalación de sistemas de riego",
      "Servicios de consultoría y asesoramiento",
    ],
    serviceRegistrationDate: new Date("2022-12-05"),
    serviceImage: require("../assets/placeholders/garden.jpg"),
  },
  {
    serviceId: 3,
    serviceName: "Pintura",
    serviceDescription: "Renovación de pintura en exteriores e interiores.",
    serviceFullDescription:
      "Pintura de hogares en mejora de la estética y la protección de superficies exteriores e interiores de una vivienda mediante la aplicación de pintura.",
    serviceDetails: [
      "Preparación de superficies",
      "Aplicación de pintura",
      "Pintura interior y exterior",
      "Pintura decorativa o especializada",
    ],
    serviceRegistrationDate: new Date("2023-07-22"),
    serviceImage: require("../assets/placeholders/painter.jpg"),
  },
  {
    serviceId: 4,
    serviceName: "Electricista",
    serviceDescription: "Reparación y mantenimiento de electrónicos.",
    serviceFullDescription:
      "Instalación, reparación y mantenimiento de sistemas eléctricos en casas y apartamentos. Aquí tienes una descripción detallada de lo que implica este tipo de servicio",
    serviceDetails: [
      "Instalación eléctrica",
      "Actualización y mejora del sistema eléctrico",
      "Solución de problemas y reparaciones",
      "Instalación de sistemas de iluminación",
      "Seguridad eléctrica",
    ],
    serviceRegistrationDate: new Date("2023-07-22"),
    serviceImage: require("../assets/placeholders/electricist.jpg"),
  },
];
