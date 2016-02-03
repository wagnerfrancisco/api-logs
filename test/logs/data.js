'use strict';

const elasticSearch = Object.freeze([
    {
        date: '2015-09-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'app1',
        ip: '1.1.1.1',
        user_id: 'auth0|1',
        user_name: 'user1@email.com',
        tenant: 'foo'
    },
    {
        date: '2015-10-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'app1',
        ip: '1.1.1.3',
        user_id: 'auth0|2',
        user_name: 'user2@email.com',
        tenant: 'foo'
    },
    {
        date: '2015-11-30T21:41:10.163Z',
        connection: 'Bluth-Connection',
        client_name: 'app2',
        ip: '1.1.1.2',
        user_id: 'auth0|1',
        user_name: 'user1@email.com',
        tenant: 'foo'
    },
    {
        date: '2015-12-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'app2',
        ip: '1.1.1.3',
        user_id: 'auth0|2',
        user_name: 'user2@email.com',
        tenant: 'foo'
    }
]);

/*
 * The format each ES entity should be returned
 * by the API
 */
const expectations = Object.freeze([
    {
        date: '2015-09-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'app1',
        ip: '1.1.1.1',
        user_id: 'auth0|1',
        user_name: 'user1@email.com',
        _id: 0
    },
    {
        date: '2015-10-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'app1',
        ip: '1.1.1.3',
        user_id: 'auth0|2',
        user_name: 'user2@email.com',
        _id: 1
    },
    {
        date: '2015-11-30T21:41:10.163Z',
        connection: 'Bluth-Connection',
        client_name: 'app2',
        ip: '1.1.1.2',
        user_id: 'auth0|1',
        user_name: 'user1@email.com',
        _id: 2
    },
    {
        date: '2015-12-30T21:41:10.163Z',
        connection: 'Username-Password-Authentication',
        client_name: 'app2',
        ip: '1.1.1.3',
        user_id: 'auth0|2',
        user_name: 'user2@email.com',
        _id: 3
    }
]);

module.exports = {
    elasticSearch,
    expectations
};
