import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange"


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
  });

app.post("/get-crypto", async (req, res) => {
    try {
        const tickerSymbol = req.body.cryptoTicker.toUpperCase();
        const url = API_URL + "/tickers/" + tickerSymbol;
        // console.log("Querying URL:", url);
        const ticker = await axios.get(url);

        const tickerData = ticker.data;

        // Extract the required fields
        const dataToRender = {
            symbol: tickerData.symbol,
            price_24h: tickerData.price_24h,
            volume_24h: tickerData.volume_24h,
            last_trade_price: tickerData.last_trade_price
        };

        // res.render("index.ejs", { content: JSON.stringify(ticker.data) });
        res.render("index.ejs", { content: dataToRender });
    } catch (error) {
        console.error(error);
        res.render("index.ejs", { content: JSON.stringify(error.tickerData) });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});