export interface Attributes {
  [key: string]: string;
}

export const buildElement =
  (type: string, attributes: Attributes, children: HTMLElement[] = []) => {
    const element = document.createElement(type);

    Object.keys(attributes)
      .filter(name => name !== 'text')
      .forEach(name => element.setAttribute(name, attributes[name]));

    if (attributes.text) {
      element.appendChild(
        document.createTextNode(attributes.text)
      );
    }

    children.forEach(child => element.appendChild(child));

    return element;
  };

export const ul = (attributes: Attributes = {}, items: string[] = []) => {
  const listElement = buildElement('ul', attributes);
  
  items.forEach(listItem => 
    listElement.appendChild(buildElement('li', { text: listItem }))
  );

  return listElement;
};

export const div = (attributes: Attributes, ...children: HTMLElement[]) =>
  buildElement('div', attributes, children);

export const span = (attributes: Attributes, ...children: HTMLElement[]) =>
  buildElement('span', attributes, children);
