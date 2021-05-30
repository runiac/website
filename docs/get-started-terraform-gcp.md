---
title: GCP - Terraform
slug: /get-started-gcp-terraform
---

### Requirements

- GCP Project [(free to start)](https://cloud.google.com/free)
- [Docker](https://docs.docker.com/get-docker/)

## Step 1: Generate a new Runiac project

If you haven't already, generate a new Runiac project using the starter:

```shell
runiac new my-runiac-terraform-project --url github.com/runiac/runiac-starter-terraform-gcp-hello-world
```

## Step 2: Run a deploy

Run a local deployment in the newly created `my-runiac-terraform-project` folder:

```shell
runiac deploy -a <gcp-project-id> --local
```

Open `step1/default/main.tf` and start adding resources. Once ready to test run the same `runiac deploy` command.

## Step 3: Run a destroy (Clean up)

Finally, You can clean up any resources that were created by runiac with the `--self-destroy` flag:

```shell
runiac deploy -a <gcp-project-id> --local --self-destroy
```

## That's it!

Congratulations! You've successfully run, modified and destroyed your Runiac project.
