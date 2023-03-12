import { filesize } from "filesize";

export const file = {
    size: (size: number) => filesize(size)
}
