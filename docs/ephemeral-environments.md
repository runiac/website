---
title: Ephemeral Environments
slug: /f/ephemeral
---

Runiac provides a framework for leveraging ephemeral environments as first class citizens in your development experience. This is extremely helpful when creating on-demand developer cloud environments for local development, testing pull request changes in a living environment or blue/green environment management.

Runiac provides easy to use cli arguments and conventionlized iac input variables for managing ephemeral environments.

### Namespace

`runiac_namespace` is the input variable used to label ephemeral environments.

### Local Development

Appending the `--local` to deploy will set the `runiac_namespace` input variable to the executing machine's name.

### Pull Requests

Appending the `--pull-request {id}` argument to deploy will set the `runiac_namespace` input variable to the provided `{id}` value.
