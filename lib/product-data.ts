/* eslint-disable @typescript-eslint/no-explicit-any */
export const PRODUCT_DATA: { [key: string]: any } = {
  // WINTER Category
  loungewear: {
    title: "Winter Loungewear",
    description: "Comfortable and warm loungewear for cozy winter days",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-lounge-1",
        name: "Winter Fleece Pajama Set",
        price: 34.99,
        originalPrice: 39.99,
        image:
          "https://images.unsplash.com/photo-1551488831-6745a0aa60c6?w=400&h=400&fit=crop",
        category: "winter",
        slug: "winter-fleece-pajama-set",
        inStock: true,
        description: "Soft fleece pajama set for winter comfort",
      },
    ],
  },
  "jackets-coats": {
    title: "Jackets & Coats",
    description: "Warm jackets and coats for cold winter days",
    heroImage:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-jacket-1",
        name: "Winter Parka Jacket",
        price: 49.99,
        originalPrice: 59.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        category: "winter",
        slug: "winter-parka-jacket",
        inStock: true,
        description: "Warm winter parka jacket with hood",
      },
    ],
  },
  hoodie: {
    title: "Hoodies",
    description: "Cozy hoodies for winter comfort",
    heroImage:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-hoodie-1",
        name: "Kids Winter Hoodie",
        price: 29.99,
        originalPrice: 34.99,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        category: "winter",
        slug: "kids-winter-hoodie",
        inStock: true,
        description: "Warm and comfortable winter hoodie",
      },
    ],
  },
  "sweat-suits": {
    title: "Sweat Suits",
    description: "Comfortable sweat suits for active kids",
    heroImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-sweat-1",
        name: "Fleece Sweat Suit",
        price: 39.99,
        originalPrice: 44.99,
        image:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
        category: "winter",
        slug: "fleece-sweat-suit",
        inStock: true,
        description: "Warm fleece sweat suit set",
      },
    ],
  },
  shirt: {
    title: "Winter Shirts",
    description: "Warm shirts for winter season",
    heroImage:
      "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=1200&h=400&fit=crop",
    products: [
      {
        id: "w-shirt-1",
        name: "Flannel Winter Shirt",
        price: 24.99,
        originalPrice: 29.99,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=400&h=400&fit=crop",
        category: "winter",
        slug: "flannel-winter-shirt",
        inStock: true,
        description: "Warm flannel shirt for winter",
      },
    ],
  },

  // TINY BY SHISHU Category
  "gift-box": {
    title: "Gift Box Collection",
    description: "Beautifully curated gift boxes for special occasions",
    heroImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f4e4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "t-gift-1",
        name: "Premium Baby Gift Box",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1544816155-12df9643f4e4?w=400&h=400&fit=crop",
        category: "gift",
        slug: "premium-baby-gift-box",
        inStock: true,
        description: "Premium gift box for newborns",
      },
    ],
  },
  "nima-set": {
    title: "Nima Sets",
    description: "Traditional Nima sets for babies",
    heroImage:
      "https://images.unsplash.com/photo-1584839408724-e8457b56c99c?w=1200&h=400&fit=crop",
    products: [
      {
        id: "t-nima-1",
        name: "Traditional Nima Set",
        price: 45.99,
        image:
          "https://images.unsplash.com/photo-1584839408724-e8457b56c99c?w=400&h=400&fit=crop",
        category: "traditional",
        slug: "traditional-nima-set",
        inStock: true,
        description: "Beautiful traditional Nima set",
      },
    ],
  },
  quilt: {
    title: "Baby Quilts",
    description: "Soft and warm quilts for babies",
    heroImage:
      "https://images.unsplash.com/photo-1584305574647-4692496f668f?w=1200&h=400&fit=crop",
    products: [
      {
        id: "t-quilt-1",
        name: "Baby Comfort Quilt",
        price: 59.99,
        image:
          "https://images.unsplash.com/photo-1584305574647-4692496f668f?w=400&h=400&fit=crop",
        category: "bedding",
        slug: "baby-comfort-quilt",
        inStock: true,
        description: "Soft and warm baby quilt",
      },
    ],
  },

  // TOYS & BOOKS Category
  toys: {
    title: "Toys Collection",
    description: "Educational and fun toys for children",
    heroImage:
      "https://images.unsplash.com/photo-1594787319143-60a132a8e0f0?w=1200&h=400&fit=crop",
    products: [
      {
        id: "tb-toy-1",
        name: "Educational Building Blocks",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1594787319143-60a132a8e0f0?w=400&h=400&fit=crop",
        category: "toys",
        slug: "educational-building-blocks",
        inStock: true,
        description: "Colorful educational building blocks",
      },
    ],
  },
  accessories: {
    title: "Toy Accessories",
    description: "Accessories for toys and play",
    heroImage:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&h=400&fit=crop",
    products: [
      {
        id: "tb-acc-1",
        name: "Toy Storage Box",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
        category: "accessories",
        slug: "toy-storage-box",
        inStock: true,
        description: "Colorful toy storage box",
      },
    ],
  },
  "handmade-dolls": {
    title: "Handmade Dolls",
    description: "Beautiful handmade dolls for children",
    heroImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=400&fit=crop",
    products: [
      {
        id: "tb-doll-1",
        name: "Handmade Rag Doll",
        price: 32.99,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        category: "dolls",
        slug: "handmade-rag-doll",
        inStock: true,
        description: "Beautiful handmade rag doll",
      },
    ],
  },
  books: {
    title: "Children Books",
    description: "Educational and fun books for kids",
    heroImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=400&fit=crop",
    products: [
      {
        id: "tb-book-1",
        name: "Children Story Book Set",
        price: 22.99,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
        category: "books",
        slug: "children-story-book-set",
        inStock: true,
        description: "Set of 5 children story books",
      },
    ],
  },
  games: {
    title: "Educational Games",
    description: "Fun and educational games for children",
    heroImage:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&h=400&fit=crop",
    products: [
      {
        id: "tb-game-1",
        name: "Educational Board Game",
        price: 28.99,
        image:
          "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=400&fit=crop",
        category: "games",
        slug: "educational-board-game",
        inStock: true,
        description: "Fun educational board game",
      },
    ],
  },

  // ETHNIC WEAR Category
  lehenga: {
    title: "Lehenga Collection",
    description: "Traditional lehenga for special occasions",
    heroImage:
      "https://images.unsplash.com/photo-1590005354167-6da97870f6c4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "e-lehenga-1",
        name: "Traditional Silk Lehenga",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1590005354167-6da97870f6c4?w=400&h=400&fit=crop",
        category: "ethnic",
        slug: "traditional-silk-lehenga",
        inStock: true,
        description: "Beautiful traditional silk lehenga",
      },
    ],
  },
  "salwar-kameez": {
    title: "Salwar Kameez",
    description: "Traditional salwar kameez sets",
    heroImage:
      "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "e-salwar-1",
        name: "Embroidered Salwar Kameez",
        price: 65.99,
        image:
          "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=400&h=400&fit=crop",
        category: "ethnic",
        slug: "embroidered-salwar-kameez",
        inStock: true,
        description: "Beautiful embroidered salwar kameez",
      },
    ],
  },
  "panjabi-set": {
    title: "Panjabi Sets",
    description: "Traditional panjabi sets for boys",
    heroImage:
      "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=1200&h=400&fit=crop",
    products: [
      {
        id: "e-panjabi-1",
        name: "Traditional Panjabi Set",
        price: 55.99,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=400&h=400&fit=crop",
        category: "ethnic",
        slug: "traditional-panjabi-set",
        inStock: true,
        description: "Traditional panjabi set for special occasions",
      },
    ],
  },
  "jubba-set": {
    title: "Jubba Sets",
    description: "Traditional jubba sets for boys",
    heroImage:
      "https://images.unsplash.com/photo-1584305574647-4692496f668f?w=1200&h=400&fit=crop",
    products: [
      {
        id: "e-jubba-1",
        name: "Embroidered Jubba Set",
        price: 75.99,
        image:
          "https://images.unsplash.com/photo-1584305574647-4692496f668f?w=400&h=400&fit=crop",
        category: "ethnic",
        slug: "embroidered-jubba-set",
        inStock: true,
        description: "Beautiful embroidered jubba set",
      },
    ],
  },

  // CASUAL Category
  "co-ord-set": {
    title: "Co-ord Sets",
    description: "Matching co-ord sets for casual wear",
    heroImage:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&h=400&fit=crop",
    products: [
      {
        id: "c-coord-1",
        name: "Casual Co-ord Set",
        price: 35.99,
        image:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
        category: "casual",
        slug: "casual-co-ord-set",
        inStock: true,
        description: "Comfortable casual co-ord set",
      },
    ],
  },
  pants: {
    title: "Casual Pants",
    description: "Comfortable casual pants for kids",
    heroImage:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=400&fit=crop",
    products: [
      {
        id: "c-pants-1",
        name: "Kids Casual Pants",
        price: 22.99,
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        category: "casual",
        slug: "kids-casual-pants",
        inStock: true,
        description: "Comfortable casual pants for kids",
      },
    ],
  },

  // BOYS Category
  polo: {
    title: "Polo Shirts",
    description: "Casual polo shirts for boys",
    heroImage:
      "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=1200&h=400&fit=crop",
    products: [
      {
        id: "b-polo-1",
        name: "Boys Cotton Polo",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1585487000124-7a67679f47e4?w=400&h=400&fit=crop",
        category: "boys",
        slug: "boys-cotton-polo",
        inStock: true,
        description: "Comfortable cotton polo shirt for boys",
      },
    ],
  },

  // GIRLS Category
  frock: {
    title: "Frocks Collection",
    description: "Beautiful frocks for little girls",
    heroImage:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1200&h=400&fit=crop",
    products: [
      {
        id: "g-frock-1",
        name: "Girls Summer Frock",
        price: 32.99,
        image:
          "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=400&fit=crop",
        category: "girls",
        slug: "girls-summer-frock",
        inStock: true,
        description: "Beautiful summer frock for girls",
      },
    ],
  },
  leggings: {
    title: "Leggings",
    description: "Comfortable leggings for girls",
    heroImage:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=400&fit=crop",
    products: [
      {
        id: "g-leggings-1",
        name: "Girls Cotton Leggings",
        price: 15.99,
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
        category: "girls",
        slug: "girls-cotton-leggings",
        inStock: true,
        description: "Comfortable cotton leggings for girls",
      },
    ],
  },
  shirts: {
    title: "Girls Shirts",
    description: "Casual shirts for girls",
    heroImage:
      "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=1200&h=400&fit=crop",
    products: [
      {
        id: "g-shirt-1",
        name: "Girls Casual Shirt",
        price: 21.99,
        image:
          "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=400&h=400&fit=crop",
        category: "girls",
        slug: "girls-casual-shirt",
        inStock: true,
        description: "Comfortable casual shirt for girls",
      },
    ],
  },

  // Default fallback
  default: {
    title: "Products",
    description: "Browse our collection of products",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    products: [
      {
        id: "default-1",
        name: "Sample Product",
        price: 19.99,
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
        category: "general",
        slug: "sample-product",
        inStock: true,
        description: "Sample product description",
      },
    ],
  },
};
