import {
  BarChart3Icon,
  ClipboardCheckIcon,
  CloudSunIcon,
  CompassIcon,
  FootprintsIcon,
  LandmarkIcon,
  RecycleIcon,
  ScaleIcon,
  SproutIcon,
  SunIcon,
  type LucideIcon } from
'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BarChart3: BarChart3Icon,
  ClipboardCheck: ClipboardCheckIcon,
  CloudSun: CloudSunIcon,
  Compass: CompassIcon,
  Footprints: FootprintsIcon,
  Landmark: LandmarkIcon,
  Recycle: RecycleIcon,
  Scale: ScaleIcon,
  Sprout: SproutIcon,
  Sun: SunIcon
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? CompassIcon;
}