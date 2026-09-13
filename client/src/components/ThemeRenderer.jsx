import React from 'react';
import ClassicCorporate from '../themes/ClassicCorporate';
import IndustrialRefinery from '../themes/IndustrialRefinery';
import FestiveCelebration from '../themes/FestiveCelebration';
import ModernMinimal from '../themes/ModernMinimal';
import EngineeringDay from '../themes/EngineeringDay';
import HousekeepingDay from '../themes/HousekeepingDay';

const ThemeRenderer = ({ theme, media }) => {
  if (!theme) return null;

  switch (theme.slug) {
    case 'classic-corporate':
      return <ClassicCorporate theme={theme} media={media} />;
    case 'industrial-refinery':
      return <IndustrialRefinery theme={theme} media={media} />;
    case 'festive-celebration':
      return <FestiveCelebration theme={theme} media={media} />;
    case 'modern-minimal':
      return <ModernMinimal theme={theme} media={media} />;
    case 'engineering-day':
      return <EngineeringDay theme={theme} media={media} />;
    case 'housekeeping-day':
      return <HousekeepingDay theme={theme} media={media} />;
    default:
      return <div className="p-8 text-center text-red-500">Theme component not found for: {theme.slug}</div>;
  }
};

export default ThemeRenderer;
