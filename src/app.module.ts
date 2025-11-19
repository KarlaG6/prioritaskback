import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [UserModule, TasksModule, CategoriesModule, RemindersModule],
  providers: [JwtStrategy],
})
export class AppModule {}
