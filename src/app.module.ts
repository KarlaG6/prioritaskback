import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/users/users.module';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';
import { RemindersModule } from './reminders/reminders.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UserModule,
    TasksModule,
    CategoriesModule,
    RemindersModule,
    NotificationsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
