const allSlots = [
  {
    startHour: 8,
    title: "8:00 AM - 9:00 AM",
  },
  {
    startHour: 10,
    title: "10:00 AM - 11:00 AM",
  },
  {
    startHour: 11,
    title: "11:00 AM - 12:00 PM",
  },
  {
    startHour: 12,
    title: "12:00 PM - 1:00 PM",
  },
  {
    startHour: 14,
    title: "2:00 PM - 3:00 PM",
  },
  {
    startHour: 15,
    title: "3:00 PM - 4:00 PM",
  },
  {
    startHour: 16,
    title: "4:00 PM - 5:00 PM",
  },
  {
    startHour: 19,
    title: "7:00 PM - 8:00 PM",
  },
  {
    startHour: 20,
    title: "8:00 PM - 9:00 PM",
  }
];

export default function getSlots() {
  const currentHour = new Date().getHours()
  return allSlots.filter((slot) => slot.startHour >= currentHour + 1);
}
