'use strict';

const elasticSearch = Object.freeze([
    {
        date: '2016-01-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'All Applications',
        ip: '127.0.0.1',
        user_id: 'auth0|1',
        user_name: 'user1@email.com',
        tenant: 'foo'
    },
    {
        date: '2016-01-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'All Applications',
        ip: '127.0.0.1',
        user_id: 'auth0|2',
        user_name: 'user2@email.com',
        tenant: 'bar'
    }
]);

/*
 * The format each ES entity should be returned
 * by the API
 */
const expectations = Object.freeze([
    {
        date: '2016-01-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'All Applications',
        ip: '127.0.0.1',
        user_id: 'auth0|1',
        user_name: 'user1@email.com',
        _id: 0
    },
    {
        date: '2016-01-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'All Applications',
        ip: '127.0.0.1',
        user_id: 'auth0|2',
        user_name: 'user2@email.com',
        _id: 1
    }
]);

module.exports = {
    elasticSearch,
    expectations
};
