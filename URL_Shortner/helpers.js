//gen random string for shortURL
const generateRandomString = () => {
  return Math.random().toString(20).substr(2, 6);
};

const getUserByEmail = (email, database) => {
  for (let user in database) {
    if (database[user].email === email) {
      return database[user];
    }
  }
  return undefined;
};
//returns object of urls which match the cookie user_id
const urlsForUser = (id, database) => {
  const userUrls = {};
  for (let item in database) {
    if (database[item].userID === id) {
      userUrls[item] = database[item];
    }
  }
  return userUrls;
};

module.exports = {
  generateRandomString,
  getUserByEmail,
  urlsForUser
}