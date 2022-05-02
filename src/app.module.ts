import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://khadhra:test@khadhra-db.udwxt.mongodb.net/khadhra-db?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
