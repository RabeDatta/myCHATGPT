export const formatData = (obj: any) => {
  console.log("obj", obj);

  const newObj = obj.map((item) => {
    if (item.role === "user") {
      // For assistant messages, return the same object as is
      return item;
    } else {
      // For user messages, format the content and return a new object
      const formattedContent =
        /^[:\n-]/gm.test(item.content) &&
        item.content.split("\n").reduce((acc, line) => {
          if (/^[:\n-]/gm.test(line.trim())) {
            return acc;
          } else {
            const listItem = `<li> ${line.trim()} </li>`;
            return acc + listItem;
          }
        }, "");

      console.log("formattedContent", formattedContent);

      return {
        ...item,
        listContent: true,
        content: formattedContent
          ? `<ul>${formattedContent}</ul>`
          : item.content,
      };
    }
  });

  console.log("newObj", newObj);

  return newObj;
};
