
import React, { useState } from "react";
import { useEffect } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import Rupay_Logo from '../Assets/Rupay_Logo.png';
import Visa_Logo from '../Assets/VISA_Logo.png';
import MC_Logo from '../Assets/MC_Logo.png';
import Error_Logo from '../Assets/Error_Logo.jpg'

import { motion, AnimatePresence } from 'framer-motion';
import '../NavbarWithSlideMenu.css';
import logo from '../Assets/AXIS_LOGO.png';
import SetUP_REST_CYBS from "../CYBS Payment Page/Payloads/SetUP_REST_CYBS.json";
import SelectAPI from "../CYBS Payment Page/Payloads/SelectAPI.json"

export const CYBS_REST = () => {

  const location = useLocation();
    const {gateway, mode, relation, integration, modeIndex, integrationIndex, relationIndex } = location.state || {};

  //const [requestPayload, setRequestPayload] = useState("");

  const [parentMID, setParentMID] = useState("");
  const [merchantMID, setMerchantMID] = useState("");
  const [keyID, setKeyMID] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [pfID, setPFID] = useState("");
  const [requestorID, setRequestorID] = useState("");
  const [isEnabledToggle1, setIsEnabledToggle1] = useState(false);
  const [isEnabledToggle2, setIsEnabledToggle2] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [cryptogram, setCryptogram] = useState("");
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
  const [invalidFields, setInvalidFields] = useState([]);
  const [invalidFields1, setInvalidFields1] = useState([]);
  const [invalidFields2, setInvalidFields2] = useState([]);

  const getCardType = (number) => {
    const plainNumber = number.replace(/-/g, '');
    if (/^4/.test(plainNumber)) return 'visa';
    if (/^5/.test(plainNumber)) return 'mastercard';
    if (/^6/.test(plainNumber)) return 'rupay'; // Simple check
    // if (/^5[1-5]/.test(plainNumber)) return 'mastercard';
    // if (/^6(0|52)/.test(plainNumber)) return 'rupay'; // Simple check
    return 'error';
  };

  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    const chunks = digitsOnly.match(/.{1,4}/g);
    return chunks ? chunks.join('-') : '';
  };

  const formatExp = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    const chunks = digitsOnly.match(/.{1,2}/g);
    return chunks ? chunks.join('/') : '';
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

  const handleChangeExp = (e) => {
    
    const Expformatted = formatExp(e.target.value);
    setExp(Expformatted);
  };

