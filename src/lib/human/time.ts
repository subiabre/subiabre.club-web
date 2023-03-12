import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";

TimeAgo.addLocale(es);

export const time = {
    ago: (value: string | number | Date) => {
        const date = new Date(value);
        const ago = new TimeAgo("es-ES");

        return ago.format(date);
    },
    year: (value: string | number | Date) => {
        return (new Date(value)).getFullYear();
    }
}
