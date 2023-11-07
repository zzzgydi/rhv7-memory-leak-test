/* eslint-disable react/prop-types */

import { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export const Markdown: FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{children}</ReactMarkdown>
  );
};
