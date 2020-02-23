import * as R from 'ramda';

export const getRouteParam = (key: string) => R.path(['route', 'params', key]);

export const addOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;
