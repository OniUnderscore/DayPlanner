const userData = [
  {
    username: "JamesO",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    settings: {
      searchRadius: 1000,
      location: {
        lon: -0.13071,
        lat: 51.52813,
      },
    },
  },
  {
    username: "DwayneA",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    settings: {
      searchRadius: 1000,
      location: {
        lon: -0.21655,
        lat: 51.52204,
      },
    },
    filters: {
      amenity: {
        arts_centre: false,
        planetarium: false,
        theatre: false,
        marketplace: false,
      },
      historic: {
        castle: false,
        church: true,
        fort: false,
        manor: true,
        monument: false,
      },
      leisure: {
        amusement_arcade: true,
        escape_game: true,
        garden: true,
        miniature_golf: true,
        park: false,
        nature_reserve: true,
        stadium: false,
        water_park: true,
      },
      shop: {
        bakery: true,
        coffee: true,
      },
      tourism: {
        aquarium: true,
        attraction: true,
        gallery: false,
        museum: true,
        theme_park: true,
        zoo: true,
      },
    },
  },
  {
    username: "EllysDG",
    avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
    settings: {
      searchRadius: 2000,
      location: {
        lon: -0.16555,
        lat: 51.50467,
      },
    },
  },
  {
    username: "BillyD",
    avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
    settings: {
      searchRadius: 1550,
      location: {
        lon: -0.23102,
        lat: 51.47878,
      },
    },
  },
  {
    username: "LentioS",
    avatar: "https://cdn.discordapp.com/embed/avatars/4.png",
    settings: {
      searchRadius: 1300,
      location: {
        lon: -0.02194,
        lat: 51.5422,
      },
    },
  },
];

module.exports = userData;
