export function initPerformanceMonitoring() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const value = (entry as any).value;
        if (import.meta.env.DEV && value !== undefined && value !== null && !isNaN(value)) {
          console.log(`${entry.name}: ${value.toFixed(2)}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    window.addEventListener('load', () => {
      try {
        const perfData = performance.getEntriesByType('navigation')[0] as any;
        if (perfData && perfData.loadEventEnd && perfData.navigationStart) {
          const loadTime = perfData.loadEventEnd - perfData.navigationStart;
          if (import.meta.env.DEV && !isNaN(loadTime)) {
            console.log(`Page Load: ${loadTime.toFixed(2)}ms`);
          }
        }
      } catch (e) {
        // Ignore navigation timing errors
      }
    });
  } catch (error) {
    // Silently fail
  }
}
