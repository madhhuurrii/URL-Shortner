const { assert } = require('chai');
const { getUserByEmail, urlsForUser } = require('../helpers');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};


describe('getUserByEmail', () => {
  it('should return the user object with that valid email', () => {
    const user = getUserByEmail('user@example.com', testUsers);
    const expectedOutput = testUsers['userRandomID'];

    assert.deepEqual(user, expectedOutput);
  });
  it('should return false if it cannot find a matching email in the database', () => {
    const user = getUserByEmail('cat@cat.com', testUsers);
    assert.isUndefined(user);
  });
});

const testUrls = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: 'defaut' },
  "9sm5xK": { longURL: "http://www.google.com", userID: '1234' },
  "7asdf3": { longURL: "http://www.twitter.com", userID: '1234' }
};


describe('urlsForUser', () => {
  it('should return an object of URL\'s with userID: matching argument id', () => {
    const output = urlsForUser('1234', testUrls)
    const expectedOutput = {
      "9sm5xK": { longURL: "http://www.google.com", userID: '1234' },
      "7asdf3": { longURL: "http://www.twitter.com", userID: '1234' }
    };
    assert.deepEqual(output, expectedOutput)
  })
  it('should return an empty object if no userID keys match id arg', () => {
    const output = urlsForUser('hello', testUrls)
    const expectedOutput = {};
    assert.deepEqual(output, expectedOutput)
  })

})