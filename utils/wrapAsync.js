// export function wrapAsync (fn) {
//         return (req, res, next) => {
//                 fn(req, res, next).catch(next);
//         }
// }
export const wrapAsync = (fn) => {
        return function (req, res, next) {
            fn(req, res, next).catch((err) => {
                console.error("Error caught in wrapAsync:", err);
                next(err); // Pass errors to the error handler
            });
        };
    };