const orders = [
  {
    id: 1001,
    orderId: "#ORD1001",
    date: "23 July 2026",
    status: "Pending",
    total: 14997,

    products: [
      {
        product: 1,
        quantity: 2,
        price: 4999,
      },
      {
        product: 2,
        quantity: 1,
        price: 4999,
      },
    ],

    shipping: {
      name: "Adnan Haider",
      email: "adnan@gmail.com",
      phone: "03001234567",
      address: "Sadiqabad, Punjab, Pakistan",
    },

    paymentMethod: "Cash On Delivery",
  },

  {
    id: 1002,
    orderId: "#ORD1002",
    date: "20 July 2026",
    status: "Delivered",
    total: 7999,

    products: [
      {
        product: 3,
        quantity: 1,
        price: 7999,
      },
    ],

    shipping: {
      name: "Adnan Haider",
      email: "adnan@gmail.com",
      phone: "03001234567",
      address: "Sadiqabad, Punjab, Pakistan",
    },

    paymentMethod: "Cash On Delivery",
  },

  {
    id: 1003,
    orderId: "#ORD1003",
    date: "18 July 2026",
    status: "Cancelled",
    total: 4999,

    products: [
      {
        product: 4,
        quantity: 1,
        price: 4999,
      },
    ],

    shipping: {
      name: "Adnan Haider",
      email: "adnan@gmail.com",
      phone: "03001234567",
      address: "Sadiqabad, Punjab, Pakistan",
    },

    paymentMethod: "Cash On Delivery",
  },

  {
    id: 1004,
    orderId: "#ORD1004",
    date: "15 July 2026",
    status: "Delivered",
    total: 9999,

    products: [
      {
        product: 5,
        quantity: 2,
        price: 4999,
      },
    ],

    shipping: {
      name: "Adnan Haider",
      email: "adnan@gmail.com",
      phone: "03001234567",
      address: "Sadiqabad, Punjab, Pakistan",
    },

    paymentMethod: "Cash On Delivery",
  },
];

export default orders;