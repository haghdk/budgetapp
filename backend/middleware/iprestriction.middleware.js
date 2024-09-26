const requestIp = require("request-ip");
const ipRangeCheck = require("ip-range-check");
const Logger = require("../config/logger.config");
require("dotenv").config();

class IpRestrictionMiddleware {
    constructor() {
        this.isEnabled = process.env.IP_RESTRICTION_ENABLED === "true";
        this.allowedIps = (process.env.ALLOWED_REGISTER_IP || "").split(",").map((ip) => ip.trim());
    }

    restrictByIp = (req, res, next) => {
        const clientIp = requestIp.getClientIp(req);
        const isAllowed = ipRangeCheck(clientIp, this.allowedIps);

        if (!this.isEnabled) {
            Logger.info(`No ip restriction in effect. ${clientIp} had access to register endpoint. Are you sure this is intended?`);
            return next();
        }

        if (isAllowed) {
            Logger.info(`No ip restriction in effect. ${clientIp} can register.`);
            return next();
        } else {
            Logger.info(`User with ${clientIp} denied access because of ip restriction`);
            return res.status(403).json({ error: "Access denied. IP is not allowed." });
        }
    };
}

module.exports = new IpRestrictionMiddleware();
