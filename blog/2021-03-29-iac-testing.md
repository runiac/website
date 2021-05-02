---
slug: iac-testing
title: Is Testing Infrastructure as Code Valuable?
author: mg
author_title: mg
author_url: https://github.com/tiny-dancer
author_image_url: https://avatars.githubusercontent.com/u/4986192?v=4
tags: [iac, testing]
---

Yes. However the answer is more nuanced following the common paradigm of 'it depends'. In one project, we were responsible for deploying and maintaining base infrastructure across 100's of cloud accounts in aws, azure and gcp - manually verifying changes in such an environment is not feasibly possible nor desired, all verification must be automated. We learned to appreciate the value of valuable tests.

### Trust your declarative iac tool

After months in this environment the majority of our tests were basic post-deployment "does it exist" and "is this parameter configured as X" and we learned this was of little value when using a declaractive configuration language such as Terraform. At this point, trust in terraform. The real value in testing infrastructure as code is functionally testing business functions of the system. When looking at it from this perspective it _may_ make more sense to view the testing as an seperate function rather than as part of the iac deployment where the validation logic of the test is centralized to be triggered in multiple use cases.

### Focus on Business Functions

Doing this can come in multiple flavors, one way would be to continue to post-deployment tests that trigger an application level test related to the infrastracture deployed. This application test could be a health check endpoint or more in-depth a vital business function.

Alternatively, or in addition to, a post deployment test is to have [synthetic monitoring](https://smartbear.com/learn/performance-monitoring/what-is-synthetic-monitoring/) running on a cadence to verify the system is up. This synthetic test should be verifying the Vital Business Functions of the application ensuring continuous uptime.

Balancing between these two options will provide valuable testing to your infrastructure as code deployments.
