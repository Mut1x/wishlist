export class Local {  
  constructor(private localStore: any) {
    this.localStore = localStorage
  }

  public saveData(key: string, value: string) {
    this.localStore.setItem(key, value);
  }

  public getData(key: string) {
    return this.localStore.getItem(key)
  }
  public removeData(key: string) {
    this.localStore.removeItem(key);
  }

  public clearData() {
    this.localStore.clear();
  }
}
