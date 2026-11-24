// middleware 

function logger(req, res, next) {
    const Timestamp = new Date();
    console.log(`[${Timestamp}] ${req.method} `);
    //next
    
    next();
}

module.exports = logger;