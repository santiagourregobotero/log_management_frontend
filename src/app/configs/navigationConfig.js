import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  /*
  {
    id: "users-component",
    title: "User Management",
    type: "item",
    icon: "heroicons-outline:user-group",
    url: "users",
  },
  */
  {
    id: "logs-analytics",
    title: "Logs Analytics",
    type: "item",
    icon: "material-twotone:dashboard",
    url: "log-analytics",
  },
  {
    id: "logs-management",
    title: "Logs Management",
    type: "item",
    icon: "material-solid:format_list_bulleted",
    url: "logs",
  },
];

export default navigationConfig;
