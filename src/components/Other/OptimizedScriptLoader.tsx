"use client";
import { useEffect, useRef } from 'react';

interface ScriptConfig {
  src: string;
  id: string;
  priority: 'high' | 'low' | 'idle';
  defer?: boolean;
  async?: boolean;
  onLoad?: () => void;
  condition?: () => boolean;
}

const OptimizedScriptLoader = ({ scripts }: { scripts: ScriptConfig[] }) => {
  const loadedScripts = useRef<Set<string>>(new Set());

  useEffect(() => {
    const loadScript = (config: ScriptConfig): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (loadedScripts.current.has(config.id)) {
          resolve();
          return;
        }

        // Check condition if provided
        if (config.condition && !config.condition()) {
          resolve();
          return;
        }

        const existingScript = document.getElementById(config.id);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = config.id;
        script.src = config.src;
        script.defer = config.defer ?? true;
        script.async = config.async ?? true;

        script.onload = () => {
          loadedScripts.current.add(config.id);
          config.onLoad?.();
          resolve();
        };

        script.onerror = () => {
          console.error(`Failed to load script: ${config.src}`);
          reject(new Error(`Script load failed: ${config.src}`));
        };

        // Use requestIdleCallback for low priority scripts
        if (config.priority === 'idle' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            document.head.appendChild(script);
          });
        } else if (config.priority === 'low') {
          // Delay low priority scripts
          setTimeout(() => {
            document.head.appendChild(script);
          }, 100);
        } else {
          document.head.appendChild(script);
        }
      });
    };

    const loadScriptsInOrder = async () => {
      // Load high priority scripts first
      const highPriority = scripts.filter(s => s.priority === 'high');
      const lowPriority = scripts.filter(s => s.priority === 'low');
      const idlePriority = scripts.filter(s => s.priority === 'idle');

      // Load high priority scripts in parallel
      await Promise.all(highPriority.map(loadScript));

      // Load low priority scripts after a delay
      setTimeout(() => {
        lowPriority.forEach(loadScript);
      }, 1000);

      // Load idle priority scripts when browser is idle
      setTimeout(() => {
        idlePriority.forEach(loadScript);
      }, 2000);
    };

    // Start loading after initial render
    const timer = setTimeout(loadScriptsInOrder, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [scripts]);

  return null;
};

export default OptimizedScriptLoader; 