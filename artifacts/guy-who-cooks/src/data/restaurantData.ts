export type MenuCategory = 'Signatures' | 'Beef Burgers' | 'Chicken' | 'Fried Items' | 'Steaks' | 'Desserts' | 'Drinks';

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: string;
  accent?: string;
  image?: string;
};

export const restaurantData = {
  name: 'The Guy Who Cooks',
  shortName: 'TGWC',
  phrase: 'No Beef. No Life.',
  city: 'Islamabad, Pakistan',
  phone: '+92 333 0446415',
  hours: 'Approximately 11:00 AM – 2:00 AM daily',
  story: {
    founder: 'Ahsan Irshad',
    intro: 'Ahsan Irshad is The Guy Who Cooks.',
    body: 'This is a kitchen built around an uncomplicated obsession: take familiar comfort food, push it harder, and serve it with chef-level attention. The menu stays loud, playful, and hungry.',
  },
  rating: {
    label: 'Google rating',
    value: '4.7',
    reviewCount: '1,800+ Google reviews',
    reviewCountNumeric: 1800,
    note: 'Aggregate rating supplied for the public Google listing.',
  },
  links: {
    youtube: 'https://www.youtube.com/@theguywhocooks',
    instagram: '',
    facebook: '',
    foodpanda: '',
    maps: '',
  },
  location: {
    label: 'Islamabad',
    address: 'Shop 5, 6, Paris Plaza, F-11 Markaz, Islamabad, Pakistan',
  },
} as const;

export const menuData: MenuItem[] = [
  {
    id: 'classic-beef',
    name: 'Classic Beef',
    category: 'Beef Burgers',
    description: 'Chargrilled Patty, American Cheese, Lettuce, Onions, Tomato, Sauce.',
    price: 'Rs. 880',
  },
  {
    id: 'classic-smash',
    name: 'Classic Smash',
    category: 'Beef Burgers',
    description: 'Smash Patty, American Cheese, Caramelized Onions, Pickles and Mustard Mayo.',
    price: 'Rs. 995',
  },
  {
    id: 'twin-smash',
    name: 'Twin Smash Burger',
    category: 'Signatures',
    description: 'Two smash patties stacked with American and Swiss cheese layers, topped with spicy tomato jam, tangy mustard mayo and signature special sauce.',
    price: 'From Rs. 1,250',
  },
  {
    id: 'bacon-smash-beef',
    name: 'Bacon Smash Beef',
    category: 'Signatures',
    description: 'Thick Smash Patty, American Cheese, Beef Bacon, Lettuce, Onion Rings, Ranch Sauce and Special BBQ Sauce.',
    price: 'Rs. 1,350',
  },
  {
    id: 'swiss-mushroom-beef',
    name: 'Swiss Mushroom Beef',
    category: 'Beef Burgers',
    description: 'Two Smash Patties, Swiss Mushroom Sauce, Swiss Cheese, Lettuce.',
    price: 'Rs. 1,495',
  },
  {
    id: 'divine-beast',
    name: 'The Divine Beast',
    category: 'Signatures',
    description: 'Chargrilled Double Beef Patty Stuffed With Divine Butter, Caramelized Onions, Mustard Mayo.',
    price: 'Rs. 1,495',
    accent: 'Featured menu item',
  },
  {
    id: 'chicken-smash',
    name: 'Chicken Smash Burger',
    category: 'Chicken',
    description: 'Two smash patties topped with American and Swiss cheese, crisp iceberg lettuce, fried pickles, ranch and special house sauces.',
    price: 'From Rs. 1,250',
  },
  {
    id: 'nashville',
    name: 'Nashville Hot Chicken',
    category: 'Chicken',
    description: 'Breaded Fried Thigh, Hot Chilli Oil, Coleslaw, Pickles, Ranch and Chipotle Mayo.',
    price: 'Rs. 995',
    accent: 'Heat selector',
  },
  {
    id: 'featherweight',
    name: 'Featherweight',
    category: 'Chicken',
    description: 'Chargrilled Chicken, Swiss Cheese, Lettuce, Onion, Tomato and TGWC Special Sauce.',
    price: 'Rs. 895',
  },
  {
    id: 'loaded-fries',
    name: 'Frytopia Fries',
    category: 'Signatures',
    description: 'Three types of fries: waffle, curly, straight-cut, with sauce, jalapeño and pickles.',
    price: 'Rs. 1,095',
  },
  {
    id: 'curly-fries',
    name: 'Curly Fries',
    category: 'Fried Items',
    description: 'Crisp curly fries.',
    price: 'Rs. 545',
  },
  {
    id: 'waffle-fries',
    name: 'Waffle Fries',
    category: 'Fried Items',
    description: 'Crisp waffle fries.',
    price: 'Rs. 445',
  },
  {
    id: 'buffalo-wings',
    name: 'Buffalo Wings',
    category: 'Fried Items',
    description: 'Crispy wings glazed in Buffalo hot sauce.',
    price: 'Rs. 595–695',
  },
  {
    id: 'steak-fires',
    name: 'Steak Fires',
    category: 'Steaks',
    description: 'Steak Fires.',
    price: 'Rs. 850',
  },
  {
    id: 'lemon-malt',
    name: 'Lemon Malt',
    category: 'Drinks',
    description: 'Lemon Malt.',
    price: 'Rs. 180',
  },
  {
    id: 'cola-next',
    name: 'Cola Next',
    category: 'Drinks',
    description: 'Cola Next.',
    price: 'Rs. 180',
  },
  {
    id: 'peach-malt',
    name: 'Peach Malt',
    category: 'Drinks',
    description: 'Peach Malt.',
    price: 'Rs. 180',
  },
];

export const galleryData = [
  { id: 'hero-burger', title: 'Built to be bitten', image: 'hero', alt: 'Art-directed burger with melted cheese and fries', note: 'Concept image — replace with verified restaurant asset when available.' },
  { id: 'hot-chicken', title: 'Heat, your call', image: 'chicken', alt: 'Art-directed Nashville hot chicken sandwich', note: 'Concept image — replace with verified restaurant asset when available.' },
  { id: 'loaded-fries', title: 'Fries with a point', image: 'fries', alt: 'Art-directed loaded crinkle fries', note: 'Concept image — replace with verified restaurant asset when available.' },
];

export const heatLevels = [
  { id: 'classic', name: 'Classic', copy: 'Crisp, balanced, no drama.', level: 1 },
  { id: 'warm', name: 'Warm', copy: 'A little glow. Still polite.', level: 2 },
  { id: 'hot', name: 'Hot', copy: 'The one that talks back.', level: 3 },
  { id: 'inferno', name: 'Inferno', copy: 'For people who read warnings as invitations.', level: 4 },
];