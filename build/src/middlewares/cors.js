import cors from "cors";
const ACCEPTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:3002"
];
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, false);
        if (acceptedOrigins.includes(origin))
            callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    }
});
