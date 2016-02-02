module.exports = {
    "properties": {
        "tenant":{
            "type": "string",
            "index": "not_analyzed"
        },
        "type":{
            "type": "string",
            "index": "not_analyzed"
        },
        "date":{
            "type": "date"
        },
        "client_id":{
            "type": "string",
            "index": "not_analyzed"
        },
        "client_name":{
            "type": "string",
            "index": "not_analyzed"
        },
        "user_id":{
            "type": "string",
            "index": "not_analyzed"
        },
        "description": {
            "type" : "string",
            "index": "analyzed"
        },
        "user_name":{
            "type": "string",
            "index": "not_analyzed"
        },
        "details":{
            "type": "object",
            "enabled": false
        },
        "connection":{
            "type": "string",
            "index": "not_analyzed"
        },
        "user_agent":{
            "type": "string",
            "index": "analyzed"
        },
        "impersonator_user_id":{
            "type": "string",
            "index": "not_analyzed"
        },
        "impersonator_user_name": {
            "type": "string",
            "index": "not_analyzed"
        },
        "strategy":{
            "type": "string",
            "index": "not_analyzed"
        },
        "strategy_type":{
            "type": "string",
            "index": "not_analyzed"
        },
        "auth0_client":{
            "type": "object",
            "enabled": false
        },
        "ip": {
            "type": "ip"
        }
    }
};
