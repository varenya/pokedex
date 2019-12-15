import React, { useState, cloneElement } from "react";
import "./Tabs.css";

function elementIsNullOrString(child) {
  return !child || typeof child.type === "string";
}
function Tabs(props) {
  const [selectedIndex, setSelectedIndex] = useState(props.defaultIndex);
  function _onSelectTab(index) {
    setSelectedIndex(index);
  }
  return (
    <div className="tabs">
      {React.Children.map(props.children, child => {
        if (elementIsNullOrString(child)) return child;
        else {
          return cloneElement(child, { selectedIndex, _onSelectTab });
        }
      })}
    </div>
  );
}
Tabs.defaultProps = {
  defaultIndex: 0
};

function TabList(props) {
  const { selectedIndex, _onSelectTab } = props;
  return (
    <div className="tab-list">
      {React.Children.map(props.children, (child, index) => {
        if (elementIsNullOrString(child)) return child;
        return cloneElement(child, {
          isSelected: selectedIndex === index,
          _onSelect: () => _onSelectTab(index)
        });
      })}
    </div>
  );
}

function Tab(props) {
  const { isSelected, _onSelect, className = "", children } = props;
  return (
    <button
      className={`${isSelected ? "selected" : ""} ${className} tab-item`}
      onClick={_onSelect}
    >
      {children}
    </button>
  );
}

function TabPanels(props) {
  const { selectedIndex } = props;
  return (
    <div className="tab-panel">
      {React.Children.map(props.children, (child, index) => {
        if (elementIsNullOrString(child)) return child;
        return cloneElement(child, { isSelected: index === selectedIndex });
      })}
    </div>
  );
}

function TabPanel(props) {
  const { isSelected } = props;
  return (
    <div hidden={!isSelected} className="tab-panel-item">
      {props.children}
    </div>
  );
}

export { Tabs, Tab, TabList, TabPanels, TabPanel };
