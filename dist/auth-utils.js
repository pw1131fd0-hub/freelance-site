import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
/**
 * Hash a password using scrypt.
 * @param password The plain text password.
 * @returns The salt and hash in the format "salt:hash".
 */
export function hashPassword(password) {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hashedPassword}`;
}
/**
 * Compare a plain text password with a stored hashed password.
 * @param password The plain text password to check.
 * @param stored The stored salt and hash in the format "salt:hash".
 * @returns True if the passwords match, false otherwise.
 */
export function comparePassword(password, stored) {
    if (!stored || !stored.includes(":"))
        return false;
    const [salt, hashedPassword] = stored.split(":");
    const hashedInput = scryptSync(password, salt, 64).toString("hex");
    return timingSafeEqual(Buffer.from(hashedInput, "hex"), Buffer.from(hashedPassword, "hex"));
}
