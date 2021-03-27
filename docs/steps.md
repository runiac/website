---
title: Steps
slug: /steps
---

- _Steps_ follow a folder naming convention of `step{progressionLevel}_{stepName}`
  - A Step's _Progression Level_ identifies the ordering of execution.
- All steps receive a common set of input variables (see below)
- All steps receive the output variables of the steps in the progression level ahead of them.
  - For example:
    - output variables of `step1` will be sent into `step2`
    - output variables of `step1` and `step2` will be passed into `step3`
    - so on, so forth
- Steps will automatically execute tests after a successful deployment, these are primarily used for smoke testing (see below)
- Steps have two types of deployment, `Primary` and `Regional`.

## Execution Patterns

In the following _Track_ directories:

### Concurrent Steps

```bash
project
├── step1_aws
└── step1_onprem_adgroups
```

`step1_aws` and `step1_onprem_adgroups` will be executed at concurrently at the same time.

### Sequential Steps

```bash
project
├── step1_vpc
└── step2_egress_proxy
```

`step1_vpc` will be executed first and after completion `step2_egress_proxy` will be executed.

### Concurrent and Sequential Steps

```bash
project
├── step1_vpc
├── step1_aws
└── step2_cool_step
└── step2_special_step
└── step3_something_awesome
```

1. `step1_vpc` and `step1_aws` will be executed first concurrently at the same time.
2. After completion of both `step2_cool_step` and `step2_special_step` will be executed concurrently at the same time.
   a. The output variables of both `step1`'s will be passed into `step2` steps
3. After completion of both `step2`'s, `step3_something_awesome` will be executed.
   a. The output variables of all `step1` and `step2`'s will be passed into `step3` steps

## Step Deployment Types

Step deployment types facilitate multi-region deployments. runiac will first execute every primary step deployment type in a track.
If the primary region deployment is successful, runiac will then run each step's regional deployment type (`regional`) concurrently across each region defined in `regional_regions`.

### Primary

Primary deployments represent all iac in the top level directory of the executing step.
Currently, the primary deployment type is executed _once per region group_.
For example, in the `us` region group, the primary code would only be executed in the primary region of the `us` region group, `us-east-1`.

```bash
tracks/network
├── step1_vpc
├──--- *.tf
```

### Regional

Regional deployments represent iac in the `regional` directory of the executing step. This code will be executed concurrently `N` times based on `N` count of regions defined in `regional_regions` configuration.

```bash
tracks/network
├── step1_vpc
├──--- regional
├──--------*.tf
```
