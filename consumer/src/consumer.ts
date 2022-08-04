import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("products")
export class Consumer {
  @Process()
  async products(job: Job<unknown>) {
    try {
      console.log(`Checking ${JSON.stringify(job.data)}`);

      if (
        typeof job.data.name !== "string" ||
        typeof job.data.price !== "number"
      ) {
        throw new Error("Data error");
      }

      console.log(
        `Job ${JSON.stringify(job.data)} has been checked succesfully`,
      );
    } catch (error) {
      console.log(`There is the following error: ${error}`);

      if (error.message === "Data error") {
        throw new Error("Redis document error");
      }
    }
  }
}
