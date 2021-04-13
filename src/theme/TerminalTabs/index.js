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
      ]}
      defaultValue="tf"
    >
      <TabItem value="tf">
        <img src={tf} alt="loading..." />
      </TabItem>
      <TabItem value="arm">
        <img src={arm} alt="loading..." />
      </TabItem>
    </Tabs>
  </>
);

export default CodeTabs;
