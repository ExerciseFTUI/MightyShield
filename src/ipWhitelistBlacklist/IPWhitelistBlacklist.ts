// Import necessary dependencies.
import { Request, Response, NextFunction } from "express";
import requestIp from "request-ip";
import { IPMiddlewareConfig } from "./config";
import { convertToRegex, isLocalhost } from "./utils";

// Define a class responsible for IP whitelist and blacklist middleware.
export class IPWhitelistBlacklist {
  private config: IPMiddlewareConfig;

  // Constructor to initialize the middleware with configuration.
  constructor(config: IPMiddlewareConfig) {
    this.config = config;

    // Ensure there's a default whitelist entry if none is provided.
    if (config.whitelist.length === 0) {
      config.whitelist.push("*");
    }
  }

  // Middleware function responsible for IP filtering.
  middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the client's IP address.
      const clientIp: string | null = requestIp.getClientIp(req);
      console.log(`Client IP: ${clientIp}`);

      if (clientIp !== null) {
        // Convert whitelist and blacklist patterns to regular expressions.
        const whitelistRegex = convertToRegex(this.config.whitelist);
        const blacklistRegex = convertToRegex(this.config.blacklist);

        // Determine if the client IP is in IPv4 format.
        const clientIpIPv4 = clientIp.includes(":") ? clientIp.replace("::ffff:", "") : clientIp;

        // Check if the client IP is a localhost address.
        const isLocal = isLocalhost(clientIpIPv4);

        // Allow localhost access unless it's blacklisted.
        if (!isLocal) {
          if (!whitelistRegex.some((regex) => regex.test(clientIpIPv4))) {
            return res.status(403).json({ error: "Access denied" });
          }
        }

        // Deny access if the client IP is in the blacklist.
        if (blacklistRegex.some((regex) => regex.test(clientIpIPv4))) {
          return res.status(403).json({ error: "Access denied" });
        }
      }

      // Continue processing the request if IP filtering passes.
      next();
    } catch (error) {
      // Handle any errors that may occur during IP filtering.
      console.error("Error in IPMiddleware:", error);
      next(error);
    }
  };
}
