import { defineQuery } from "next-sanity";

export const materialsQuery = defineQuery(`
  *[_type == "material"] | order(date desc) {
    _id,
    title,
    description,
    date,
    event,
    type,
    area,
    format,
    linkUrl,
    size,
    placements,
    "fileAsset": file.asset->{
      url,
      extension,
      size
    }
  }
`);

export const materialsFacetsQuery = defineQuery(`
  *[_type == "material"] {
    _id,
    event,
    type,
    area,
    format,
    "fileAsset": file.asset->{ extension }
  }
`);

// Normalize the filter values like mapMaterialToFilterItem, including legacy values
// and formats inferred from file extensions. The final projection omits these keys.
const materialsFilterSource = `
  *[_type == "material"] {
    ...,
    "eventKey": lower(array::join(string::split(coalesce(event, ""), " ")[@ != ""], " ")),
    "typeKey": lower(array::join(string::split(coalesce(type, ""), " ")[@ != ""], " ")),
    "areaKey": lower(array::join(string::split(coalesce(area, ""), " ")[@ != ""], " ")),
    "formatKey": lower(array::join(string::split(coalesce(format, ""), " ")[@ != ""], " ")),
    "extensionKey": lower(coalesce(file.asset->extension, ""))
  } {
    ...,
    "filterEvent": select(
      eventKey in ["warsztaty", "konferencja", "webinar", "szkolenie"] => eventKey,
      "inne"
    ),
    "filterType": select(
      typeKey == "nagranie video" => "nagranie wideo",
      typeKey in ["workbook", "checklist", "poradnik", "publikacja", "nagranie wideo",
        "szablon", "infografika"] => typeKey,
      "inne"
    ),
    "filterArea": select(
      areaKey in ["zdrowie", "prawo", "finanse", "kariera", "rozwój osobisty",
        "rodzicielstwo"] => areaKey,
      "inne"
    ),
    "filterFormat": select(
      formatKey != "" && formatKey in ["pdf", "zip", "mp4", "link"] => formatKey,
      formatKey == "" && extensionKey in ["pdf", "zip", "mp4", "link"] => extensionKey,
      "inne"
    )
  }
`;

const materialsPageFilters = `
  ($search == ""
    || count(string::split(lower(coalesce(title, "Brak danych")), $search)) > 1
    || count(string::split(lower(coalesce(description, "Brak danych")), $search)) > 1)
  && ($event == "all" || filterEvent == $event)
  && (count($types) == 0 || filterType in $types)
  && (count($areas) == 0 || filterArea in $areas)
  && (count($formats) == 0 || filterFormat in $formats)
  && ($dateFrom == null || coalesce(date, "1970-01-01") >= $dateFrom)
  && ($dateTo == null || coalesce(date, "1970-01-01") <= $dateTo)
`;

const materialsPageFields = `{
    _id,
    title,
    description,
    date,
    event,
    type,
    area,
    format,
    linkUrl,
    size,
    placements,
    "fileAsset": file.asset->{ url, extension, size }
  }
`;

export const materialsNewestPageQuery = defineQuery(`
  ${materialsFilterSource} [${materialsPageFilters}]
    | order(coalesce(date, "1970-01-01") desc, _id asc) [$start...$end] ${materialsPageFields}
`);

export const materialsOldestPageQuery = defineQuery(`
  ${materialsFilterSource} [${materialsPageFilters}]
    | order(coalesce(date, "1970-01-01") asc, _id asc) [$start...$end] ${materialsPageFields}
`);

export const MATERIALS_PAGE_SIZE = 10;
