
import React, { useState } from "react";

export const CYBS_REST = () => {

    const [cardNumber, setCardNumber] = useState("");
    const [exp, setExp] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState({});
    const [tokenizationOption, setTokenizationOption] = useState("");

  
    const validate = () => {
      const newErrors = {};
  
      if (!/^\d{16}$/.test(cardNumber)) {
        if (cardNumber.length < 16) {
          newErrors.cardNumber = " Card number < 16";
        } else {
          newErrors.cardNumber = " Card number > 16";
        }
      }
    
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
        newErrors.exp = " Invalid MM/YY";
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
        gap: "10px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      {/* LEFT SECTION */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Top Row: Credentials + Card Details side by side */}
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Credentials Box */}
          <div style={{ flex: 1, border: "1px solid #ccc", padding: "28px", borderRadius: "18px" }}>
          <h2 style={{ marginBottom: "5px", marginTop: "3px" }}>Credentials</h2>
          <div style={{ flex: 2, display: "flex", flexDirection: "row", gap: "20px" }}>

            
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "18px"}}>
            <h4 style={{ marginBottom: "10px", marginTop: "3px" }}>Merchant Cred</h4>
            
            <label><b>MID:</b></label><input type="text" placeholder="MID" style={{width: "50%",padding: "4px",border: "1px solid #333",
        borderRadius: "4px",outline: "none",marginLeft:"0.3rem"}}></input>
            <p><strong>key ID:</strong> pk_live_1234</p>
            <p><strong>Secret KEY:</strong> sk_live_5678</p>
            </div>

            <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "18px"}}>
            <h4 style={{ marginBottom: "10px", marginTop: "2px" }}>Aggregator</h4>
            <p><strong>Parent MID:</strong> pk_live_1234</p>
            <p><strong>META KEY ID:</strong> sk_live_5678</p>
            <p><strong>Secret KEY:</strong> sk_live_5678</p>
            </div>

            </div>
            <div style={{ flex: 1, padding: "3px", border: "1px solid #ccc", borderRadius: "18px", marginTop: "15px"}}>
            <h2 style={{ marginBottom: "10px", marginTop: "3px" }}>Sub-Merchant</h2>
            <p><strong>PF-ID:</strong> pk_live_1234</p>
            <p><strong>API secret:</strong> sk_live_5678</p>
            </div>
          </div>

          {/* Card Details Box */}
          <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "18px" }}>
            <h2 style={{ marginBottom: "5px", marginTop: "11px" }}>Card Details</h2>
<div>

<div style={{marginTop:"20px"}}>

    {/* Card Number */}
 <div >
    <label><b>Card:</b></label>
    <input
      type="text"
      placeholder="Card Number"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
      style={{
        width: "40%",
        padding: "6px",
        border: "1px solid #333",
        borderRadius: "4px",
        outline: "none",
        marginTop: "5px",
        marginLeft:"0.3rem"
      }}
    />
    {errors.cardNumber && <span style={{ color: "red" }}>{errors.cardNumber}</span>}
  </div>

  {/* Exp */}
<div >
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
  </div>

  {/* CVV */}
  <div >
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
  </div>
  
  {/* Tokenization */}
  <div style={{ marginTop: "10px"  }}>
    <label><b>Tokenization:</b></label>
    <div style={{ marginTop: "10px"}}>
      <label>
        <input
          type="radio"
          name="tokenization"
          value="Tokenization"
          checked={tokenizationOption === "Tokenization"}
          onChange={(e) => setTokenizationOption(e.target.value)}
        />
        Token
      </label>

      <label>
        <input
          type="radio"
          name="tokenization"
          value="ALT ID"
          checked={tokenizationOption === "ALT ID"}
          onChange={(e) => setTokenizationOption(e.target.value)}
          style={{ marginLeft: "10px"}}
        />
        AltID
      </label>
    </div>

    <div style={{height: "36px", marginTop: "5px" }}>
    {tokenizationOption && (
        <input
          type="text"
          placeholder="cryptogram"
          style={{
            width: "50%",
            padding: "4px",
            border: "1px solid #333",
            borderRadius: "4px",
            outline: "none"
          }}
        />
    )}
    </div>
  </div>

</div>

 

        
    <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <button type="button" onClick={() => {
      setCardNumber("");
      setCvv("");
      setExp("");
      setErrors({});
      setTokenizationOption("");
    }}
        style={{
         padding: "10px 20px",
        cursor: "pointer",
        border: "1px solid #aaa",
        borderRadius: "6px",
        backgroundColor: "#fff",
        color: "#555"
    }}>Clear
    </button>

        <button  type="button" onClick={() => { if (validate()) { alert("Submitted!"); }}}
         style={{ padding: "10px 20px",
         cursor: "pointer",
         border: "1px solid #333",
         borderRadius: "6px",
         backgroundColor: "#f2f2f2" }}> Submit</button>
         
         </div>  
            
      </div>
      
      </div>
        </div>

        {/* Bottom: User Info Box */}
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "18px" }}>
          <h2>User Information</h2>
          <input
            type="text"
            placeholder="Enter user info..."
            style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
          />
          <button
            style={{
              background: "none",
              color: "purple",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "18px" }}>
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
    </div>
  );
};
