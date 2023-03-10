import UAParser from "ua-parser-js";

export const ua = {
    parse: (userAgent: string): { browser: string, os: string } => {
        const data = new UAParser(userAgent).getResult();
        
        return {
            browser: `${data.browser.name} ${data.browser.version?.split('.')[0]}`,
            os: `${data.os.name}`.concat(data.os.version ? ` ${data.os.version}` : "")
        }
    }
}
