---
title: Multi Region Deployments
slug: /multi-region
---

Runiac is designed from the ground up to enable multi-region deployments with clean code and minimal changes baked directly into the `runiac deploy` command.

> No more required terraform loops or complex pipeline scripting.

Runiac steps perform two types of deployments during a `runiac deploy`. One type is `primary`, the other type `regional`. To perform multi-region deployments we will focus on the `regional` deployment type. These types are described in more detail in the steps [documentation](/docs/steps#regional)

## Configuration

Two configurations are used for running multi-region deployments, `primary_region` and `regional_regions`.

```yaml
primary_region: centralus
regional_regions: centralus,eastus,westus,uksouth,southeastasia
```

- `primary_region`: Runiac will first execute the iac in the `.` directory of all steps. If this deployment is successful for all steps it will move to the regional deployments.
- `regional_regions`: Runiac will concurrently execute the iac in the `./regional` directory of the steps with the iteratee value passed in as the `runiac_region` input variable.

> It is common to define the minium regions used for ephemeral enviroments (developers and pull requests) in the YAML and then pass in a larger region list for higher environments via the CLI flag `--regional-regions`.

## Code Declaration

Example code declaration using Terraform.

> Full example available in the runiac [github repo](https://github.com/Optum/runiac/tree/main/examples)

### Directory

```
./step1_default
├── backend.tf
├── main.tf
├── providers.tf
├── regional  <---
│ ├── backend.tf
│ ├── main.tf
│ ├── providers.tf
│ └── variables.tf
└── variables.tf
```

### Regional Terraform

```terraform
resource "azurerm_resource_group" "spoke" {
  name     = "${local.namespace-}rg-runiac-spoke-${var.runiac_region}"
  location = var.runiac_region
}
```

## Execution

Execute `runiac deploy` :rocket:

![](/img/multi-region-azure-deploy.png)
