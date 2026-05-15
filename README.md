# @peaksandpies/logger

A smart Winston wrapper for structured logging across different environments, specifically optimized for Google Cloud Platform (GCP).

## Why this logger?

While Winston is powerful, configuring it correctly for different cloud environments (Cloud Functions vs. Kubernetes vs. Local) can be tedious. This wrapper provides:

- **Zero-Config**: No need to tell the logger where it's running; it detects it automatically.
- **GCP Ready**: Proper severity levels (e.g., `WARNING` instead of `warn`) and structured JSON output for perfect integration with Google Cloud Logs Explorer.
- **Smart Error Handling**: Automatically extracts stack traces and preserves nested error objects.

## Features

- **Automatic Environment Detection**: Automatically detects if it's running in a Cloud Function, on Kubernetes, or locally.
- **Structured Logging**: Automatically generates the correct format (JSON for Cloud, Text for Local).
- **Automatic Truncation**: To save on logging costs, messages are truncated at 1000 characters by default (configurable for debug levels).
- **Enhanced Error Handling**: Automatic capture and formatting of stack traces.

## Installation

```bash
npm install @peaksandpies/logger[#version]
```

## Usage

```js
const logger = require('@peaksandpies/logger')

// Simple logging
logger.info('Server started on port 8080')

// Logging with metadata
logger.error('Database connection failed', { dbHost: 'localhost', retry: true })

// Logging Error objects (including stack trace)
logger.error(new Error('Critical system failure'))
```

### Best Practices

- **Log Objects, not Strings**: Instead of `logger.info("User " + id + " logged in")`, use `logger.info("User logged in", { userId: id })`. This allows you to filter by `jsonPayload.userId` in Google Cloud Logs Explorer.
- **Global Context**: Use `setGlobalLabels` to add a trace ID or job ID to every log entry in the current process.

```js
const { setGlobalLabels } = require('@peaksandpies/logger')

setGlobalLabels({
  jobId: 'abc-123',
  service: 'user-service',
})
```

## Environments (Runtimes)

The logger detects the environment automatically based on standard variables.

| Environment        | Trigger Variable          | Format            | Description                                                                       |
| :----------------- | :------------------------ | :---------------- | :-------------------------------------------------------------------------------- |
| **local**          | Default                   | Plain Text        | Human-readable output with colors.                                                |
| **cloud-function** | `K_SERVICE`               | JSON              | Single-line JSON for Cloud Functions & Cloud Run.                                 |
| **kubernetes**     | `KUBERNETES_SERVICE_HOST` | JSON              | Enhanced JSON with recursive error preservation and Stackdriver severity mapping. |
| **cloud-logging**  | `NODE_RUN=cloud-logging`  | Winston Transport | Directly to GCP Logging API (no console output).                                  |

### Runtime Details

#### cloud-function

Highly optimized for serverless environments. It outputs stringified JSON that Google Cloud automatically parses into structured logs.

- [Severity Reference](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity)

#### kubernetes

Goes beyond standard JSON logging by recursively scanning log objects for `Error` instances and converting them into a serializable format, ensuring no stack trace is lost in deep object structures.

## Development & Testing

This project uses Jest for automated testing.

```bash
npm test
npm test -- --coverage
```
