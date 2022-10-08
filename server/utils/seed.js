const { User, Matched, Request, Admin } = require("../models/schema");
const faker = require("faker");
const bcrypt = require("bcrypt");
const C = require("./consts");
const users = [];

for (let index = 0; index < 100; index++) {
  let name = faker.name.firstName();
  let user = {
    firstname: name,
    lastname: faker.name.firstName(),
    gender: faker.helpers.randomize(["male", "female"]),
    height: faker.datatype.float({ min: 110, max: 210, precision: 0.001 }),
    weight: faker.datatype.float({ min: 30, max: 150, precision: 0.001 }),
    bodyType: faker.helpers.randomize(C.bodyTypes).value,
    religion: faker.helpers.randomize(C.religions).value,
    email: faker.internet.email(),
    birthday: faker.date
      .between("2018-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
      .toString(),
    username: faker.internet.userName(name),
    bio: faker.random.words(12),
    password: "$2a$10$GnOrPzG9Vz7OuhaVspLR0eeH9WMoOrXsWbiQmtFXILoKv8JwEXWpa",
    login_status: faker.datatype.boolean(),
    socketId: null,
    longitude: faker.datatype.float({ min: -99, max: 99, precision: 0.000001 }),
    latitude: faker.datatype.float({ min: -99, max: 99, precision: 0.000001 }),
    hobbies: [
      faker.name.jobTitle(),
      faker.name.jobTitle(),
      faker.name.jobTitle(),
      faker.name.jobTitle(),
    ],
  };

  User.create(user).then(({ data }) => console.log("done"));
}
const admin = {
  firstname: "Biruk",
  lastname: "Aklilu",
  email: "admin@mail.com",
  username: "admin",
  phone: "0915426245",
  password: "admin",
};

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash("admin", salt, function (err, hash) {
    admin.password = hash;
    Admin.create(admin).then((data) => console.log("done"));
  });
});

//const Matcheds = [
//  {
//    "id": 1,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 3,
//    "Matched_id": 6
//  },
//  {
//    "id": 2,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 10,
//    "Matched_id": 1
//  },
//  {
//    "id": 3,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 1,
//    "Matched_id": 7
//  },
//  {
//    "id": 4,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 3,
//    "Matched_id": 10
//  },
//  {
//    "id": 5,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 3,
//    "Matched_id": 7
//  },
//  {
//    "id": 6,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 1,
//    "Matched_id": 8
//  },
//  {
//    "id": 23,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 2,
//    "Matched_id": 1
//  },
//  {
//    "id": 24,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 1,
//    "Matched_id": 2
//  },
//  {
//    "id": 25,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 1,
//    "Matched_id": 4
//  },
//  {
//    "id": 26,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 3,
//    "Matched_id": 1
//  },
//  {
//    "id": 27,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 4,
//    "Matched_id": 1
//  },
//  {
//    "id": 28,
//    "createdAt": "2022-04-21 08:49:16",
//    "updatedAt": "2022-04-21 08:49:16",
//    "user_id": 1,
//    "Matched_id": 3
//  }
//]

//const requests = [
//  {
//    "id": 1,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 15:42:31",
//    "updatedAt": "2022-04-20 15:42:31",
//    "sender_id": 1,
//    "receiver_id": 2
//  },
//  {
//    "id": 2,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 15:59:24",
//    "updatedAt": "2022-04-20 15:59:24",
//    "sender_id": 2,
//    "receiver_id": 4
//  },
//  {
//    "id": 3,
//    "accepted": 1,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:10:22",
//    "updatedAt": "2022-04-21 08:49:16",
//    "sender_id": 2,
//    "receiver_id": 1
//  },
//  {
//    "id": 4,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:10:25",
//    "updatedAt": "2022-04-20 16:10:25",
//    "sender_id": 2,
//    "receiver_id": 6
//  },
//  {
//    "id": 5,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:10:45",
//    "updatedAt": "2022-04-20 16:10:45",
//    "sender_id": 7,
//    "receiver_id": 1
//  },
//  {
//    "id": 6,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:11:30",
//    "updatedAt": "2022-04-20 16:11:30",
//    "sender_id": 2,
//    "receiver_id": 3
//  },
//  {
//    "id": 7,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 18:37:41",
//    "updatedAt": "2022-04-20 18:37:41",
//    "sender_id": 3,
//    "receiver_id": 1
//  },
//  {
//    "id": 8,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:11:30",
//    "updatedAt": "2022-04-20 16:11:30",
//    "sender_id": 6,
//    "receiver_id": 3
//  },
//  {
//    "id": 9,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 15:42:31",
//    "updatedAt": "2022-04-20 15:42:31",
//    "sender_id": 10,
//    "receiver_id": 2
//  },
//  {
//    "id": 10,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 15:59:24",
//    "updatedAt": "2022-04-20 15:59:24",
//    "sender_id": 3,
//    "receiver_id": 4
//  },
//  {
//    "id": 11,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:10:22",
//    "updatedAt": "2022-04-20 16:10:22",
//    "sender_id": 2,
//    "receiver_id": 8
//  },
//  {
//    "id": 12,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:10:25",
//    "updatedAt": "2022-04-20 16:10:25",
//    "sender_id": 2,
//    "receiver_id": 4
//  },
//  {
//    "id": 13,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 16:10:45",
//    "updatedAt": "2022-04-20 16:10:45",
//    "sender_id": 7,
//    "receiver_id": 3
//  },
//  {
//    "id": 14,
//    "accepted": 0,
//    "rejected": 0,
//    "createdAt": "2022-04-20 18:37:41",
//    "updatedAt": "2022-04-20 18:37:41",
//    "sender_id": 3,
//    "receiver_id": 9
//  }
//]

users.forEach(async (user) => {
  await User.create(user);
});
//Matcheds.forEach(async(user) => {
//    await Matched.create(user)
//});
//requests.forEach(async(user) => {
//    await Request.create(user)
//});
