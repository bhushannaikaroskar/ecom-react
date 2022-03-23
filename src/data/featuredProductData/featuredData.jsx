import {FeaturedProduct1,FeaturedProduct2,FeaturedProduct3,FeaturedProduct4} from "../../assets"

const featuredData = [
    {
        id:1,
        title: "Chess Pieces",
        price: { newPrice: 1200, oldPrice: 1400 },
        description: "Complete set of 32 chess pieces, Meet all tournament standard.",
        imageSrc:FeaturedProduct3,
        category:"Pieces",
        rating:4
    },
    {
        id:2,
        title: "Wooden Board",
        price: { newPrice: 2499, oldPrice: 2999 },
        description: "Handcrafted by artisans of India",
        imageSrc:FeaturedProduct1,
        category:"board",
        rating:4.3
    },
    {
        id:3,
        title: "Magnetic Board ",
        price: { newPrice: 900, oldPrice: 999 },
        description: "Specially designed Magnetic board. special edition travel chess set",
        imageSrc:FeaturedProduct4,
        category:"board",
        rating:4.6
    },
    {
        id:4,
        title: "Analog Clock",
        price: { newPrice: 500, oldPrice: 600 },
        description: "Chess Clock has many timer rules and under each rule you can select a unique program that is suited to your game.",
        imageSrc:FeaturedProduct2,
        category:"clock",
        rating:4
    },
]

export {featuredData}