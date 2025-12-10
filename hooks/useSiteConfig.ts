import siteConfig from '../config/site-config.json';

export type SiteConfig = typeof siteConfig;

export const useSiteConfig = (): SiteConfig => {
  return siteConfig;
};

export default useSiteConfig;

