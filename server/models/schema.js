const { DataTypes } = require("sequelize");

const connection = require("../utils/DBConnection");

const User = connection.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  weight: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  bodyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hobbies: {
    type: DataTypes.STRING(1000),
    defaultValue: "",
    get() {
      return this.getDataValue("hobbies")?.split(";");
    },
    set(value) {
      this.setDataValue("hobbies", value.join(";"));
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  socketId: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  },
  age: {
    type: DataTypes.INTEGER,
    set(value) {
      var ageDifMs = Date.now() - this.birthday?.getTime();
      var ageDate = new Date(ageDifMs);
      this.setDataValue("age", Math.abs(ageDate.getUTCFullYear() - 1970));
    },
  },
});

const Admin = connection.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Location = connection.define("Location", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Request = connection.define("Request", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Chat = connection.define("Chat", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const MatchCriteria = connection.define("MatchCriteria", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  heightRange: {
    type: DataTypes.STRING,
  },
  weightRange: {
    type: DataTypes.STRING,
  },
  ageRange: {
    type: DataTypes.STRING,
  },
  hobbies: {
    type: DataTypes.STRING,
    get() {
      return this.getDataValue("hobbies").split(";");
    },
    set(value) {
      this.setDataValue("hobbies", value.join(";"));
    },
  },
  hStart: {
    type: DataTypes.VIRTUAL,
    get() {
      const range = this.heightRange.split("-");
      return parseFloat(range[0]);
    },
  },
  hEnd: {
    type: DataTypes.VIRTUAL,
    get() {
      const range = this.heightRange.split("-");
      return parseFloat(range[1]);
    },
  },
  aStart: {
    type: DataTypes.VIRTUAL,
    get() {
      const range = this.ageRange.split("-");
      return parseFloat(range[0]);
    },
  },
  aEnd: {
    type: DataTypes.VIRTUAL,
    get() {
      const range = this.ageRange.split("-");
      return parseFloat(range[1]);
    },
  },
  wStart: {
    type: DataTypes.VIRTUAL,
    get() {
      const range = this.weightRange.split("-");
      return parseFloat(range[0]);
    },
  },
  wEnd: {
    type: DataTypes.VIRTUAL,
    get() {
      const range = this.weightRange.split("-");
      return parseFloat(range[1]);
    },
  },
});

const Post = connection.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Feedback = connection.define("Feedback", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Suggestion = connection.define("Suggestion", {
  requested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  //firstname: {
  //  type: DataTypes.STRING,
  //  allowNull: false,
  //},
  //lastname: {
  //  type: DataTypes.STRING,
  //  allowNull: false,
  //},
  //username: {
  //  type: DataTypes.STRING,
  //  allowNull: false,
  //},
});

const Block = connection.define("Block", {});
const Coupled = connection.define("Coupled", {});
const Matched = connection.define("Matched", {
  requested: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
const Conversation = connection.define("Conversation", {});

const Advertise = connection.define("Advertise", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  company: {
    type: DataTypes.STRING,
  },
  service: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
});

User.hasOne(MatchCriteria);

User.hasMany(Feedback);
Feedback.belongsTo(User);

Post.belongsTo(User);
User.hasMany(Post);

Chat.belongsTo(User, {
  as: "sender",
  foreignKey: "sender_id",
  constraints: false,
});

Chat.belongsTo(User, {
  as: "receiver",
  foreignKey: "receiver_id",
  constraints: false,
});

Conversation.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  constraints: false,
});
Conversation.belongsTo(User, {
  as: "partner",
  foreignKey: "partner_id",
  constraints: false,
});
Suggestion.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  constraints: false,
});
Suggestion.belongsTo(User, {
  as: "suggested",
  foreignKey: "suggested_id",
  constraints: false,
});
Block.belongsTo(User, {
  as: "blocker",
  foreignKey: "blocker_id",
  constraints: false,
});
Block.belongsTo(User, {
  as: "blocked",
  foreignKey: "blocked_id",
  constraints: false,
});
Coupled.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  constraints: false,
});
Coupled.belongsTo(User, {
  as: "partner",
  foreignKey: "partner_id",
  constraints: false,
});

Matched.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  constraints: false,
});
Matched.belongsTo(User, {
  as: "partner",
  foreignKey: "partner_id",
  constraints: false,
});

Request.belongsTo(User, {
  as: "sender",
  foreignKey: "sender_id",
  constraints: false,
});

Request.belongsTo(User, {
  as: "receiver",
  foreignKey: "receiver_id",
  constraints: false,
});

module.exports.User = User;
module.exports.Admin = Admin;
module.exports.Location = Location;
module.exports.Request = Request;
module.exports.Coupled = Coupled;
module.exports.Conversation = Conversation;
module.exports.Block = Block;
module.exports.Matched = Matched;
module.exports.MatchCriteria = MatchCriteria;
module.exports.Suggestion = Suggestion;
module.exports.Chat = Chat;
module.exports.Feedback = Feedback;
module.exports.Post = Post;
module.exports.Advertise = Advertise;

//connection.sync({ force: true });
