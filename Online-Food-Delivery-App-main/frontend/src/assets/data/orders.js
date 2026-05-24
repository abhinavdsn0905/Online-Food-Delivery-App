export const orders = [
  {
    id: 1,
    user_id: 1,
    restaurant_id: 1,
    total_amount: 26.46,
    status: "Delivered",
    payment_status: "Paid",
    created_at: "2023-10-24T19:30:00Z",
    items: [
      { food_item_id: 101, name: "Whopper Meal", quantity: 2, price: 9.99 },
      { food_item_id: 103, name: "Onion Rings", quantity: 1, price: 3.49 }
    ]
  },
  {
    id: 2,
    user_id: 1,
    restaurant_id: 3,
    total_amount: 45.00,
    status: "Preparing",
    payment_status: "Paid",
    created_at: new Date().toISOString(),
    items: [
      { food_item_id: 301, name: "Dragon Roll", quantity: 1, price: 16.50 },
      { food_item_id: 302, name: "Spicy Tuna Roll", quantity: 1, price: 12.00 }
    ]
  }
];
