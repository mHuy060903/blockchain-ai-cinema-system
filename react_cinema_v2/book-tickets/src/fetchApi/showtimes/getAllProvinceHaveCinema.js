import { supabase } from "../../../utils/supabase";

export const getAllProvinceHaveCinema = async () => {
  let { data: cinemas, error } = await supabase.from("cinemas").select("*");
  if (error) {
    throw new Error("Error when getting data cinemas: " + error.message);
  }
  let { data: screens, error: errorScreen } = await supabase
    .from("screens")
    .select("*");

  if (errorScreen) {
    throw new Error("Error when getting data screens: " + error.message);
  }

  const provinceIds = new Set();

  cinemas.forEach((cinema) => {
    provinceIds.add(cinema.province_id);
  });

  const arrayIdProvinceHasCinema = Array.from(provinceIds);

  let { data: provinces, error: errorProvinces } = await supabase
    .from("provinces")
    .select("*")
    .in("id", arrayIdProvinceHasCinema);

  if (errorProvinces) {
    throw new Error(
      "Something went wrong when getting data provinces: " +
        errorProvinces.message
    );
  }

  const arrayAllCinemaProvince = provinces.map((province) => ({
    province,
    cinemas: [],
  }));

  cinemas.forEach((cinema) => {
    const index = arrayAllCinemaProvince.findIndex(
      (item) => item.province.id === cinema.province_id
    );
    arrayAllCinemaProvince[index].cinemas.push({ ...cinema, screens: [] });
  });

  screens.forEach((screen) => {
    const indexProvince = arrayAllCinemaProvince.findIndex(
      (item) => item.province.id === screen.province_id
    );

    const indexCinema = arrayAllCinemaProvince[indexProvince].cinemas.findIndex(
      (cinema) => cinema.id === screen.cinema_id
    );
    arrayAllCinemaProvince[indexProvince].cinemas[indexCinema].screens.push({
      ...screen,
    });
  });

  return arrayAllCinemaProvince;
};
