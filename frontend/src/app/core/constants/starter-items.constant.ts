export interface StarterItem {
  name: string;
  category: string;
}

export const STARTER_PACK: StarterItem[] = [
  // 🍿 SNACKS & BISCUITS
  { name: 'Parle-G', category: 'Snacks' },
  { name: 'Marie Biscuits', category: 'Snacks' },
  { name: 'Potato Chips', category: 'Snacks' },
  { name: 'Chocolate Bar', category: 'Snacks' },
  { name: 'Namkeen', category: 'Snacks' },

  // 🍜 INSTANT FOOD
  { name: 'Maggi Noodles', category: 'Instant Food' },
  { name: 'Pasta Packet', category: 'Instant Food' },
  { name: 'Fruit Jam', category: 'Instant Food' },

  // 👶 BABY CARE
  { name: 'Baby Diapers', category: 'Baby Care' },
  { name: 'Baby Soap', category: 'Baby Care' },
  { name: 'Cerelac', category: 'Baby Care' },

  // 🛒 GROCERIES & GRAINS
  { name: 'Sugar', category: 'Groceries' },
  { name: 'Salt', category: 'Groceries' },
  { name: 'Tea Powder', category: 'Groceries' },
  { name: 'Cooking Oil', category: 'Groceries' },
  { name: 'Rice', category: 'Grains' },
  { name: 'Wheat Flour (Atta)', category: 'Grains' },
  { name: 'Toor Dal', category: 'Grains' },

  // 🧼 PERSONAL CARE & HOUSEHOLD
  { name: 'Bath Soap', category: 'Personal Care' },
  { name: 'Toothpaste', category: 'Personal Care' },
  { name: 'Dishwash Bar', category: 'Household' },
  { name: 'Washing Powder', category: 'Household' }
];