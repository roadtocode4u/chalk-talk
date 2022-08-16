const TAEmailMap = {
  'icp': ['itspinki05@gmail.com', 'anandshirbhaiyye@gmail.com', 'prajaktadharpure28@gmail.com'],
  'c' : ['itspinki05@gmail.com'],
  'cpp' : ['itspinki05@gmail.com','anandshirbhaiyye@gmail.com', 'prajaktadharpure28@gmail.com'],
  'python': ['sakoretejal1511@gmail.com', 'itspinki05@gmail.com']
};

const getTAEmail = (course) => {
  const TAMailArray = TAEmailMap[course]
  const randomIndex = Math.floor(Math.random() * TAMailArray.length)
  return TAMailArray[randomIndex]
}
module.exports = getTAEmail;