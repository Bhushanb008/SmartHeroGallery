import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const PAGE_HORIZONTAL_PADDING = 16;
export const PAGE_WIDTH = SCREEN_WIDTH;
export const PAGE_HEIGHT = SCREEN_HEIGHT * 0.6;

export const LEFT_COLUMN_WIDTH = PAGE_WIDTH * 0.6;
export const RIGHT_COLUMN_WIDTH = PAGE_WIDTH * 0.4;

export const TILE_GAP = 8;

export const RIGHT_TILE_HEIGHT =
  (PAGE_HEIGHT - TILE_GAP) / 2;
