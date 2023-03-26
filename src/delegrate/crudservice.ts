import { CustomerTypeMap } from "../services/customer.prisma";
import { Delegate } from "./prisma.delegate";

export abstract class CrudService<
  D extends Delegate,
  T extends CustomerTypeMap
> {
  constructor(protected delegate: D) {
    this.delegate = delegate;
  }

  public getDelegate(): D {
    return this.delegate;
  }

  public async count(data: T["count"]) {
    const result = await this.delegate.count(data);
    return result;
  }

  public async create<TRes>(data: T["create"]): Promise<TRes> {
    const result = await this.delegate.create(data);
    console.log(result);
    return result as TRes;
  }

  public async findMany(data?: T["findMany"]): Promise<any> {
    return await this.delegate.findMany(data);
  }
}
