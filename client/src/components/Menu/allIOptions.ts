import {
  BsFileEarmarkRichtext,
  BsFiletypeSql,
  BsImages,
  BsTextParagraph,
} from "react-icons/bs";
import { TbBrandJavascript } from "react-icons/tb";

export const allOptions = [
  {
    id: 1,
    path: "summary",
    title: "Text Summary",
    description: `Start with the tutorial. It will quickly introduce you to the
    primary features of React Router: from configuring routes, to
    loading and mutating data, to pending and optimistic UI.`,
    Icon: BsFileEarmarkRichtext,
  },
  {
    id: 2,
    path: "notes",
    title: "Generate Notes",
    description: `Start with the tutorial. It will quickly introduce you to the
    primary features of React Router: from configuring routes, to
    loading and mutating data, to pending and optimistic UI.`,
    Icon: BsTextParagraph,
  },
  {
    id: 3,
    path: "sql-query",
    title: "SQL Query Generator",
    description: `Start with the tutorial. It will quickly introduce you to the
    primary features of React Router: from configuring routes, to
    loading and mutating data, to pending and optimistic UI.`,
    Icon: BsFiletypeSql,
  },
  {
    id: 4,
    path: "js-converter",
    title: "JS Converter",
    description: `Start with the tutorial. It will quickly introduce you to the
    primary features of React Router: from configuring routes, to
    loading and mutating data, to pending and optimistic UI.`,
    Icon: TbBrandJavascript,
  },
  {
    id: 5,
    path: "scifi-image",
    title: "Sci-fi Image",
    description: `Start with the tutorial. It will quickly introduce you to the
    primary features of React Router: from configuring routes, to
    loading and mutating data, to pending and optimistic UI.`,
    Icon: BsImages,
  },
];
