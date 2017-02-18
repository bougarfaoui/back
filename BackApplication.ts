import { Back } from "./index";

export function BackApplication(configs: any) {
    return (target: Function) => {
        Back.configs = configs;
    };
}