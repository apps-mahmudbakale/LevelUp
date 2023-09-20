const express = require("express");
const bodyParser = require("body-parser");
const luhn = require("luhn");
const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/verify", (req, res) => {
  const { expiry_date, card_number, cvv } = req.body;
  // Validate card number with luhn
  const validationResult = {};

  // Check for empty values
  if (!card_number || !expiry_date || !cvv) {
    validationResult.emptyFields = "All fields are required";
  }

  // Validate card number
  if (
    !luhn.validate(card_number) ||
    card_number.length < 16 ||
    card_number.length > 19
  ) {
    validationResult.card_numberError = "Invalid card number";
  }

  // Validate expiration date
  const currentDate = new Date();
  const [month, year] = expiry_date.split("/");
  const expiration = new Date(`20${year}`, month - 1);
  if (expiration <= currentDate) {
    validationResult.expiry_dateError = "Card has expired";
  }

  // Validate CVV based on card type
  const isAmex = card_number.startsWith("34") || card_number.startsWith("37");
  if (isAmex) {
    if (cvv.length !== 4) {
      validationResult.cvvError = "CVV must be 4 digits for American Express";
    }
  } else {
    if (cvv.length !== 3) {
      validationResult.cvvError = "CVV must be 3 digits";
    }
  }

  // Check if there are any errors
  if (Object.keys(validationResult).length > 0) {
    return res.json({ success: false, errors: validationResult });
  }

  // If all validations pass, return success
  res.json({ success: true });
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
