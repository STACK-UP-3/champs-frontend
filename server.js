const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static(`${__dirname}/build`));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build/index.html'));
});
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}......`));
