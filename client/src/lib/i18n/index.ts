import fa from './fa.json';

// A simple translation function that retrieves nested keys
export function t(key: string): string {
  const keys = key.split('.');
  let result: any = fa;

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // If the key is not found, return the key itself as a fallback
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
}
