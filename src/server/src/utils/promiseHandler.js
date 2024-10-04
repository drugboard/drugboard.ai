const promiseHandler = (requestController) => {
    return (req, res, next) => {
        Promise.resolve(requestController(req, res, next)).catch((err) => next(err))
    }
}

export default promiseHandler;
