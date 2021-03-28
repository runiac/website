---
title: Runners
slug: /runners
---

## ARM Templates (Azure Resource Manager)

Support for ARM template deployments is currently in preview. See the [examples/arm-azure-hello-world](https://github.com/Optum/runiac/tree/main/examples/arm-azure-hello-world)
example for a quick start project you can refer to.

### Configuration

You can tell runiac to deploy ARM templates by setting the following `runner` key in your `runiac.yml` file:

```yaml
runner: arm
```

Alternatively, you can specify this by passing `--runner arm` as part of the runniac CLI invocation.

You must create a `main.json` file in each step that contains ARM templates. Your `main.json` can contain any valid ARM
template deployment, including any template control ARM features, such as remote linked templates.

## Terraform

### Configuration

You can tell runiac to deploy Terraform-based infrastructure by setting the following `runner` key in your `runiac.yml` file:

```yaml
runner: terraform
```

Alternatively, you can specify this by passing `--runner terraform` as part of the runniac CLI invocation.

### Using Previous Step Output Variables

By default, runiac will pass in the output variables from previous steps into the current step.

For example, if `step1_s3_bucket` has a defined `outputs.tf`:

```hcl-terraform
output "producer_assume_role_arn" {
  description = "The name of the S3 Bucket (Purple Bucket) that will be the destination of all logs on the AWS account."
  value       = aws_iam_role.producer_lambda_role.arn
}
```

Then `step2_logging` can use it by declaring a variable as `{step_name}-{output_variable_name}`, for example:

```hcl-terraform
variable "s3_bucket-producer_assume_role_arn" {
  type        = string
  description = "Variable from step1_s3_bucket"
}
```

If a pre-track exists, all the step output variables from the pre-track will be available as input variables to other steps. These pre-track output variables can be used in other steps by declaring a variable as `pretrack-{pretrack_step_name}-{output_variable_name}`. For example:

```hcl-terraform
variable pretrack-project_creation-project_name {
  type        = string
  description = "Variable from the project_creation step in the pre-track"
}
```

### Regional Variables

When working in a regional context, additional passed variables are available from prior step's regional deployments.

> NOTE: Only output variables from primary and _same region_ regional deployments are available to regional deployments

To access previous step's regional output variables one can do so by adding `-regional-` after the step name of the variable, like the following:

```hcl-terraform
variable "s3_bucket-regional-producer_assume_role_arn" {
  type        = string
  description = "Variable from step1_s3_bucket"
}
```

If a pre-track exists, you can also access the regional output variables from the pre-track steps by declaring a variable as `pretrack-{pretrack_step_name}-regional-{output_variable_name}`. For example:

```hcl-terraform
variable pretrack-resource_groups-regional-resource_group_name {
  type        = string
  description = "Variable from the resource_groups regional step in the pre-track"
}
```

### Input Variables

```terraform
variable "runiac_region" {
  type        = string
  description = "The region for this Terraform run"
}

variable "runiac_namespace" {
  type        = string
  description = "The namespace for this Terraform run" # During PR, this value is set to `pr-{changeId}`, ie. pr-3
}

variable "runiac_environment" {
  type        = string
  description = "Designates the production level of the associated resource" # During PR, this value is set to `pr`
}

variable "runiac_app_version" {
  type        = string
  description = "Designates the specific version of the application deployment"
}

variable "runiac_account_id" {
  type        = string
  description = "ID of the Account being deployed to"
}

variable "runiac_target_account_id" {
  type        = string
  description = "The account id that the step function told the fargate task to deploy to"
}

variable "runiac_deployment_ring" {
  type = string
  description = "The deployment ring currently being executed in"
}

variable "runiac_stage" {
  type = string
  description = "The stage currently being executed in"
}

variable "runiac_track" {
  type = string
  description = "The track currently being executed in"
}

variable "runiac_step" {
  type = string
  description = "The step currently being executed in"
}

variable "runiac_region_deploy_type" {
  type = string
  description = "The step deployment type, either primary or regional"
}
```

### Tests

Tests within a step will automatically be executed after a successful deployment.

#### Test Convention Requirements

- Need to be defined in a `tests` directory within the _step_'s directory.
- Need to be golang tests OR compiled to an executable named `tests.test`
  - If using golang tests, runiac Build Container will compile the tests to an executable automatically as part of container build process
  - Golang tests are the recommendation (ie. Terratest).
- The tests directory will receive the terraform outputs of the step as `TF_VAR` environment variables

For example in the following source code directory:

```bash
step1_aws/
├── tests
│   └── step_test.go
├── backend.tf
├── outputs.tf
├── providers.tf
├── read_only_role.tf
├── shared.tf
├── variables.tf
└── versions.tf
```

runiac will then execute `tests.test` after a successful step deployment.

### Conventions and Supported Configurations

#### Backend

##### [Type](https://www.terraform.io/docs/backends/types/index.html)

By convention the backend type will be automatically configured.

Supported Types:

- S3
- AzureRM
- GCS
- Local

If defining local, terraform will be executed "fresh" each time. This works very well when the step is only executing scripts/binaries through `local-exec`.

While you normally cannot use variable interpolation in typical Terraform backend configurations, runiac allows you some more flexibility
in this area. Depending on which backend provider you are intending to use, the sections below detail which variables can be used in your
configuration. These variables will be interpolated by runiac itself prior to executing Terraform.

#### S3

Supported variables for dynamic [`key`](https://www.terraform.io/docs/backends/types/s3.html#key), [`bucket`](https://www.terraform.io/docs/backends/types/s3.html#role_arn) or [`role_arn`](https://www.terraform.io/docs/backends/types/s3.html#bucket) configuration:

- `${var.runiac_region_deploy_type}`: **required** in `key`
- `${var.region}`: **required** in `key`
- `${var.runiac_step}`
- `${var.core_account_ids_map}`
- `${var.runiac_target_account_id}`
- `${var.runiac_deployment_ring}`
- `${var.environment}`
- `${local.namespace-}` (temporary backwards compatibility variable)

Example Usage:

```hcl-terraform
terraform {
  backend "s3" {
    key      = "${var.runiac_target_account_id}/${local.namespace-}${var.runiac_step}/${var.runiac_region_deploy_type}-${var.region}.tfstate"
    bucket   = "product-tfstate-${var.core_account_ids_map.runiac_deploy}"
    role_arn = "arn:aws:iam::${var.core_account_ids_map.runiac_deploy}:role/StateRole"
    acl      = "bucket-owner-full-control"
    region   = "us-east-1"
    encrypt  = true
  }
}
```

#### GCS

Supported variables for dynamic [`bucket and/or prefix`](https://www.terraform.io/docs/backends/types/gcs.html#configuration-variables) configuration:

- `${var.gaia_region_deploy_type}`
- `${var.region}`
- `${var.gaia_step}`
- `${var.core_account_ids_map}`
- `${var.gaia_target_account_id}`
- `${var.gaia_deployment_ring}`
- `${var.environment}`
- `${local.namespace-}` (temporary backwards compatibility variable)

Example Usage:

```hcl-terraform
terraform {
  backend "gcs" {
    bucket  = "df-${var.environment}-tfstate"
    prefix  = "infra/${var.gaia_deployment_ring}/${var.gaia_region_deploy_type}/${var.region}/${local.namespace-}infra.tfstate"
  }
}
```

### Deployment Ring Specific Configurations

#### Count

The most common and terraform friendly to implement deployment specific configuration is via `count` and simple `if` statements in the terraform code based on the passed in `var.runiac_deployment_ring` value.

#### Override Files

The alternative option is using terraform's [override feature](https://www.terraform.io/docs/configuration/override.html). runiac handles this based on the `override` directory within a step.

The supported override files are below:

- `override.tf` - file will be added for all deployment rings and deployments, including Self-Destroy.
- `ring_*ring-name*_override.tf` - file will be added for the specified deployment ring and deployments, including Self-Destroy.
- `destroy_override.tf` - file will be added for all deployment rings and Self-Destroy deployments.
- `destroy_ring_*ring-name*_override.tf` - file will be added for the specified deployment ring and Self-Destroy deployments.

---

For example, in the following step when deploying to:

- `local` deployment ring: the `ring_local_override.tf` file will be added to the executed terraform
- `prod` deployment ring: the `ring_prod_override.tf` file will be added to the executed terraform

```bash
tracks/iamsso/step1_aws/
├── override
│   └── ring_local_override.tf
│   └── ring_prod_override.tf
├── backend.tf
├── outputs.tf
├── providers.tf
├── read_only_role.tf
├── shared.tf
├── variables.tf
└── versions.tf
```

For example, in `main.tf`:

```hcl-terraform
# super important resource that cannot be deleted
resource "aws_s3_bucket" "centralized_logging_master_bucket" {
  bucket        = "log-compliance-data"

  lifecycle {
    prevent_destroy = true
  }
}
```

And then for ephemeral environments (e.g. local development), `ring_local_override.tf`:

```hcl-terraform
# super important resource that can be deleted in local deployment ring
resource "aws_s3_bucket" "centralized_logging_master_bucket" {
  lifecycle {
    prevent_destroy = false
  }
}
```

This has the benefit of not introducing the subtle complexities of "toggling" between two different resources with `count`

**NOTE**: Terraform recommends using this feature sparingly as it is not noticeable the value is overridden in the main terraform files.
A common use case for this feature is controlling terraform `lifecycle` parameters for ephemeral environments while keeping the main terraform files defined for production.
