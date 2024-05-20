import icons from "./icons";

const {
  patient,
  doctor,
  hospital,
  specialty,
  timeDoctor,
  timePatient,
  user,
  logoutIcon,
  dashboard,
  patientRed,
  hospitalBlue,
  doctorGold,
  specialtyBlue,
} = icons;

export const dataConstant = [
  {
    id: 1,
    title: "Bệnh nhân",
    linkTile: "Xem danh sách bệnh nhân",
    link: "/patients",
    icon: (
      <img
        src={patientRed}
        alt=""
        className="text-lg p-1 rounded-md self-end"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ),
  },
  {
    id: 2,
    title: "Bác sĩ",
    linkTile: "Xem danh sách bác sĩ",
    link: "/doctors",
    icon: (
      <img
        src={doctorGold}
        alt=""
        className="text-lg p-1 rounded-md self-end"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
        }}
      />
    ),
  },
  {
    id: 3,
    title: "Bệnh viện",
    linkTile: "Xem danh sách bệnh viện",
    link: "/clinics",
    icon: (
      <img
        src={hospitalBlue}
        alt=""
        className="text-lg p-1 rounded-md self-end"
        style={{
          backgroundColor: "rgba(128, 198, 234, 0.2)",
        }}
      />
    ),
  },
  {
    id: 4,
    title: "Chuyên khoa",
    linkTile: "Xem danh sách chuyên khoa",
    link: "/specialtys",
    icon: (
      <img
        src={specialtyBlue}
        alt=""
        className="text-lg p-1 rounded-md self-end"
        style={{
          backgroundColor: "rgba(209, 231, 255, 1)",
        }}
      />
    ),
  },
  {
    id: 5,
    title: "Lịch khám bệnh của bác sĩ",
    linkTile: "Xem danh sách lịch khám",
    link: "/schedules",
  },
  // {
  //   id: 6,
  //   title: "Lịch khám bệnh của bệnh nhân",
  //   link: "/bookings",
  //   updatePage: UpdateBooking,
  // },
  // {
  //   id: 7,
  //   title: "Người dùng",
  //   link: "/users",
  //   updatePage: UpdateUser,
  // },
];

export const roleName = [
  {
    _id: 1,
    name: "Admin",
  },
  {
    _id: 2,
    name: "Host",
  },
  {
    _id: 3,
    name: "Bác sĩ",
  },
  {
    _id: 4,
    name: "Bệnh nhân",
  },
];
export const genders = [
  {
    _id: "MALE",
    name: "user.male",
  },
  {
    _id: "FEMALE",
    name: "user.female",
  },
];

export const status = [
  {
    _id: "Đã huỷ",
    name: "Đã huỷ",
  },
  {
    _id: "Đang xử lý",
    name: "Đang xử lý",
  },
  {
    _id: "Đã xác nhận",
    name: "Đã xác nhận",
  },
  {
    _id: "Đã khám",
    name: "Đã khám",
  },
  {
    _id: "Bỏ khám",
    name: "Bỏ khám",
  },
];

export const statusUser = [
  {
    _id: false,
    name: "user.active",
  },
  {
    _id: true,
    name: "user.block",
  },
];
export const statusPay = [
  {
    _id: false,
    name: "booking.unpaid",
  },
  {
    _id: true,
    name: "booking.paid",
  },
];

export const times = [
  {
    id: 1,
    value: "7:00 - 8:00",
    maxNumber: "",
  },
  {
    id: 2,
    value: "8:00 - 9:00",
    maxNumber: "",
  },
  {
    id: 3,
    value: "9:00 - 10:00",
    maxNumber: "",
  },
  {
    id: 4,
    value: "10:00 - 11:00",
    maxNumber: "",
  },
  {
    id: 5,
    value: "11:00 - 12:00",
    maxNumber: "",
  },
  {
    id: 6,
    value: "13:00 - 14:00",
    maxNumber: "",
  },
  {
    id: 7,
    value: "14:00 - 15:00",
    maxNumber: "",
  },
  {
    id: 8,
    value: "15:00 - 16:00",
    maxNumber: "",
  },
  {
    id: 9,
    value: "16:00 - 17:00",
    maxNumber: "",
  },
  {
    id: 10,
    value: "17:00 - 18:00",
    maxNumber: "",
  },
  {
    id: 11,
    value: "18:00 - 19:00",
    maxNumber: "",
  },
  {
    id: 12,
    value: "19:00 - 20:00",
    maxNumber: "",
  },
  {
    id: 13,
    value: "20:00 - 21:00",
    maxNumber: "",
  },
];
