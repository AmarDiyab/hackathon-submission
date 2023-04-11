import Dropdown from "react-bootstrap/Dropdown";

function DropdownComponent({
  sortState,
  setSortState,
  hackathons,
  setHackathons,
  sortItems,
}) {
  const items = [
    { id: 1, title: "Newest" },
    { id: 2, title: "Oldest" },
  ];

  return (
    <Dropdown className="d-inline">
      <Dropdown.Toggle
        variant="transparent"
        id="dropdown-basic"
        className="border border-dark rounded-pill d-flex align-items-center justify-content-around"
        style={{ width: "140px" }}
      >
        {sortState}
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0">
        {items.map((item) => {
          return (
            <Dropdown.Item
              className="dropdown-item"
              onClick={() => {
                const sortedHackathons = sortItems(hackathons, item.title);
                setHackathons([...sortedHackathons]);
                setSortState(item.title);
              }}
              key={item.id}
            >
              {item.title}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownComponent;
