async findAllActiveCategories(page = 1, limit = 10): Promise<PaginatedResult<Category>> {
  const qb = this.categoryRepository
    .createQueryBuilder('category')
    .where('category.isActive = true')
    .orderBy('category.created_at', 'DESC');

  return paginate<Category>(qb, page, limit);
}
