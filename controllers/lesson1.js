const aaronRoute =  (req, res) => {
    res.send('Aaron Eardley');
  };

const maxRoute = (req, res) => {
    res.send('Max Eardley');
}

module.exports = {
    aaronRoute,
    maxRoute,
};