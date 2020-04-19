import config from '@app/components/board/config';
import VIEW_MODE from '@app/components/constants';
import React from 'react';

export type BoardConfig = typeof config;

export interface BoardCol {
  title: string;
  key: string;
  width: number;
}

export type Mode = typeof VIEW_MODE;
export type ModeKey = keyof Mode;

export interface Resource {
  id: string;
  name: string;
  [key: string]: unknown;
  render?(resource: Resource): React.ReactNode;
}

export interface Event {
  id: string;
  startDate: string;
  endDate: string;
  rId: string;
  [key: string]: unknown;
  render?(event: Event): React.ReactNode;
}
