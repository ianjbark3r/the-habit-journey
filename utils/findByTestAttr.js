export const findByTestAttr = (component, attribute) => {
  const item = component.find(`[data-test="${attribute}"]`);
  return item;
}