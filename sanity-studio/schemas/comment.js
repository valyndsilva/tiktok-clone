export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "postedBy",
      title: "Posted By",
      type: "postedBy",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string", // we will use a image url so we set type to string
    },
  ],
};
