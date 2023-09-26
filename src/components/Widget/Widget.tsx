import React, { useState } from "react";
import "./Widget.css";
import HashWidget from "../Hash/HashWidget";
import AddressWidget from "../Address/AddressWidget";
import CurrentAddressDetails from "../CurrentAddress/CurrentAddressDetails";
import { WidgetProvider, useWidget } from "../Context/WidgetContext";

interface WidgetProps {
  address: string;
}

const Widget: React.FC<WidgetProps> = ({ address }) => {
  // Use the useWidget hook to access context values
  const { showWidget, openWidget, closeWidget } = useWidget();

  // Set the initial state to true (open)
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showDefaultWidgets, setShowDefaultWidgets] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClose = () => {
    const widgetContainer = document.getElementById("search-widget");
    widgetContainer.classList.remove("open");
    widgetContainer.classList.add("closed");
    setSelectedOption("");
    setInputValue("");
    setShowDefaultWidgets(true);
    closeWidget(); // Set isOpen to false when the close button is clicked
  };

  const handleSearchButtonClick = () => {
    const select = document.querySelector("select");
    if (select) {
      const selectedValue = select.value;
      setSelectedOption(selectedValue);
      setShowDefaultWidgets(false); // Hide default widgets when an option is selected
    }
    const input = document.querySelector("#inputText") as HTMLInputElement;

    const selectedValue = input.value;
    setInputValue(selectedValue);
  };

  return (
    <>
      <button className="search-btn" onClick={openWidget}>
        CLICK HERE
      </button>
      <div
        className={`search-widget ${showWidget ? "open" : "closed"}`}
        id="search-widget"
      >
        <div className="w-sec1-flex">
          <div style={{ width: "30%" }}>
            <img
              src="https://bafybeidewda6po5lmp2moos3vldlysavrtas6yjicav76fhkrhpxr7hk6e.ipfs.w3s.link/exploreX.png"
              style={{ width: "100%" }}
            />
          </div>
          <button className="close-button" onClick={handleClose}>
            ✖
          </button>
        </div>
        <div>
          <div className="w-sec2-flex">
            <input
              type="text"
              id="inputText"
              placeholder=" Enter Address / Txn Hash "
              className="search-input"
              // value={inputValue}
              // onChange={(e) => setInputValue(e.target.value)}
            />
            <select id="select">
              <option value="option1">Select...</option>
              <option value="option2">Address</option>
              <option value="option3">Hashvalue</option>
            </select>

            <button
              className="search-button"
              onClick={handleSearchButtonClick}
              id="search-btn"
            >
              Search
            </button>
          </div>
        </div>

        {showDefaultWidgets && <CurrentAddressDetails address={address} />}

        {selectedOption === "option2" && !showDefaultWidgets && (
          <AddressWidget inputValue={inputValue} />
        )}
        {selectedOption === "option3" && !showDefaultWidgets && (
          <HashWidget inputValue={inputValue} />
        )}
        <div
          style={{
            padding: "10px 0px",
            backgroundColor: "#20293a",
            fontSize: "12px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          Powered by{" "}
          <img
            src="https://bafybeidewda6po5lmp2moos3vldlysavrtas6yjicav76fhkrhpxr7hk6e.ipfs.w3s.link/exploreX.png"
            style={{ width: "70px" }}
          />
        </div>
      </div>
    </>
  );
};

const WidgetWithProvider: React.FC<WidgetProps> = ({ address }) => {
  return (
    <WidgetProvider>
      <Widget address={address} />
    </WidgetProvider>
  );
};

export default WidgetWithProvider;
