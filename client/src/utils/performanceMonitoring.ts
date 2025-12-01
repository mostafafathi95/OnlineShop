export function initPerformanceMonitoring() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (import.meta.env.DEV) {
          console.log(`${entry.name}: ${(entry as any).value}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as any;
      if (perfData && import.meta.env.DEV) {
        console.log(`Load: ${perfData.loadEventEnd - perfData.navigationStart}ms`);
      }
    });
  } catch (error) {
    // Silently fail
  }
}
