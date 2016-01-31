# api-logs

An API to fetch logs stored in ElasticSearch. Available endpoints:

```GET /api/logs/:id```

Returns the log with the specified id.


```GET /api/logs?search={criteria}&from={from}&size={size}&sort={sort_fields}```

Returns logs that match with the specified criteria.

* from: offset from the first result
* size: number of results to fetch
* sort: comma separated list of fields to sort
* sort_mode: asc or desc
* criteria: JSON object with the following structure:
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

text_field can be "client", "connection", "user_name", "user_id", "ip" or "full". Multiple entries of text_field can be added if you wish to search on more than one field. The "full" option makes the search on all fields, so any other text_field entry specified will be ignored. If the text_field type is not specified, it defaults to startswith.

