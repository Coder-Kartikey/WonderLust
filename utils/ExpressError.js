export class ExpressError extends Error {
        constructor(statusCode, massage){
                super();
                this.statusCode = statusCode;
                this.massage = massage;
        }
}

// export ExpressError;