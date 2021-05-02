const path = require("path");

module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { firebaseAnalytics } = themeConfig || {};

  if (!firebaseAnalytics) {
    throw new Error(
      `You need to specify 'googleAnalytics' object in 'themeConfig' with 'trackingId' field in it to use docusaurus-plugin-google-analytics`
    );
  }

  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = firebaseAnalytics;

  if (!apiKey) {
    throw new Error(
      "You specified the `firebaseAnalytics` object in `themeConfig` but the `apiKey` field was missing. " +
        "Please ensure this is not a mistake."
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-firebase-analytics",

    getClientModules() {
      return [path.resolve(__dirname, "./analytics")];
    },

    injectHtmlTags() {
      //   if (!isProd) {
      //     return {};
      //   }
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              src: "https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js",
            },
          },
          {
            tagName: "script",
            attributes: {
              src:
                "https://www.gstatic.com/firebasejs/8.4.3/firebase-analytics.js",
            },
          },
          // https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tag
          {
            tagName: "script",
            innerHTML: `
                // Your web app's Firebase configuration
                // For Firebase JS SDK v7.20.0 and later, measurementId is optional
                var firebaseConfig = {
                    apiKey: "${apiKey}",
                    authDomain: "${authDomain}",
                    projectId: "${projectId}",
                    storageBucket: "${storageBucket}",
                    messagingSenderId: "${messagingSenderId}",
                    appId: "${appId}",
                    measurementId: "${measurementId}"
                };
                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
            `,
          },
        ],
      };
    },
  };
};
