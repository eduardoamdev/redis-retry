import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { Consumer } from "./consumer";

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
  providers: [Consumer],
})
export class AppModule {}
