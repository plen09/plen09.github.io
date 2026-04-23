/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Province {
  id: string; // ISO or common ID
  name: string;
  nameEn: string;
  capital: string;
  visited: boolean;
  notes?: string;
  distanceFromBeijing: number; // Approximate distance in km
}

export interface FootprintData {
  visitedProvinceIds: string[];
  stats: {
    totalProvinces: number;
    visitedCount: number;
    percentage: number;
  };
}
