import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

app.get('/api/data', (req, res) => {
    res.send("data !!");
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});