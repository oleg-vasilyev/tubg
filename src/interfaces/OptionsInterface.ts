export interface OptionsInterface {
  battleFieldWidth: number;
  battleFieldHeight: number;
  speedOfDethZone: number;
  dethZoneStopAreaSize: number;
  tankSpeed: number;
  bulletSpeed: number;
  [option: string]: number;
}