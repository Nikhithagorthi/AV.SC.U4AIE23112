const logger = (req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {

        const end = Date.now();

        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: `${end - start}ms`,
            timestamp: new Date().toISOString()
        });

    });

    next();
};

module.exports = logger;