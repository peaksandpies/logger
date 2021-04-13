# logger
Formatted for different runtimes, such as logging for google cloud projects using the right severity with a maximum of 1000 characters.

The different formats for the runtimes are written, using winston and can be found inside the `lib/runtime` folder.

Logging is called by

```js
logger.{severity}(message[,..args])
```

e.g.

```js
logger.info('Text to Log', { key: 1 })
```
## Formats

depending on the envrionment variable `NODE_RUN` (`process.env.NODE_RUN = 'cloud-function'`), it will result in different formats. Currently the following `NODE_RUNs` / formats are possible:
* local
* cloud-function
* cloud-logging

### local

The default format is local (`NODE_RUN = 'local'`) and the log is written into a single line on the local console, e.g.

```bash
2021-04-09T07:30:45.467Z - INFO -- Text to Log { key: 1 }
```

### cloud-function

Logs into a structured logging format for google cloud functions. This is a stringified JSON containing serverity, message and timestamp.

See documentation:
* Severity: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
* Strucutred log example: https://cloud.google.com/functions/docs/monitoring/logging#writing_structured_logs
* Structured log format https://cloud.google.com/run/docs/logging#log-resource

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

### cloud-logging

Is used inside compute instances for example, to send logs directly to the google cloud logging services. There is nothing to see inside the console. Google project and service account are the same as them who are running the process.
