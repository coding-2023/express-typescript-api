import { Prisma } from "@prisma/client";

export interface CustomerTypeMap {
    count: Prisma.CustomerCountArgs;
    create: Prisma.CustomerCreateArgs;
    aggregate: Prisma.CustomerAggregateArgs;
    findUnique: Prisma.CustomerFindUniqueArgs;
    findUniqueOrThrow: Prisma.CustomerFindFirstOrThrowArgs;
    findFirst: Prisma.CustomerFindFirstArgs;
    findMany: Prisma.CustomerFindManyArgs;
    createMany: Prisma.CustomerCreateManyArgs;
    delete: Prisma.CustomerDeleteArgs;
    update: Prisma.CustomerUpdateArgs;
    groupBy: Prisma.CustomerGroupByArgs;
    upsert: Prisma.CustomerUpsertArgs;
    updateMany: Prisma.CustomerUpdateManyArgs;
    deleteMany: Prisma.CustomerDeleteManyArgs;
}

export interface CrudTypeMap {
    count: unknown;
    create: unknown;
}
// count(data: unknown): unknown;
//   create(data: unknown): unknown;
//   aggregate(data: unknown): unknown;
//   findUnique(data: unknown): unknown;
//   findUniqueOrThrow(data: unknown): unknown;
//   findFirst(data: unknown): unknown;
//   findMany(data: unknown): unknown;
//   createMany(data: unknown): unknown;
//   delete(data: unknown): unknown;
//   update(data: unknown): unknown;
//   aggregate(data: unknown): unknown;
//   groupBy(data: unknown): unknown;
//   upsert(data: unknown): unknown;
//   updateMany(data: unknown): unknown;
//   deleteMany(data: unknown): unknown;