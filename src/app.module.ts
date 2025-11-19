import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { RemindersModule } from './reminders/reminders.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [UserModule, TasksModule, CategoriesModule, RemindersModule, NotificationsModule],
  providers: [JwtStrategy],
})
export class AppModule {}
