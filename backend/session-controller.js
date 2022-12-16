
const setSession = (req, res) => {
    const name = req.params.name
    const value = req.params.value
    req.session[name] = value
    res.send(req.session)
}

const getSession = (req, res) => {
    const name = req.params.name
    const value = req.session[name]
    res.send(value)
}

export default (app) => {
    app.get('/session/set/:name/:value', setSession)    // creates cookie for user 
    app.get('/session/get/:name/', getSession)          // get value from cookie jar
}