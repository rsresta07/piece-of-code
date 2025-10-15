export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const paginate = async <T>(
  qb: any,
  page = 1,
  limit = 10,
): Promise<PaginatedResult<T>> => {
  const [data, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
