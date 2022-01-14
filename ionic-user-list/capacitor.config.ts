import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "io.ionic.starter",
    appName: "ionic-user-list",
    webDir: "build",
    bundledWebRuntime: false,
    server: {
        allowNavigation: ["mailto:*", "tel:*"]
    }
};

export default config;
