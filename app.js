const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());




const dbPath = path.join(__dirname,"db.db");
const db = new sqlite3.Database(dbPath, (err)=>{
   if(err){
    console.error("Error connecting to SQLite DB:", err.message);

   } else {
         console.log("Connected to SQLite database.");

   }
});
app.get("/api/currency",  (req,res) => {
   db.all("SELECT * FROM Currency", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/api/sideadd",(req,res) => {
    db.all("SELECT * FROM Sideadd", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    
    res.json(rows);
  });
});

app.get("/api/slider",(req,res) => {
   db.all("SELECT * FROM Slider", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/api/weather",(req,res) => {
   db.all("SELECT * FROM Weather", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const city = "İzmir";
    const today = rows[0];

    const temperature = today.high;
    const warning = temperature > 30 ? "Yüksek sıcalık uyarısı!" : "";
    res.json({
        city,temperature,warning,forecast: rows,
    });
  });
});

app.get("/api/smalladd",(req,res) => {
   db.all("SELECT * FROM Smalladd", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});



app.listen(port, () => {
   console.log(`listening on ${port}`);
});
