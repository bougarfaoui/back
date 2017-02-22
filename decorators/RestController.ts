import { Container } from "../container";
import { ControllerHandler } from "../handlers/controllerHandler";
import { Injectable } from "injection-js";

export function RestController(target: Function){
    const dependencies = Reflect.getMetadata("design:paramtypes", target);

    let controllerName = target["name"];
    let controllerHandler: ControllerHandler = Container.controllerHandlers[controllerName];

    if (!controllerHandler) {
        controllerHandler = new ControllerHandler();
    }

    controllerHandler.isRest = true;

    Injectable().call(null, target);
    Container.components[controllerName] = target;
}