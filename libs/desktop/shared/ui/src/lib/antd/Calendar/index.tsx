import { Dayjs } from 'dayjs'

import generateCalendar from 'antd/es/calendar/generateCalendar'
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs'
import 'antd/es/calendar/style/css'

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig)

export { Calendar }
