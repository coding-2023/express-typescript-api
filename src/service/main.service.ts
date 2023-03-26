// import { Prisma, PrismaClient } from "@prisma/client";
// import { PrismaClientOptions, Types } from "@prisma/client/runtime";
// import { apiTableName } from "../util/databaseApi";

// type TypeTableName = keyof typeof apiTableName;

// export class MainService {
//   private static client: PrismaClient;
//   private static tableName: TypeTableName;

//   private static instance: PrismaClient<
//     Prisma.PrismaClientOptions,
//     never,
//     Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined,
//     Types.Extensions.DefaultArgs
//   >;

//   constructor(tableName: TypeTableName) {
//     MainService.instance = new PrismaClient();
//     MainService.tableName = tableName;
//   }

//   public static create<T>(data: T) {
//     const xprisma = MainService.instance.$extends({
//       model: {
//         $allModels: {
//           async create(data: T) {
//             const customer = await MainService.instance[MainService.tableName].create<{ data: T }>({
//               data: data
//             });
//           },
//         },
//       },
//     });
//   }

//   // public static a() {
//   //   const a = new PrismaClient();
//   //   a.customer.create()
//   // }
// }
