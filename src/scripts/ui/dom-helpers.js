export function createCustomElement(
  tag,
  classes = [],
  attributes = {},
  styles = {},
  dataAttributes = {},
  textContent = "",
) {
  const element = document.createElement(tag);

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  for (const [key, attr] of Object.entries(attributes)) {
    element.setAttribute(key, attr);
  }

  for (const [key, style] of Object.entries(styles)) {
    element.style[key] = style;
  }

  for (const [key, dataAttr] of Object.entries(dataAttributes)) {
    element.dataset[key] = dataAttr;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
