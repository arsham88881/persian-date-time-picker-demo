import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { POSITION_MAP, POSITION_TYPE } from '..';

export function getPlacementName(
  position: ConnectedOverlayPositionChange,
): string | undefined {
  for (const placement in POSITION_MAP) {
    if (
      position.connectionPair.originX ===
        POSITION_MAP[placement as POSITION_TYPE].originX &&
      position.connectionPair.originY ===
        POSITION_MAP[placement as POSITION_TYPE].originY &&
      position.connectionPair.overlayX ===
        POSITION_MAP[placement as POSITION_TYPE].overlayX &&
      position.connectionPair.overlayY ===
        POSITION_MAP[placement as POSITION_TYPE].overlayY
    ) {
      return placement;
    }
  }
  return undefined;
}
