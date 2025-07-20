export class Wish {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public price?: string,
    public currency?: string,
    public link?: string,
    public isAcquired?: Boolean
  ) {}
}