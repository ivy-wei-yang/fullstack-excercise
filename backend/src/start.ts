import { errorHandler } from "./api/errorHandler";
import app from "./app";

// Error Handler
app.use(errorHandler);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log("  CORS-enabled web server is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
