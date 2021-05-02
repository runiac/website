import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      const page_path = location.pathname + location.search;
      firebase.analytics().setCurrentScreen(page_path);
      firebase.analytics().logEvent("page_view", { page_path });
    },
  };
})();
