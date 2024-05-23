const { Schema, mongoose, model } = require("mongoose");

const locationSchema = new Schema({
  id: {
    type: Number,
    required: [true, "Needs an id"],
  },
  lat: {
    type: Number,
    required: [true, "Needs a latitude"],
  },
  lon: {
    type: Number,
    required: [true, "Needs a longitude"],
  },
  tags: {
    name: String,
    amenity: String,
  },
});
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please insert username"],
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg",
  },
  settings: {
    searchRadius: Number,
    location: {
      lon: Number,
      lat: Number,
    },
  },
  filters: {
    amenity: {
      arts_centre: {
        type: Boolean,
        required: true,
        default: true,
      },
      planetarium: {
        type: Boolean,
        required: true,
        default: true,
      },
      theatre: {
        type: Boolean,
        required: true,
        default: true,
      },
      marketplace: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    historic: {
      castle: {
        type: Boolean,
        required: true,
        default: true,
      },
      church: {
        type: Boolean,
        required: true,
        default: true,
      },
      fort: {
        type: Boolean,
        required: true,
        default: true,
      },
      manor: {
        type: Boolean,
        required: true,
        default: true,
      },
      monument: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    leisure: {
      amusement_arcade: {
        type: Boolean,
        required: true,
        default: true,
      },
      escape_game: {
        type: Boolean,
        required: true,
        default: true,
      },
      garden: {
        type: Boolean,
        required: true,
        default: true,
      },
      miniature_golf: {
        type: Boolean,
        required: true,
        default: true,
      },
      park: {
        type: Boolean,
        required: true,
        default: true,
      },
      nature_reserve: {
        type: Boolean,
        required: true,
        default: true,
      },
      stadium: {
        type: Boolean,
        required: true,
        default: true,
      },
      water_park: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    shop: {
      bakery: {
        type: Boolean,
        required: true,
        default: true,
      },
      coffee: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    tourism: {
      aquarium: {
        type: Boolean,
        required: true,
        default: true,
      },
      attraction: {
        type: Boolean,
        required: true,
        default: true,
      },
      gallery: {
        type: Boolean,
        required: true,
        default: true,
      },
      museum: {
        type: Boolean,
        required: true,
        default: true,
      },
      theme_park: {
        type: Boolean,
        required: true,
        default: true,
      },
      zoo: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
  },
});

const Location = mongoose.model("Location", locationSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { locationSchema, UserSchema, Location, User };
