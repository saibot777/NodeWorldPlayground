import * as express from "express";
const app = express();

app.get('/', (req, res, next) => {
    res.send("Booking API")
});

app.listen(process.env.PORT || 8091, () => console.log('Server started...'))