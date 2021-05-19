---
title: Azure Terraform
slug: /get-started-azu-terraform
---

## Step 1: Generate a new Runiac project

If you haven't already, generate a new Runiac project using the azure terraform starter:

```shell
runiac new my-runiac-terraform-project --url github.com/optum/runiac//examples/terraform-azure-hello-world
```

## Step 2: Run a deploy

Run a local deployment in the newly created `my-runiac-terraform-project` folder:

```shell
runiac deploy -a <azure-subscription-id> --local
```

Open `step1/default/main.tf` and start adding resources. Once ready to test run the same `runiac deploy` command.

## That's it!

Congratulations! You've successfully run and modified your Runiac project.
