// import profileImg from ''

const initialState = {
  name: "AGAJ ALAM",
  student_id: "43897",
  enroll: "2201000000766",
  course: "B.TECH",
  college_name: "SUBHARTI INSTITUTE OF TECHNOLOGY AND ENGINEERING",
  application_id:'HLA43308',
  specialization: "INFORMATION TECHNOLOGY",
  admission_session: "2022-2026",
  date_of_admission: "08/13/2022 00:00:00",
  father_name: "RIYAJ AHAMAD",
  mother_name: "NOORJAHAN KHATUN",
  date_of_birth: "04/05/2003 00:00:00",
  gender: "MALE",
  mobile_no: "9939200283",
  cast_category: "GEN",
  religion: "MUSLIM",
  nationality: "INDIA",
  adhaar: "676613204693",
  parmanent_address: "EAST CHAMPARAN",
  pincode: "845305",
  email: "agajalam283@gmail.com",
  contact_no: "9939200283",
  local_address: "EAST CHAMPARAN",
//   avatar: profileImg,
};

const userSlice = {
  name: "user",
  reducer: (state = initialState) => state,
};

export default userSlice.reducer;
