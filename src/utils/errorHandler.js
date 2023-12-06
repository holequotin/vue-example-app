const getMessage = function (error) {
    console.log(error)
    if(error.response) {
        return error.response.data.error
    }
    return error.message
}

export {getMessage}