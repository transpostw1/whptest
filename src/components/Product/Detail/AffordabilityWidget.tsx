import React, { useEffect } from "react";

interface Props {
  accesskey: string;
  amount: number;
}

const AffordabilityWidget: React.FC<Props> = ({ accesskey, amount }) => {
  const loadWidget = () => {
    if (window.payuAffordability) {
      const widgetConfig = {
        key: accesskey,
        amount: amount.toString(), // Ensure amount is a string
      };

      // Initialize the widget
      window.payuAffordability.init(widgetConfig);
    } else {
      console.error("PayU Affordability object is not defined.");
    }
  };

  const appendScript = () => {
    let existingScript = document.getElementById("payu-affordability-widget");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://jssdk.payu.in/widget/affordability-widget.min.js";
      script.id = "payu-affordability-widget";
      document.body.appendChild(script);

      script.onload = () => {
        loadWidget();
      };

      script.onerror = () => {
        console.error("Failed to load the PayU Affordability script.");
      };
    } else {
      loadWidget();
    }
  };

  useEffect(() => {
    appendScript();
  }, [accesskey, amount]); 
  return <div id="payuWidget" />;
};

export default AffordabilityWidget;
