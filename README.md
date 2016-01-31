# api-logs

Endpoints:

```GET /api/logs/:id```
Returns the log with the specified id.

```GET /api/logs?search={criteria}```
Returns logs that match with the specified criteria.

Criteria is a JSON object with the following structure:
```
{
  "{text_field}": {
    "value": "{value}",
    "type": "{startswith|exact}"
  },
  "date": {
    "from": "{from_date}",
    "to": "{to_date}"
  }
}
```

text_field can be "client", "connection", "user", "ip" or "full". Multiple entries of text_field can be done if you wish to fetch more than one field. The "full" option makes the search on all fields, so any other text_field entry specified will be ignored.
