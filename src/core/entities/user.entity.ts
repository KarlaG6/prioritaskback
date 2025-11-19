// lightweight domain entity (no depende de Prisma)
export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password?: string,
    public role: string = 'USER',
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
