import { Exercise } from '../models/exercise';

const getUrl = (img: string): string => {
  if (img.includes(':-:')) {
    let len = img.length;
    let substr = img.substring(img.indexOf(':-:'), len);
    return img.replace(substr, '');
  } else {
    return img;
  }
};
const getImageId = (img: string): string => {
  if (img.includes(':-:')) {
    let substr = img.substring(0, img.indexOf(':-:'));
    return img.replace(substr + ':-:', '');
  } else {
    return null;
  }
};
const removeExercise = (arr: Exercise[], item: Exercise) => {
  return arr.filter((i) => i.idEjercicio != item.idEjercicio);
};
const removeDropElement = (arr: any[], item: any) => {
  return arr.filter((i) => i.id != item.id);
};
// concat to arr1 if not include exercise.id
const concatUniqueExercise = (
  arr1: Exercise[],
  arr2: Exercise[]
): Exercise[] => {
  arr2.map((i) => {
    let t = true;
    arr1.map((j) => {
      if (i.idEjercicio === j.idEjercicio) {
        t = false;
      }
    });
    if (t) {
      arr1.push(i);
    }
  });
  return arr1;
};
const calculateAge = (date) => {
  let today: Date = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  let bdate: Date = new Date(date);
  var dd2 = String(bdate.getDate()).padStart(2, '0');
  var mm2 = String(bdate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy2 = bdate.getFullYear();
  let age = yyyy - yyyy2;
  if (mm < mm2) {
    return age - 1;
  } else {
    if (dd < dd2) {
      return age - 1;
    }
  }
  return age;
};
export {
  getUrl,
  getImageId,
  removeExercise,
  removeDropElement,
  concatUniqueExercise,
  calculateAge,
};
