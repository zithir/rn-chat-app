import * as R from 'ramda';

export const getRouteParam = (key: string) => R.path(['route', 'params', key]);

export const findById = (id: string) => R.find(R.propEq('id', id));

export const findIndexById = (id: string) => R.findIndex(R.propEq('id', id));

export const addOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;
