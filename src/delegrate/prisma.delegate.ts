export interface Delegate {
  count(data: unknown): unknown;
  create(data: unknown): unknown;
  aggregate(data: unknown): unknown;
  findUnique(data: unknown): unknown;
  findUniqueOrThrow(data: unknown): unknown;
  findFirst(data: unknown): unknown;
  findMany(data: unknown): unknown;
  createMany(data: unknown): unknown;
  delete(data: unknown): unknown;
  update(data: unknown): unknown;
  groupBy(data: unknown): unknown;
  upsert(data: unknown): unknown;
  updateMany(data: unknown): unknown;
  deleteMany(data: unknown): unknown;
}
