import store from "store";

// uses default canvas-ui option formats or plain when prop = false
export default function useStorage(storage_key: string, prop: any = false): Array<any> {
  function readOptions(): Record<string, Record<string, string>> | any {
    if (!prop) return store.get(storage_key);
    return (store.get(storage_key) as Record<string, Record<string, string>>) || { defaults: {} };
  }

  function getLastValue(): any {
    if (!prop) return readOptions();

    const options = readOptions();
    return (options as Record<string, Record<string, string>>).defaults[prop] || "";
  }

  function setLastValue(value: any): void {
    if (!prop) {
      store.set(storage_key, value);
      return;
    }

    const options = readOptions();
    (options as Record<string, Record<string, string>>).defaults[prop] = value;
    store.set(storage_key, options);
  }

  return [getLastValue, setLastValue];
}
