import type {} from "react/canary";
import { ViewTransition } from "react";

const navigation = {
  "nav-forward": "page-forward",
  "nav-back": "page-back",
  default: "page-fade",
};

export default function PageContent({
  children,
  labelledBy,
}: {
  children: React.ReactNode;
  labelledBy: string;
}) {
  return (
    <ViewTransition
      name="page-content"
      share={navigation}
      enter={navigation}
      exit={navigation}
      default="none"
    >
      <main aria-labelledby={labelledBy}>{children}</main>
    </ViewTransition>
  );
}
