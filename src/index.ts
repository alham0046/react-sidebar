import SidebarRoot from "./components/SideBar";
import SidebarToggle from "./components/SidebarToggle";
import SidebarItem from "./components/SidebarItem";
import SidebarIcon from "./components/SidebarIcon";
import SidebarText from "./components/SidebarText";
import "./styles.css";

export const Sidebar = Object.assign(SidebarRoot, {
  Toggle: SidebarToggle,
  Item: SidebarItem,
  Icon: SidebarIcon,
  Text: SidebarText,
});

export {default as ThreeLineSideBar} from "./svg/ThreeLineSideBar"

export {highlightItem, sidebarAction} from "./utils/storeUtils"

export {default as MainContent} from "./components/MainContent"

export {default as SidebarLayout} from "./components/SidebarLayout"

export type {OnClick, OnClickArgs} from './types/actions'