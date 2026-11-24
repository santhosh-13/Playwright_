import { Page, Locator } from '@playwright/test';

export class PricesPage{

    readonly price: Locator

    constructor(private page: Page) {
        
    this.price=page.locator('.inventory_item_price')



    }

    async getPrices(): Promise<number[]> {
        
          await this.price.first().waitFor();   // auto-waits until at least one price is visible

        const texts = await this.price.allTextContents()
        return (texts.map(price=>parseFloat(price.replace('$',''))))


    }
    



}