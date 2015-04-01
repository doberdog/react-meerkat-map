'use strict';

const db = {
  addUser(client, data, next) {
    client.sismember('users', 'user:' + data.access_token, (err, exists) => {
      if (err) {
        return next(err);
      }

      // Existing user
      if (exists) {
        client.hgetall('user:' + data.access_token, (err, user) => {
          if (err) {
            return next(err);
          }

          return next(null, user);
        });
      // New user
      } else {
        const user = {
          id: data.user.id,
          username: data.user.username,
          full_name: data.user.full_name,
          profile_picture: data.user.profile_picture,
          access_token: data.access_token
        };

        client.hmset('user:' + data.access_token, user, (err) => {
          if (err) {
            return next(err);
          }

          client.sadd('users', 'user:' + data.access_token);
          client.sadd('tokens', data.access_token);

          return next(null, user);
        });
      }
    });
  },

  deleteUser(client, token, next) {
    client.del('user:' + token, (err) => {
      if (err) {
        return next(err);
      }

      client.srem('users', 'user:' + token);
      client.srem('tokens', token);

      return next();
    });
  },

  getTokens(client, next) {
    client.smembers('tokens', (err, tokens) => {
      if (err) {
        return next(err);
      }

      return next(null, tokens);
    });
  }
};

module.exports = db;