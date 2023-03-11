export const shorten = {
    hyphened: (value: string, length: number): string => {
        const strLength = (length - 3) / 2;
        const start = value.substring(0, strLength);
        const end = value.substring(value.length - strLength, value.length);

        return start.concat('...').concat(end);
    }
}
