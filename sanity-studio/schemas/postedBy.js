export default {
  name: "postedBy",
  title: "Posted By",
  type: "reference", // reference type connects 2 different documents
  to: [{ type: "user" }], // reference to an array of users
};
