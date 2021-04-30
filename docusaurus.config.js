/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "RunIaC",
  tagline: "Run Your Infrastructure as Code Anywhere with Ease.",
  url: "https://runiac.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon/logo-transparent.png",
  organizationName: "optum", // Usually your GitHub org/user name.
  projectName: "runiac", // Usually your repo name.
  scripts: [
    "/__/firebase/8.4.3/firebase-app.js",
    "/__/firebase/8.4.3/firebase-analytics.js",
    "/__/firebase/init.js",
  ],
  themeConfig: {
    navbar: {
      title: "",
      logo: {
        alt: "Runiac",
        src: "img/logo-runiac-transparent.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/steps",
          activeBasePath: "docs",
          label: "Fundamentals",
          position: "left",
        },
        // { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/optum/runiac",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Get Started",
              to: "docs/",
              label: "Fundamentals",
              to: "docs/steps",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/runiac",
            },
            {
              label: "Discord",
              href: "https://discord.gg/6vdTnZH6xr",
            },
          ],
        },
        {
          title: "More",
          items: [
            // {
            //   label: "Blog",
            //   to: "blog",
            // },
            {
              label: "GitHub",
              href: "https://github.com/optum/runiac",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Runiac, LLC.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/runiac/website/edit/master/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl: "https://github.com/runiac/website/edit/master/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
