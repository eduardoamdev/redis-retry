import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { Producer } from "./app.command";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "127.0.0.1",
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "products",
    }),
  ],
  providers: [Producer],
})
export class AppModule {}
