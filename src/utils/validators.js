export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  export const isValidShortcode = (code) => /^[a-zA-Z0-9]{3,15}$/.test(code);
  