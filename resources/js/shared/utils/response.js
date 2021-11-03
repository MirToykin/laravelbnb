export const is404 = (err) => isErrorWithResponseAndStatus(err)  && err.response.status === 404
export const is422 = (err) => isErrorWithResponseAndStatus(err)  && err.response.status === 422

const isErrorWithResponseAndStatus = (err) => err.response && err.response.status
