import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import * as cs from "i18n-iso-countries/langs/cs.json";

countries.registerLocale(en);
countries.registerLocale(cs);

export default countries;
