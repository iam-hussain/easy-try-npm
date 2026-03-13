// String utilities
export {
  slugify,
  truncate,
  camelCase,
  snakeCase,
  kebabCase,
  pascalCase,
  titleCase,
  capitalize,
  maskString,
  template,
  reverse,
  countOccurrences,
  squish,
  isPalindrome,
  initials,
  escapeHtml,
  unescapeHtml,
  center,
  stripAnsi,
} from "./string.js";

// ID Generation utilities
export {
  randomString,
  nanoid,
  uuid,
  shortId,
  prefixedId,
  cuid,
  sortableId,
  Incrementer,
} from "./id.js";
export type { IncrementerOptions } from "./id.js";

// Object utilities
export {
  pick,
  omit,
  deepClone,
  deepMerge,
  flattenObject,
  unflattenObject,
  get,
  set,
  isPlainObject,
  entries,
  fromEntries,
  mapValues,
  filterObject,
} from "./object.js";

// Array utilities
export {
  chunk,
  unique,
  uniqueBy,
  shuffle,
  groupBy,
  sortBy,
  difference,
  intersection,
  symmetricDifference,
  flatten,
  last,
  first,
  sample,
  sampleMany,
  partition,
  zip,
  count,
  sum,
  average,
  range,
  compact,
  frequency,
} from "./array.js";

// Number utilities
export {
  clamp,
  randomInt,
  randomFloat,
  formatCurrency,
  ordinal,
  toHumanReadable,
  formatNumber,
  round,
  percentOf,
  toPercent,
  lerp,
  mapRange,
  inRange,
  formatBytes,
} from "./number.js";

// Date utilities
export {
  timeAgo,
  timeFromNow,
  formatDate,
  isToday,
  isYesterday,
  isTomorrow,
  daysBetween,
  addDays,
  addHours,
  addMinutes,
  startOfDay,
  endOfDay,
  isDateBetween,
  isLeapYear,
  daysInMonth,
} from "./date.js";

// Validation utilities
export {
  isEmail,
  isURL,
  isEmpty,
  isEqual,
  isIPv4,
  isIPv6,
  isHexColor,
  isAlphanumeric,
  isJSON,
  isNumber,
  isUUID,
  isObject,
  isCreditCard,
  isPhoneNumber,
} from "./validate.js";

// Async utilities
export {
  retry,
  sleep,
  debounce,
  throttle,
  pMap,
  deferred,
  timeout,
  createMutex,
} from "./async.js";
export type { RetryOptions } from "./async.js";

// Color utilities
export {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  lighten,
  darken,
  randomColor,
  luminance,
  contrastRatio,
  textColor,
  mixColors,
  complementary,
  toRgba,
} from "./color.js";
export type { RGB, HSL } from "./color.js";

// Misc utilities
export {
  ms,
  msToString,
  parseBytes,
  env,
  envNumber,
  envBool,
  hash,
  hashHex,
  noop,
  identity,
  memoize,
  once,
  pipe,
  enumFromArray,
  deepFreeze,
  safeJsonParse,
} from "./misc.js";
