const Images = [
    { image: require('../../assets/banners/park1.png') },
    { image: require("../../assets/banners/park2.png") },
    { image: require("../../assets/banners/park3.png") },
    { image: require("../../assets/banners/park4.png") },
    { image: require("../../assets/banners/park5.png") }
];

export const markers = [
    {
        coordinate: {
            latitude: 51.363292038391435,
            longitude: -0.24722654270593514,
        },
        title: "Cheam Park",
        description: "This is the good exercise place",
        image: Images[0].image,
        rating: 4
    },
    {
        coordinate: {
            latitude: 51.414840064461,
            longitude: -0.29709990408288833,
        },
        title: "Second Park",
        description: "This is the second park",
        image: Images[1].image,
        rating: 5
    },
    {
        coordinate: {
            latitude: 51.41221501409661,
            longitude: -0.12329702390308664,
        },
        title: "Norbury Park",
        description: "This is the third park",
        image: Images[2].image,
        rating: 3
    },
    {
        coordinate: {
            latitude: 51.45991375069054,
            longitude: -0.2597580950659375,
        },
        title: "Palewell Common Park",
        description: "This is the fourth park",
        image: Images[3].image,
        rating: 4
    },
    {
        coordinate: {
            latitude: 51.48119263256725, 
            longitude: -0.33850075088821957,
        },
        title: "Osterley Sports & Athletics Centre",
        description: "This is the fifth best food place",
        image: Images[4].image,
        rating: 4
    },
];