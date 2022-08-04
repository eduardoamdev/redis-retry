import { Command, CommandRunner } from "nest-commander";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

interface Product {
  name: string;
  price: any;
}

@Command({
  name: "producer",
  options: { isDefault: false },
})
export class Producer implements CommandRunner {
  products: Product[];

  constructor(@InjectQueue("products") private productsQueue: Queue) {
    this.products = [
      {
        name: "shirt",
        price: 20,
      },
      {
        name: "jacket",
        price: 30,
      },
      {
        name: "shoes",
        price: "50",
      },
      {
        name: "hat",
        price: 5,
      },
      {
        name: "jeans",
        price: 25,
      },
    ];
  }

  async run(): Promise<void> {
    for (let i = 0; i < this.products.length; i++) {
      try {
        await this.productsQueue.add(this.products[i], {
          attempts: 5,
          backoff: 2000,
        });

        console.log(
          `Object ${JSON.stringify(
            this.products[i],
          )} has been injected succesfully`,
        );
      } catch (error) {
        console.log(`Injection failed. There is the following error: ${error}`);
      }
    }
  }
}
