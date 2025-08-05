export const createLogger = () => {
    return {
      info: (message, data) => {
        saveLog({
          level: "INFO",
          message,
          data,
          time: new Date().toISOString()
        });
      },
      error: (message, data) => {
        saveLog({
          level: "ERROR",
          message,
          data,
          time: new Date().toISOString()
        });
      }
    };
  };
  
  const saveLog = (logEntry) => {
    let logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(logEntry);
    localStorage.setItem("logs", JSON.stringify(logs));
  };
  