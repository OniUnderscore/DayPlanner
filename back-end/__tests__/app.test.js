const app = require("../app");
const seed = require("../seed.mongodb");
const request = require("supertest");
const elements = require("../Data/Test_data/routeData");
const { Route } = require("../Database/schemas_models");
const connection = require("../index");

beforeEach(() => seed());

describe("GET /sights/:sight_id", () => {
  test("returns the correct sight object matching the sight id given", () => {
    return request(app)
      .get("/api/sights/25475389")
      .expect(200)
      .then(({ body }) => {
        const sights = body;
        expect(sights).toHaveProperty("_id");
        expect(sights).toEqual(
          expect.objectContaining({
            id: 25475389,
            lat: 51.5265807,
            lon: -0.1292505,
            tags: {
              amenity: "cafe",
              name: "Woburn Cafe",
            },
          })
        );
      });
  });
  test("404: returns a not found error when passed a valid but non-existent id", () => {
    return request(app)
      .get("/api/sights/230")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: returns a bad request when passed an invalid id", () => {
    return request(app)
      .get("/api/sights/peanuts")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("GET /api/users", () => {
  test("returns status 200 when all users found", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body;
        expect(users.length).toEqual(5);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              avatar: expect.any(String),
              settings: {
                searchRadius: expect.any(Number),
                location: {
                  lon: expect.any(Number),
                  lat: expect.any(Number),
                },
              },
            })
          );
        });
      });
  });
});
describe("GET /api/users/:username", () => {
  test("200 Returns correct user when specific user id is passed through", () => {
    return request(app)
      .get("/api/users/JamesO")
      .expect(200)
      .then(({ body }) => {
        const user = body;
        expect(user).toHaveProperty("_id");
        expect(user).toEqual(
          expect.objectContaining({
            username: "JamesO",
            avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
            settings: {
              searchRadius: 1000,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
  test("404: returns a not found error when passed a valid but non-existent username", () => {
    return request(app)
      .get("/api/users/peanuts")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("POST /api/users", () => {
  test("200 Posts new user with correct properties", () => {
    const newUser = {
      displayName: "Peanut Brittle",
      username: "MrPeanut",
      location: "Dublin",
      settings: {
        searchRadius: 790,
        location: {
          lon: -0.13071,
          lat: 51.52813,
        },
      },
      filters: {
        amenity: {
          food: {
            bar: false,
            cafe: false,
            fast_food: false,
            food_court: false,
            ice_cream: true,
            pub: true,
            restaurant: false,
          },
          entertainment: {
            arts_centre: true,
            casino: true,
            cinema: true,
            community_centre: true,
            conference_centre: true,
            events_venue: true,
            exhibition_centre: true,
            music_venue: true,
            planetarium: true,
            social_centre: true,
            theatre: true,
          },
        },
        historic: {
          aqueduct: true,
          castle: true,
          castle_wall: true,
          church: true,
          citywalls: true,
          fort: true,
          manor: true,
          memorial: true,
          monument: true,
          mosque: true,
          temple: true,
        },
        leisure: {
          amusement_arcade: true,
          disc_golf_course: true,
          escape_game: true,
          garden: true,
          ice_rink: true,
          miniature_golf: true,
          park: true,
          nature_reserve: true,
          stadium: true,
          water_park: true,
        },
        shop: {
          bakery: true,
          chocolate: true,
          coffee: true,
          confectionary: true,
          pastry: true,
          department_store: true,
          mall: true,
        },
        tourism: {
          aquarium: true,
          artwork: true,
          attraction: true,
          gallery: true,
          museum: true,
          theme_park: true,
          zoo: true,
        },
      },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        const newUser = body;
        expect(newUser).toEqual(
          expect.objectContaining({
            username: "MrPeanut",
            settings: {
              searchRadius: 790,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
  test("400 returns bad request if incorrect input given", () => {
    const newUser = {
      username: "MrPeanut",
      settings: {
        searchRadius: "peanuts",
        location: {
          lon: -0.13071,
          lat: 51.52813,
        },
      },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("400 returns bad request if missing required input", () => {
    const newUser = {
      settings: {
        searchRadius: 60,
        location: {
          lon: -0.13071,
          lat: 51.52813,
        },
      },
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
describe("PATCH /api/users/:username", () => {
  test("200 Correctly updates the user with send updates", () => {
    return request(app)
      .patch("/api/users/JamesO")
      .send({
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
        settings: {
          searchRadius: 100,
          location: {
            lon: -0.13071,
            lat: 51.52813,
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
            castle: true,
            church: true,
            fort: true,
            manor: true,
            monument: true,
          },
          leisure: {
            amusement_arcade: true,
            escape_game: true,
            garden: true,
            miniature_golf: true,
            park: true,
            nature_reserve: true,
            stadium: true,
            water_park: true,
          },
          shop: {
            bakery: true,
            coffee: true,
          },
          tourism: {
            aquarium: true,
            attraction: true,
            gallery: true,
            museum: true,
            theme_park: true,
            zoo: true,
          },
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            username: "JamesO",
            avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
            settings: {
              searchRadius: 100,
              location: {
                lon: -0.13071,
                lat: 51.52813,
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
                castle: true,
                church: true,
                fort: true,
                manor: true,
                monument: true,
              },
              leisure: {
                amusement_arcade: true,
                escape_game: true,
                garden: true,
                miniature_golf: true,
                park: true,
                nature_reserve: true,
                stadium: true,
                water_park: true,
              },
              shop: {
                bakery: true,
                coffee: true,
              },
              tourism: {
                aquarium: true,
                attraction: true,
                gallery: true,
                museum: true,
                theme_park: true,
                zoo: true,
              },
            },
          })
        );
      });
  });
  test("404 Error if User does not Exist", () => {
    return request(app)
      .patch("/api/users/JamesP")
      .send({
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
        settings: {
          searchRadius: 100,
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400 Error if Update Data is malformed", () => {
    return request(app)
      .patch("/api/users/JamesO")
      .send({
        avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
        settings: {
          searchRadius: "peanuts",
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("200 code if only partial update", () => {
    return request(app)
      .patch("/api/users/JamesO")
      .send({
        settings: {
          searchRadius: 100,
          location: {
            lon: -0.13071,
            lat: 51.52813,
          },
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            username: "JamesO",
            avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
            settings: {
              searchRadius: 100,
              location: {
                lon: -0.13071,
                lat: 51.52813,
              },
            },
          })
        );
      });
  });
});

describe('GET /api/sights"', () => {
  test("Should return a 200 status, with an array of location objects on success", () => {
    const username = "JamesO";

    return request(app)
      .get(`/api/sights?username=${username}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.constructor).toEqual(Array);
        expect(body.length).toEqual(26);
      });
  }, 20000);

  test("Should return a 200 status, with a filtered array of location objects on success, when given a user with defined filters", () => {
    const username = "DwayneA";

    return request(app)
      .get(`/api/sights?username=${username}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.constructor).toEqual(Array);
        expect(body.length).toEqual(4);
      });
  }, 20000);
  test("Should return 404 not found error when passed an incorrect username", () => {
    return request(app)
      .get("/api/sights?username=JamesP")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("ROUTES /api/routes/:username", () => {
  test("POST request returns 201 status, with a response of a `route` object", () => {
    const body = elements;
    return request(app)
      .post(`/api/routes/JamesO`)
      .send(body)
      .expect(201)
      .then(({ body }) => {
        const routeObject = body;

        expect(routeObject.sights.constructor).toEqual(Array);
        expect(routeObject.routePolyLine.constructor).toEqual(Array);
      });
  });
  test("Returns 400, when sent an invalid route object body", () => {
    const body = [
      {
        type: "node",
        id: 25475389,
        lat: 51.5220351,
        tags: {
          artwork_type: "statue",
          description: "maybe a queen",
          tourism: "monument",
          wheelchair: "yes",
        },
      },
      {
        type: "node",
        id: 25508658,
        lat: 51.5217357,
        tags: {
          artwork_type: "statue",
          description: "mother and baby",
          wheelchair: "yes",
        },
      },
    ];

    return request(app)
      .post(`/api/routes/JamesO`)
      .send(body)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("Returns 404, when making the request with a non-existent user ", () => {
    const body = [
      {
        type: "node",
        id: 25475389,
        lat: 51.5265807,
        lon: -0.1292505,
        tags: {
          amenity: "cafe",
          fixme: "not on FHRS",
          name: "Woburn Cafe",
        },
      },
      {
        type: "node",
        id: 257937397,
        lat: 51.5231854,
        lon: -0.138689,
        tags: {
          "addr:city": "London",
          "addr:housenumber": "72",
          "addr:postcode": "W1T 5DU",
          "addr:street": "Grafton Way",
          amenity: "pub",
          check_date: "2023-05-26",
          "fhrs:id": "426441",
          indoor_seating: "yes",
          name: "The Grafton Arms",
          outdoor_seating: "yes",
          roof_terrace: "yes",
          "source:addr": "FHRS Open Data",
          website: "https://www.graftonarms.co.uk/",
        },
      },
    ];

    return request(app)
      .post(`/api/routes/Cathulu`)
      .send(body)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
describe("ROUTES by Username - /api/routes/:username", () => {
  test("Returns 200 and an array of route objects", () => {
    return request(app)
      .get("/api/JamesO/routes")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length !== 0).toBe(true);
      });
  });
  test("Returns 200, and empty routes array when requesting routes for non-existent user", () => {
    return request(app)
      .get("/api/James(Evil)/routes")
      .expect(200)
      .then(({ body }) => {
        expect(body.length === 0).toBe(true);
      });
  });
});
describe("ROUTES by ID", () => {
  test("GET /api/routes/:id", () => {
    return connection()
      .then(() => {
        return Route.find({}).exec();
      })
      .then((response) => {
        const { _id } = response[0];

        return request(app).get(`/api/routes/${_id.toString()}`).expect(200);
      })
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            name: "Sausage Roll Route",
            username: "JamesO",
            routePolyLine: expect.any(Array),
            sights: expect.any(Array),
          })
        );
      });
  });
});

describe("PATCH /api/routes/:id", () => {
  test('201: correctly updates the route object properties', () => {
    return connection()
    .then(() => {
      return Route.find({}).exec();
    })
    .then((response) => {
      const { _id } = response[0];
      const body = {
        name: 'Philip'
      }
      return request(app).patch(`/api/routes/${_id.toString()}`)
      .expect(201)
      .send(body)
    })
    .then(({body}) => {
      expect(body).toEqual(expect.objectContaining({
        name: 'Philip' 
      }))
    })  
  })
  test('400 returns bad request when passed malformed body', () => {
    return connection()
    .then(() => {
      return Route.find({}).exec();
    })
    .then((response) => {
      const { _id } = response[0];
      const body = {
        nkme: 'Philip'
      }
      return request(app).patch(`/api/routes/${_id.toString()}`)
      .send(body)
      .expect(400)
    })
    .then(({body}) => {
      expect(body.msg).toEqual('bad request')})
  })
  test('404 returns bad request when passed malformed body', () => {
    const body = {
      name: 'Philip'
    }
      return request(app).patch(`/api/routes/665050b935948685ed5cb917`)
      .send(body)
      .expect(404)
    .then(({body}) => {
      expect(body.msg).toEqual('not found')})
  })
})
describe('DELETE /api/routes/:id', () => {
  test('204 Correctly removes route', () => {
    return connection()
    .then(() => {
      return Route.find({}).exec();
    })
    .then((response) => {
      const { _id } = response[0];
      return request(app).delete(`/api/routes/${_id.toString()}`)
      .expect(204)
    })
  })
})

describe('PATCH: /api/sights/:sightsId', () => {
  test('Correctly update sight with sent information', () => {
  
    const body = 
      {
        inc_rating: 3
      } 
    
    return request(app)
    .patch('/api/sights/294599679')
    .send(body)
    .expect(201)
    .then(({body}) => {
      expect(body.id).toBe(294599679)
      expect(body.totalRating).toBe(3)
      expect(body.numberOfVotes).toBe(1)
    })
  })
  test("404 Returns not found if passed a sight that doesn't exist", () => {
    const body = 
      {
        inc_rating: 3
      }  
    return request(app)
    .patch('/api/sights/1')
    .send(body)
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('not found')
    })
  })
  test("400 Returns bad request if passed malformed body withincorrect key name", () => {
    const body = 
      {
        incting: 3
      }  
    return request(app)
      .patch('/api/sights/294599679')
    .send(body)
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('bad request')
    })
  })
  test("400 Returns bad request if passed malformed body with incorrect data type", () => {
    const body = 
      {
        inc_rating: 'peanuts'
      }  
    return request(app)
      .patch('/api/sights/294599679')
    .send(body)
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('bad request')
    })
  })
})