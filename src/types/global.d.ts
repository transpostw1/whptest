// Global type declarations for third-party scripts

declare global {
  interface Window {
    // Camweara Try-On API
    loadTryOnButton: (config: {
      psku: string;
      page: string;
      company: string;
      buynow: { enable: string };
      prependButton: {
        class: string;
        id: string;
      };
      styles: {
        tryonbutton: {
          backgroundColor: string;
          color: string;
          border: string;
          borderRadius: string;
          display?: string;
        };
        tryonbuttonHover: {
          backgroundColor: string;
          color: string;
          borderRadius: string;
        };
        MBtryonbutton: {
          width: string;
          borderRadius: string;
        };
      };
    }) => void;
    
    getSkusListWithTryOn: (config: { companyName: string }) => Promise<string[]>;
    
    // PayU Affordability Widget
    payuAffordability: {
      init: (config: { key: string; amount: string }) => void;
    };
    
    // Google Tag Manager
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    
    // Hotjar
    hj: (...args: any[]) => void;
    _hjSettings: { hjid: number };
  }
}

export {}; 