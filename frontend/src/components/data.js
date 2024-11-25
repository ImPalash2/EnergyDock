const userLeftNav = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },

  {
    id: 11,
    name: "Add Your Station",
    path: "/apply-for-station-master",
  },
  {
    id: 12,
    name: "Find Stations",
    path: "/find-all-stations",
  },
  {
    id: 4,
    name: "Slot Bookings",
    path: "/slot-bookings",
  },
];
const userRightNav = [
  {
    id: 5,
    name: "Profile",
    path: `/user/profile/:id`,
    icon: "fa-solid fa-user",
  },
];
const adminLeftNav = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house extra",
  },
  {
    id: 9,
    name: "totalUsers",
    path: "/admin/users",
    icon: "fa-solid fa-people-line extra",
  },
  {
    id: 8,
    name: "Charging Stations",
    path: "/admin/charging-stations",
    icon: "fa-solid fa-charging-station extra",
  },
];
const adminRightNav = [
  {
    id: 5,
    name: "Profile",
    path: `/admin/profile/:id`,
    icon: "fa-solid fa-user",
  },
];
const stationMasterLeftNav = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },
  {
    id: 10,
    name: "Booking requests",
    path: "/station-bookings",
  },
];
const stationMasterRightNav = [
  {
    id: 5,
    name: "Profile",
    path: `/station/profile/:id`,
    icon: "fa-solid fa-user",
  },
];
export {
  userLeftNav,
  userRightNav,
  adminLeftNav,
  adminRightNav,
  stationMasterLeftNav,
  stationMasterRightNav,
};
