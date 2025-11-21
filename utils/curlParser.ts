import { CustomActionConfig, HttpMethod } from '@/types/customActions';

export function parseCurlCommand(curlString: string): Partial<CustomActionConfig> {
    const config: Partial<CustomActionConfig> = {
        headers: {},
        queryParams: {},
    };

    // Normalize the string: remove newlines and extra spaces
    const normalized = curlString.replace(/\\\n/g, ' ').replace(/\s+/g, ' ').trim();

    // Extract URL
    // Matches 'curl "url"' or "curl 'url'" or just "curl url"
    const urlMatch = normalized.match(/curl\s+(?:-X\s+\w+\s+)?(?:['"])(.*?)(?:['"])|curl\s+(?:-X\s+\w+\s+)?([^\s"']+)/);
    let fullUrl = '';

    if (urlMatch) {
        fullUrl = urlMatch[1] || urlMatch[2];
        if (fullUrl) {
            try {
                const urlObj = new URL(fullUrl);
                config.baseUrl = urlObj.origin;
                config.endpoint = urlObj.pathname;

                // Extract query params
                urlObj.searchParams.forEach((value, key) => {
                    if (config.queryParams) {
                        config.queryParams[key] = value;
                    }
                });
            } catch (e) {
                // If URL parsing fails, just set what we found as endpoint
                config.endpoint = fullUrl;
            }
        }
    }

    // Extract Method
    const methodMatch = normalized.match(/-X\s+([A-Z]+)/);
    if (methodMatch) {
        config.method = methodMatch[1] as HttpMethod;
    } else {
        // Default to GET, or POST if data is present
        config.method = normalized.includes(' -d ') || normalized.includes(' --data ') ? 'POST' : 'GET';
    }

    // Extract Headers
    const headerMatches = normalized.matchAll(/-H\s+['"]([^'"]+)['"]/g);
    for (const match of headerMatches) {
        const [key, value] = match[1].split(/:\s*/);
        if (key && value && config.headers) {
            config.headers[key] = value;

            // Check for Auth headers
            if (key.toLowerCase() === 'authorization') {
                if (value.startsWith('Bearer ')) {
                    config.authType = 'bearer';
                    config.authValue = value.replace('Bearer ', '');
                } else if (value.startsWith('Basic ')) {
                    config.authType = 'basic';
                    config.authValue = value.replace('Basic ', '');
                }
            }
        }
    }

    // Extract Body
    const dataMatch = normalized.match(/(?:-d|--data|--data-raw)\s+['"](.*?)['"]/);
    if (dataMatch) {
        config.bodyTemplate = dataMatch[1];
    }

    return config;
}
