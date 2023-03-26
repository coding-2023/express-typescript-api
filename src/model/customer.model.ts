import { Customer as ICustomer } from "@prisma/client";
import { CustomerService } from "../services/customer.service";
import { prisma } from "../util/prisma.context";

export class Customer extends CustomerService {
  static readonly instance: Customer = new Customer();

  constructor() {
    super(prisma.customer);
  }

  // public async createCustomer(
  //   data: Prisma.CustomerCreateInput
  // ): Promise<ICustomer> {
  //   return await this.create({ data: data });
  // }

  // public async findCustomers(
  //   data: Prisma.CustomerFindManyArgs
  // ): Promise<ICustomer> {
  //   return await this.findMany(data);
  // }

  public toApi(data: ICustomer) {
    const { email_address, first_name, middle_name, last_name } = data;
    const returnValue = {
      email: email_address,
      username: first_name + middle_name + last_name,
    };

    return returnValue;
  }
}
