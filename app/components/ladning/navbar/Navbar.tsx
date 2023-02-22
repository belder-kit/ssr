import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

const links = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Pricing",
    to: "/",
  },
  {
    title: "Solution",
    to: "/",
  },
  {
    title: "FAQ",
    to: "/",
  },
];

const projectName = "Project Name";

export const Navbar = () => {
  return (
    <>
      <MobileLayout
        projectName={projectName}
        links={links}
        onClickAction={console.log}
      />
      <DesktopLayout
        projectName={projectName}
        links={links}
        onClickAction={console.log}
      />
    </>
  );
};
