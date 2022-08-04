import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { Producer } from "./app.command";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: "6379",
      },
    }),
    BullModule.registerQueue({
      name: "products",
    }),
  ],
  providers: [Producer],
})
export class AppModule {}
