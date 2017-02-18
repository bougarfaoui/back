
export function splitCamelCase(target: string){
    return target.replace(/([a-z](?=[A-Z]))/g, "$1 ");
}