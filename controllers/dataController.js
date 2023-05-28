// all async functions

const getData = async (req, res) => {
    res.json({hey:'got it!'});
}

const updateData = async (req, res) => {
    res.json({hey:'got it!'});
}

const addData = async (req, res) => {
    console.log(req.body);
    res.json({hey:'got it!'});
}

export {getData, updateData, addData}