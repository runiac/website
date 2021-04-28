---
title: Containers
slug: /f/containers
---

To enable complete portability and repeatability of iac projects Runiac runs all deploys in a docker container. These containers contain the `core` runiac binary that executes all runners along with common cloud tooling such as CLIs and SDKs. Runiac provides multiple officially supported containers curated for multiple cloud use cases. The default container is a kitchen sink supporting GCP, AWS, Azure deployments.

Override the default container for your project needs by using the `--container` argument or configuration.s

## Working with Runiac Containers

The container benefit comes with additional configuration nuances, espcially for local development. No problem, we have solutions to these items.

### Persisting CLI & SDK State

To ensure consecutive runiac deploys persists credentials to avoid relogging in, runiac will volume map common CLI/SDK directories in the container to the local `.runiac` directory. One example, includes `.runiac/.azure` mapping to `/root/.azure` to ensure azure credentials are persisted between deploys to avoid re-logging in.

Mappings:

- Azure CLI: host `.runiac/.azure` mapping to container `/root/.azure`

### Persisting Local Terraform State

To ensure consecutive runiac deploys persist terraform state stored locally, runiac will volume map the `/runiac` directory of the container.

### Entrypoint

To allow for configuration of the container on start up and shutdown runiac requires an entrypoint.sh to be present. The runiac container will execute this script as the docker `Entrypoint`.

Example use cases for this can include retreiving centralized configurtion or secrets to be used in the runiac deploy.
