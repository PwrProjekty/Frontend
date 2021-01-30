const startPoint = '1. 50.6/20.8 Rusinowa Polana';
const endPoint = '2. 122/15 Łysa Polana';
const area = '1. Tatry Wysokie - T.01';
const points = 10;

module.exports = {
  'Add trail without correct data - Test': function (browser) {
    browser
      .url('http://localhost:8080/Frontend/')
      .waitForElementVisible('#nav_trails_admin')
      .click('#nav_trails_admin')
      .waitForElementVisible('.add')
      .click('.add')
      .waitForElementVisible('.confirm')
      .click('.confirm')
      .waitForElementVisible('.error_message')
      .assert
      .containsText('.error_message', 'Proszę uzupełnić wszystkie pola');
    browser.end();
  },

  'Add trail with negative point value - Test': function (browser) {
    browser
      .url('http://localhost:8080/Frontend/')
      .waitForElementVisible('#nav_trails_admin')
      .click('#nav_trails_admin')
      .waitForElementVisible('.trail_row')
      .waitForElementVisible('.add')
      .click('.add')
      .waitForElementVisible('#add_trail_start')
      .setValue('#add_trail_start', startPoint)
      .waitForElementVisible('#add_trail_end')
      .setValue('#add_trail_end', endPoint)
      .waitForElementVisible('#add_trail_area')
      .setValue('#add_trail_area', area)
      .waitForElementVisible('.confirm')
      .click('.confirm')
      .waitForElementVisible('.error_message')
      .assert
      .containsText('.error_message', 'Punkty powinny być liczbą dodatnią')
      .clearValue('#add_trail_points')
      .setValue('#add_trail_points', -5)
      .waitForElementVisible('.confirm')
      .click('.confirm')
      .waitForElementVisible('.error_message')
      .assert
      .containsText('.error_message', 'Punkty powinny być liczbą dodatnią');
    browser.end();
  },

  'Add trail with correct data - Test': function (browser) {
    browser
      .url('http://localhost:8080/Frontend/')
      .waitForElementVisible('#nav_trails_admin')
      .click('#nav_trails_admin')
      .waitForElementVisible('.trail_row')
      .waitForElementVisible('.add')
      .click('.add')
      .waitForElementVisible('#add_trail_start')
      .setValue('#add_trail_start', startPoint)
      .waitForElementVisible('#add_trail_end')
      .setValue('#add_trail_end', endPoint)
      .waitForElementVisible('#add_trail_area')
      .setValue('#add_trail_area', area)
      .clearValue('#add_trail_points')
      .setValue('#add_trail_points', points)
      .waitForElementVisible('.confirm')
      .click('.confirm')
      .end();
  },
};
