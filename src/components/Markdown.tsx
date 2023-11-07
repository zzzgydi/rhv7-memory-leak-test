/* eslint-disable react/prop-types */

import { cx } from "./utils";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import supersub from "remark-supersub";
// import "github-markdown-css";
// import "./markdown.css";

export const Markdown: FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, supersub, remarkBreaks, remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
      className={`markdown-body markdown-custom-styles !text-base font-normal`}
      components={{
        code: ({ node, className, children, ...props }) => {
          const inline =
            node?.children &&
            node.children[0] &&
            node.children[0].type === "text";
          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
          return <code className={cx(className, "px-4")}>{children}</code>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
