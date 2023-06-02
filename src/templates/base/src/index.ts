interface Item {
  key: string;
  value: string | number | Record<symbol, string>;
}

export const format = (arr: Item[]) => {
  return arr.map(item => ({
    label: item.key,
    value: item.value
  }));
};

export {getPath} from './utils';
