//преобразование времени
export function getTransformationTime(min) {
   const hours = Math.trunc(min / 60);
   const minutes = min % 60;
   return `${hours}ч ${minutes}м`;
}
