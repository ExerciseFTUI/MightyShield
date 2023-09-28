// Utility function to convert IP patterns to regular expressions.
export function convertToRegex(ipPatterns: string[]): RegExp[] {
  return ipPatterns.map((ipPattern) => {
      const regexPattern = ipPattern
        .replace(/\./g, "\\.")
        .replace(/\*/g, ".*")
        .replace(/\[(\d+)-(\d+)\]/g, (_, start, end) => {
          const startNum = parseInt(start);
          const endNum = parseInt(end);
          const range = Array.from({ length: endNum - startNum + 1 }, (_, i) => startNum + i).join("|");
          return `(${range})`;
        });
        
      return new RegExp(`^${regexPattern}$`);
  });
}

// Utility function to check if an IP address is localhost.
export function isLocalhost(clientIp: string): boolean {
  const clientIpIPv4 = clientIp.includes(":") ? clientIp.replace("::ffff:", "") : clientIp;
  return clientIpIPv4 === "127.0.0.1" || clientIpIPv4 === "::1";
}
