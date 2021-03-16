# logger
Formatted logging for google cloud projects using the right severity with a maximum of 1000 characters.

Severity: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
Strucutred log example: https://cloud.google.com/functions/docs/monitoring/logging#writing_structured_logs
Structured log format https://cloud.google.com/run/docs/logging#log-resource

Logging is called by

```js
logger.{severity}(message[,..args])
```

e.g.

```js
logger.info('Text to Log', { key: 1 })
```

will result in the google format:

```js
{
    "severity": "INFO",
    "message": "Text to Log { key: 1 }",
    "timestamp": "2021-03-10T11:45:09.080Z"
}
```

and is logged as JSON.stringified:

```js
{"severity": "INFO","message": "Text to Log { key: 1 }","timestamp": "2021-03-10T11:45:09.080Z"}
```

## Testing

When testing (`process.env.NODE_ENV === 'test'`) the log is written into a single line, e.g.

```bash
2021-03-10 - INFO -- Text to Log { key: 1 }
```
