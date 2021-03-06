# api-logs

An API to fetch logs stored in ElasticSearch. Available endpoints:

```GET /api/logs/:id```

Returns the log with the specified id.

---

```GET /api/users/:user_id/logs```

Returns the logs of the specified user.

---

```GET /api/logs?page={page}&per_page={per_page}&sort={sort}&{field}={value}&date_from={from}&date_to={to}```

Returns logs that match with the specified criteria.

* page: The page number. Zero based.
* per_page: The amount of entries per page. 
* sort: The field to use for sorting. 1 == ascending and -1 == descending
* field: any of the text fields ("client", "connection", "user", "ip") or "all". If value is "all" we'll do a fuzzy search on all the specified text fields. Otherwise will do a exact search on the specified field. You can add multiple fields.
* from: a date lower limit to fetch results
* to: a date upper limit to fetch results

##### How to Run

* Clone the repo
* npm install
* ensure you have Elastic Search running on port 9200
* npm test
* npm start
