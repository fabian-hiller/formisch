const AREA_NAME_MAP: Record<string, string> = {
  guides: 'Guides',
  api: 'API',
  playground: 'Playground',
};

export function getAreaName(key: string): string | undefined {
  return AREA_NAME_MAP[key];
}
