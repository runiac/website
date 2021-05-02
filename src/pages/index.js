import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import TerminalTabs from "../theme/TerminalTabs";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import favicon from "../../static/img/favicon/logo-transparent.png";

const features = [
  {
    title: "Easy to Use",
    // imageUrl: "",
    description: (
      <>
        Runiac was designed from the ground up to be easily installed and used
        to get your infrastucture as code running and scaled quickly.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    // imageUrl: "",
    description: (
      <>
        Runiac lets you focus on your cloud resources, and we&apos;ll do the
        chores. Go ahead and let runiac bring you into the cloud.
      </>
    ),
  },
  {
    title: "Standing on the shoulders of giants",
    // imageUrl: "",
    description: (
      <>
        Extend or customize your infrastructure as code by reusing powerful
        tools such as Terraform, Terragrunt, Bicep, ARM Templates and more.
        Runiac can be extended while reusing the workflow.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl ? (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      ) : null}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Run IAC Anywhere with Ease"
      image={favicon}
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          {/* <div className="row"> */}
          {/* <div className="col col--6"> */}
          <h1 className="hero__subtitle">
            {/* {" "} */}
            <code>> runiac deploy</code>
            {/* {siteConfig.title} */}
          </h1>
          <p className="hero__subtitle">
            {siteConfig.tagline}
            {/* <p>One Command: Any Tool, Any Where.</p> */}
          </p>
          <p></p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* <div className="col col--6">
              <TerminalTabs></TerminalTabs>
            </div>
          </div> */}
        {/* </div> */}
      </header>
      <main>
        <section className={styles.terminalTabs}>
          <div className="container">
            <div className="row">
              <TerminalTabs></TerminalTabs>
            </div>
          </div>
        </section>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
