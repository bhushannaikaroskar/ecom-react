import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
    {
        _id: "1",
        title: "Chess Pieces",
        price: { newPrice: 1200, oldPrice: 1400 },
        description:
            "Complete set of 32 chess pieces, Meet all tournament standard.",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860863/assets/products/chess-product-3_pm9f3p.jpg",
        category: "pieces",
        popularity: 32,
        rating: 4,
    },
    {
        _id: "2",
        title: "Wooden Board",
        price: { newPrice: 2499, oldPrice: 2999 },
        description: "Handcrafted by artisans of India",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860872/assets/products/chess-product-1_hrnkv3.jpg",
        category: "board",
        popularity: 3,
        rating: 4.3,
    },
    {
        _id: "3",
        title: "Magnetic Board ",
        price: { newPrice: 900, oldPrice: 999 },
        description:
            "Specially designed Magnetic board. special edition travel chess set",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860853/assets/products/chess-product-4_xjuzfz.jpg",
        category: "board",
        popularity: 2,
        rating: 4.6,
    },
    {
        _id: "4",
        title: "Analog Clock",
        price: { newPrice: 500, oldPrice: 600 },
        description:
            "Chess Clock has many timer rules and under each rule you can select a unique program that is suited to your game.",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860869/assets/products/chess-product-2_fe7xx2.jpg",
        category: "accessories",
        popularity: 12,
        rating: 1,
    },
    {
        _id: "5",
        title: "Chess Pieces",
        price: { newPrice: 1200, oldPrice: 1400 },
        description:
            "Complete set of 32 chess pieces, Meet all tournament standard.",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860863/assets/products/chess-product-3_pm9f3p.jpg",
        category: "pieces",
        popularity: 5,
        rating: 4,
    },
    {
        _id: "6",
        title: "Wooden Board",
        price: { newPrice: 2499, oldPrice: 2999 },
        description: "Handcrafted by artisans of India",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860872/assets/products/chess-product-1_hrnkv3.jpg",
        category: "board",
        popularity: 67,
        rating: 4.3,
    },
    {
        _id: "7",
        title: "Magnetic Board ",
        price: { newPrice: 900, oldPrice: 999 },
        description:
            "Specially designed Magnetic board. special edition travel chess set",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860853/assets/products/chess-product-4_xjuzfz.jpg",
        category: "board",
        popularity: 8,
        rating: 2.6,
    },
    {
        _id: "8",
        title: "Analog Clock",
        price: { newPrice: 500, oldPrice: 600 },
        description:
            "Chess Clock has many timer rules and under each rule you can select a unique program that is suited to your game.",
        imageSrc:
            "https://res.cloudinary.com/grandimages/image/upload/v1648860869/assets/products/chess-product-2_fe7xx2.jpg",
        category: "accessories",
        popularity: 1,
        rating: 3,
    },
];
