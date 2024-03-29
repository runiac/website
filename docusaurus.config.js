const path = require("path");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "RunIaC",
  tagline: "Run Your Infrastructure as Code Anywhere with Ease.",
  url: "https://runiac.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  plugins: [path.resolve(__dirname, "plugins", "firebase-analytics")],
  favicon: "img/favicon/logo-transparent.png",
  organizationName: "optum", // Usually your GitHub org/user name.
  projectName: "runiac", // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: "2d118141c4193a047d2ca58c3491e188",
      appId: '2WANC60WN9',
      indexName: "runiac",
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    firebaseAnalytics: {
      apiKey: "AIzaSyDavZvPsf9Egx4sBwbE7gIZO_yLY3jxc7k",
      authDomain: "runiac-mg.firebaseapp.com",
      projectId: "runiac-mg",
      storageBucket: "runiac-mg.appspot.com",
      messagingSenderId: "1098849270526",
      appId: "1:1098849270526:web:1711c8a6a13d92e8f443af",
      measurementId: "G-99DB4DQZ88",
    },
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
        {
          label: "Starters",
          href: "https://github.com/topics/runiac-starter",
        },
        // { to: "blog", label: "Blog", position: "left" },
        // right
        {
          href: "https://github.com/optum/runiac",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
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
              href: "https://discord.gg/BwMGJNwn6U",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
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
          editUrl: "https://github.com/runiac/website/edit/main/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl: "https://github.com/runiac/website/edit/main/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
