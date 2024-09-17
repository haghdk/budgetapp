const requestIp = require("request-ip");
const ipRangeCheck = require("ip-range-check");
require("dotenv").config();

class IpRestrictionMiddleware {
    constructor() {
        this.isEnabled = process.env.IP_RESTRICTION_ENABLED === "true";
        this.allowedIps = (process.env.ALLOWED_REGISTER_IP || "").split(",").map((ip) => ip.trim());
    }

    restrictByIp = (req, res, next) => {
        if (!this.isEnabled) {
            return next();
        }

        const clientIp = requestIp.getClientIp(req);
        console.log(`Request from IP: ${clientIp}`);

        const isAllowed = ipRangeCheck(clientIp, this.allowedIps);

        if (isAllowed) {
            return next();
        } else {
            return res.status(403).json({ error: "Access denied. IP is not allowed." });
        }
    };
}

module.exports = new IpRestrictionMiddleware();
