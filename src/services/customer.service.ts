import { Customer, Prisma } from "@prisma/client";
import { CrudService } from "../delegrate/crudservice";
import { CustomerTypeMap } from "./customer.prisma";

export class CustomerService extends CrudService<
  Prisma.CustomerDelegate<any>,
  CustomerTypeMap
> {
  constructor(prisma: Prisma.CustomerDelegate<any>) {
    super(prisma);
  }
}
