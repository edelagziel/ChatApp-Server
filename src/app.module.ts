import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule, ChatsModule, MessagesModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
