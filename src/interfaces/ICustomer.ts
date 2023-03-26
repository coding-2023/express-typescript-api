import { Customer } from "@prisma/client";

export interface ICustomer extends Customer {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  created_at: Date;
}
