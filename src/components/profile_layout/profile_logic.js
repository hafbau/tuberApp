// // Tutor state structure
// const tutor = {
//   id,              // id from server
//   address,         // string without the city / country
//   availability,    // array of dates
//   avatar,
//   city,
//   conversations,   // array of conversations had - TODO: define conversation structure
//   coordinate,      //  object => {lat: , long: }
//   country,
//   email,
//   experience,      // string e.g. 5years experience tutoring
//   first_name,
//   phone,
//   education,       // string? maybe an array? TODO: decide array or string
//   rate,            // string e.g. $20/hr TODO: currency conversion
//   reviews,         // array of review objects. review => {
//                    // id, reviewer_firstname, reviewer_avatar, city, country, created_at(mmmm, yyyy)
//                    // }
//   status,          // string which maps to integer sent from server 'is_available'
//                    // status can be one of ['available and online', 'available but offline', 'unavailable']
//                    // which maps to 'is_available' which can be [1, 2, 3]
//   subjects

// }

export const transformToProfileState = (obj) => {
  obj.current_location = JSON.parse(obj.current_location);
  return {
    id: obj.id,
    address: addressify(obj["current_location"]),
    availability: JSON.parse(obj.hours),
    avatar: obj.avatar,
    city: obj.current_location.city,
    conversations: undefined,
    coordinate: gpsify(obj["current_location"]),
    country: obj.current_location.country,
    education: obj.education,
    email: obj.email,
    experience: obj.experience,
    first_name: deriveFirstName(obj["name"]),
    joined_date: formatDate(obj["created_at"]),
    phone: obj.phone,
    rate: currencify(obj["rate_cents"]),
    reviews: transformReviews(obj.reviews),
    status: parseISAvailable(obj["status_code"]),
    subjects: obj.subjects.map(s => s.name),
    summary: obj.user.description,
    user_id: obj.user_id
  }
}

const M = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

const addressify = (location) => location.other;

const currencify = (cents) => `$${Math.round(cents / 100)}/hr`;

const deriveFirstName = (fullname) => fullname.split(" ")[0];

const formatDate = (created_at) => {
  const date = new Date(created_at);
  return `${M[date.getMonth()]}, ${date.getFullYear()}`;
}

const formatPhoneNum = (num) => {
  const numArr = num.toString().replace("-","").split("");
  return `+${numArr[0]}-${numArr.slice(1,4).join("")}-${numArr.slice(4,7).join("")}-${numArr.slice(7).join("")}`
}

const gpsify = (location) => {
  const { long, lat } = { ...location };
  return { long, lat };
};

const parseISAvailable = (int) => [
                                { text: "available and online", color: "#11dd11" },
                                { text: "available but offline", color: "#dddd11" },
                                { text: "unavailable", color: "#dddddd" }
                              ][Number(int) - 1];

const transformReviews = (reviews) => reviews.map(r => {
  r.student.current_location = JSON.parse(r.student.current_location);
  return {
    id: r.id,
    avatar: r.student.avatar,
    city: r.student.current_location.city,
    content: r.content,
    country: r.student.current_location.country,
    created_at: formatDate(r.created_at),
    rating: r.rating,
    reviewer: deriveFirstName(r.student.name)
  }
});

