//types
type DOMStructure = {
    node:string;
    children?:DOMStructure[];
    text?:string;
}

//Functions
function createElementWithAttributes(tag:keyof HTMLElementTagNameMap,attributes:{[key:string]:string} = {}) {
    const element =  document.createElement(tag);

    for(const [key,value] of Object.entries(attributes)){
        element.setAttribute(key,value);
    }

    return element
}

