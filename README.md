# WebValidate Azure Devops Pipeline Task
A task for running [Web Validate](https://github.com/retaildevcrews/webvalidate) in your Azure Pipelines.

The task is currently in development and not available in the Marketplace, but will be soon! :)

```yaml
- task: web-validate@0
  inputs:
    server: 'https://hattan.io'
    files: 'hattan.json'
```

The task can be used in a yaml or visual pipeline.

## Inputs

* server
  - base Url (i.e. `https://www.microsoft.com`)
  - required

* filename
  - a json test file
  - default baseline.json
  - default location ./TestFiles/

(WebV supports multiple file inputs, that feature will be added soon to webvalidate-action)

## Sample `microsoft.com` validation tests

The [msft.json](TestFiles/msft.json) file contains sample validation tests that will will successfully run against the `microsoft.com` endpoint (assuming content hasn't changed)

- note that http status codes are not specified when 200 is expected
- note that ContentType is not specified when the default of application/json is expected

### Redirect from home page

- Note that redirects are not followed

```json

{
  "Url":"/",
  "Validation":
  {
    "Code":302
  }
}

```

### home page (en-us)

```json

{
  "Url":"/en-us",
  "Validation":
  {"
    ContentType":"text/html",
    "Contains":
    [
      { "Value":"<title>Microsoft - Official Home Page</title>" },
      { "Value":"<head data-info=\"{" }
    ]
  }
}

```

### favicon

```json
{
  "Url": "/favicon.ico",
  "Validation":
  {
    "ContentType":"image/x-icon"
  }
}
```

### robots.txt

```json
{
  "Url": "/robots.txt",
  "Validation":
  {
    "ContentType": "text/plain",
    "MinLength": 200,
    "Contains":
    [
      { "Value": "User-agent: *" },
      { "Value": "Disallow: /en-us/windows/si/matrix.html"}
    ]
  }
}
```

## Contributing

This project welcomes contributions and suggestions. 