const postUserData = () => {
  try {

    const json = JSON.parse(JSON.stringify(dispatchPayload));

    if (!json?.RequestBody?.orderInformation) return;

    const userDetails = {
      address1: address1,
      administrativeArea: administrativeArea,
      country: country,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: countryCode+phoneNumber,
      email: email,
      postalCode: postalCode
    };

    if(apiTypes !== 'SetUP') {
    
      json.RequestBody.orderInformation.billTo = {
        ...userDetails
      };
    }

    // ✅ Update state with modified JSON
    //alert("Mode is - "+mode);
    alert("json - "+JSON.stringify(json));
    setRequestBody(JSON.stringify(json.RequestBody, null, 2));
    setDispatchPayload(json);

  } catch (err) {
    console.error("Invalid JSON format", err);
  }

}

  
const postCardData = () => {
  try {
    const plainNumber = cardNumber.replace(/-/g, '');
    const json = JSON.parse(JSON.stringify(dispatchPayload));
    
    if (!json?.RequestBody?.paymentInformation) return;

    // Common data to update
    const cardDetails = {
      number: plainNumber,
    };

    // Set card type based on starting digit
    if (/^4/.test(plainNumber)) {
      cardDetails.type = "001";
    } else if (/^5/.test(plainNumber)) {
      cardDetails.type = "002";
    } else if (/^6/.test(plainNumber)) {
      cardDetails.type = "061";
    }

    // Set expiration details if exp is valid
    if (/^\d{2}\/\d{2}$/.test(exp)) {
      const [mm, yy] = exp.split('/');
      cardDetails.expirationMonth = mm;
      cardDetails.expirationYear = "20" + yy;
    }

    const amountDetails = {
      currency: currency,
      totalAmount:amount
    };

    if(apiTypes !== 'SetUP') {
    
      json.RequestBody.orderInformation.amountDetails = {
        ...amountDetails
      };
    }

    // If tokenization is ON: use tokenizedCard and add cryptogram
    if (tokenizationOption) {
      json.RequestBody.paymentInformation.tokenizedCard = {
        ...cardDetails,
        transactionType: "1234",
        ...(apiTypes !== 'SetUP' && { cryptogram: cryptogram, securityCode: cvv })
        
      };
      delete json.RequestBody.paymentInformation.card; // Remove card block
    } else {
      // If no tokenization: use card and remove tokenizedCard if present
      json.RequestBody.paymentInformation.card = {
        ...cardDetails
      };
      delete json.RequestBody.paymentInformation.tokenizedCard;
    }

    setRequestBody(JSON.stringify(json.RequestBody, null, 2));
    setDispatchPayload(json);
  } catch (err) {
    console.error("Invalid JSON format", err);
  }
};


  const logoMap = {
    //visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    //mastercard: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
    visa: Visa_Logo,
    mastercard: MC_Logo,
    rupay: Rupay_Logo,
    error: Error_Logo
  };

  const validateCredandMRN = () => {

    const newInvalidFields = [];

  if (merchantMID.trim() === "") newInvalidFields.push("merchantMID");
  if (keyID.trim() === "") newInvalidFields.push("keyID");
  if (secretKey.trim() === "") newInvalidFields.push("secretKey");

  if (isEnabledToggle1 && parentMID.trim() === "") {
    newInvalidFields.push("parentMID");
  }
  
  if (isEnabledToggle2) {
  if (pfID.trim() === "") newInvalidFields.push("pfID");
  if (requestorID.trim() === "") newInvalidFields.push("requestorID");
  }

  if (selectedApiType !== "" || selectedFullAPIType !== "") {
    if (mrn.trim() === "") newInvalidFields.push("mrn");
  }

  setInvalidFields2(newInvalidFields);

    //alert("Please enter the highlighted fields.");
    return newInvalidFields.length === 0;
  };

  const validate = () => {
    
    const newInvalidFields = [];

    const plainCardNumber = cardNumber.replace(/\D/g, '');
    if (!/^\d{16}$/.test(plainCardNumber)) {
      if (plainCardNumber.length < 16) {
        newInvalidFields.push("cardNumber");
       }
    }

    if (cardType.trim() === "error") newInvalidFields.push("error");

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      newInvalidFields.push("exp");
    }

    if (!/^\d{3}$/.test(cvv)) {
      if (cvv.length < 3) {
        newInvalidFields.push("cvv");
      }
    }    

  if (amount.trim() === "") newInvalidFields.push("amount");
  if (currency.trim() === "") newInvalidFields.push("currency");

  if (tokenizationOption && cryptogram.trim() === "") {
   newInvalidFields.push("cryptogram");
  }

  setInvalidFields1(newInvalidFields);

    
    return newInvalidFields.length === 0;
  };

  const userDetailsValidate = () => {

    const isFilled = (str) => str && str.trim() !== "";

    const isEmailValid = (email) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
    }

  const newInvalidFields = [];

  if (firstName.trim() === "") newInvalidFields.push("firstName");
  if (lastName.trim() === "") newInvalidFields.push("lastName");
  if (address1.trim() === "") newInvalidFields.push("address1");
  if (email.trim() === "" || !isEmailValid(email)) newInvalidFields.push("email");
  if (postalCode.trim() === "") newInvalidFields.push("postalCode");
  if (administrativeArea.trim() === "") newInvalidFields.push("administrativeArea");
  if (countryCode.trim() === "") newInvalidFields.push("countryCode");
  if (phoneNumber.trim() === "") newInvalidFields.push("phoneNumber");
  if (country.trim() === "") newInvalidFields.push("country");

  const anyFieldFilled = [
    firstName, lastName, email, countryCode,
    phoneNumber, address1, administrativeArea, postalCode, country
  ].some((val) => val && val.trim() !== "");

  const allFieldsFilled = newInvalidFields.length === 0;

  if (anyFieldFilled && !allFieldsFilled) {
    setInvalidFields(newInvalidFields);
    //alert("Please correct the highlighted fields.");
    return false;
  }

  setInvalidFields([]); // clear if valid

  return true;

  };

  const transaction = ['Single API', 'Full Transaction'];
  const [transactionIndex, setTransactionIndex] = useState(0);
  const [apiTypes, setApiTypes] = useState(["SetUP", "Enrollment", "SetUP+Enroll", "Validation", "Authorization", "Capture", "Refund"]);
  const [selectedApiType, setSelectedApiType] = useState("");
  const [fullAPITypes, setFullAPITypes] = useState(["SetUP", "SetUP+Enroll"]);
  const [selectedFullAPIType, setSelectedFullAPIType] = useState("");

  const changeOption = (setter, currentIndex, list, direction) => {
  const nextIndex = (currentIndex + direction + list.length) % list.length;
    setter(nextIndex);
  };

  const [mrn, setMRN] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [url, setUrl] = useState("");
  const [httpMethod, setHTTPMethod] = useState("");
  const [dispatchPayload, setDispatchPayload] = useState("");


  useEffect(() => {
  const loadApiJson = async () => {
    if (transaction[transactionIndex] === 'Single API' ) {
      try {


        let apiPayload;

        if (selectedApiType) {
             apiPayload = await import(`../CYBS Payment Page/Payloads/${selectedApiType}.json`);
        } else {
             apiPayload = await import(`../CYBS Payment Page/Payloads/SelectAPI.json`);
              }

      // Access the full payload
      const payloadData = apiPayload.default;

      // Set URL and HTTP method for frontend use
      setUrl(payloadData.URL);
      setHTTPMethod(payloadData.HTTPMethod);

      
      

      // Inject MRN if available
      if (payloadData.RequestBody?.clientReferenceInformation) {
           payloadData.RequestBody.clientReferenceInformation.code = mrn;
          }

      // Conditional modifications
      if (apiTypes !== 'SetUP') {
        if (isEnabledToggle2) {
          payloadData.RequestBody.consumerAuthenticationInformation.requestorId = requestorID;
          payloadData.RequestBody.consumerAuthenticationInformation.requestorName = pfID;
        }
      }

      // 🔑 Add MID, Key ID, Secret
      payloadData.platform = mode;
      payloadData.keyID = keyID;
      payloadData.secret = secretKey;
      payloadData.mid = merchantMID;

      if (isEnabledToggle1) {
      payloadData.parentMID = parentMID;
      }

      
      setRequestBody(JSON.stringify(payloadData.RequestBody, null, 2));
      setDispatchPayload(payloadData);

      } catch (error) {
        console.error(`Could not load JSON for ${selectedApiType}:`, error);
      }
    } else {

      try {
               
        let apiPayload;

        if (selectedFullAPIType && selectedFullAPIType !== "Select Flow") {
           apiPayload = await import(`../CYBS Payment Page/Payloads/${selectedFullAPIType}`);
           } else {
           apiPayload = await import(`../CYBS Payment Page/Payloads/SelectFlow.json`);
        }

        // Extract values
        const { URL, HTTPMethod, RequestBody } = apiPayload.default;

        setUrl(URL);
        setHTTPMethod(HTTPMethod);

        if (RequestBody?.clientReferenceInformation) {
          RequestBody.clientReferenceInformation.code = mrn;
        }

        if(apiTypes !=='SetUP') {

          if(isEnabledToggle2) {

            RequestBody.consumerAuthenticationInformation.requestorId = requestorID;
            RequestBody.consumerAuthenticationInformation.requestorName = pfID
          }
          
        }

        setRequestBody(JSON.stringify(RequestBody, null, 2));
      } catch (error) {
        console.error(`Could not load JSON for Complete Transaction:`, error);
      }

    }
  };

  loadApiJson();
}, [transactionIndex, selectedApiType, selectedFullAPIType, mrn, requestorID, pfID]);


  const handleChange1 = (e) => {
    setRequestBody(e.target.value);
  };

  const navigate = useNavigate();
  const previousPage = () => {navigate("/homepage")}

  async function handleSubmit() {

        // event.preventDefault();

    try {
                    
        alert("RequestBody - "+JSON.stringify(dispatchPayload));
        const response = await axios.post('http://localhost:8080/api/payments/enrollment',JSON.stringify(dispatchPayload),
        {headers: {'Content-Type': 'application/json'}})
        
        const data = response.data;
        console.log("Request Body - "+dispatchPayload);
        console.log("Response Body - "+data);
        
    }catch (error) {
          console.error(error);
          alert("An error occurred. Please try again.");
       }
      
    }

  return (

    <div style={{padding: '0.5rem', backgroundColor: '#8ba0a4'}}>
      <div style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.2rem', display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
        <div>
        <img src={logo} alt="Logo" style={{ height: '20px' }} />
        </div>
      </div>
    <div style={{  display: "flex", padding: "20px", gap: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1030px", margin: "auto" }}>

      {/* LEFT SECTION */}
      <div style={{ display: "flex", width: "80%", flexDirection: "column", gap: "20px" }}>

        {/* Top Row: Credentials + Card Details side by side */}
        <div style={{ display: "flex", gap: "20px" }}>

          {/* Credentials Box */}
          <div style={{ flex: 1, border: "1px solid white", padding: "20px", borderRadius: "18px", backgroundColor: '#c0c0c0' }}>
            <h2 style={{ marginBottom: "10px", marginTop: "3px" }}>Credentials</h2>

            <div style={{ padding: "3px", border: "1px solid white", borderRadius: "18px" }}>
              <h4 style={{ display: "flex", alignItems: "center",  marginBottom: "10px", marginTop: "15px", marginLeft: "10px" }}>

                <span style={{ color: !isEnabledToggle1 ? "black" : "#606060", fontWeight: "bold"}}>
                Merchant
                </span>

                <span style={{ color: "black", margin: "0 5px" }}>/</span>

                <span style={{ color: isEnabledToggle1 ? "black" : "#606060", fontWeight: "bold"}}>
                Aggregator
                </span>

                &nbsp;&nbsp;&nbsp;
                {/* Toggle Switch - 1 */}
                <button style={{
                  backgroundColor: isEnabledToggle1 ? "orange" : "#ccc", color: "black", border: "none", padding: "4px 16px", borderRadius: "20px",
                  cursor: "pointer", transition: "background-color 0.3s ease", fontSize: "12px", position: "relative", // To position the circle inside the button
                  marginLeft: "13px"
                }}
                  onClick={() => setIsEnabledToggle1(!isEnabledToggle1)}>
                  <span style={{ marginRight: "8px" }}>{isEnabledToggle1 ? "ON" : "OFF"}</span>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%", backgroundColor: isEnabledToggle1 ? "white" : "orange", position: "absolute", right: "10px",
                    top: "50%", transform: "translateY(-50%)", /* Center the circle vertically*/ transition: "background-color 0.3s ease",
                    opacity: isEnabledToggle1 ? 1 : 6.5
                  }} >
                  </div>
                </button>
                </h4>

              <input type="text" placeholder="Meta Key ID" value={keyID} onChange={(e) => setKeyMID(e.target.value)} style={{
                width: "60%", padding: "4px", border: invalidFields2.includes("keyID") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginLeft: "25px"
                }}></input>
              <input type="text" placeholder="Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} style={{
                width: "60%", padding: "4px", border: invalidFields2.includes("secretKey") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginLeft: "25px"
                }}></input>
              <input type="text" placeholder="Merchant MID" value={merchantMID} onChange={(e) => setMerchantMID(e.target.value)} style={{
                width: "60%", padding: "4px", border: invalidFields2.includes("merchantMID") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginLeft: "25px"
                }}></input>
              <input type="text" placeholder="Parent / Portfolio MID" disabled={!isEnabledToggle1} value={parentMID} onChange={(e) => setParentMID(e.target.value)} style={{
                width: "60%", padding: "4px", border: invalidFields2.includes("parentMID") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginLeft: "25px", backgroundColor: isEnabledToggle1 ? "white" : "lightgrey", cursor: isEnabledToggle1 ? "text" : "not-allowed"
                }}></input>
            </div>

            <div style={{ padding: "3px", border: "1px solid white", borderRadius: "18px", marginTop: "10px", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                <h4 style={{ margin: 0, marginRight: "10px", marginLeft: "10px" }}>Sub-Merchant</h4>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* Toggle Switch - 2 */}
                <button style={{
                  backgroundColor: isEnabledToggle2 ? "orange" : "#ccc", color: "black", border: "none", padding: "4px 16px", borderRadius: "20px",
                  cursor: "pointer", transition: "background-color 0.3s ease", fontSize: "12px", position: "relative", // To position the circle inside the button
                  marginLeft: "13px"
                }}
                  onClick={() => setIsEnabledToggle2(!isEnabledToggle2)}>
                  <span style={{ marginRight: "8px" }}>{isEnabledToggle2 ? "ON" : "OFF"}</span>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%", backgroundColor: isEnabledToggle2 ? "white" : "orange", position: "absolute", right: "10px",
                    top: "50%", transform: "translateY(-50%)", /* Center the circle vertically*/ transition: "background-color 0.3s ease",
                    opacity: isEnabledToggle2 ? 1 : 6.5
                  }} >
                  </div>
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px", marginTop: "10px" }}>

                <input type="text" placeholder="PF ID" disabled={!isEnabledToggle2} value={pfID} onChange={(e) => setPFID(e.target.value)} style={{
                  width: "60%", padding: "4px", border: invalidFields2.includes("pfID") ? "2px solid red" : "1px solid #333",
                  borderRadius: "4px", outline: "none", marginLeft: "25px", backgroundColor: isEnabledToggle2 ? "white" : "lightgrey", cursor: isEnabledToggle2 ? "text" : "not-allowed"
                }}></input>
                <input type="text" placeholder="Requestor ID" disabled={!isEnabledToggle2} value={requestorID} onChange={(e) => setRequestorID(e.target.value)} style={{
                  width: "60%", padding: "4px", border: invalidFields2.includes("requestorID") ? "2px solid red" : "1px solid #333",
                  borderRadius: "4px", outline: "none", marginLeft: "25px", backgroundColor: isEnabledToggle2 ? "white" : "lightgrey", cursor: isEnabledToggle2 ? "text" : "not-allowed"
                }}></input>
              </div>
            </div>

          </div>

          {/* Card Details Box */}
          <div style={{ flex: 1, border: "1px solid white", padding: "10px", borderRadius: "18px", backgroundColor: '#c0c0c0' }}>
            <h2 style={{ marginBottom: "10px", marginTop: "11px" }}>Card Details</h2>

            <div>
              <div style={{ marginTop: '20px' }}>

                <label><b>Card:</b></label>
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={handleChange} maxLength={19} style={{
                  width: "50%", padding: "6px", border: (invalidFields1.includes("cardNumber") || invalidFields1.includes("error")) ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none",
                  marginTop: "5px", marginLeft: "0.3rem"
                }} />

                {cardType && (<img src={logoMap[cardType]} alt={cardType} style={{
                  width: "15%", height: "20px", marginLeft: "0.7rem", display: "inline-block", verticalAlign: "middle", objectFit: "contain", border: invalidFields1.includes("error") ? "1px solid red" : "1px solid white",
                  borderRadius: "px", visibility: cardType ? "visible" : "hidden"
                }} />)}
                <br />

                <label><b>Exp:</b></label>
                <input type="text" placeholder="Expiry MM/YY" value={exp} onChange={handleChangeExp} maxLength={5} style={{ width: "40%", padding: "6px", border: invalidFields1.includes("exp") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginLeft: "0.8rem", marginTop: "0.4px" }} />
                <br />

                <label><b>CVV:</b></label>
                <input type="text" placeholder="cvv" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))} maxLength={3} style={{
                  width: "40%", padding: "6px", border: invalidFields1.includes("cvv") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none",
                  marginLeft: "0.6rem", marginTop: "0.4px"
                }} />
                <br />

                <label><b>Amount:</b></label>
                <input type="number" placeholder="Amount" maxLength={10} value={amount} onChange={(e) => setAmount(e.target.value)} style={{
                  width: "30%", padding: "6px", border: invalidFields1.includes("amount") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px",
                  marginLeft: "0.5rem"
                }} />
                <input type="text" placeholder="Currency" maxLength={3} value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} style={{
                  width: "27%", padding: "6px", border: invalidFields1.includes("currency") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none",
                  marginTop: "5px", marginLeft: "0.5rem", marginBottom: "22px"
                }} />

                {/* Tokenization */}
                <label><b>Tokenization:</b></label>
                <div style={{ marginLeft: "50px", marginTop: "10px" }}>

                  <label>
                    <input type="radio" name="tokenization" value="Tokenization" checked={tokenizationOption === "Tokenization"} onChange={(e) => setTokenizationOption(e.target.value)}  />
                    Token
                  </label>

                  <label style={{ marginLeft: "1rem" }}>
                    <input type="radio" name="tokenization" value="ALT ID" checked={tokenizationOption === "ALT ID"} onChange={(e) => setTokenizationOption(e.target.value)} style={{ marginLeft: "20px" }}  />
                    ALT ID
                  </label>

                </div>

                <div style={{ height: "36px", marginTop: "5px", marginLeft: "65px" }}>
                  
                  <input type="text" value={cryptogram} placeholder="cryptogram" onChange={(e) => setCryptogram(e.target.value)} disabled={!tokenizationOption} style={{ width: "93%", padding: "4px", border: invalidFields1.includes("cryptogram") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", backgroundColor: tokenizationOption ? "white" : "lightgrey",
                         cursor: tokenizationOption ? "text" : "not-allowed" }}/>
                </div>

              </div>
            </div>

            <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              
              <button type="button" onClick={() => { setCardNumber(""); setCardType(""); setCvv(""); setExp(""); setAmount(""); setCurrency(""); setCryptogram(""); setErrors({}); setTokenizationOption(""); setInvalidFields1(""); }}
                      style={{ padding: "10px 20px", cursor: "pointer", border: "1px solid black", borderRadius: "6px", color: "black", backgroundColor: "orange" }}>
                Clear
              </button>

              <button type="button" onClick={() => { if (validate()){ postCardData(); alert("Submitted!"); } }}
                      style={{ padding: "10px 20px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2" }}>
                Submit
              </button>

            </div>

          </div>
        </div>

        {/* Bottom: User Info Box */}
        <div style={{ border: "1px solid white", padding: "14px", borderRadius: "18px", backgroundColor: '#c0c0c0' }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", marginTop: "3px" }}>
  <h2 style={{ margin: 0, marginRight: "1rem" }}>User Details</h2>
  {invalidFields.length > 0 && (
    <h5 style={{ color: "red", margin: 0 }}>
      Please correct the highlighted fields.
    </h5>
  )}
</div>

          
          <label><b>Name:</b></label>
          <input type="text" placeholder="First Name" maxLength={10} value={firstName} onChange={(e) => setFirstName(e.target.value)}
                       style={{ width: "15%", padding: "6px", border: invalidFields.includes("firstName") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
          <input type="text" placeholder="Last Name" maxLength={10} value={lastName} onChange={(e) => setLastName(e.target.value)}
                       style={{ width: "15%", padding: "6px", border: invalidFields.includes("lastName") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
          
          <label style={{ marginLeft: "1rem" }}><b>Address:</b></label>
          <input type="text" placeholder="Address" maxLength={10} value={address1} onChange={(e) => setAddress1(e.target.value)}
                 style={{ width: "35%", padding: "6px", border: invalidFields.includes("address1") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
          <br />

          <label htmlFor="email"><b>Email:</b></label>
          <input type="email" placeholder="Email" maxLength={35} value={email} required onChange={(e) => setEmail(e.target.value)}
                 style={{ width: "33%", padding: "6px", border: invalidFields.includes("email") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem" }}/>

          <label style={{ marginLeft: "1rem" }}><b>Pincode:</b></label>
          <input type="number" placeholder="Pincode" max="999999" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                       style={{ width: "12%", padding: "6px", border: invalidFields.includes("postalCode") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.5rem"}}/>
          <input type="text" placeholder="City" maxLength={10} value={administrativeArea} onChange={(e) => setAdministrativeArea(e.target.value)}
                       style={{ width: "20%", padding: "6px", border: invalidFields.includes("administrativeArea") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
          <br />

          <label><b>Phone:</b></label>
          <input type="text" placeholder="+" maxLength={2} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
                       style={{ width: "3%", padding: "6px", border: invalidFields.includes("countryCode") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
          <input type="Number" placeholder="Phone Number" maxLength={10} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                       style={{ width: "26%", padding: "6px", border: invalidFields.includes("phoneNumber") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
         
          <label style={{ marginLeft: "1rem" }}><b>Country:</b></label>
          <input type="text" placeholder="Country" maxLength={10} value={country} onChange={(e) => setCountry(e.target.value)}
                       style={{ width: "12%", padding: "6px", border: invalidFields.includes("country") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.5rem"}}/>

          <button type="button" onClick={() => { setFirstName(""); setLastName(""); setEmail(""); setCountryCode(""); setPhoneNumber(""); setAddress1(""); setAdministrativeArea(""); setPostalCode(""); setCountry(""); setInvalidFields("");  }}
                        style={{ width: "8%", padding: "5px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", color: "black", backgroundColor: "orange", outline: "none", marginTop: "5px", marginLeft: "0.4rem" }}>
            Clear
          </button>

          <button type="button" onClick={() => { if (userDetailsValidate()) {postUserData();}  }}
                      style={{ width: "13.5%", padding: "6px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2", outline: "none", marginTop: "5px", marginLeft: "0.3rem" }}>
                Submit
              </button>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div>
        <div style={{ height: "565px", width: "350px", border: "1px solid white", padding: "10px", backgroundColor: '#c0c0c0', borderRadius: "18px" }}>
          <h2 style={{ marginBottom: "5px", marginTop: "11px" }}>Payload</h2>
          <div style={{borderBottom: "2px solid white", marginTop: "11px", marginBottom: "11px"}}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            {/* First Button Switcher */}
          <div style={ buttonStyle}>
            <span style={arrowStyle} onClick={() => changeOption(setTransactionIndex, transactionIndex, transaction, -1)}>&lt;</span>
            {transaction[transactionIndex]}
            <span style={arrowStyle} onClick={() => changeOption(setTransactionIndex, transactionIndex, transaction, 1)}>&gt;</span>
          </div>

          {/* Dropdown - 1 */}
          <div style={{ display: transaction[transactionIndex] === "Single API" ? "block" : "none"}}>
            <select value={selectedApiType} onChange={(e) => setSelectedApiType(e.target.value)}
                  style={selectStyle}>
                     <option value="">Select API Type</option>
                     {apiTypes.map((api, index) => (
                      <option key={index} value={api}>
                        {api}
                      </option>
                      ))}
            </select>
          </div>

          {/* Dropdown - 2 */}
          <div style={{ display: transaction[transactionIndex] === "Full Transaction" ? "block" : "none"}}>
            <select value={selectedFullAPIType} onChange={(e) => setSelectedFullAPIType(e.target.value)}
                  style={selectStyle}>
                     <option value="">Select Flow</option>
                     {fullAPITypes.map((api, index) => (
                      <option key={index} value={api}>
                        {api}
                      </option>
                      ))}
            </select>
          </div>
          
        </div>

          <input value={httpMethod} readOnly rows={2}
                       style={{ cursor: "not-allowed", width: "11%", height: "2.5%", padding: "1px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "15px", marginLeft: "0.1rem", backgroundColor: "white"}}/>
          
          <label style={{ marginLeft: "0.3rem" }}><b>URL:</b></label>
          
          <input value={url} readOnly rows={2} 
                       style={{ cursor: "not-allowed", width: "72%", padding: "1.5px", border: "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem", backgroundColor: "white"}}/>
        
          <h4 style={{marginTop: "5px", marginBottom: "8px"}}>Request Body:</h4>
          <textarea value={requestBody} onChange={handleChange1} rows={23} cols={45} style={{ borderRadius: "12px", fontFamily: "monospace" }}/>
          <br/>
          <label style={{ marginLeft: "1rem" }}><b>MRN:</b></label>
          <input type="text" placeholder="MRN" maxLength={20} value={mrn} onChange={(e) => setMRN(e.target.value)}
                       style={{ width: "45%", padding: "6px", border: invalidFields2.includes("mrn") ? "2px solid red" : "1px solid #333", borderRadius: "4px", outline: "none", marginTop: "5px", marginLeft: "0.3rem"}}/>
          <button type="button" onClick={() => { setMRN(""); }}
                        style={{ width: "22%", padding: "6px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", color: "black", backgroundColor: "orange", outline: "none", marginTop: "5px", marginLeft: "2rem" }}>
            Clear
          </button>
        </div>

        <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <button type="button" onClick={() => { previousPage() }}
                        style={{ width: "40%", padding: "10px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2" }}>
            Previous page
          </button>

          <button type="button" onClick={() =>   {handleSubmit(); }}
                        style={{ width: "40%", padding: "10px", cursor: "pointer", border: "1px solid #333", borderRadius: "6px", backgroundColor: "#f2f2f2" }}>
            Fire Transaction
          </button>

        </div>
      </div>
    </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'orange',
  color: 'white',
  border: '1px solid white',
  padding: '2px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '1.3rem',
};

const arrowStyle = {
  cursor: 'pointer',
  padding: '0rem',
  fontSize: '1rem',
};

const selectStyle = {
  padding: '4px',
  width: '120%',
  borderRadius: '10px',
  border: '1px solid white',
  outline: 'none',
};

