# logger
Formatted logging for google cloud projects using the right severity with a maximum of 1000 characters.

Severity: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
Strucutred log example: https://cloud.google.com/functions/docs/monitoring/logging#writing_structured_logs
Structured log format https://cloud.google.com/run/docs/logging#log-resource 

Logging is called by 

```
logger.{severity}(message[,..args])
```

e.g.

```
logger.info('Text to Log', { key: 1 })
```

will result in the google format:

```
{
    "severity": "INFO",
    "message": "Text to Log { key: 1 }",
    "timestamp": "2021-03-10T11:45:09.080Z"
}
```

and is logged as JSON.stringified:

````
{"severity": "INFO","message": "Text to Log { key: 1 }","timestamp": "2021-03-10T11:45:09.080Z"}
```

## Testing

When testing (`process.env.NODE_ENV === 'test'`) the log is wirtten into a single line, e.g.

```
2021-03-10T11:45:09.080Z - INFO -- Text to Log { key: 1 }
```