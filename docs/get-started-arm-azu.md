---
title: Azure - Arm Templates
slug: /get-started-azu-arm
---

### Requirements

- An Azure subscription [(free to start)](https://azure.microsoft.com/en-us/free/)
- [Docker](https://docs.docker.com/get-docker/)

## Step 1: Generate a new Runiac project

If you haven't already, generate a new Runiac project using the starter:

```shell
runiac new my-runiac-arm-project --url github.com/runiac/runiac-starter-arm-azure-hello-world
```

## Step 2: Run a deploy

Run a local deployment in the newly created `my-runiac-arm-project` folder:

```shell
runiac deploy -a <azure-subscription-id> --local
```

Open `step1/default/main.json` and start adding resources. Once ready to test run the same `runiac deploy` command.

## Step 3: Run a destroy (Clean up)

Finally, You can clean up any resources that were created by runiac with the `--self-destroy` flag:

```shell
runiac deploy -a <azure-subscription-id> --local --self-destroy
```

## That's it!

Congratulations! You've successfully run, modified and destroyed your Runiac project.

### Important Notes

This example assumes you are using your own login credentials to deploy infrastructure. In a production situation it is recommended to use a [service principal](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals), especially
if you intend to use runiac in a CI/CD pipeline.

In the context of an Azure YAML pipeline, you can obtain these values by setting the `addSpnToEnvironment` input to `true` on the
[AzureCLI@2](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/deploy/azure-cli?view=azure-devops) task.
