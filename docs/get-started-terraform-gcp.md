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

### Important Notes

Be aware that some Google Cloud Platform resources are not deleted immediately. Common examples include [IAM roles](https://cloud.google.com/iam/docs/creating-custom-roles#deleting-custom-role), among others, which remain in the system for a period of time before finally being purged
(ie: soft deletes). The Terraform provider documentation will usually [call this out](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_project_iam_custom_role) in a warning.

This has implications on ephemeral deployments; you cannot create a role with a given name, run runiac with the `--self-destroy` flag in this example, and rerun runiac immediately afterwards. GCP will detect a conflict when the same role is created again, and as a result, your deployment will fail.

For these types of resources, the recommendation is to only deploy them to non-ephemeral environments. You can leverage Terraform's `count` property and runiac's `namespace` variable to conditionally deploy such resources:

```hcl-terraform
resource "google_project_iam_custom_role" "my-custom-role" {
  count = var.namespace != "" ? 0 : 1
}
```
