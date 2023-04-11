import moment from "moment/moment";

const sortItems = (items = [], order = "Newest") => {
  return items.sort((a, b) => {
    let diff = 0;
    if (order === "Newest") {
      diff = moment(b.uploadDate).diff(moment(a.uploadDate), "days");
    } else if (order === "Oldest") {
      diff = moment(a.uploadDate).diff(moment(b.uploadDate), "days");
    }
    return diff;
  });
};

export default sortItems;
