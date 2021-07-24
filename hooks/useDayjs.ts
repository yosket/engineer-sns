import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)
dayjs.extend(isBetween)

export const useDayjs = () => {
  dayjs.locale(ja)
  return dayjs
}
