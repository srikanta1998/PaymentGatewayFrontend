
import React, { useState } from "react";
import Rupay_Logo from '../Assets/Rupay_Logo.png';
import Visa_Logo from '../Assets/VISA_Logo.png';
import MC_Logo from '../Assets/MC_Logo.png'

export const CYBS_REST = () => {

    const [parentMID, setParentMID] = useState("");
    const [merchantMID, setMerchantMID] = useState("");
    const [keyID, setKeyMID] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [pfID, setPFID] = useState("");
    const [requestorID, setRequestorID] = useState("");
    const [isEnabledToggle, setIsEnabledToggle] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("");
    const [exp, setExp] = useState("");
    const [cvv, setCvv] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("");
    const [errors, setErrors] = useState({});
    const [tokenizationOption, setTokenizationOption] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [administrativeArea, setAdministrativeArea] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const getCardType = (number) => {
      const plainNumber = number.replace(/-/g, '');
      if (/^4/.test(plainNumber)) return 'visa';
      if (/^5/.test(plainNumber)) return 'mastercard';
      if (/^6/.test(plainNumber)) return 'rupay'; // Simple check
      // if (/^5[1-5]/.test(plainNumber)) return 'mastercard';
      // if (/^6(0|52)/.test(plainNumber)) return 'rupay'; // Simple check
      return '';
    };
  
    const formatCardNumber = (value) => {
      const digitsOnly = value.replace(/\D/g, '');
      const chunks = digitsOnly.match(/.{1,4}/g);
      return chunks ? chunks.join('-') : '';
    };
  
    const handleChange = (e) => {
      const formatted = formatCardNumber(e.target.value);
      setCardNumber(formatted);
  
      const plainNumber = formatted.replace(/-/g, '');
      if (plainNumber.length >= 4) {
        setCardType(getCardType(formatted));
      } else {
        setCardType('');
      }
    };
  
    const logoMap = {
      //visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
      //mastercard: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
      visa: Visa_Logo,
      mastercard: MC_Logo,
      rupay: Rupay_Logo
    };

    const validate = () => {
      const newErrors = {};
  
      if (!/^\d{16}$/.test(cardNumber)) {
        if (cardNumber.length < 16) {
          newErrors.cardNumber = " Num:<16";
        } else {
          newErrors.cardNumber = " Num:>16";
        }
      }
    
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
        newErrors.exp = " Invalid Exp!";
      }
    
      if (!/^\d{3}$/.test(cvv)) {
        if (cvv.length < 3) {
          newErrors.cvv = " Invalid CVV!";
        } else {
          newErrors.cvv = " Invalid CVV!";
        }
      }
    
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  return (
  
    <div
      style={{
        display: "flex",
        padding: "20px",
        gap: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1030px",
        margin: "auto",
      }}
    >
      {/* LEFT SECTION */}
      <div style={{  display: "flex", width: "80%", flexDirection: "column", gap: "20px" }}>
        {/* Top Row: Credentials + Card Details side by side */}
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Credentials Box */}
          <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "18px" }}>
          <h2 style={{ marginBottom: "10px", marginTop: "3px" }}>Credentials</h2>
         

            
    <div style={{ padding: "3px", border: "1px solid #ccc", borderRadius: "18px"}}>
      <h4 style={{ marginBottom: "10px", marginTop: "15px", marginLeft: "10px" }}>Aggregator</h4>
            
      {/* Merchant Relation */}
      <input type="text" placeholder="Parent / Portfolio MID" value={parentMID} onChange={(e) => setParentMID(e.target.value)} style={{width: "60%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft: "25px"}}></input>
      <input type="text" placeholder="Merchant MID" value={merchantMID} onChange={(e) => setMerchantMID(e.target.value)} style={{width: "60%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft: "25px"}}></input>
      <input type="text" placeholder="Meta Key / Key ID" value={keyID} onChange={(e) => setKeyMID(e.target.value)} style={{width: "60%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft: "25px"}}></input>
        <input type="text" placeholder="Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} style={{width: "60%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft: "25px"}}></input>
            
    </div>

      <div style={{  padding: "3px", border: "1px solid #ccc", borderRadius: "18px",  marginTop: "10px", position: "relative"}}>
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <h4 style={{ margin: 0, marginRight: "10px", marginLeft: "10px" }}>Sub-Merchant</h4>

        {/* Toggle Switch */}
        <button
      style={{
        backgroundColor: isEnabledToggle ? "orange" : "#ccc", // Blue when enabled, grey when disabled
        color: "white",
        border: "none",
        padding: "4px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        fontSize: "12px",
        position: "relative", // To position the circle inside the button
        marginLeft: "13px"
      }}
      onClick={() => setIsEnabledToggle(!isEnabledToggle)}
    >
      <span style={{ marginRight: "8px" }}>{isEnabledToggle ? "ON" : "OFF"}</span>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: isEnabledToggle ? "white" : "orange",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)", // Center the circle vertically
          transition: "background-color 0.3s ease",
          opacity: isEnabledToggle ? 1 : 6.5, // Make it more visible when enabled
        }}
      ></div>
    </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px", marginTop: "10px" }}>

      <input type="text" placeholder="PF ID" disabled={!isEnabledToggle} value={pfID} onChange={(e) => setPFID(e.target.value)} style={{width: "60%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft: "25px",backgroundColor: isEnabledToggle ? "white" : "#eee"}}></input>
        <input type="text" placeholder="Requestor ID" disabled={!isEnabledToggle} value={requestorID} onChange={(e) => setRequestorID(e.target.value)} style={{width: "60%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft: "25px",backgroundColor: isEnabledToggle ? "white" : "#eee"}}></input>
        </div>

            </div>

          </div>

          


          {/* Card Details Box */}
          <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px", borderRadius: "18px" }}>
            <h2 style={{ marginBottom: "10px", marginTop: "11px" }}>Card Details</h2>
<div>

<div style={{  marginTop: '20px' }}>

    {/* Card Number */}
 {/* <div> */}
    <label><b>Card:</b></label>
    <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleChange} maxLength={19}
      style={{
        width: "50%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />

        {cardType && (
          <img
            src={logoMap[cardType]}
            alt={cardType}
            style={{
              width: "15%", height: "20px", marginLeft: "0.7rem",display: "inline-block",
              verticalAlign: "middle", objectFit: "contain", border: "1px solid #ccc", borderRadius: "3px", visibility: cardType ? "visible" : "hidden"
            }}
          />
        )}
    {errors.cardNumber && <span style={{ color: "red" }}>{errors.cardNumber}</span>}
  {/* </div> */}

  {/* Exp */}
{/* <div > */}
<br/>
    <label><b>Exp:</b></label>
    <input
      type="text"
      placeholder="Expiry MM/YY"
      value={exp}
      onChange={(e) => setExp(e.target.value)}
      style={{
        width: "40%",
        padding: "6px",
        border: "1px solid #333",
        borderRadius: "4px",
        outline: "none",
        marginLeft: "0.8rem",
        marginTop: "0.4px"
      }}
    />
    {errors.exp && <span style={{ color: "red" }}>{errors.exp}</span>}
  {/* </div> */}

  {/* CVV */}
  {/* <div > */}
  <br/>
    <label><b>CVV:</b></label>
    <input
      type="text"
      placeholder="cvv"
      value={cvv}
      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
      maxLength={3}
      style={{
        width: "40%",
        padding: "6px",
        border: "1px solid #333",
        borderRadius: "4px",
        outline: "none",
        marginLeft: "0.6rem",
        marginTop: "0.4px"
      }}
    />
    {errors.cvv && <span style={{ color: "red" }}>{errors.cvv}</span>}
  {/* </div> */}
  <br/>
  <label><b>Amount:</b></label>
  <input type="number" placeholder="Amount"  maxLength={10} value={amount} onChange={(e) => setAmount(e.target.value)}
      style={{
        width: "30%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.5rem"
      }}
    />
    <input type="text" placeholder="Currency" maxLength={3} value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())}
      style={{
         width: "27%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.5rem", marginBottom: "22px"
      }}
    />
  
  {/* Tokenization */}
  {/* <div style={{ marginTop: "30px"  }}> */}
    <label><b>Tokenization:</b></label>
    <div style={{ marginLeft: "50px", marginTop: "10px"}}>
      <label>
        <input type="radio" name="tokenization" value="Tokenization" checked={tokenizationOption === "Tokenization"} onChange={(e) => setTokenizationOption(e.target.value)}/>
        Token
      </label>

      <label style={{marginLeft: "1rem"}}>
        <input type="radio" name="tokenization" value="ALT ID" checked={tokenizationOption === "ALT ID"} onChange={(e) => setTokenizationOption(e.target.value)} style={{ marginLeft: "20px"}} />
        AltID
      </label>
    </div>

    <div style={{height: "36px", marginTop: "5px", marginLeft: "65px" }}>
    {tokenizationOption && (
        <input
          type="text"
          placeholder="cryptogram"
          style={{
            width: "93%",
            padding: "4px",
            border: "1px solid #333",
            borderRadius: "4px",
            outline: "none"
          }}
        />
    )}
    </div>
  {/* </div> */}

</div>

</div>

        
    <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <button type="button" onClick={() => {
      setCardNumber("");
      setCardType("");
      setCvv("");
      setExp("");
      setAmount("");
      setCurrency("");
      setErrors({});
      setTokenizationOption("");
    }}
        style={{ padding: "10px 20px", cursor: "pointer", border: "1px solid #aaa", borderRadius: "6px", color: "black", backgroundColor: "orange"}}>
          Clear
    </button>

        <button  type="button" onClick={() => { if (validate()) { alert("Submitted!"); }}}
         style={{ padding: "10px 20px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2" }}>
           Submit
           </button>
         
         </div>  
            
      
      
      </div>
        </div>

        {/* Bottom: User Info Box */}
        <div style={{ border: "1px solid #ccc", padding: "14px", borderRadius: "18px" }}>
        <h2 style={{ marginBottom: "10px", marginTop: "3px" }}>User Details</h2>
        <label><b>Name:</b></label>
    <input type="text" placeholder="First Name" maxLength={10} value={firstName} onChange={(e) => setFirstName(e.target.value)}
      style={{
        width: "15%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    <input type="text" placeholder="Last Name" maxLength={10} value={lastName} onChange={(e) => setLastName(e.target.value)}
      style={{
        width: "15%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    <label style={{marginLeft: "1rem"}}><b>Address:</b></label>
    <input type="text" placeholder="Address" maxLength={10} value={address1} onChange={(e) => setAddress1(e.target.value)}
      style={{
        width: "35%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    <br/>
    <label htmlFor="email"><b>Email:</b></label>
    <input type="email" placeholder="Email" maxLength={35} value={email} required  onChange={(e) => setEmail(e.target.value)}
      style={{ width: "33%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"}}
    />

    <label style={{marginLeft: "1rem"}}><b>City:</b></label>
    <input type="text" placeholder="City" maxLength={10} value={administrativeArea} onChange={(e) => setAdministrativeArea(e.target.value)}
      style={{
        width: "25%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    <input type="number" placeholder="Pincode" max="999999" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
      style={{
        width: "12%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.5rem"
      }}
    />
    <br/>
    <label><b>Phone:</b></label>
    <input type="text" placeholder="+" maxLength={2} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
      style={{
        width: "3%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    <input type="Number" placeholder="Phone Number" maxLength={10} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
      style={{
        width: "26%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    <label style={{marginLeft: "1rem"}}><b>Country:</b></label>
    <input type="text" placeholder="Country" maxLength={10} value={country} onChange={(e) => setCountry(e.target.value)}
      style={{
        width: "19.3%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.3rem"
      }}
    />
    {/* <input type="text" placeholder="Pincode" maxLength={10}
      style={{
        width: "12%", padding: "6px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft:"0.5rem"
      }}
    /> */}

    <button  type="button" onClick={() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setCountryCode("");
      setPhoneNumber("");
      setAddress1("");
      setAdministrativeArea("");
      setPostalCode("");
      setCountry("");
      //setErrors({});
      }}
         style={{ width: "15%", padding: "6px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px",color: "black", backgroundColor: "orange", outline: "none", marginTop: "5px", marginLeft:"0.5rem" }}>
           Clear
           </button>

          {/* <button
            style={{
              background: "none",
              color: "purple",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear all
          </button> */}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div style={{flexDirection: "column", gap: "10px"}}>
      <div style={{ flex: 1, height: "450px", border: "1px solid #ccc", padding: "60px", borderRadius: "18px" }}>
        <h2>Analysis Details</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Date</th>
              <th align="left">Amount</th>
              <th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>23/04/2024</td>
              <td>$89.00</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>21/04/2024</td>
              <td>$45.00</td>
              <td>Refunded</td>
            </tr>
            <tr>
              <td>20/04/2024</td>
              <td>$120.00</td>
              <td>Failed</td>
            </tr>
          </tbody>
        </table>

        <label style={{ display: "block", marginTop: "10px" }}>
          <input type="checkbox" />
          Include refundable charges when calculating after cost
        </label>

        <button
          style={{
            background: "none",
            color: "purple",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Filter Transaction
        </button>
      </div>
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

      <button  type="button" onClick={() => { if (validate()) { alert("Submitted!"); }}}
 style={{width: "40%", padding: "10px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2" }}>
   Previous page
   </button>


<button  type="button" onClick={() => { if (validate()) { alert("Submitted!"); }}}
 style={{width: "40%", padding: "10px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2" }}>
   Fire Transaction
   </button>
 
 </div>  
            </div>
      </div>
  );
};
