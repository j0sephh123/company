import React from "react";
import { Tabs } from "../types";

type TabOption = {
  value: Tabs;
  label: string;
};

type TabsComponentProps = {
  activeTab: Tabs;
  onChange: (tab: Tabs) => void;
  options: TabOption[];
};

const TabsComponent: React.FC<TabsComponentProps> = ({
  activeTab,
  onChange,
  options,
}) => {
  return (
    <div className="tabs tabs-boxed mb-6">
      {options.map((option) => (
        <button
          key={option.value}
          className={`tab ${activeTab === option.value ? "tab-active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TabsComponent;
