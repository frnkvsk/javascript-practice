
const choice = (items) => items[Math.floor(Math.random() * items.length)];

const remove = (items, item) => {
  const index = items.indexOf(item);
  return [...items.slice(0, index), ...items.slice(index+1, items.length)];
}

export {choice, remove};
