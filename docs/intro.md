---
title: Introduction
slug: /
---

Runiac is a development tool for running infrastructure as code project, such as Terraform and ARM Templates. The goal is for you to spend more time improving your app by having runiac handle the chores.

Once you have runiac installed, run any iac with `runiac deploy`:

![](/gif/runiac-arm-execution.gif)

Runiac's primary feature is enabling easy, meaningful local development that mimics a production deployment.  
This enables two large benefits:

- Changes can be tested quickly and reliably in a cloud environment from a local machine
- Each local run verifys the pipeline's run because they use the same `runiac deploy` command

<!-- > runiac core is meant to be run within an image. We do **not** recommend running the `runiac` core binary in another image, as it might not work.

We'd love to hear from you! Submit github issues for questions, issues or feedback. -->
