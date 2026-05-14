/**
 * Icon registry — used by the design-system preview to enumerate all icons.
 * Components should import icons by name from "@/components/ui/icons" directly.
 */

import type { ComponentType } from "react";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CalendarIcon,
  CameraIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ClockIcon,
  CloseIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  EyeOffIcon,
  FilterIcon,
  FireIcon,
  GalleryIcon,
  HeartFilledIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  InfoIcon,
  LogoutIcon,
  MenuIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShareIcon,
  SparkleIcon,
  StarFilledIcon,
  StarIcon,
  TrashIcon,
  UploadIcon,
  UserIcon,
  WalletIcon,
  type IconProps,
} from "./icons";

export type IconRegistryEntry = {
  name: string;            // export name
  displayName: string;     // human-friendly
  Component: ComponentType<IconProps>;
  group: "Navigation" | "Action" | "Status" | "Domain";
};

export const ICON_REGISTRY: IconRegistryEntry[] = [
  // Navigation
  { name: "ChevronDownIcon",  displayName: "Chevron Down",  Component: ChevronDownIcon,  group: "Navigation" },
  { name: "ChevronUpIcon",    displayName: "Chevron Up",    Component: ChevronUpIcon,    group: "Navigation" },
  { name: "ChevronLeftIcon",  displayName: "Chevron Left",  Component: ChevronLeftIcon,  group: "Navigation" },
  { name: "ChevronRightIcon", displayName: "Chevron Right", Component: ChevronRightIcon, group: "Navigation" },
  { name: "ArrowLeftIcon",    displayName: "Arrow Left",    Component: ArrowLeftIcon,    group: "Navigation" },
  { name: "ArrowRightIcon",   displayName: "Arrow Right",   Component: ArrowRightIcon,   group: "Navigation" },
  { name: "MenuIcon",         displayName: "Menu",          Component: MenuIcon,         group: "Navigation" },
  { name: "CloseIcon",        displayName: "Close",         Component: CloseIcon,        group: "Navigation" },

  // Action
  { name: "SearchIcon",       displayName: "Search",        Component: SearchIcon,       group: "Action" },
  { name: "PlusIcon",         displayName: "Plus",          Component: PlusIcon,         group: "Action" },
  { name: "CheckIcon",        displayName: "Check",         Component: CheckIcon,        group: "Action" },
  { name: "EditIcon",         displayName: "Edit",          Component: EditIcon,         group: "Action" },
  { name: "TrashIcon",        displayName: "Trash",         Component: TrashIcon,        group: "Action" },
  { name: "DownloadIcon",     displayName: "Download",      Component: DownloadIcon,     group: "Action" },
  { name: "UploadIcon",       displayName: "Upload",        Component: UploadIcon,       group: "Action" },
  { name: "ShareIcon",        displayName: "Share",         Component: ShareIcon,        group: "Action" },
  { name: "HeartIcon",        displayName: "Heart",         Component: HeartIcon,        group: "Action" },
  { name: "HeartFilledIcon",  displayName: "Heart (filled)",Component: HeartFilledIcon,  group: "Action" },
  { name: "EyeIcon",          displayName: "Eye",           Component: EyeIcon,          group: "Action" },
  { name: "EyeOffIcon",       displayName: "Eye Off",       Component: EyeOffIcon,       group: "Action" },
  { name: "FilterIcon",       displayName: "Filter",        Component: FilterIcon,       group: "Action" },

  // Status
  { name: "CheckCircleIcon",  displayName: "Check Circle",  Component: CheckCircleIcon,  group: "Status" },
  { name: "AlertCircleIcon",  displayName: "Alert Circle",  Component: AlertCircleIcon,  group: "Status" },
  { name: "AlertTriangleIcon",displayName: "Alert Triangle",Component: AlertTriangleIcon,group: "Status" },
  { name: "InfoIcon",         displayName: "Info",          Component: InfoIcon,         group: "Status" },

  // Domain
  { name: "CameraIcon",       displayName: "Camera",        Component: CameraIcon,       group: "Domain" },
  { name: "ImageIcon",        displayName: "Image",         Component: ImageIcon,        group: "Domain" },
  { name: "GalleryIcon",      displayName: "Gallery",       Component: GalleryIcon,      group: "Domain" },
  { name: "StarIcon",         displayName: "Star",          Component: StarIcon,         group: "Domain" },
  { name: "StarFilledIcon",   displayName: "Star (filled)", Component: StarFilledIcon,   group: "Domain" },
  { name: "PinIcon",          displayName: "Pin",           Component: PinIcon,          group: "Domain" },
  { name: "BellIcon",         displayName: "Bell",          Component: BellIcon,         group: "Domain" },
  { name: "SendIcon",         displayName: "Send",          Component: SendIcon,         group: "Domain" },
  { name: "WalletIcon",       displayName: "Wallet",        Component: WalletIcon,       group: "Domain" },
  { name: "SparkleIcon",      displayName: "Sparkle",       Component: SparkleIcon,      group: "Domain" },
  { name: "FireIcon",         displayName: "Fire",          Component: FireIcon,         group: "Domain" },
  { name: "UserIcon",         displayName: "User",          Component: UserIcon,         group: "Domain" },
  { name: "CalendarIcon",     displayName: "Calendar",      Component: CalendarIcon,     group: "Domain" },
  { name: "ClockIcon",        displayName: "Clock",         Component: ClockIcon,        group: "Domain" },
  { name: "SettingsIcon",     displayName: "Settings",      Component: SettingsIcon,     group: "Domain" },
  { name: "LogoutIcon",       displayName: "Logout",        Component: LogoutIcon,       group: "Domain" },
  { name: "HomeIcon",         displayName: "Home",          Component: HomeIcon,         group: "Domain" },
];
