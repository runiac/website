import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import arm from "../../../static/gif/arm-success.gif";
import tf from "../../../static/gif/terraform-az-hello-world-success.gif";

const CodeTabs = ({ className }) => (
  <>
    <Tabs
      values={[
        { label: "Terraform", value: "tf" },
        { label: "Arm Template", value: "arm" },
        { label: "Azure Bicep", value: "bicep" },
        { label: "Terragrunt", value: "tg" },
        { label: "AWS CDK", value: "cdk" },
        { label: "CloudFormation", value: "cf" },
        { label: "Pulumi", value: "pul" },
      ]}
      defaultValue="tf"
    >
      <TabItem value="tf">
        <img src={tf} alt="loading..." />
      </TabItem>
      <TabItem value="arm">
        <img src={arm} alt="loading..." />
      </TabItem>
      <TabItem value="bicep">
        <p>
          Planned!{" "}
          <a target="_blank" href="https://github.com/Optum/runiac/issues/23">
            Upvote
          </a>
        </p>
      </TabItem>
      <TabItem value="tg">
        <p>
          <a target="_blank" href="https://github.com/Optum/runiac/issues/24">
            Upvote!
          </a>
        </p>
      </TabItem>
      <TabItem value="cdk">
        <p>
          <a target="_blank" href="https://github.com/Optum/runiac/issues/21">
            Upvote!
          </a>
        </p>
      </TabItem>
      <TabItem value="cf">
        <p>
          <a target="_blank" href="https://github.com/Optum/runiac/issues/22">
            Upvote!
          </a>
        </p>
      </TabItem>
      <TabItem value="pul">
        <p>
          <a target="_blank" href="https://github.com/Optum/runiac/issues/23">
            Upvote!
          </a>
        </p>
      </TabItem>
    </Tabs>
  </>
);

export default CodeTabs;
