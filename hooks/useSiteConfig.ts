import siteConfig from '../config/site-config.json';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  sectionId?: string;
}

type SiteConfigBase = typeof siteConfig;

export type SiteConfig = Omit<SiteConfigBase, 'navigation'> & {
  navigation: Omit<SiteConfigBase['navigation'], 'menuItems'> & {
    menuItems: MenuItem[];
  };
};

export const useSiteConfig = (): SiteConfig => {
  return siteConfig as SiteConfig;
};

export default useSiteConfig;

