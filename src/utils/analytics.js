export const GA_MEASUREMENT_ID =
  "G-8CVX20ZB1M";


export const trackEvent = (
  eventName,
  parameters = {}
) => {
  if (
    typeof window ===
      "undefined" ||
    typeof window.gtag !==
      "function"
  ) {
    return;
  }

  window.gtag(
    "event",
    eventName,
    parameters
  );
};