export const dice = {
    item(items: any[]): any {
        return items[Math.floor(Math.random() * items.length)];
    }
}
