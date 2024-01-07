/**
 * Form Validation Schema
 */
import LogsByFeatureWidget from "./widgets/LogsByFeatureWidget";
import LogsOverviewWidget from "./widgets/LogsOverviewWidget";

function LogAnalyticsContent(props) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32">
      <div className="sm:col-span-2 lg:col-span-3">
        <LogsOverviewWidget />
      </div>
      <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
        <LogsByFeatureWidget
          title="Logs By Severity"
          feature="severity"
          colors={["#3182CE", "#63B3ED"]}
        />
        <LogsByFeatureWidget
          title="Logs By Source"
          feature="source"
          colors={["#CE3182", "#ED63B3"]}
        />
      </div>
    </div>
  );
}

export default LogAnalyticsContent;
