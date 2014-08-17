'use strict';

describe('userService', function () {
  var UserService, STORAGE_USER_ID, STORAGE_SETTINGS_ID;

  beforeEach(module('nas'));
  beforeEach(module('notificationServices'));

  beforeEach(function () {
    inject(function (userService, _STORAGE_USER_ID_, _STORAGE_SETTINGS_ID_) {
      UserService = userService;
      STORAGE_USER_ID = _STORAGE_USER_ID_;
      STORAGE_SETTINGS_ID = _STORAGE_SETTINGS_ID_;
    });
    localStorage.removeItem(STORAGE_SETTINGS_ID);
    localStorage.removeItem(STORAGE_USER_ID);
  });

  it('saves user data to local storage', function () {
    UserService.save();
    var settings = JSON.parse(localStorage[STORAGE_SETTINGS_ID]);
    var user_id = JSON.parse(localStorage[STORAGE_USER_ID]);
    settings.should.eql(UserService.settings);
    user_id.should.eql(UserService.user);
  });
});