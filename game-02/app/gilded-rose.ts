export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    // Main method updating quality and sellIn of all items
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            this.updateItemQuality(item); // Update the quality of the item according to its rules
            this.updateItemSellIn(item);  // Update the value of sellIn
        }
        return this.items;
    }

    // Updates the quality of an item depending on its type (Aged Brie, Backstage passes, etc.)
    private updateItemQuality(item: Item): void {
        if (item.name === 'Sulfuras, Hand of Ragnaros') {
            // Sulfuras does not change in quality or sellIn
            return;
        }

        if (item.name === 'Aged Brie') {
            this.increaseQuality(item); // Aged Brie increases in quality over time
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            this.updateBackstagePasses(item); // Special logic for Backstage passes
        } else if (item.name === 'Conjured') {
            this.decreaseQuality(item, 2); // Items "Conjured" degrade twice as fast
        } else {
            this.decreaseQuality(item, 1); // Normal items degrade once a day
        }

        // If the sellIn is less than 0, quality degrades twice as fast for common items
        if (item.sellIn < 0) {
            if (item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
                this.decreaseQuality(item, item.name !== 'Conjured' ? 2 : 4); // Conjured lose quality faster
            } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                item.quality = 0; // Backstage passes lose their quality after the event
            } else if (item.name === 'Aged Brie' && item.quality < 50) {
                this.increaseQuality(item); // Aged Brie continues to improve its quality after the date of sale
            }
        }
    }

    // Increases the quality of an item, with a limit of 50
    private increaseQuality(item: Item): void {
        if (item.quality < 50) {
            item.quality += 1;
        }
    }

    // Decreases the quality of an item, with a minimum limit of 0
    private decreaseQuality(item: Item, rate: number): void {
        if (item.quality > 0) {
            item.quality -= rate;
        }
        if (item.quality < 0) {
            item.quality = 0; // Ensures that the quality is not negative
        }
    }

    // Update the quality of the Backstage passes, with special rules for the remaining days
    private updateBackstagePasses(item: Item): void {
        if (item.quality < 50) {
            item.quality += 1; // Increase the quality of Backstage passes
            if (item.sellIn < 11) {
                item.quality += 1; // Increase quality by 2 if 10 days or less left
            }
            if (item.sellIn < 6) {
                item.quality += 1; // Increase quality by 3 if 5 days or less remain
            }
        }
    }

    // Update the sellIn of an item (decreases by 1 every day)
    private updateItemSellIn(item: Item): void {
        if (item.name !== 'Sulfuras, Hand of Ragnaros') {
            item.sellIn -= 1; // Sulfuras does not change its sellIn
        }
    }
}