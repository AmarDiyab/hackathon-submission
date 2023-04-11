import React from "react";
import HackathonListItem from "./HackathonListItem";
import "./HackathonList.css";

function HackathonList({ hackathons }) {
  return (
    <div
      className="hackathon-list"
      style={{
        justifyContent: "space-between",
      }}
    >
      {hackathons.map((item) => {
        return (
          <HackathonListItem
            title={item.hackathonTitle}
            description={item.hackathonSummary}
            icon={item.hackathonIcon}
            uploadDate={item.uploadDate}
            id={item.id}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default HackathonList;
